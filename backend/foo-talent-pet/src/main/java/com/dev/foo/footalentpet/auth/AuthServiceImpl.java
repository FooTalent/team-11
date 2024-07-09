package com.dev.foo.footalentpet.auth;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.mapper.UserDTOMapper;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.Role;
import com.dev.foo.footalentpet.model.request.LoginRequestDTO;
import com.dev.foo.footalentpet.model.request.RegisterRequestDTO;
import com.dev.foo.footalentpet.model.response.LoginResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.repository.UserRepository;
import com.dev.foo.footalentpet.service.EmailService;
import com.dev.foo.footalentpet.service.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
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
    public UserResponseDTO register(RegisterRequestDTO userDTO) {
        User user = userDTOMapper.registerRequestDtoToUser(userDTO);
        user.setEnabled(false);
        user.setProfilePicture("default.jpg");
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(userDTO.password()));
        user.setTokenSecurity(UUID.randomUUID());
        User savedUser = userRepository.save(user);
        emailService.sendSimpleMessage(user.getEmail(), "Welcome", "Welcome to our platform, please click on the following link to activate your account: " + frontendUrl + "/api/auth/activate/" + user.getTokenSecurity());
        return userDTOMapper.userToUserResponseDto(savedUser);
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.email())
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (!passwordEncoder.matches(userDTO.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        UserResponseDTO userResponseDTO = userDTOMapper.userToUserResponseDto(user);
        String token = jwtService.generateToken(user);
        //emailService.sendSimpleMessage("adriandelosreyes2013@gmail.com", "Login", "User with email " + user.getUsername() + " has logged in");
        return new LoginResponseDTO(userResponseDTO, token);
    }

    @Override
    public void activateAccount(String token) {
        User user = userRepository.findByTokenSecurity(UUID.fromString(token))
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }
}
