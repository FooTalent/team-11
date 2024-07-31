package com.dev.foo.footalentpet.service;


import com.dev.foo.footalentpet.model.request.CommentRequestDTO;
import com.dev.foo.footalentpet.model.response.CommentResponseDTO;

import java.io.IOException;
import java.util.UUID;

public interface CommentService {
    CommentResponseDTO createComment(CommentRequestDTO comment) throws IOException;

    CommentResponseDTO getCommentById(UUID id);

    void delete(UUID id);
}
