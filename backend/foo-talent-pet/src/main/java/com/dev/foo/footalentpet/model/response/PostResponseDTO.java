package com.dev.foo.footalentpet.model.response;

import com.dev.foo.footalentpet.model.entity.Color;
import com.dev.foo.footalentpet.model.entity.Image;
import com.dev.foo.footalentpet.model.entity.Tag;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public record PostResponseDTO(
        UUID id,
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
        LocalDateTime createdAt,
        User user,
        List<Tag> tags,
        List<Color> colors,
        List<Image> images
) {
}
