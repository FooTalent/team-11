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
import com.dev.foo.footalentpet.model.request.PreferenceRequestDTO;
import com.dev.foo.footalentpet.model.response.CommentResponseDTO;
import com.dev.foo.footalentpet.model.response.PostCommentResponseDTO;
import com.dev.foo.footalentpet.model.response.PostResponseDTO;
import com.dev.foo.footalentpet.repository.*;
import com.dev.foo.footalentpet.service.PostService;
import com.dev.foo.footalentpet.service.PreferenceService;
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
    private ColorRepository colorRepository;
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
    @Autowired
    private PreferenceService preferenceService;

    @Override
    public PostResponseDTO create(PostRequestDTO postDTO) throws IOException {
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
        preferenceService.sendEmailToUsers(new PreferenceRequestDTO(savedPost.getStatus(), savedPost.getSpeciesType(), savedPost.getGender(), savedPost.getProvince(), savedPost.getCity(), savedPost.getLocality(),
                savedPost.getPostColors().stream()
                        .map(PostColor::getColor)
                        .map(Color::getId)
                        .toList()
                , savedPost.getPostTags().stream()
                .map(PostTag::getTag)
                .map(Tag::getId)
                .toList()
        ), savedPost.getId());
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

    @Override
    public PostResponseDTO update(UUID id, PostRequestDTO postDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post not found"));

        if (!post.getUser().getId().equals(currentUser.getId()) && !currentUser.getRole().equals(Role.ADMIN)) {
            throw new UnauthorizedException("You are not allowed to update this post");
        }

        post.setName(postDTO.name());
        post.setDescription(postDTO.description());
        post.setDate(postDTO.date());
        post.setStatus(postDTO.status());
        post.setSpeciesType(postDTO.speciesType());
        post.setGender(postDTO.gender());
        post.setProvince(postDTO.province());
        post.setCity(postDTO.city());
        post.setLocality(postDTO.locality());
        post.setContact(postDTO.contact());

        if (postDTO.tags() != null) {
            post.getPostTags().clear();
            List<PostTag> postTags = postDTO.tags().stream()
                    .map(tagId -> new PostTag(post, tagRepository.findById(tagId)
                            .orElseThrow(() -> new NotFoundException("Tag not found"))))
                    .toList();
            postTagRepository.saveAll(postTags);
            post.setPostTags(new HashSet<>(postTags));
        }
        if (postDTO.colors() != null) {
            post.getPostColors().clear();
            List<PostColor> postColors = postDTO.colors().stream()
                    .map(color -> new PostColor(post, colorRepository.findById(color)
                            .orElseThrow(() -> new NotFoundException("Tag not found"))))
                    .toList();
            postColorRepository.saveAll(postColors);
            post.setPostColors(new HashSet<>(postColors));
        }

        postRepository.save(post);
        return postDTOMapper.postToPostResponseDto(post);
    }

    @Override
    public List<PostResponseDTO> findByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return postRepository.findByUser(currentUser).stream()
                .map(postDTOMapper::postToPostResponseDto)
                .toList();
    }
}
