package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.Comment;
import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.CommentRequestDTO;
import com.dev.foo.footalentpet.model.response.CommentResponseDTO;
import com.dev.foo.footalentpet.repository.PostRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class CommentDTOMapper {

    @Autowired
    private PostRepository postRepository;

    public abstract CommentResponseDTO toDTO(Comment comment);

    @Mapping(qualifiedByName = "mapPost", source = "post", target = "post")
    public abstract Comment toEntity(CommentRequestDTO commentDTO);

    @Named("mapPost")
    protected Post mapPost(UUID id) {
        return postRepository.findById(id).orElse(null);
    }
}
