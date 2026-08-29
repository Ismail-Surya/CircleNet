package in.horyezun.comment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.horyezun.comment.entity.Comment;
import in.horyezun.post.entity.Post;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List <Comment> findByPostOrderByCreatedAtAsc (Post post);
	
}
