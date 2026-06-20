package in.horyezun.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private static final String SECRET_KEY =
			"circlenet-secret-key-for-development-only-123456789";
	
	private static final long EXPIRATION_TIME =
			1000 * 60 * 60 * 24;
	
	private Key getSigninKey () {
		return Keys.hmacShaKeyFor(
			SECRET_KEY.getBytes(
				StandardCharsets.UTF_8
			)
		);
	}
	
	public String generateToken (String username) {
		Date now = new Date();
		
		Date expiry = new Date(
							now.getTime()
							+ EXPIRATION_TIME
						);
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(now)
				.setExpiration(expiry)
				.signWith(
					getSigninKey()
				)
				.compact();
	}
	
}
