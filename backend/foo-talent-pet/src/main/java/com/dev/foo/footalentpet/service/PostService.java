package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;

import java.util.List;
import java.util.UUID;

public interface PostService {
    PostResponseDTO create(PostRequestDTO postDTO);

    PostResponseDTO findById(UUID id);

    List<PostResponseDTO> findAll();
}
