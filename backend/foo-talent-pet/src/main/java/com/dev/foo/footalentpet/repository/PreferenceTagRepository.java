package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.PreferenceTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PreferenceTagRepository extends JpaRepository<PreferenceTag, UUID> {
}
