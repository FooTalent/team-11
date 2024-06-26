package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.helper.GenericMapperUtil;
import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.repository.PostRepository;
import com.dev.foo.footalentpet.service.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final GenericMapperUtil mapperUtil;

    @Autowired
    private PostRepository postRepository;

    @Override
    public PostResponseDTO create(PostRequestDTO postDTO) {
        Post post = mapperUtil.mapToEntity(postDTO, Post.class);
        Post savedPost = postRepository.save(post);
        return mapperUtil.mapToDto(savedPost, PostResponseDTO.class);
    }
}
