package skillbridge.example.SkillBridge_Website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import skillbridge.example.SkillBridge_Website.entities.Course;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCategory(String category); // Find courses by category
}
