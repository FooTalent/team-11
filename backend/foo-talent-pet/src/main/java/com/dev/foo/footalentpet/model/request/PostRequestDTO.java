package com.dev.foo.footalentpet.model.request;

import com.dev.foo.footalentpet.model.enums.PostStatus;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public record PostRequestDTO(
        String name,
        String description,
        Date date,
        PostStatus status,
        UUID user/*.
        Set<UUID> tagIds*/
) {

}
