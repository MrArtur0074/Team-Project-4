package skillbridge.example.SkillBridge_Website.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT") // For long descriptions
    private String description;

    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor; // Courses are created by instructors

    @Column(nullable = false)
    private Double price;
}
