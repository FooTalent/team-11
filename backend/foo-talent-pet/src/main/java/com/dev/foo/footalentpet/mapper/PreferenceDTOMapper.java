package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.*;
import com.dev.foo.footalentpet.model.request.PreferenceRequestDTO;
import com.dev.foo.footalentpet.model.response.PreferenceResponseDTO;
import com.dev.foo.footalentpet.repository.ColorRepository;
import com.dev.foo.footalentpet.repository.TagRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class PreferenceDTOMapper {

    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ColorRepository colorRepository;

    @Mapping(source = "preferenceTags", target = "tags", qualifiedByName = "mapPreferenceTagToTag")
    @Mapping(source = "preferenceColors", target = "colors", qualifiedByName = "mapPreferenceColorToColor")
    public abstract PreferenceResponseDTO preferenceToPreferenceResponseDto(Preference preference);

    @Mapping(source = "colors", target = "preferenceColors", qualifiedByName = "mapPreferenceColors")
    @Mapping(source = "tags", target = "preferenceTags", qualifiedByName = "mapPreferenceTags")
    public abstract Preference preferenceRequestDtoToPreference(PreferenceRequestDTO preferenceRequestDTO);

    @Named("mapPreferenceTagToTag")
    protected Tag mapPreferenceTagToTag(PreferenceTag preferenceTag) {
        Tag tag = preferenceTag.getTag();
        tag.setPostTags(null);
        tag.setPreferenceTags(null);
        return tag;
    }

    @Named("mapPreferenceColorToColor")
    protected Color mapPreferenceColorToColor(PreferenceColor preferenceColor) {
        Color color = preferenceColor.getColor();
        color.setPostColors(null);
        color.setPreferenceColors(null);
        return color;
    }

    @Named("mapPreferenceTags")
    protected Set<PreferenceTag> mapPreferenceTags(List<UUID> tags) {
        return tags.stream()
                .map(tagRepository::findById)
                .filter(Optional::isPresent)
                .map(tag -> new PreferenceTag(null, tag.get()))
                .collect(Collectors.toSet());
    }

    @Named("mapPreferenceColors")
    protected Set<PreferenceColor> mapPreferenceColors(List<UUID> colors) {
        return colors.stream()
                .map(colorRepository::findById)
                .filter(Optional::isPresent)
                .map(color -> new PreferenceColor(null, color.get()))
                .collect(Collectors.toSet());
    }

}
