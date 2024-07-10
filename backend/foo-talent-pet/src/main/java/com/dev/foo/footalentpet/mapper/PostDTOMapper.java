package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.*;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.repository.ColorRepository;
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
    @Autowired
    private ColorRepository colorRepository;

    @Mapping(source = "user", target = "user")
    @Mapping(source = "images", target = "images", qualifiedByName = "mapImage")
    @Mapping(source = "postTags", target = "tags", qualifiedByName = "mapPostTagToTag")
    @Mapping(source = "postColors", target = "colors", qualifiedByName = "mapPostColorToColor")
    public abstract PostResponseDTO postToPostResponseDto(Post post);

    @Mapping(qualifiedByName = "mapPostColors", source = "colors", target = "postColors")
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

    @Named("mapPostColors")
    protected Set<PostColor> mapPostColorsByIds(List<UUID> colors) {
        return colors.stream()
                .map(colorRepository::findById)
                .filter(Optional::isPresent)
                .map(color -> new PostColor(null, color.get()))
                .collect(Collectors.toSet());
    }

    @Named("mapPostTagToTag")
    protected Tag mapPostTagToTag(PostTag postTag) {
        Tag tag = postTag.getTag();
        tag.setPostTags(null);
        return tag;
    }

    @Named("mapPostColorToColor")
    protected Color mapPostColorToColor(PostColor postColor) {
        Color color = postColor.getColor();
        color.setPostColors(null);
        return color;
    }

    @Named("mapImage")
    protected Image mapImage(Image image) {
        Image image1 = new Image();
        image1.setId(image.getId());
        image1.setUrl(image.getUrl());
        image1.setPost(null);
        return image1;
    }
}
