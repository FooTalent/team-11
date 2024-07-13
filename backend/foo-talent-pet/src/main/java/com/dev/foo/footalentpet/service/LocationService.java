package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.entity.Province;
import com.dev.foo.footalentpet.model.response.ProvinceResponseDTO;

import java.util.List;

public interface LocationService {
    List<ProvinceResponseDTO> findAllProvinces();

    void uploadProvinces();
}
