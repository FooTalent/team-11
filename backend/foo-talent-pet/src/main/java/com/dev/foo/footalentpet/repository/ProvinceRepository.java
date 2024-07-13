package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProvinceRepository extends JpaRepository<Province, UUID> {
}
