package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.Color;
import com.dev.foo.footalentpet.model.request.ColorRequestDTO;
import com.dev.foo.footalentpet.model.response.ColorResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ColorDTOMapper {
    ColorResponseDTO toDTO(Color color);

    Color toEntity(ColorRequestDTO colorRequestDTO);
}
