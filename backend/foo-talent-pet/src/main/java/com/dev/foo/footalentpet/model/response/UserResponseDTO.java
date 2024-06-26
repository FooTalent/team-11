package com.dev.foo.footalentpet.model.response;


import com.dev.foo.footalentpet.model.entity.User;


public record UserResponseDTO(
        String name,
        String country,
        String province,
        String city,
        String phone,
        String profilePicture
)
{
    public UserResponseDTO(User user) {
        this(user.getName(), user.getCountry(), user.getProvince(), user.getCity(), user.getPhone(), user.getProfilePicture());
    }
}