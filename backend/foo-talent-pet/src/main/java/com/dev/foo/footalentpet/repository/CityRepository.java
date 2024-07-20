package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.City;
import com.dev.foo.footalentpet.model.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CityRepository extends JpaRepository<City, UUID> {
    List<City> findByProvince(Province province);

    City findByName(String name);
}
