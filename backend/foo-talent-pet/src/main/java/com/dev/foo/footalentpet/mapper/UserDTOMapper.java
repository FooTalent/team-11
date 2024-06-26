package com.dev.foo.footalentpet.mapper;


import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface UserDTOMapper
{

    //SI NO RECONCE LOS CAMPOS, ES EL LOMBOK
    UserResponseDTO userToUserResponseDto(User user);
}