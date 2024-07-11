package com.dev.foo.footalentpet.model.request;

import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record PostRequestDTO(
        String name,
        String description,
        Date date,
        PostStatus status,
        SpeciesType speciesType,
        Gender gender,
        String province,
        String city,
        String locality,
        String contact,
        List<UUID> tags,
        List<UUID> colors
) {

}
