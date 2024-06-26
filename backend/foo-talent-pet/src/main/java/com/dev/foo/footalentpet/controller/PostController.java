package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

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
}
