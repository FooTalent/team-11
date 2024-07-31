package com.dev.foo.footalentpet.mapper;

import com.dev.foo.footalentpet.model.entity.City;
import com.dev.foo.footalentpet.model.entity.Locality;
import com.dev.foo.footalentpet.model.entity.Province;
import com.dev.foo.footalentpet.model.response.CityResponseDTO;
import com.dev.foo.footalentpet.model.response.LocalityResponseDTO;
import com.dev.foo.footalentpet.model.response.ProvinceResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationDTOMapper {
    ProvinceResponseDTO provinceToProvinceResponseDto(Province province);

    CityResponseDTO cityToCityResponseDto(City city);

    LocalityResponseDTO localityToLocalityResponseDto(Locality locality);
}
