package com.dev.foo.footalentpet.model.response;

import com.dev.foo.footalentpet.model.entity.Color;
import com.dev.foo.footalentpet.model.entity.Tag;
import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record PreferenceResponseDTO(
        UUID id,
        PostStatus status,
        SpeciesType speciesType,
        Gender gender,
        String province,
        String city,
        String locality,
        List<Tag> tags,
        List<Color> colors
) {
}
