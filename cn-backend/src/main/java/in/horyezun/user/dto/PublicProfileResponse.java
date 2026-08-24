package in.horyezun.user.dto;

import java.time.LocalDateTime;

public class PublicProfileResponse {

	private String username;
	private String firstName;
	private String lastName;
	private String profilePictureUrl;
	private String bio;
	private LocalDateTime createdAt;
	
	public PublicProfileResponse() {
	}
	
	public PublicProfileResponse(String username, String firstName, String lastName, String profilePictureUrl,
			String bio, LocalDateTime createdAt) {
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.profilePictureUrl = profilePictureUrl;
		this.bio = bio;
		this.createdAt = createdAt;
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
	
}
