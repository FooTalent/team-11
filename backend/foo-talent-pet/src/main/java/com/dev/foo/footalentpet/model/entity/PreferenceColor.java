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
@Table(name = "preference_colors")
@Entity
public class PreferenceColor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "preference_id")
    @JsonBackReference
    private Preference preference;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    public PreferenceColor(Preference preference, Color color) {
        this.preference = preference;
        this.color = color;
    }
}
