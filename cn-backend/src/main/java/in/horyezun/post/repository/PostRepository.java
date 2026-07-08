package in.horyezun.post.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.horyezun.post.entity.Post;
import in.horyezun.user.entity.User;

public interface PostRepository extends JpaRepository<Post, Long> {

	List <Post> findAllByOrderByCreatedAtDesc();
	
	List <Post> findByUserOrderByCreatedAtDesc(User user);
	
}
