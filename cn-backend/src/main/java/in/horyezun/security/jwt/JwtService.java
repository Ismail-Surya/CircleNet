package in.horyezun.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
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
	
	private Claims extractAllClaims (String token) {
		return Jwts.parserBuilder().
				setSigningKey(
						getSigningKey())
					.build()
					.parseClaimsJws(token)
					.getBody();
	}
	
	public String extractUsername (String token) {
		return extractClaim(token, Claims::getSubject);
	}

	private <T> T extractClaim(String token, Function <Claims, T> resolver) {
		
		Claims claims = extractAllClaims(token);
		return resolver.apply(claims);
	}
	
	public Date extractExpiration (String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	
	/* public boolean isTokenValid(String token, String username) {
		String extractedUsername = extractUsername(token);
		
		return extractedUsername.equals(username)
				&& !isTokenExpired(token);
	} */
	
	// Below is the alternate implementation for isTokenValid (String token, String username)
	
	public boolean isTokenValid(String token, String username) {
		try {
		String extractedUsername = extractUsername (token);
		
		return extractedUsername.equals(username);
		} catch (JwtException exc) {
			return false;
		}
		
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
}
