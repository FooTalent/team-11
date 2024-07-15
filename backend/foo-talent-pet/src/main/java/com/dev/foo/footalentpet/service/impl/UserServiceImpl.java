package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.mapper.UserDTOMapper;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.request.UpdateUserRequestDTO;
import com.dev.foo.footalentpet.model.response.LoginResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.repository.UserRepository;
import com.dev.foo.footalentpet.service.JwtService;
import com.dev.foo.footalentpet.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDTOMapper userDTOMapper;
    @Autowired
    private CloudinaryServiceImpl cloudinaryService;
    @Autowired
    private JwtService jwtService;

    @Override
    public List<UserResponseDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(userDTOMapper::userToUserResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return userDTOMapper.userToUserResponseDto(currentUser);
    }

    @Override
    public LoginResponseDTO update(UpdateUserRequestDTO updateRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        currentUser.setName(updateRequestDTO.name());
        currentUser.setPhone(updateRequestDTO.phone());
        currentUser.setCountry(updateRequestDTO.country());
        currentUser.setProvince(updateRequestDTO.province());
        currentUser.setCity(updateRequestDTO.city());

        if (updateRequestDTO.profilePicture() != null) {
            try {
                String currentProfilePicture = currentUser.getProfilePicture();
                String imageUrl = cloudinaryService.uploadFile(updateRequestDTO.profilePicture());
                currentUser.setProfilePicture(imageUrl);

                if (currentProfilePicture != null) {
                    String publicId = currentProfilePicture.substring(currentProfilePicture.lastIndexOf("/") + 1, currentProfilePicture.lastIndexOf("."));
                    cloudinaryService.deleteFile(publicId);
                }
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Error uploading image");
            }
        }

        userRepository.save(currentUser);
        String token = jwtService.generateToken(currentUser);
        UserResponseDTO userResponseDTO = userDTOMapper.userToUserResponseDto(currentUser);
        return new LoginResponseDTO(userResponseDTO, token);
    }

}
