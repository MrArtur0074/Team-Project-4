package skillbridge.example.SkillBridge_Website.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import skillbridge.example.SkillBridge_Website.config.JwtUtils;
import skillbridge.example.SkillBridge_Website.dto.LoginRequest;
import skillbridge.example.SkillBridge_Website.entities.User;
import skillbridge.example.SkillBridge_Website.repositories.UserRepository;
import skillbridge.example.SkillBridge_Website.dto.RegisterRequest;
import skillbridge.example.SkillBridge_Website.entities.enums.Role;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    // Registration (Already implemented)
    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(
                skillbridge.example.SkillBridge_Website.entities.enums.Role.valueOf(request.getRole().toUpperCase()));

        userRepository.save(user);
        return "User registered successfully!";
    }

    // Login function
    public String login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password!");
        }

        // Generate JWT token
        return jwtUtils.generateToken(user.getEmail());
    }
}
