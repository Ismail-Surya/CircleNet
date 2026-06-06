package in.horyezun.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(UsernameAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse>
			handleUsernameAlreadyExists(UsernameAlreadyExistsException exc) {
		ErrorResponse response = new ErrorResponse(exc.getMessage());
		
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}
	
	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse>
			handleEmailAlreadyExists(EmailAlreadyExistsException exc) {
		ErrorResponse response = new ErrorResponse(exc.getMessage());
		
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity <ErrorResponse> handleGenericException (Exception exc) {
		ErrorResponse response = new ErrorResponse("An unexpected error occurred");
		
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}

}
