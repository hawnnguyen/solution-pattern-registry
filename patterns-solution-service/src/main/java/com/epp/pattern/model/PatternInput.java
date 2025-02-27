package com.epp.pattern.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatternInput {
    private String name;
    private String description;
    private String title;
    private String url;
    private String quadrant;
    private String ring;
    private String phase;
    private String status;
    
    @Builder.Default
    private List<TagInput> tags = new ArrayList<>();
}
