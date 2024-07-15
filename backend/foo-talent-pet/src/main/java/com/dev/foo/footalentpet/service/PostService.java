package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostCommentResponseDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface PostService {
    PostResponseDTO create(PostRequestDTO postDTO);

    PostResponseDTO uploadImages(UUID id, List<MultipartFile> images);

    PostCommentResponseDTO findById(UUID id);

    List<PostResponseDTO> findAll(PostStatus status,
                                  boolean recent,
                                  Optional<SpeciesType> speciesType,
                                  Optional<Gender> gender,
                                  Optional<String> province,
                                  Optional<String> city,
                                  Optional<String> locality,
                                  Optional<Date> date,
                                  Optional<List<UUID>> colorIds,
                                  Optional<List<UUID>> tagIds);

    void delete(UUID id);

    PostResponseDTO update(UUID id, PostRequestDTO postDTO);

    List<PostResponseDTO> findByUser();
}
