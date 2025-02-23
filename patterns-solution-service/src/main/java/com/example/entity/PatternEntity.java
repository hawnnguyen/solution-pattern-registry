package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patterns")
public class PatternEntity {
    @Id
    private String id;
    private String title;
    private String name;
    private String url;
    private String ring;
    private String quadrant;
    private String status;
    private String isNew;
    private String description;
    private String phase;
    
    @ElementCollection
    @CollectionTable(name = "pattern_patterns", joinColumns = @JoinColumn(name = "pattern_id"))
    @Column(name = "pattern")
    private List<String> pattern;
    
    @ElementCollection
    @CollectionTable(name = "pattern_use_cases", joinColumns = @JoinColumn(name = "pattern_id"))
    @Column(name = "use_case")
    private List<String> useCase;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pattern_id")
    private List<TagEntity> tags;
}
