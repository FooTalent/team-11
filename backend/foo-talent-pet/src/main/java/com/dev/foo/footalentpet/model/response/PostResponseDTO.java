package com.dev.foo.footalentpet.model.response;

import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.PostStatus;

import java.util.Date;
import java.util.UUID;

public record PostResponseDTO(
        UUID id,
        String name,
        String description,
        Date date,
        PostStatus status,
        User user/*,
       Set<UUID> tagIds */
) {
}
