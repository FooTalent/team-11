package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.Tag;
import com.dev.foo.footalentpet.model.request.TagRequestDTO;
import com.dev.foo.footalentpet.model.response.TagResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagDTOMapper {

    TagResponseDTO tagToTagResponseDto(Tag tag);

    Tag tagRequestDtoToTag(TagRequestDTO tagRequestDTO);

    Tag tagResponseDtoToTag(TagResponseDTO tagResponseDTO);
}
