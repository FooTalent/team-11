package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.mapper.ColorDTOMapper;
import com.dev.foo.footalentpet.model.entity.Color;
import com.dev.foo.footalentpet.model.request.ColorRequestDTO;
import com.dev.foo.footalentpet.model.response.ColorResponseDTO;
import com.dev.foo.footalentpet.repository.ColorRepository;
import com.dev.foo.footalentpet.service.ColorService;
import com.dev.foo.footalentpet.utils.ColorConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ColorDTOMapper colorDTOMapper;

    @Override
    public List<ColorResponseDTO> findAll() {
        return colorRepository.findAll().stream()
                .map(colorDTOMapper::toDTO)
                .toList();
    }

    @Override
    public void createColors() {
        Set<String> currentColors = findAll().stream()
                .map(ColorResponseDTO::name)
                .collect(Collectors.toSet());

        List<ColorRequestDTO> colors = ColorConstants.PREDEFINED_COLORS.stream()
                .map(ColorRequestDTO::new)
                .toList();

        List<ColorRequestDTO> toSave = colors.stream()
                .filter(colorRequestDTO -> !currentColors.contains(colorRequestDTO.name()))
                .toList();

        colorRepository.saveAll(toSave.stream()
                .map(colorDTOMapper::toEntity)
                .toList());
    }
}
