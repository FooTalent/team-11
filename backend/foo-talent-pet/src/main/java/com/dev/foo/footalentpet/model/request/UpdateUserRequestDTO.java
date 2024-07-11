package com.dev.foo.footalentpet.model.request;

import org.springframework.web.multipart.MultipartFile;

public record UpdateUserRequestDTO(
        String name,
        String phone,
        String country,
        String province,
        String city,
        MultipartFile profilePicture
) {
}
