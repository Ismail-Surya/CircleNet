package in.horyezun.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.horyezun.user.dto.UserProfileResponse;
import in.horyezun.user.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/profile")
	public ResponseEntity<UserProfileResponse> getProfile (Authentication authentication) {
		UserProfileResponse profile =
				userService.getProfile(authentication.getName());
		
		return ResponseEntity.ok(profile);
	}
	
}
