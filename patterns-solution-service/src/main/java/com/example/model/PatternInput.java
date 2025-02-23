package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatternInput {
    private String id;
    private String title;
    private String name;
    private String url;
    private String ring;
    private String quadrant;
    private String status;
    private String isNew;
    private String description;
    private List<String> pattern;
    private List<String> useCase;
    private List<Tag> tags;
}
