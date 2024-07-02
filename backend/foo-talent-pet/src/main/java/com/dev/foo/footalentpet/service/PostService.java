package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostCommentResponseDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface PostService {
    PostResponseDTO create(PostRequestDTO postDTO);

    PostCommentResponseDTO findById(UUID id);

    List<PostResponseDTO> findAll();

    void delete(UUID id);

}
