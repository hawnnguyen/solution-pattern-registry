package com.epp.pattern.controller;

import com.epp.pattern.model.Pattern;
import com.epp.pattern.model.PatternInput;
import com.epp.pattern.service.PatternService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/patterns")
@RequiredArgsConstructor
@Tag(name = "Pattern", description = "Pattern management APIs")
public class PatternRestController {

    private final PatternService patternService;

    @GetMapping
    @Operation(summary = "Get all patterns", description = "Retrieve a list of all available patterns")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved patterns",
            content = @Content(schema = @Schema(implementation = Pattern.class)))
    public ResponseEntity<List<Pattern>> getAllPatterns() {
        return ResponseEntity.ok(patternService.getAllPatterns());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get pattern by ID", description = "Retrieve a pattern by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved pattern")
    @ApiResponse(responseCode = "404", description = "Pattern not found")
    public ResponseEntity<Pattern> getPatternById(
            @Parameter(description = "Pattern ID") @PathVariable String id) {
        Pattern pattern = patternService.getPatternById(id);
        return pattern != null ? ResponseEntity.ok(pattern) : ResponseEntity.notFound().build();
    }

    @GetMapping("/quadrant/{quadrant}")
    @Operation(summary = "Get patterns by quadrant")
    public ResponseEntity<List<Pattern>> getPatternsByQuadrant(
            @Parameter(description = "Quadrant name") @PathVariable String quadrant) {
        return ResponseEntity.ok(patternService.getPatternsByQuadrant(quadrant));
    }

    @GetMapping("/ring/{ring}")
    @Operation(summary = "Get patterns by ring")
    public ResponseEntity<List<Pattern>> getPatternsByRing(
            @Parameter(description = "Ring name") @PathVariable String ring) {
        return ResponseEntity.ok(patternService.getPatternsByRing(ring));
    }

    @GetMapping("/phase/{phase}")
    @Operation(summary = "Get patterns by phase")
    public ResponseEntity<List<Pattern>> getPatternsByPhase(
            @Parameter(description = "Phase name") @PathVariable String phase) {
        return ResponseEntity.ok(patternService.getPatternsByPhase(phase));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get patterns by status")
    public ResponseEntity<List<Pattern>> getPatternsByStatus(
            @Parameter(description = "Status name") @PathVariable String status) {
        return ResponseEntity.ok(patternService.getPatternsByStatus(status));
    }

    @PostMapping
    @Operation(summary = "Create a new pattern")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Pattern> createPattern(
            @Parameter(description = "Pattern to create") @RequestBody PatternInput pattern) {
        log.info("Creating new pattern: name={}, description={}, quadrant={}, ring={}, phase={}, status={}", 
                pattern.getName(), pattern.getDescription(), pattern.getQuadrant(), 
                pattern.getRing(), pattern.getPhase(), pattern.getStatus());
        Pattern createdPattern = patternService.createPattern(pattern);
        log.info("Pattern created successfully: {}", createdPattern);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdPattern);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing pattern")
    public ResponseEntity<Pattern> updatePattern(
            @Parameter(description = "Pattern ID") @PathVariable String id,
            @Parameter(description = "Updated pattern") @RequestBody PatternInput pattern) {
        log.info("Updating pattern with id: {}", id);
        log.info("Update request: name={}, description={}, quadrant={}, ring={}, phase={}, status={}", 
                pattern.getName(), pattern.getDescription(), pattern.getQuadrant(), 
                pattern.getRing(), pattern.getPhase(), pattern.getStatus());
        Pattern updatedPattern = patternService.updatePattern(id, pattern);
        log.info("Pattern updated successfully: {}", updatedPattern);
        return updatedPattern != null ? ResponseEntity.ok(updatedPattern) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a pattern")
    public ResponseEntity<Void> deletePattern(
            @Parameter(description = "Pattern ID") @PathVariable String id) {
        patternService.deletePattern(id);
        return ResponseEntity.noContent().build();
    }
}
