package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.City;
import com.dev.foo.footalentpet.model.entity.Locality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LocalityRepository extends JpaRepository<Locality, UUID> {
    List<Locality> findByCity(City city);
}
