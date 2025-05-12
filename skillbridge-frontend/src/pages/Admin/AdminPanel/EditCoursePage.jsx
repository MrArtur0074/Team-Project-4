import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./ui/EditCoursePage.module.sass";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dragIndex, setDragIndex] = useState(null);
  const [lessonImagePreviews, setLessonImagePreviews] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docSnap = await getDoc(doc(db, "courses", courseId));
        if (docSnap.exists()) {
          const courseData = docSnap.data();
          setCourse(courseData);
          setLessonImagePreviews(courseData.lessons.map(() => null));
        } else {
          setError("Курс не найден");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const updateLessonNumbers = (lessons) => {
    const renumbered = lessons.map((lesson, index) => ({
      ...lesson,
      number: index + 1,
    }));
    setCourse((prev) => ({ ...prev, lessons: renumbered }));
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...course.lessons];
    updatedLessons[index][field] = value;
    setCourse({ ...course, lessons: updatedLessons });
  };

  const handleLessonImageChange = (index, file) => {
    const updatedLessons = [...course.lessons];
    updatedLessons[index].imageFile = file;
    const newPreviews = [...lessonImagePreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setLessonImagePreviews(newPreviews);
    setCourse({ ...course, lessons: updatedLessons });
  };

  const handleAddLesson = () => {
    const newLesson = {
      number: course.lessons.length + 1,
      name: "Новый урок",
      path: `lesson-${Date.now()}`,
      text: "",
      picture: "",
    };
    setCourse({ ...course, lessons: [...course.lessons, newLesson] });
  };

  const handleDeleteLesson = (index) => {
    if (!window.confirm("Удалить этот урок?")) return;
    const updatedLessons = [...course.lessons];
    updatedLessons.splice(index, 1);
    updateLessonNumbers(updatedLessons);
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    const lessons = [...course.lessons];
    const dragged = lessons[dragIndex];
    lessons.splice(dragIndex, 1);
    lessons.splice(index, 0, dragged);
    updateLessonNumbers(lessons);
    setDragIndex(null);
  };

  const handleSave = async () => {
    if (!course.title || !course.category) {
        alert("Введите заголовок и категорию");
        return;
    }

    setSaving(true);
    let bannerURL = course.banner;

    // Загрузка баннера, если выбран
    if (bannerFile) {
        const formData = new FormData();
        formData.append("file", bannerFile);
        formData.append("upload_preset", "user_avatar_upload");
        formData.append("cloud_name", "dxlwokicm");

        try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dxlwokicm/image/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
            bannerURL = data.secure_url;
        } else {
            throw new Error("Ошибка загрузки баннера");
        }
        } catch (err) {
        alert(err.message);
        setSaving(false);
        return;
        }
    }

    // Загрузка изображений уроков, если есть
    const updatedLessons = await Promise.all(
        course.lessons.map(async (lesson) => {
        let updatedLesson = { ...lesson };

        if (lesson.imageFile) {
            const formData = new FormData();
            formData.append("file", lesson.imageFile);
            formData.append("upload_preset", "user_avatar_upload");
            formData.append("cloud_name", "dxlwokicm");

            const res = await fetch("https://api.cloudinary.com/v1_1/dxlwokicm/image/upload", {
            method: "POST",
            body: formData,
            });

            const data = await res.json();
            updatedLesson.image = data.secure_url;
        }

        // Удалить imageFile перед сохранением в Firestore
        delete updatedLesson.imageFile;

        return updatedLesson;
        })
    );

    try {
        await updateDoc(doc(db, "courses", courseId), {
        ...course,
        banner: bannerURL,
        lessons: updatedLessons,
        });
        alert("Курс успешно обновлён!");
        navigate("/admin/panel");
    } catch (err) {
        alert("Ошибка при сохранении: " + err.message);
    } finally {
        setSaving(false);
    }
  };


  if (loading) return <p className={styles.container}>Загрузка...</p>;
  if (error) return <h1 className={styles.container}>{error}</h1>;

  return (
    <>
        <AdminHeader />    
        <div className={styles.container}>
        <h2>Редактировать курс</h2>

        <label>Название курса</label>
        <input
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        <label>Категория</label>
        <div className={styles.categoryButtons}>
            {["cooking", "community", "household", "jaws"].map((cat) => (
            <button
                key={cat}
                type="button"
                className={`${styles.categoryButton} ${
                course.category === cat ? styles.active : ""
                }`}
                onClick={() => setCourse({ ...course, category: cat })}
            >
                {cat}
            </button>
            ))}
        </div>

        <label>Баннер курса</label>
        <input type="file" accept="image/*" onChange={handleBannerChange} />
        {bannerPreview && (
            <img src={bannerPreview} alt="Preview" className={styles.preview} />
        )}
        {!bannerPreview && course.banner && (
            <img src={course.banner} alt="Current" className={styles.preview} />
        )}

        <h3>Уроки (перетаскивай для изменения порядка)</h3>
        {course.lessons.map((lesson, index) => (
            <div
                key={index}
                className={styles.lesson}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                >
                <div
                    className={styles.dragHandle}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                >
                    ☰ Перетащить
                </div>
            <strong>Урок {lesson.number}</strong>

            <label>Название</label>
            <input
                value={lesson.name}
                onChange={(e) => handleLessonChange(index, "name", e.target.value)}
            />

            <label>Путь (path)</label>
            <input
                value={lesson.path}
                onChange={(e) => handleLessonChange(index, "path", e.target.value)}
            />

            <label>Текст урока</label>
            <textarea
                value={lesson.text || ""}
                onChange={(e) => handleLessonChange(index, "text", e.target.value)}
                rows={2}
            />

            <label>Изображение урока</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLessonImageChange(index, e.target.files[0])}
            />
            {lessonImagePreviews[index] && (
                <img src={lessonImagePreviews[index]} alt="Preview" className={styles.preview} />
            )}
            {!lessonImagePreviews[index] && lesson.image && (
                <img src={lesson.image} alt="Current" className={styles.preview} />
            )}

            <button onClick={() => handleDeleteLesson(index)} className={styles.deleteButton}>
                Удалить
            </button>
            </div>
        ))}

        <button onClick={handleAddLesson} className={styles.addButton}>
            ➕ Добавить урок
        </button>
        <button onClick={() => navigate("/admin/panel")} className={styles.backButton}>
                  ← Назад
        </button>
        <button onClick={handleSave} disabled={saving} className={styles.saveButton}>
            {saving ? "Сохранение..." : "Сохранить изменения"}
        </button>
        </div>
    </>
  );
};

export default EditCoursePage;

