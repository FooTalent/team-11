package com.dev.foo.footalentpet.model.response;

import java.time.LocalDateTime;
import java.util.Date;

public record CommentResponseDTO(
        String content,
        LocalDateTime createdAt
) {
}
