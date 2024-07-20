package com.dev.foo.footalentpet.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "preference_tags")
@Entity
public class PreferenceTag {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "preference_id")
    @JsonBackReference
    private Preference preference;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public PreferenceTag(Preference preference, Tag tag) {
        this.preference = preference;
        this.tag = tag;
    }
}
