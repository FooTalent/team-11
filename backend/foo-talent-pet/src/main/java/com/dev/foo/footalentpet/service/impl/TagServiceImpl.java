package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.mapper.TagDTOMapper;
import com.dev.foo.footalentpet.model.request.TagRequestDTO;
import com.dev.foo.footalentpet.model.response.TagResponseDTO;
import com.dev.foo.footalentpet.repository.TagRepository;
import com.dev.foo.footalentpet.service.TagService;
import com.dev.foo.footalentpet.utils.TagConstants;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TagDTOMapper tagDTOMapper;

    @Override
    public List<TagResponseDTO> findAll() {
        return tagRepository.findAll().stream()
                .map(tagDTOMapper::tagToTagResponseDto)
                .toList();
    }

    @Override
    public void createTags() {
        Set<String> currentTags = findAll().stream()
                .map(TagResponseDTO::name)
                .collect(Collectors.toSet());

        List<TagRequestDTO> tags = TagConstants.PREDEFINED_TAGS.stream()
                .map(TagRequestDTO::new)
                .toList();
        
        List<TagRequestDTO> toSave = tags.stream()
                .filter(tagRequestDTO -> !currentTags.contains(tagRequestDTO.name()))
                .toList();

        tagRepository.saveAll(toSave.stream()
                .map(tagDTOMapper::tagRequestDtoToTag)
                .toList());
    }
}
