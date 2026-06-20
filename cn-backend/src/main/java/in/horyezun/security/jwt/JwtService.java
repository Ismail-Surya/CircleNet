package in.horyezun.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private final JwtProperties jwtProps;
	
	public JwtService (JwtProperties jwtProps) {
		this.jwtProps = jwtProps;
	}
	
	private Key getSigningKey () {
		return Keys.hmacShaKeyFor(
			jwtProps.getSecret().getBytes(
				StandardCharsets.UTF_8
			)
		);
	}
	
	public String generateToken (String username) {
		Date now = new Date();
		
		Date expiry = new Date(
							now.getTime()
							+ jwtProps.getExpiration()
						);
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(now)
				.setExpiration(expiry)
				.signWith(
					getSigningKey()
				)
				.compact();
	}
	
}
