package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID>{
}
