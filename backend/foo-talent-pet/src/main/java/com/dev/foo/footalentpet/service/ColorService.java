package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.response.ColorResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ColorService {

    List<ColorResponseDTO> findAll();

    void createColors();
}
