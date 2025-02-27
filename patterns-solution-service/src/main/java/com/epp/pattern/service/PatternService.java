package com.epp.pattern.service;

import com.epp.pattern.model.Pattern;
import com.epp.pattern.model.PatternInput;
import java.util.List;

public interface PatternService {
    List<Pattern> getAllPatterns();
    Pattern getPatternById(String id);
    List<Pattern> getPatternsByQuadrant(String quadrant);
    List<Pattern> getPatternsByRing(String ring);
    List<Pattern> getPatternsByPhase(String phase);
    List<Pattern> getPatternsByStatus(String status);
    Pattern createPattern(PatternInput pattern);
    Pattern updatePattern(String id, PatternInput pattern);
    void deletePattern(String id);
}
