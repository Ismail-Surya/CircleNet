package in.horyezun.auth.dto;

public class RegisterResponse {

	private String message;

	public RegisterResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	@Override
	public String toString() {
		return "RegisterResponse [message=" + message + "]";
	}
	
}
