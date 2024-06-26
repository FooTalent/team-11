package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequest;
import com.dev.foo.footalentpet.repository.PostRepository;
import com.dev.foo.footalentpet.service.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostImplementation implements PostService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post create(PostRequest postDTO) {
        Post post = modelMapper.map(postDTO, Post.class);
        return postRepository.save(post);
    }
}
