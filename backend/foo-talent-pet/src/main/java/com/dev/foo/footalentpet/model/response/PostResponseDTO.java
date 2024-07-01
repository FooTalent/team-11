package com.dev.foo.footalentpet.model.response;

import com.dev.foo.footalentpet.model.entity.Tag;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.PostStatus;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record PostResponseDTO(
        UUID id,
        String name,
        String description,
        Date date,
        PostStatus status,
        User user,
        List<Tag> tags
) {
}
