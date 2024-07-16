package com.dev.foo.footalentpet.model.response;

import java.util.List;

public record PostCommentResponseDTO(
        PostResponseDTO post,
        List<CommentResponseDTO> comments
) {
}
