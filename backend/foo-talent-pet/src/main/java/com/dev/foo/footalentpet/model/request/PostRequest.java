package com.dev.foo.footalentpet.model.request;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public record PostRequest(
        UUID id,
        String name,
        String description,
        Date date,
        String status,
        UUID userId,
        Set<UUID> tagIds
) {

}
