package com.dev.foo.footalentpet.model.request;

public record UserRequestDTO(
        String name,
        String email,
        String password,
        String phone,
        String profilePicture,
        String locality,
        String province,
        String city
) {
}
