package com.dev.foo.footalentpet.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tags")
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @OneToMany(mappedBy = "tag")
    private Set<PostTag> postTags = new HashSet<>();

    @OneToMany(mappedBy = "tag")
    private Set<PreferenceTag> preferenceTags = new HashSet<>();
}
