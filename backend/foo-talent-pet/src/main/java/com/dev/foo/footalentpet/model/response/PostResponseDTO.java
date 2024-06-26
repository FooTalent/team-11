package com.dev.foo.footalentpet.model.response;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public record PostResponseDTO(
        UUID id,
        String name,
        String description,
        Date date,
        String status,
        UUID userId,
        Set<UUID> tagIds
) {
}
