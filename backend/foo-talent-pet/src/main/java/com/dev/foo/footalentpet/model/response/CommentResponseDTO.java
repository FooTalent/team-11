package com.dev.foo.footalentpet.model.response;

import com.dev.foo.footalentpet.model.entity.User;

import java.time.LocalDateTime;
import java.util.Date;

public record CommentResponseDTO(
        String content,
        User user,
        LocalDateTime createdAt
) {
}
