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
@Table(name = "post_colors")
@Entity
public class PostColor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference
    private Post post;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    public PostColor(Post savedPost, Color color) {
        this.post = savedPost;
        this.color = color;
    }
}
