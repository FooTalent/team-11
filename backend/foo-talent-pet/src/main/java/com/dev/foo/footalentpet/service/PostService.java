package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;

public interface PostService {
    PostResponseDTO create(PostRequestDTO postDTO);
}
