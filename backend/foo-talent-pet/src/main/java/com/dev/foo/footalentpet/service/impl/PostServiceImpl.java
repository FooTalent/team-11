package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.mapper.PostDTOMapper;
import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.repository.PostRepository;
import com.dev.foo.footalentpet.repository.UserRepository;
import com.dev.foo.footalentpet.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    @Autowired
    private PostDTOMapper postDTOMapper;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public PostResponseDTO create(PostRequestDTO postDTO) {
        Post post = postDTOMapper.postResponseDtoToPost(postDTO);
        if (Objects.isNull(post.getUser())) {
            throw new NotFoundException("User not found");
        }
        Post savedPost = postRepository.save(post);
        return postDTOMapper.postToPostResponseDto(savedPost);
    }

    @Override
    public PostResponseDTO findById(UUID id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        return postDTOMapper.postToPostResponseDto(post);
    }

    @Override
    public List<PostResponseDTO> findAll() {
        List<Post> postList = postRepository.findAll();
        return postList.stream()
                .map(postDTOMapper::postToPostResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(UUID id) {
        postRepository.deleteById(id);
    }
}
