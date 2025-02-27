package com.epp.pattern.controller;

import com.epp.pattern.model.Pattern;
import com.epp.pattern.model.PatternInput;
import com.epp.pattern.service.PatternService;
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
    public Pattern createPattern(@Argument("pattern") PatternInput pattern) {
        return patternService.createPattern(pattern);
    }

    @MutationMapping
    public Pattern updatePattern(@Argument String id, @Argument("pattern") PatternInput pattern) {
        return patternService.updatePattern(id, pattern);
    }

    @MutationMapping
    public boolean deletePattern(@Argument String id) {
        patternService.deletePattern(id);
        return true;
    }
}
