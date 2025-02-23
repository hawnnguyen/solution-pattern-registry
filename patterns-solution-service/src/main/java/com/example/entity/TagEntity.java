package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tags")
public class TagEntity {
    @Id
    private String tagId;
    private String tagName;
    private String tagValue;
    private String className;
    
    @Column(name = "pattern_id")
    private String patternId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pattern_id", insertable = false, updatable = false)
    private PatternEntity pattern;
}
