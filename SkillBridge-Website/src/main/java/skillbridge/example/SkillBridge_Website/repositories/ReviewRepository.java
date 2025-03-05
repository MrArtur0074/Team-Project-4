package skillbridge.example.SkillBridge_Website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import skillbridge.example.SkillBridge_Website.entities.Review;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByCourseId(Long courseId); // Get reviews for a course
}
