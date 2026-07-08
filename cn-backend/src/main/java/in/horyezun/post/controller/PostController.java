package in.horyezun.post.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.horyezun.post.dto.CreatePostRequest;
import in.horyezun.post.dto.PostResponse;
import in.horyezun.post.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	private final PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}
	
	@PostMapping
	public ResponseEntity<PostResponse> createPost(Authentication authentication,
			@RequestBody CreatePostRequest request) {
		
		PostResponse response = postService.createPost(authentication.getName(), request);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public ResponseEntity<List <PostResponse>> getFeed() {
		return ResponseEntity.ok(postService.getFeed());
	}
	
	@GetMapping("/me")
	public ResponseEntity<List <PostResponse>> getMyPosts(Authentication authentication) {
		return ResponseEntity.ok(postService.getMyPosts(authentication.getName()));
	}
	
}
