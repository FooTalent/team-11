package com.dev.foo.footalentpet.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@Table(name = "images")
@Entity
public class Image implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String url;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public Image(Post post, String url) {
        this.post = post;
        this.url = url;
    }
}
