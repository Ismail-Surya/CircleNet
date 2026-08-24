package in.horyezun.post.dto;

import java.time.LocalDateTime;

public class PostResponse {

	private Long id;
	
	private String content;
	
	private String username;
	
	private String firstName;
	
	private String lastName;
	
	private String profilePictureUrl;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;

	public PostResponse() {
	}

	public PostResponse(Long id, String content, String username, String firstName, String lastName,
			String profilePictureUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
		this.id = id;
		this.content = content;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.profilePictureUrl = profilePictureUrl;
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

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	
}
