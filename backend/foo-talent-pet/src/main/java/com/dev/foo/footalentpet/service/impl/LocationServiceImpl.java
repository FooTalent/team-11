package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.mapper.LocationDTOMapper;
import com.dev.foo.footalentpet.model.entity.City;
import com.dev.foo.footalentpet.model.entity.Locality;
import com.dev.foo.footalentpet.model.entity.Province;
import com.dev.foo.footalentpet.model.response.CityResponseDTO;
import com.dev.foo.footalentpet.model.response.LocalityResponseDTO;
import com.dev.foo.footalentpet.model.response.ProvinceResponseDTO;
import com.dev.foo.footalentpet.repository.CityRepository;
import com.dev.foo.footalentpet.repository.LocalityRepository;
import com.dev.foo.footalentpet.repository.ProvinceRepository;
import com.dev.foo.footalentpet.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private ProvinceRepository provinceRepository;
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private LocalityRepository localityRepository;
    @Autowired
    private LocationDTOMapper locationDTOMapper;

    @Override
    public List<ProvinceResponseDTO> findAllProvinces() {
        return provinceRepository.findAll().stream()
                .map(locationDTOMapper::provinceToProvinceResponseDto)
                .toList();
    }

    @Override
    public List<CityResponseDTO> findCitiesByProvince(String provinceName) {
        Province province = provinceRepository.findByName(provinceName);

        if (province == null) {
            throw new NotFoundException("Province not found");
        }
        List<City> cities = cityRepository.findByProvince(province);

        return cities.stream()
                .map(locationDTOMapper::cityToCityResponseDto)
                .toList();
    }

    @Override
    public List<LocalityResponseDTO> findLocalitiesByCity(String cityName) {
        City city = cityRepository.findByName(cityName);

        if (city == null) {
            throw new NotFoundException("City not found");
        }
        List<Locality> localities = localityRepository.findByCity(city);

        return localities.stream()
                .map(locationDTOMapper::localityToLocalityResponseDto)
                .toList();
    }
}
