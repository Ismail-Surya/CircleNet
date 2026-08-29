package in.horyezun.comment.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import in.horyezun.comment.dto.CommentResponse;
import in.horyezun.comment.dto.CreateCommentRequest;
import in.horyezun.comment.entity.Comment;
import in.horyezun.comment.repository.CommentRepository;
import in.horyezun.exception.UsernameNotFoundException;
import in.horyezun.post.entity.Post;
import in.horyezun.post.repository.PostRepository;
import in.horyezun.user.entity.User;
import in.horyezun.user.repository.UserRepository;

@Service
public class CommentService {

	private final CommentRepository commentRepository;
	
	private final PostRepository postRepository;
	
	private final UserRepository userRepository;

	public CommentService(CommentRepository commentRepository, PostRepository postRepository,
			UserRepository userRepository) {
		this.commentRepository = commentRepository;
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}
	
	public CommentResponse createComment(Long postId, String username, CreateCommentRequest request) {
		User user = userRepository.findByUsername(username)
						.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		Post post = postRepository.findById(postId)
						.orElseThrow(() -> new RuntimeException("Post not found"));
		
		Comment comment = new Comment();
		
		comment.setContent(request.getContent());
		comment.setUser(user);
		comment.setPost(post);
		
		Comment savedComment = commentRepository.save(comment);
		
		return mapToCommentResponse(savedComment);
	}
	
	public List <CommentResponse> getComments(Long postId) {
		Post post = postRepository.findById(postId)
						.orElseThrow(() -> new RuntimeException("Post not found"));
		
		return commentRepository
					.findByPostOrderByCreatedAtAsc(post)
					.stream()
					.map(this::mapToCommentResponse)
					.collect(Collectors.toList());
				
	}

	private CommentResponse mapToCommentResponse(Comment comment) {
		
		User user = comment.getUser();
		
		return new CommentResponse(
					comment.getId(),
					comment.getContent(),
					user.getUsername(),
					user.getFirstName(),
					user.getLastName(),
					user.getProfilePictureUrl(),
					comment.getCreatedAt(),
					comment.getUpdatedAt()
				);
	}
	
}
