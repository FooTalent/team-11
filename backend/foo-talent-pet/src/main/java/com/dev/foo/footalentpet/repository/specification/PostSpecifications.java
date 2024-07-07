package com.dev.foo.footalentpet.repository.specification;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import org.springframework.data.jpa.domain.Specification;

public class PostSpecifications {

    public static Specification<Post> hasStatus(PostStatus status) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Post> hasSpeciesType(SpeciesType speciesType) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("speciesType"), speciesType);
    }
}
