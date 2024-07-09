package com.dev.foo.footalentpet.auth;

import com.dev.foo.footalentpet.model.request.LoginRequestDTO;
import com.dev.foo.footalentpet.model.request.RegisterRequestDTO;
import com.dev.foo.footalentpet.model.response.LoginResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth", description = "Auth operations")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Operation(summary = "Create a user", description = "Creates a new user and return data", responses = {
            @ApiResponse(responseCode = "201", description = "Successfully created user"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody RegisterRequestDTO userRequestDTO) {
        UserResponseDTO user = authService.register(userRequestDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);

    }

    @Operation(summary = "Authenticate user", description = "Authenticate user and return data", responses = {
            @ApiResponse(responseCode = "201", description = "Successfully authenticate user", content = @Content(schema = @Schema(implementation = LoginResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content(schema = @Schema(implementation = ProblemDetail.class))),
            @ApiResponse(responseCode = "404", description = "User Not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginDto) {
        LoginResponseDTO user = authService.login(loginDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @Operation(summary = "Activate account", description = "Activate account", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully activated account"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping("/activate/{token}")
    public ResponseEntity<Void> activateAccount(@PathVariable String token) {
        authService.activateAccount(token);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
