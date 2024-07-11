package com.dev.foo.footalentpet.model.request;

import java.util.UUID;

public record CommentRequestDTO(
        String content,
        UUID post) {
}
