package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.model.request.ProvinceRequestDTO;
import com.dev.foo.footalentpet.model.response.ProvinceResponseDTO;
import com.dev.foo.footalentpet.mapper.ProvinceDTOMapper;
import com.dev.foo.footalentpet.repository.ProvinceRepository;
import com.dev.foo.footalentpet.service.LocationService;
import com.dev.foo.footalentpet.utils.ProvinceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private ProvinceRepository provinceRepository;
    @Autowired
    private ProvinceDTOMapper provinceDTOMapper;

    @Override
    public List<ProvinceResponseDTO> findAllProvinces() {
        return provinceRepository.findAll().stream()
                .map(provinceDTOMapper::provinceToProvinceResponseDto)
                .toList();
    }

    @Override
    public void uploadProvinces() {
        Set<String> currentProvinces = findAllProvinces().stream()
                .map(ProvinceResponseDTO::name)
                .collect(Collectors.toSet());
        ;

        List<ProvinceRequestDTO> provinces = ProvinceConstants.PREDEFINED_PROVINCES.stream()
                .map(ProvinceRequestDTO::new)
                .toList();

        List<ProvinceRequestDTO> toSave = provinces.stream()
                .filter(tagRequestDTO -> !currentProvinces.contains(tagRequestDTO.name()))
                .toList();

        provinceRepository.saveAll(toSave.stream()
                .map(provinceDTOMapper::provinceRequestDtoToProvince)
                .toList());
    }
}
