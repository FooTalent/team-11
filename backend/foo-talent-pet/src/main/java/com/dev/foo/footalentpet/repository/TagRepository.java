package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
}
