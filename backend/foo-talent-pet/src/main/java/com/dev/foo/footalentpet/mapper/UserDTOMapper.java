package com.dev.foo.footalentpet.mapper;


import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.request.RegisterRequestDTO;
import com.dev.foo.footalentpet.model.request.UserRequestDTO;
import com.dev.foo.footalentpet.model.response.UserResponseDTO;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface UserDTOMapper {

    UserResponseDTO userToUserResponseDto(User user);

    User userRequestDtoToUser(UserRequestDTO userRequestDTO);

    RegisterRequestDTO userToRegisterRequestDto(User user);

    User registerRequestDtoToUser(RegisterRequestDTO registerRequestDTO);
}