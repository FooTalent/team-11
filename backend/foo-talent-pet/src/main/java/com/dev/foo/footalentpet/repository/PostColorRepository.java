package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.PostColor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostColorRepository extends JpaRepository<PostColor, UUID> {
}
