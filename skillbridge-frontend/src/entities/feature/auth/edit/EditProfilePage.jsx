import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./ui/EditProfile.module.sass";

const EditProfilePage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let photoURL = auth.currentUser.photoURL;

            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("upload_preset", "user_avatar_upload"); // твой unsigned preset
                formData.append("cloud_name", "dxlwokicm"); // твое имя из Cloudinary

                const res = await fetch("https://api.cloudinary.com/v1_1/dxlwokicm/image/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                if (data.secure_url) {
                    photoURL = data.secure_url;
                } else {
                    setMessage("Ошибка загрузки изображения");
                    return;
                }
            }

            await updateProfile(auth.currentUser, {
                displayName,
                photoURL,
            });

            setMessage("Профиль успешно обновлён!");
            navigate("/profile");

        } catch (err) {
            console.error("Ошибка обновления профиля:", err);
            setMessage("Ошибка при сохранении");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2>Редактировать профиль</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Имя профиля:
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {preview && <img src={preview} alt="Preview" width={120} style={{ marginTop: 10}} />}
                    <br />
                    <button type="submit" disabled={loading}>
                        {loading ? "Сохраняется..." : "Сохранить измения"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className={styles.cancelButton}
                        >
                        Выйти без сохранения
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;



