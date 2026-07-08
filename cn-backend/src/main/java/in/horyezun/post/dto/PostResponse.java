package in.horyezun.post.dto;

import java.time.LocalDateTime;

public class PostResponse {

	private Long id;
	
	private String content;
	
	private String username;
	
	private String firstName;
	
	private String lastName;
	
	private String profilePicture;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;

	public PostResponse() {
	}

	public PostResponse(Long id, String content, String username, String firstName, String lastName,
			String profilePicture, LocalDateTime createdAt, LocalDateTime updatedAt) {
		this.id = id;
		this.content = content;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.profilePicture = profilePicture;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}

	public String getContent() {
		return content;
	}

	public String getUsername() {
		return username;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	
}
