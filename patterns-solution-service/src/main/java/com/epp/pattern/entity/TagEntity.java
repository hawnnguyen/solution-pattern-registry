package com.epp.pattern.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tags")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "pattern")
public class TagEntity {
    @Id
    private String tagId;

    @Column(nullable = false)
    private String tagName;

    @Column
    private String tagValue;

    @Column
    private String className;

    @Column(name = "pattern_id", nullable = false, insertable = true, updatable = true)
    private String patternId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pattern_id", insertable = false, updatable = false)
    private PatternEntity pattern;
}
