package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;
import java.util.UUID;

@Tag(name = "Post", description = "Post operations")
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Operation(summary = "Create a new post", description = "Creates a new post and returns the post data", responses = {
            @ApiResponse(responseCode = "201", description = "Successfully created post"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    public ResponseEntity<PostResponseDTO> create(@RequestBody PostRequestDTO postRequestDTO) {
        PostResponseDTO post = postService.create(postRequestDTO);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get post by id", description = "Get post by id with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get post"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<PostResponseDTO> findById(@PathVariable UUID id) {
        return new ResponseEntity<>(postService.findById(id), HttpStatus.OK);
    }

    @Operation(summary = "Get all posts", description = "Get all post with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get posts"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> findAll() {
        return new ResponseEntity<>(postService.findAll(), HttpStatus.OK);
    }

}
