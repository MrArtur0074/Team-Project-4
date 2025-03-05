package skillbridge.example.SkillBridge_Website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import skillbridge.example.SkillBridge_Website.entities.Enrollment;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId); // Get enrollments by user

    List<Enrollment> findByCourseId(Long courseId); // Get enrollments by course
}
