package com.dev.foo.footalentpet.repository.specification;

import com.dev.foo.footalentpet.model.entity.*;
import com.dev.foo.footalentpet.model.request.PreferenceRequestDTO;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PreferenceSpecifications {
    public static Specification<Preference> matchByRequestDTO(PreferenceRequestDTO dto) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (dto.status() != null) {
                predicates.add(cb.or(cb.equal(root.get("status"), dto.status()), cb.isNull(root.get("status"))));
            }
            if (dto.speciesType() != null) {
                predicates.add(cb.or(cb.equal(root.get("speciesType"), dto.speciesType()), cb.isNull(root.get("speciesType"))));
            }
            if (dto.gender() != null) {
                predicates.add(cb.or(cb.equal(root.get("gender"), dto.gender()), cb.isNull(root.get("gender"))));
            }
            if (dto.province() != null) {
                predicates.add(cb.or(cb.equal(root.get("province"), dto.province()), cb.isNull(root.get("province"))));
            }
            if (dto.city() != null) {
                predicates.add(cb.or(cb.equal(root.get("city"), dto.city()), cb.isNull(root.get("city"))));
            }
            if (dto.locality() != null) {
                predicates.add(cb.or(cb.equal(root.get("locality"), dto.locality()), cb.isNull(root.get("locality"))));
            }
            if (dto.colors() != null && !dto.colors().isEmpty()) {
                predicates.add(hasColorIds(dto.colors()).toPredicate(root, query, cb));
            }
            if (dto.tags() != null && !dto.tags().isEmpty()) {
                predicates.add(hasTagIds(dto.tags()).toPredicate(root, query, cb));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Preference> hasColorIds(List<UUID> colorIds) {
        return (Root<Preference> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Subquery<Preference> subquery = query.subquery(Preference.class);
            Root<Preference> subqueryRoot = subquery.from(Preference.class);
            Join<Preference, PreferenceColor> colorJoin = subqueryRoot.join("preferenceColors");

            List<Predicate> predicates = new ArrayList<>();
            for (UUID colorId : colorIds) {
                predicates.add(criteriaBuilder.equal(colorJoin.get("color").get("id"), colorId));
            }
            subquery.select(subqueryRoot).where(criteriaBuilder.or(predicates.toArray(new Predicate[0])));

            return criteriaBuilder.and(criteriaBuilder.exists(subquery));
        };
    }


    public static Specification<Preference> hasTagIds(List<UUID> tagIds) {
        return (Root<Preference> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Subquery<Preference> subquery = query.subquery(Preference.class);
            Root<Preference> subqueryRoot = subquery.from(Preference.class);
            Join<Preference, PreferenceColor> tagJoin = subqueryRoot.join("preferenceTags");

            List<Predicate> predicates = new ArrayList<>();
            for (UUID tagId : tagIds) {
                predicates.add(criteriaBuilder.equal(tagJoin.get("tag").get("id"), tagId));
            }
            subquery.select(subqueryRoot).where(criteriaBuilder.or(predicates.toArray(new Predicate[0])));

            return criteriaBuilder.and(criteriaBuilder.exists(subquery));
        };
    }
}
