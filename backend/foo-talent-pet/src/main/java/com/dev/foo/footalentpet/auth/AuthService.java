package com.dev.foo.footalentpet.auth;

import com.dev.foo.footalentpet.model.request.LoginRequestDTO;
import com.dev.foo.footalentpet.model.request.UserRequestDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserResponseDTO register(UserRequestDTO userDTO);

    UserResponseDTO login(LoginRequestDTO userDTO);
}
