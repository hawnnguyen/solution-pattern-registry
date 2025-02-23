package com.example.controller;

import com.example.model.Pattern;
import com.example.model.PatternInput;
import com.example.service.PatternService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
public class PatternController {
    private final PatternService patternService;

    public PatternController(PatternService patternService) {
        this.patternService = patternService;
    }

    @QueryMapping
    public List<Pattern> patterns() {
        return patternService.getAllPatterns();
    }

    @QueryMapping
    public Pattern patternById(@Argument String id) {
        return patternService.getPatternById(id);
    }

    @QueryMapping
    public List<Pattern> patternsByQuadrant(@Argument String quadrant) {
        return patternService.getPatternsByQuadrant(quadrant);
    }

    @QueryMapping
    public List<Pattern> patternsByRing(@Argument String ring) {
        return patternService.getPatternsByRing(ring);
    }

    @QueryMapping
    public List<Pattern> patternsByPhase(@Argument String phase) {
        return patternService.getPatternsByPhase(phase);
    }

    @QueryMapping
    public List<Pattern> patternsByStatus(@Argument String status) {
        return patternService.getPatternsByStatus(status);
    }

    @MutationMapping
    public Pattern createPattern(@Argument("pattern") PatternInput input) {
        Pattern pattern = convertInputToPattern(input);
        return patternService.createPattern(pattern);
    }

    @MutationMapping
    public Pattern updatePattern(@Argument String id, @Argument("pattern") PatternInput input) {
        Pattern pattern = convertInputToPattern(input);
        return patternService.updatePattern(id, pattern);
    }

    @MutationMapping
    public boolean deletePattern(@Argument String id) {
        return patternService.deletePattern(id);
    }

    private Pattern convertInputToPattern(PatternInput input) {
        return Pattern.builder()
                .id(input.getId())
                .title(input.getTitle())
                .name(input.getName())
                .url(input.getUrl())
                .ring(input.getRing())
                .quadrant(input.getQuadrant())
                .status(input.getStatus())
                .isNew(input.getIsNew())
                .description(input.getDescription())
                .pattern(input.getPattern())
                .useCase(input.getUseCase())
                .tags(input.getTags())
                .build();
    }
}
