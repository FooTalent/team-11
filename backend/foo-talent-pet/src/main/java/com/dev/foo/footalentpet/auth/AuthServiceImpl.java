package com.dev.foo.footalentpet.auth;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.exception.UnauthorizedException;
import com.dev.foo.footalentpet.mapper.UserDTOMapper;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.Role;
import com.dev.foo.footalentpet.model.request.LoginRequestDTO;
import com.dev.foo.footalentpet.model.request.UserRequestDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDTOMapper userDTOMapper;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO register(UserRequestDTO userDTO) {
        User user = userDTOMapper.userRequestDtoToUser(userDTO);
        user.setEnabled(false);
        user.setProfilePicture("default.jpg");
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(userDTO.password()));
        User savedUser = userRepository.save(user);
        return userDTOMapper.userToUserResponseDto(savedUser);
    }

    @Override
    public UserResponseDTO login(LoginRequestDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.email())
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (!passwordEncoder.matches(userDTO.password(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return userDTOMapper.userToUserResponseDto(user);
    }
}
