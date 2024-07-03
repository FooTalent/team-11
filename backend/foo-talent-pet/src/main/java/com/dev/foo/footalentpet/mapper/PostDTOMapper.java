package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.entity.PostTag;
import com.dev.foo.footalentpet.model.entity.Tag;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.repository.UserRepository;
import com.dev.foo.footalentpet.repository.TagRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class PostDTOMapper {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TagRepository tagRepository;

    @Mapping(source = "user", target = "user")
    @Mapping(source = "postTags", target = "tags", qualifiedByName = "mapPostTagToTag")
    public abstract PostResponseDTO postToPostResponseDto(Post post);

    @Mapping(qualifiedByName = "mapPostTags", source = "tags", target = "postTags")
    public abstract Post postResponseDtoToPost(PostRequestDTO postRequestDTO);


    @Named("mapPostTags")
    protected Set<PostTag> mapPostTagsByIds(List<UUID> tags) {
        return tags.stream()
                .map(tagRepository::findById)
                .filter(Optional::isPresent)
                .map(tag -> new PostTag(null, tag.get()))
                .collect(Collectors.toSet());
    }

    @Named("mapPostTagToTag")
    protected Tag mapPostTagToTag(PostTag postTag) {
        Tag tag = postTag.getTag();
        tag.setPostTags(null);
        return tag;
    }
}
