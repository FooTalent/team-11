package com.dev.foo.footalentpet.repository.specification;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

public class PostSpecifications {

    public static Specification<Post> hasStatus(PostStatus status) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Post> hasSpeciesType(SpeciesType speciesType) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("speciesType"), speciesType);
    }

    public static Specification<Post> hasGender(Gender gender) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("gender"), gender);
    }

    public static Specification<Post> hasDateAfter(Date date) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("date"), date);
    }

    public static Specification<Post> hasProvince(String province) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("province"), province);
    }

    public static Specification<Post> hasCity(String city) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("city"), city);
    }

    public static Specification<Post> hasLocality(String locality) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("locality"), locality);
    }
}
