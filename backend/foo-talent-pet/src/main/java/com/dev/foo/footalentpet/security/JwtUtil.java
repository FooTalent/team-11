package com.dev.foo.footalentpet.security;

import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class JwtUtil {

    private final JwtEncoder jwtEncoder;

    public JwtUtil(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public String generateToken(UserResponseDTO user) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("pet-quest")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(3600))
                .subject(user.email())
                .claim("userId", user.id())
                .claim("scope", "read")
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
