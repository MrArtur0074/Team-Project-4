package skillbridge.example.SkillBridge_Website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import skillbridge.example.SkillBridge_Website.entities.Lesson;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByCourseId(Long courseId); // Get lessons of a course
}
