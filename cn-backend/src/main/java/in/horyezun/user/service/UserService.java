package in.horyezun.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import in.horyezun.exception.UsernameNotFoundException;
import in.horyezun.user.dto.UserProfileResponse;
import in.horyezun.user.entity.User;
import in.horyezun.user.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepo;

	public UserService(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	public User save(User user) {
		return userRepo.save(user);
	}

	public boolean existsByUsername(String username) {
		return userRepo.existsByUsername(username);
	}

	public boolean existsByEmail(String email) {
		return userRepo.existsByEmail(email);
	}

	public Optional<User> findByUsername(String username) {
		return userRepo.findByUsername(username);
	}

	public UserProfileResponse getProfile (String username) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> 
					new UsernameNotFoundException ("User not found")
				);
		
		return new UserProfileResponse(
				user.getId(),
				user.getUsername(),
				user.getEmail(),
				user.getFirstName(),
				user.getLastName(),
				user.getProfilePictureUrl(),
				user.getBio(),
				user.getCreatedAt(),
				user.getUpdatedAt()
				);
	}

}
