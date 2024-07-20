package com.dev.foo.footalentpet.service;


import com.dev.foo.footalentpet.model.request.PasswordRequestDTO;
import com.dev.foo.footalentpet.model.request.UpdateUserRequestDTO;
import com.dev.foo.footalentpet.model.request.UserRequestDTO;
import com.dev.foo.footalentpet.model.response.LoginResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface UserService {
    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getMe();

    LoginResponseDTO update(UpdateUserRequestDTO updateRequestDTO);

    LoginResponseDTO updatePassword(PasswordRequestDTO passwordRequestDTO);

    UserResponseDTO updateProfilePicture(MultipartFile profilePicture);
}
