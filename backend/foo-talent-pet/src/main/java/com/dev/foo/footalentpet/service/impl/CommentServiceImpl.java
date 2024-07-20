package com.dev.foo.footalentpet.service.impl;


import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.exception.UnauthorizedException;
import com.dev.foo.footalentpet.mapper.CommentDTOMapper;
import com.dev.foo.footalentpet.model.entity.Comment;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.enums.Role;
import com.dev.foo.footalentpet.model.request.CommentRequestDTO;
import com.dev.foo.footalentpet.model.response.CommentResponseDTO;
import com.dev.foo.footalentpet.repository.CommentRepository;
import com.dev.foo.footalentpet.service.CommentService;
import com.dev.foo.footalentpet.service.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private static final Logger logger = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentDTOMapper commentDTOMapper;
    @Autowired
    private EmailService emailService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public CommentResponseDTO createComment(CommentRequestDTO commentDTO) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Comment comment = commentDTOMapper.toEntity(commentDTO);
        if (Objects.isNull(comment.getPost())) {
            throw new NotFoundException("Post not found");
        }
        comment.setUser(currentUser);
        Comment savedComment = commentRepository.save(comment);
        savedComment.setCreatedAt(LocalDateTime.now());

        ClassPathResource classPathResource = new ClassPathResource("templates/comment.html");
        Path path = Paths.get(classPathResource.getURI());
        String message = new String(Files.readAllBytes(path));
        message = message.replace("{frontendUrl}", frontendUrl);
        message = message.replace("{postId}", savedComment.getPost().getId().toString());

        emailService.sendHtmlMessage(savedComment.getPost().getUser().getEmail(), "Nuevo comentario", message);
        return commentDTOMapper.toDTO(savedComment);
    }

    @Override
    public CommentResponseDTO getCommentById(UUID id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NotFoundException("Comment not found"));
        return commentDTOMapper.toDTO(comment);
    }

    @Override
    public void delete(UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NotFoundException("Comment not found"));

        if (!comment.getUser().getId().equals(currentUser.getId()) && !currentUser.getRole().equals(Role.ADMIN)) {
            throw new UnauthorizedException("You are not allowed to delete this comment");
        }
        commentRepository.deleteById(id);
    }
}
