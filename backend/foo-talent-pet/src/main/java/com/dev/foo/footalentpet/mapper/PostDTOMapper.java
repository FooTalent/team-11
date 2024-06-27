package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.repository.UserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class PostDTOMapper {

    @Autowired
    private UserRepository userRepository;

    @Mapping(source = "user", target = "user")
    public abstract PostResponseDTO postToPostResponseDto(Post post);

    @Mapping(qualifiedByName = "map", source = "user", target = "user")
    public abstract Post postResponseDtoToPost(PostRequestDTO postRequestDTO);

    @Named("map")
    protected User map(UUID id) {
        return userRepository.findById(id).orElse(null);
    }
}
