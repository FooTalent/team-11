package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.Preference;
import com.dev.foo.footalentpet.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;

public interface PreferenceRepository extends JpaRepository<Preference, UUID>, JpaSpecificationExecutor<Preference> {
    List<Preference> findByUser(User user);
}
