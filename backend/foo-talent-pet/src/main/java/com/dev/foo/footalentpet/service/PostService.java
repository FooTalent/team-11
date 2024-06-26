package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequest;

public interface PostService {
    Post create(PostRequest postDTO);
}
