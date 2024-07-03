package com.dev.foo.footalentpet.controller;


import com.dev.foo.footalentpet.model.request.UserRequestDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import com.dev.foo.footalentpet.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "User", description = "User operations")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllMatches() {
        List<UserResponseDTO> userList = userService.getAllUsers();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getMe() {
        UserResponseDTO user = userService.getMe();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
