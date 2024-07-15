package com.dev.foo.footalentpet.auth;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.mapper.UserDTOMapper;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.Role;
import com.dev.foo.footalentpet.model.request.LoginRequestDTO;
import com.dev.foo.footalentpet.model.request.PasswordRequestDTO;
import com.dev.foo.footalentpet.model.request.RegisterRequestDTO;
import com.dev.foo.footalentpet.model.response.LoginResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.repository.UserRepository;
import com.dev.foo.footalentpet.service.EmailService;
import com.dev.foo.footalentpet.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    Logger logger = Logger.getLogger(AuthServiceImpl.class.getName());
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDTOMapper userDTOMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmailService emailService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public UserResponseDTO register(RegisterRequestDTO userDTO) throws IOException {
        User user = userDTOMapper.registerRequestDtoToUser(userDTO);
        user.setEnabled(false);
        user.setProfilePicture("default.jpg");
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(userDTO.password()));
        user.setTokenSecurity(UUID.randomUUID());
        User savedUser = userRepository.save(user);
        String message = new String(Files.readAllBytes(new File("src/main/resources/templates/activate.html").toPath()));
        message = message.replace("{frontendUrl}", frontendUrl);
        message = message.replace("{tokenSecurity}", savedUser.getTokenSecurity().toString());
        emailService.sendHtmlMessage(user.getEmail(), "Bienvenido a Pet-Quest", message);
        return userDTOMapper.userToUserResponseDto(savedUser);
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.email())
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (!passwordEncoder.matches(userDTO.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        if (!user.getEnabled()) {
            throw new AccountStatusException("User not activated") {
            };
        }
        UserResponseDTO userResponseDTO = userDTOMapper.userToUserResponseDto(user);
        String token = jwtService.generateToken(user);
        return new LoginResponseDTO(userResponseDTO, token);
    }

    @Override
    public void activateAccount(String token) {
        User user = userRepository.findByTokenSecurity(UUID.fromString(token))
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public void forgotPassword(String email) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (!user.getEnabled()) {
            throw new AccountStatusException("User not activated") {
            };
        }
        user.setTokenSecurity(UUID.randomUUID());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, 24);
        Date expirationDate = calendar.getTime();
        user.setExpirationTokenDate(expirationDate);
        User savedUser = userRepository.save(user);
        String message = new String(Files.readAllBytes(new File("src/main/resources/templates/recovery.html").toPath()));
        message = message.replace("{frontendUrl}", frontendUrl);
        message = message.replace("{tokenSecurity}", savedUser.getTokenSecurity().toString());
        emailService.sendHtmlMessage(user.getEmail(), "Recuperar contraseña", message);
    }

    @Override
    public void resetPassword(String token, PasswordRequestDTO passwordRequestDTO) {
        User user = userRepository.findByTokenSecurity(UUID.fromString(token))
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (user.getExpirationTokenDate().before(new Date())) {
            throw new ExpiredJwtException(null, null, "Token expired");
        }
        user.setPassword(passwordEncoder.encode(passwordRequestDTO.password()));
        user.setExpirationTokenDate(null);
        user.setTokenSecurity(null);
        userRepository.save(user);
    }
}
