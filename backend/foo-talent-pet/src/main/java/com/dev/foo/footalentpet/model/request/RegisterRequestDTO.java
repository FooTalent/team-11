package com.dev.foo.footalentpet.model.request;

public record RegisterRequestDTO(
        String name,
        String email,
        String password) {
}
