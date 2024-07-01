package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.request.TagRequestDTO;
import com.dev.foo.footalentpet.model.response.TagResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TagService {

    List<TagResponseDTO> findAll();

    void createTags();
}
