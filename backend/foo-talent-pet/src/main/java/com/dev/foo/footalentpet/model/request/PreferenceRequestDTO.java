package com.dev.foo.footalentpet.model.request;

import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record PreferenceRequestDTO(
        PostStatus status,
        SpeciesType speciesType,
        Gender gender,
        String province,
        String city,
        String locality,
        List<UUID> colors,
        List<UUID> tags
) {
}
