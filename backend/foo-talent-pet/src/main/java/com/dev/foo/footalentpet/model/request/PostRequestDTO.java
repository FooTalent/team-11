package com.dev.foo.footalentpet.model.request;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public record PostRequestDTO(
        String name,
        String description,
        Date date,
        String status,
        UUID userId/*.
        Set<UUID> tagIds*/
) {

}
