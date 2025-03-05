package skillbridge.example.SkillBridge_Website.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import skillbridge.example.SkillBridge_Website.dto.LoginRequest;
import skillbridge.example.SkillBridge_Website.dto.RegisterRequest;
import skillbridge.example.SkillBridge_Website.services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        return ResponseEntity.ok(token);
    }
}
