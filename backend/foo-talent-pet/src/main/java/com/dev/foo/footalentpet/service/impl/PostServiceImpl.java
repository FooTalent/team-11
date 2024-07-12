package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.exception.UnauthorizedException;
import com.dev.foo.footalentpet.mapper.CommentDTOMapper;
import com.dev.foo.footalentpet.mapper.PostDTOMapper;
import com.dev.foo.footalentpet.model.entity.*;
import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.Role;
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
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.dev.foo.footalentpet.repository.specification.PostSpecifications;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

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
    private PostColorRepository postColorRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentDTOMapper commentDTOMapper;
    @Autowired
    private CloudinaryServiceImpl cloudinaryService;
    @Autowired
    private ImageRepository imageRepository;

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
        postColorRepository.saveAll(postColors);

        savedPost.setPostTags(new HashSet<>(postTags));
        savedPost.setPostColors(new HashSet<>(postColors));

        savedPost.setCreatedAt(LocalDateTime.now());
        return postDTOMapper.postToPostResponseDto(savedPost);
    }

    @Override
    public PostResponseDTO uploadImages(UUID id, List<MultipartFile> images) {
        try {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Post not found"));
            List<String> imageUrls = cloudinaryService.uploadFiles(images);
            List<Image> imagesSaved = imageRepository.saveAll(imageUrls.stream()
                    .map(url -> new Image(post, url))
                    .toList());
            post.setImages(new HashSet<>(imagesSaved));
            return postDTOMapper.postToPostResponseDto(post);
        } catch (IOException e) {
            logger.error("Failed to upload image", e);
            throw new NotFoundException("Failed to upload image");
        }
    }

    @Override
    public PostCommentResponseDTO findById(UUID id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        PostResponseDTO postResponseDTO = postDTOMapper.postToPostResponseDto(post);

        List<CommentResponseDTO> comments = commentRepository.findByPostIdOrderByCreatedAtDesc(id).stream()
                .map(commentDTOMapper::toDTO)
                .toList();
        return new PostCommentResponseDTO(postResponseDTO, comments);
    }

    @Override
    public List<PostResponseDTO> findAll(PostStatus status,
                                         boolean recent,
                                         Optional<SpeciesType> speciesType,
                                         Optional<Gender> gender,
                                         Optional<String> province,
                                         Optional<String> city,
                                         Optional<String> locality,
                                         Optional<Date> date,
                                         Optional<List<UUID>> colorIds,
                                         Optional<List<UUID>> tagIds) {
        Specification<Post> spec = Specification.where(null);

        spec = spec.and(PostSpecifications.hasStatus(status));

        if (speciesType.isPresent()) {
            spec = spec.and(PostSpecifications.hasSpeciesType(speciesType.get()));
        }

        if (gender.isPresent()) {
            spec = spec.and(PostSpecifications.hasGender(gender.get()));
        }

        if (province.isPresent()) {
            spec = spec.and(PostSpecifications.hasProvince(province.get()));
        }

        if (city.isPresent()) {
            spec = spec.and(PostSpecifications.hasCity(city.get()));
        }

        if (locality.isPresent()) {
            spec = spec.and(PostSpecifications.hasLocality(locality.get()));
        }

        if (date.isPresent()) {
            spec = spec.and(PostSpecifications.hasDateAfter(date.get()));
        }

        if (colorIds.isPresent() && !colorIds.get().isEmpty()) {
            spec = spec.and(PostSpecifications.hasAllColorIds(colorIds.get()));
        }

        if (tagIds.isPresent() && !tagIds.get().isEmpty()) {
            spec = spec.and(PostSpecifications.hasAllTagsIds(tagIds.get()));
        }

        Sort sort = recent ? Sort.by("date").descending() : Sort.by("date").ascending();

        return postRepository.findAll(spec, sort).stream()
                .map(postDTOMapper::postToPostResponseDto)
                .toList();
    }

    @Override
    public void delete(UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post not found"));

        if (!post.getUser().getId().equals(currentUser.getId()) && !currentUser.getRole().equals(Role.ADMIN)) {
            throw new UnauthorizedException("You are not allowed to delete this post");
        }
        postRepository.deleteById(id);
    }
}
