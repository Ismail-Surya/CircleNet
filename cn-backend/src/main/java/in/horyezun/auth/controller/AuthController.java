package in.horyezun.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.horyezun.auth.dto.LoginRequest;
import in.horyezun.auth.dto.LoginResponse;
import in.horyezun.auth.dto.RegisterRequest;
import in.horyezun.auth.dto.RegisterResponse;
import in.horyezun.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> register(
			@RequestBody
			RegisterRequest request) {
		RegisterResponse response = authService.register(request);
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login (@RequestBody LoginRequest request) {
		LoginResponse response = authService.login(request);
		
		return ResponseEntity.ok(response);
	}
	
}
