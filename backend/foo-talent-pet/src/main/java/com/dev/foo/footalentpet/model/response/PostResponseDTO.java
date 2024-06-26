package com.dev.foo.footalentpet.model.response;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.enums.PostStatus;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public record PostResponseDTO(
        UUID id,
        String name,
        String description,
        Date date,
        PostStatus status,
        UUID userId/*,
       Set<UUID> tagIds */
) {
    /*public PostResponseDTO(Post post) {
        this(post.getId(), post.getName(), post.getDescription(), post.getDate(), post.getStatus(), post.getUser().getId());
    }*/
}
