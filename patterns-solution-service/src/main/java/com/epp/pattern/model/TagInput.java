package com.epp.pattern.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagInput {
    private String tagId;
    private String tagName;
    private String tagValue;
    private String className;
    private String patternId;
}
