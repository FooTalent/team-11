package com.dev.foo.footalentpet.auth;

import com.dev.foo.footalentpet.model.request.LoginRequestDTO;
import com.dev.foo.footalentpet.model.request.RegisterRequestDTO;
import com.dev.foo.footalentpet.model.response.LoginResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserResponseDTO register(RegisterRequestDTO userDTO);

    LoginResponseDTO login(LoginRequestDTO userDTO);

    void activateAccount(String token);

    void forgotPassword(String email);

    void resetPassword(String token, String password);
}
