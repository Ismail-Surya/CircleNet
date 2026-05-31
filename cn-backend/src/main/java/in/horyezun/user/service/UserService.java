package in.horyezun.user.service;

import org.springframework.stereotype.Service;

import in.horyezun.user.entity.User;
import in.horyezun.user.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepo;
	
	public UserService (UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	public User save (User user) {
		return userRepo.save(user);
	}
	
	public boolean existsByUsername (String username) {
		return userRepo.existsByUsername(username);
	}
	
	public boolean existsByEmail (String email) {
		return userRepo.existsByEmail(email);
	}
	
}
