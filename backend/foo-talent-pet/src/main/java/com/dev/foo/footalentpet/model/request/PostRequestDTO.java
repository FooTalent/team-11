package com.dev.foo.footalentpet.model.request;

import com.dev.foo.footalentpet.model.enums.PostStatus;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record PostRequestDTO(
        String name,
        String description,
        Date date,
        PostStatus status,
        List<UUID> tags
) {

}
