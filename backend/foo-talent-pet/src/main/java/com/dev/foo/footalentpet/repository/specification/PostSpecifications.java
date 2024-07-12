package com.dev.foo.footalentpet.repository.specification;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.entity.PostColor;
import com.dev.foo.footalentpet.model.entity.PostTag;
import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;
import java.util.List;
import java.util.UUID;

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

    public static Specification<Post> hasAllColorIds(List<UUID> colorIds) {
        return (Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate[] predicates = new Predicate[colorIds.size()];
            int index = 0;
            for (UUID colorId : colorIds) {
                Subquery<PostColor> colorSubquery = query.subquery(PostColor.class);
                Root<PostColor> colorSubqueryRoot = colorSubquery.from(PostColor.class);
                colorSubquery.select(colorSubqueryRoot);
                Predicate colorPredicate = criteriaBuilder.equal(colorSubqueryRoot.get("color").get("id"), colorId);
                colorSubquery.where(criteriaBuilder.and(colorPredicate, criteriaBuilder.equal(colorSubqueryRoot.get("post"), root)));
                predicates[index++] = criteriaBuilder.exists(colorSubquery);
            }
            return criteriaBuilder.and(predicates);
        };
    }

    public static Specification<Post> hasAllTagsIds(List<UUID> tagsIds) {
        return (Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate[] predicates = new Predicate[tagsIds.size()];
            int index = 0;
            for (UUID tagId : tagsIds) {
                Subquery<PostTag> tagSubquery = query.subquery(PostTag.class);
                Root<PostTag> tagSubqueryRoot = tagSubquery.from(PostTag.class);
                tagSubquery.select(tagSubqueryRoot);
                Predicate tagPredicate = criteriaBuilder.equal(tagSubqueryRoot.get("tag").get("id"), tagId);
                tagSubquery.where(criteriaBuilder.and(tagPredicate, criteriaBuilder.equal(tagSubqueryRoot.get("post"), root)));
                predicates[index++] = criteriaBuilder.exists(tagSubquery);
            }
            return criteriaBuilder.and(predicates);
        };
    }
}
