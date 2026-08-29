package in.horyezun.comment.dto;

import java.time.LocalDateTime;

public class CommentResponse {

	private Long id;
	
	private String content;
	
	private String username;
	
	private String firstName;
	
	private String lastName;
	
	private String profilePictureUrl;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;

	public CommentResponse() {
	}

	public CommentResponse(String content, String username, String firstName, String lastName, String profilePictureUrl,
			LocalDateTime createdAt, LocalDateTime updatedAt) {
		this.content = content;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.profilePictureUrl = profilePictureUrl;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public CommentResponse(Long id, String content, String username, String firstName, String lastName,
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

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
}
