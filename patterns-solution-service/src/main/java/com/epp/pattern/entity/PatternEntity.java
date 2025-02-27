package com.epp.pattern.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patterns")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "tags")
public class PatternEntity {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String title;

    @Column
    private String url;

    @Column(nullable = false)
    private String quadrant;

    @Column(nullable = false)
    private String ring;

    @Column(nullable = false)
    private String phase;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "pattern", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TagEntity> tags = new ArrayList<>();
}
