package com.dev.foo.footalentpet.service.impl;


import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.mapper.CommentDTOMapper;
import com.dev.foo.footalentpet.model.entity.Comment;
import com.dev.foo.footalentpet.model.request.CommentRequestDTO;
import com.dev.foo.footalentpet.model.response.CommentResponseDTO;
import com.dev.foo.footalentpet.repository.CommentRepository;
import com.dev.foo.footalentpet.service.CommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentDTOMapper commentDTOMapper;

    @Override
    public CommentResponseDTO createComment(CommentRequestDTO commentDTO) {
        Comment comment = commentDTOMapper.toEntity(commentDTO);
        if (Objects.isNull(comment.getPost())) {
            throw new NotFoundException("Post not found");
        }
        Comment savedComment = commentRepository.save(comment);
        return commentDTOMapper.toDTO(savedComment);
    }
    
    @Override
    public CommentResponseDTO getCommentById(UUID id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NotFoundException("Comment not found"));
        return commentDTOMapper.toDTO(comment);
    }
}
