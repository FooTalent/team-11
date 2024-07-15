package com.dev.foo.footalentpet.controller;


import com.dev.foo.footalentpet.model.request.UpdateUserRequestDTO;
import com.dev.foo.footalentpet.model.request.UserRequestDTO;
import com.dev.foo.footalentpet.model.response.LoginResponseDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.service.UserService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "User", description = "User operations")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

/*    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllMatches() {
        List<UserResponseDTO> userList = userService.getAllUsers();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }*/

    @Operation(summary = "Get user authenticated", description = "Get the authenticated user data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get user"),
            @ApiResponse(responseCode = "404", description = "User Not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getMe() {
        UserResponseDTO user = userService.getMe();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Operation(summary = "Update user", description = "Update user and returns the user data", responses = {
            @ApiResponse(responseCode = "201", description = "Successfully updated user"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<LoginResponseDTO> update(@RequestPart(value = "name", required = false) String name,
                                                   @RequestPart(value = "phone", required = false) String phone,
                                                   @RequestPart(value = "country", required = false) String country,
                                                   @RequestPart(value = "province", required = false) String province,
                                                   @RequestPart(value = "city", required = false) String city,
                                                   @RequestPart(value = "image", required = false) MultipartFile profilePicture) {
        UpdateUserRequestDTO userRequestDTO = new UpdateUserRequestDTO(name, phone, country, province, city, profilePicture);
        LoginResponseDTO loginResponseDTO = userService.update(userRequestDTO);
        return new ResponseEntity<>(loginResponseDTO, HttpStatus.CREATED);
    }
}
