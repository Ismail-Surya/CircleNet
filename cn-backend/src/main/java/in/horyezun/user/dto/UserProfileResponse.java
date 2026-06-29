package in.horyezun.user.dto;

import java.time.LocalDateTime;

public class UserProfileResponse {

	private Long id;
	
	private String username;
	
	private String email;
	
	private String firstName;
	
	private String lastName;
	
	private String profilePictureUrl;
	
	private String bio;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;
	
	public UserProfileResponse () {
		
	}

	public UserProfileResponse(Long id, String username, String email, String firstName, String lastName,
			String profilePictureUrl, String bio, LocalDateTime createdAt, LocalDateTime updatedAt) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.profilePictureUrl = profilePictureUrl;
		this.bio = bio;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
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
