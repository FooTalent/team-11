package com.dev.foo.footalentpet.model.response;

public record LoginResponseDTO(
        UserResponseDTO user,
        String token
) {
}
