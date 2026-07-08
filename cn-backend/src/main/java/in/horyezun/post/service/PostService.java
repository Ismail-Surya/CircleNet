package in.horyezun.post.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import in.horyezun.exception.UsernameNotFoundException;
import in.horyezun.post.dto.CreatePostRequest;
import in.horyezun.post.dto.PostResponse;
import in.horyezun.post.entity.Post;
import in.horyezun.post.repository.PostRepository;
import in.horyezun.user.entity.User;
import in.horyezun.user.repository.UserRepository;

@Service
public class PostService {

	private final PostRepository postRepository;
	
	private final UserRepository userRepository;

	public PostService(PostRepository postRepository, UserRepository userRepository) {
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}
	
	public PostResponse createPost (String username, CreatePostRequest request) {
		
		User user = userRepository
						.findByUsername(username)
						.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		Post post = new Post();
		
		post.setContent(request.getContent());
		post.setUser(user);
		
		Post savedPost = postRepository.save(post);
		
		return mapToResponse(post);
	}

	private PostResponse mapToResponse(Post post) {
		
		User user = post.getUser();
		
		return new PostResponse(
				post.getId(),
				post.getContent(),
				user.getUsername(),
				user.getFirstName(),
				user.getLastName(),
				user.getProfilePictureUrl(),
				post.getCreatedAt(),
				post.getUpdatedAt());
	}
	
	public List <PostResponse> getFeed () {
		return postRepository
				.findAllByOrderByCreatedAtDesc()
				.stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
	}
	
	public List <PostResponse> getMyPosts (String username) {
		User user = userRepository
				.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		return postRepository
				.findByUserOrderByCreatedAtDesc(user)
				.stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
	}
	
}
