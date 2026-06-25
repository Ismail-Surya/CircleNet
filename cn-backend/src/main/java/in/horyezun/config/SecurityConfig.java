package in.horyezun.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import in.horyezun.security.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig
        extends WebSecurityConfigurerAdapter {

	private final JwtAuthenticationFilter jwtFilter;
	
    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
		this.jwtFilter = jwtFilter;
	}

	@Override
    protected void configure(
            HttpSecurity http)
            throws Exception {

        http
        		.csrf()
        		.disable()
        		.sessionManagement()
        		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        		.and()
        		.authorizeRequests()
        		.antMatchers("/api/auth/register", "/api/auth/login")
        		.permitAll()
        		.anyRequest()
        		.authenticated();
        
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(
            AuthenticationManagerBuilder auth)
            throws Exception {

        // No authentication configuration yet.
    }
}