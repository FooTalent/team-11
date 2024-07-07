package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.mapper.CommentDTOMapper;
import com.dev.foo.footalentpet.mapper.PostDTOMapper;
import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.entity.PostColor;
import com.dev.foo.footalentpet.model.entity.PostTag;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import com.dev.foo.footalentpet.model.response.CommentResponseDTO;
import com.dev.foo.footalentpet.model.response.PostCommentResponseDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.repository.*;
import com.dev.foo.footalentpet.service.PostService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.dev.foo.footalentpet.repository.specification.PostSpecifications;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostServiceImpl.class);

    @Autowired
    private PostDTOMapper postDTOMapper;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private PostTagRepository postTagRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentDTOMapper commentDTOMapper;

    @Override
    public PostResponseDTO create(PostRequestDTO postDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Post post = postDTOMapper.postResponseDtoToPost(postDTO);

        post.setUser(currentUser);
        Post savedPost = postRepository.save(post);

        List<PostTag> postTags = post.getPostTags().stream()
                .map(tagId -> new PostTag(savedPost, tagId.getTag()))
                .toList();

        List<PostColor> postColors = post.getPostColors().stream()
                .map(color -> new PostColor(savedPost, color.getColor()))
                .toList();

        postTagRepository.saveAll(postTags);

        savedPost.setPostTags(new HashSet<>(postTags));
        savedPost.setPostColors(new HashSet<>(postColors));

        savedPost.setCreatedAt(LocalDateTime.now());
        return postDTOMapper.postToPostResponseDto(savedPost);
    }

    @Override
    public PostCommentResponseDTO findById(UUID id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        PostResponseDTO postResponseDTO = postDTOMapper.postToPostResponseDto(post);

        List<CommentResponseDTO> comments = commentRepository.findByPostId(id).stream()
                .map(commentDTOMapper::toDTO)
                .toList();
        return new PostCommentResponseDTO(postResponseDTO, comments);
    }

    @Override
    public List<PostResponseDTO> findAll(PostStatus status, Optional<SpeciesType> speciesType) {
        Specification<Post> spec = Specification.where(null);

        spec = spec.and(PostSpecifications.hasStatus(status));

        if (speciesType.isPresent()) {
            spec = spec.and(PostSpecifications.hasSpeciesType(speciesType.get()));
        }

        return postRepository.findAll(spec).stream()
                .map(postDTOMapper::postToPostResponseDto)
                .toList();
    }

    @Override
    public void delete(UUID id) {
        postRepository.deleteById(id);
    }
}
