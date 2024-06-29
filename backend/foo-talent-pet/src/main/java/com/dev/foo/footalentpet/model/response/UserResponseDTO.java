package com.dev.foo.footalentpet.model.response;


import com.dev.foo.footalentpet.model.entity.User;


public record UserResponseDTO(
        String id,
        String email,
        String name,
        String country,
        String province,
        String city,
        String phone,
        String profilePicture
) {
}