package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostCommentResponseDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.service.PostService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Tag(name = "Post", description = "Post operations")
@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Operation(summary = "Create a new post", description = "Creates a new post and returns the post data", responses = {
            @ApiResponse(responseCode = "201", description = "Successfully created post"),
            @ApiResponse(responseCode = "404", description = "User Not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping
    public ResponseEntity<PostResponseDTO> create(@RequestBody PostRequestDTO postRequestDTO) {
        PostResponseDTO post = postService.create(postRequestDTO);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @PostMapping(value = "/{id}/images", consumes = {"multipart/form-data"})
    public ResponseEntity<PostResponseDTO> uploadImage(@PathVariable UUID id, @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        PostResponseDTO postResponseDTO = postService.uploadImages(id, images);
        return new ResponseEntity<>(postResponseDTO, HttpStatus.CREATED);
    }

    @Operation(summary = "Get post by id", description = "Get post by id with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get post"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/{id}/comments")
    public ResponseEntity<PostCommentResponseDTO> findById(@PathVariable UUID id) {
        return new ResponseEntity<>(postService.findById(id), HttpStatus.OK);
    }

    @Operation(summary = "Get all posts", description = "Get all post with data", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully get posts"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/{status}")
    public ResponseEntity<List<PostResponseDTO>> findAll(@PathVariable PostStatus status,
                                                         @RequestParam(required = true) boolean recent,
                                                         @RequestParam(required = false) SpeciesType speciesType,
                                                         @RequestParam(required = false) Gender gender,
                                                         @RequestParam(required = false) String province,
                                                         @RequestParam(required = false) String city,
                                                         @RequestParam(required = false) String locality,
                                                         @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date date,
                                                         @RequestParam(required = false) List<UUID> colorIds,
                                                         @RequestParam(required = false) List<UUID> tagIds) {
        return new ResponseEntity<>(postService.findAll(
                status,
                recent,
                Optional.ofNullable(speciesType),
                Optional.ofNullable(gender),
                Optional.ofNullable(province),
                Optional.ofNullable(city),
                Optional.ofNullable(locality),
                Optional.ofNullable(date),
                Optional.ofNullable(colorIds),
                Optional.ofNullable(tagIds)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete post by id", description = "Delete post by id", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully delete post"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        postService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
