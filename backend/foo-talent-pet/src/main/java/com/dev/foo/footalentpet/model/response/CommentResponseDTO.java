package com.dev.foo.footalentpet.model.response;

import com.dev.foo.footalentpet.model.entity.User;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public record CommentResponseDTO(
        UUID id,
        String content,
        UserResponseDTO user,
        LocalDateTime createdAt
) {
}
