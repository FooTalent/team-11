package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.Province;
import com.dev.foo.footalentpet.model.request.ProvinceRequestDTO;
import com.dev.foo.footalentpet.model.response.ProvinceResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProvinceDTOMapper {

    ProvinceResponseDTO provinceToProvinceResponseDto(Province province);

    Province provinceRequestDtoToProvince(ProvinceRequestDTO provinceRequestDTO);
}
