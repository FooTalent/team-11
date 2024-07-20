package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.response.CityResponseDTO;
import com.dev.foo.footalentpet.model.response.LocalityResponseDTO;
import com.dev.foo.footalentpet.model.response.ProvinceResponseDTO;

import java.util.List;
import java.util.UUID;

public interface LocationService {
    List<ProvinceResponseDTO> findAllProvinces();

    List<CityResponseDTO> findCitiesByProvince(String provinceName);

    List<LocalityResponseDTO> findLocalitiesByCity(String cityName);
}
