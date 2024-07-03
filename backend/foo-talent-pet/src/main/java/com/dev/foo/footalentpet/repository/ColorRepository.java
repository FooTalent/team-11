package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ColorRepository extends JpaRepository<Color, UUID> {
}
