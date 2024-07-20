package com.dev.foo.footalentpet.controller;

import com.dev.foo.footalentpet.model.request.CommentRequestDTO;
import com.dev.foo.footalentpet.model.response.CommentResponseDTO;
import com.dev.foo.footalentpet.service.impl.CommentServiceImpl;
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

import java.io.IOException;
import java.util.UUID;

@Tag(name = "Comment", description = "Comment operations")
@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentServiceImpl commentService;

    @Operation(summary = "Create a comment", description = "Creates a new comment and return data", responses = {
            @ApiResponse(responseCode = "201", description = "Successfully created comment"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @PostMapping
    public ResponseEntity<CommentResponseDTO> createComment(@RequestBody CommentRequestDTO commentRequestDTO) throws IOException {
        CommentResponseDTO comment = commentService.createComment(commentRequestDTO);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @Operation(summary = "Get a comment by id", description = "Get a comment by id", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved comment"),
            @ApiResponse(responseCode = "404", description = "Comment not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<CommentResponseDTO> getCommentById(@PathVariable UUID id) {
        CommentResponseDTO comment = commentService.getCommentById(id);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @Operation(summary = "Delete comment by id", description = "Delete comment by id", responses = {
            @ApiResponse(responseCode = "200", description = "Successfully delete comment"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable UUID id) {
        commentService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
