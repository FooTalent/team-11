package com.dev.foo.footalentpet.model.entity;

import com.dev.foo.footalentpet.model.enums.Gender;
import com.dev.foo.footalentpet.model.enums.PostStatus;
import com.dev.foo.footalentpet.model.enums.SpeciesType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "preferences")
@Entity
public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @Enumerated(EnumType.STRING)
    private SpeciesType speciesType;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String province;

    private String city;

    private String locality;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "preference")
    @JsonManagedReference
    private Set<PreferenceTag> preferenceTags = new HashSet<>();

    @OneToMany(mappedBy = "preference")
    @JsonManagedReference
    private Set<PreferenceColor> preferenceColors = new HashSet<>();
}
