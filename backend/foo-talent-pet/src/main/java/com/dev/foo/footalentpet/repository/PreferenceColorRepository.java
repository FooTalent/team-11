package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.PreferenceColor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PreferenceColorRepository extends JpaRepository<PreferenceColor, UUID> {
}
