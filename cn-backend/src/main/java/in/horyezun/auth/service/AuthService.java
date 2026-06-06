package in.horyezun.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.horyezun.auth.dto.RegisterRequest;
import in.horyezun.auth.dto.RegisterResponse;
import in.horyezun.exception.EmailAlreadyExistsException;
import in.horyezun.exception.UsernameAlreadyExistsException;
import in.horyezun.user.entity.User;
import in.horyezun.user.service.UserService;

@Service
public class AuthService {

	private final UserService userService;
	private final PasswordEncoder passwordEncoder;
	
	public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
	}
	
	public RegisterResponse register (RegisterRequest request) {
		if (userService.existsByUsername(request.getUsername())) {
			throw new UsernameAlreadyExistsException("Username already exists");
		}
		
		if (userService.existsByEmail(request.getEmail())) {
			throw new EmailAlreadyExistsException("Email already exists");
		}
		
		User user = new User();
		
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		userService.save(user);
		
		return new RegisterResponse("User registered successfully");
	}
	
}
