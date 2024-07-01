package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostTagRepository extends JpaRepository<PostTag, UUID> {
}
