package com.dev.foo.footalentpet.model.entity;

import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
@Entity
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String description;

    private Date date;

    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @Enumerated(EnumType.STRING)
    private SpeciesType speciesType;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String province;

    private String city;

    private String locality;

    private String contact;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private Set<PostTag> postTags = new HashSet<>();

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private Set<PostColor> postColors = new HashSet<>();
}
