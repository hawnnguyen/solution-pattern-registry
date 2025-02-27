package com.epp.pattern.service;

import com.epp.pattern.entity.PatternEntity;
import com.epp.pattern.entity.TagEntity;
import com.epp.pattern.model.Pattern;
import com.epp.pattern.model.PatternInput;
import com.epp.pattern.model.Tag;
import com.epp.pattern.repository.PatternRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class PatternServiceImpl implements PatternService {

    private final PatternRepository patternRepository;

    @Autowired
    public PatternServiceImpl(PatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    @Override
    public List<Pattern> getAllPatterns() {
        log.debug("Service: Retrieving all patterns");
        return patternRepository.findAll().stream()
                .map(this::mapToPattern)
                .collect(Collectors.toList());
    }

    @Override
    public Pattern getPatternById(String id) {
        log.debug("Service: Retrieving pattern by id: {}", id);
        return patternRepository.findById(id)
                .map(this::mapToPattern)
                .orElseThrow(() -> new RuntimeException("Pattern not found with id: " + id));
    }

    @Override
    public List<Pattern> getPatternsByQuadrant(String quadrant) {
        log.debug("Service: Retrieving patterns by quadrant: {}", quadrant);
        return patternRepository.findByQuadrant(quadrant).stream()
                .map(this::mapToPattern)
                .collect(Collectors.toList());
    }

    @Override
    public List<Pattern> getPatternsByRing(String ring) {
        log.debug("Service: Retrieving patterns by ring: {}", ring);
        return patternRepository.findByRing(ring).stream()
                .map(this::mapToPattern)
                .collect(Collectors.toList());
    }

    @Override
    public List<Pattern> getPatternsByPhase(String phase) {
        log.debug("Service: Retrieving patterns by phase: {}", phase);
        return patternRepository.findByPhase(phase).stream()
                .map(this::mapToPattern)
                .collect(Collectors.toList());
    }

    @Override
    public List<Pattern> getPatternsByStatus(String status) {
        log.debug("Service: Retrieving patterns by status: {}", status);
        return patternRepository.findByStatus(status).stream()
                .map(this::mapToPattern)
                .collect(Collectors.toList());
    }

    @Override
    public Pattern createPattern(PatternInput patternInput) {
        log.info("Service: Creating new pattern");
        PatternEntity entity = mapToEntity(patternInput);
        
        // Generate new ID for the pattern
        String newPatternId = UUID.randomUUID().toString();
        entity.setId(newPatternId);
        
        // Set pattern ID for each tag
        if (entity.getTags() != null) {
            entity.getTags().forEach(tag -> {
                tag.setPatternId(newPatternId);
                tag.setPattern(entity);
                if (tag.getTagId() == null) {
                    tag.setTagId(UUID.randomUUID().toString());
                }
            });
        }
        
        PatternEntity savedEntity = patternRepository.save(entity);
        log.info("Service: Created new pattern: {}", savedEntity);
        return mapToPattern(savedEntity);
    }

    @Override
    public Pattern updatePattern(String id, PatternInput patternInput) {
        log.info("Service: Updating pattern with id: {}", id);
        PatternEntity existingEntity = patternRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pattern not found with id: " + id));
        
        log.info("Service: Found existing pattern: {}", existingEntity);
        updateEntityFromInput(existingEntity, patternInput);
        log.info("Service: Updated pattern fields: {}", existingEntity);
        
        PatternEntity updatedEntity = patternRepository.save(existingEntity);
        log.info("Service: Saved updated pattern: {}", updatedEntity);
        
        return mapToPattern(updatedEntity);
    }

    @Override
    public void deletePattern(String id) {
        log.info("Service: Deleting pattern with id: {}", id);
        patternRepository.deleteById(id);
    }

    private Pattern mapToPattern(PatternEntity entity) {
        return Pattern.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .title(entity.getTitle())
                .url(entity.getUrl())
                .quadrant(entity.getQuadrant())
                .ring(entity.getRing())
                .phase(entity.getPhase())
                .status(entity.getStatus())
                .tags(entity.getTags().stream()
                        .map(this::mapToTag)
                        .collect(Collectors.toList()))
                .build();
    }

    private Tag mapToTag(TagEntity entity) {
        return Tag.builder()
                .tagId(entity.getTagId())
                .tagName(entity.getTagName())
                .tagValue(entity.getTagValue())
                .className(entity.getClassName())
                .patternId(entity.getPatternId())
                .build();
    }

    private PatternEntity mapToEntity(PatternInput input) {
        PatternEntity pattern = PatternEntity.builder()
                .name(input.getName())
                .description(input.getDescription())
                .title(input.getTitle())
                .url(input.getUrl())
                .quadrant(input.getQuadrant())
                .ring(input.getRing())
                .phase(input.getPhase())
                .status(input.getStatus())
                .build();

        if (input.getTags() != null) {
            List<TagEntity> tags = input.getTags().stream()
                    .map(tagInput -> TagEntity.builder()
                            .tagId(tagInput.getTagId() != null ? tagInput.getTagId() : UUID.randomUUID().toString())
                            .tagName(tagInput.getTagName())
                            .tagValue(tagInput.getTagValue())
                            .className(tagInput.getClassName())
                            .pattern(pattern)
                            .build())
                    .collect(Collectors.toList());
            pattern.setTags(tags);
        }

        return pattern;
    }

    private void updateEntityFromInput(PatternEntity entity, PatternInput input) {
        entity.setName(input.getName());
        entity.setDescription(input.getDescription());
        entity.setTitle(input.getTitle());
        entity.setUrl(input.getUrl());
        entity.setQuadrant(input.getQuadrant());
        entity.setRing(input.getRing());
        entity.setPhase(input.getPhase());
        entity.setStatus(input.getStatus());

        // Clear existing tags
        entity.getTags().clear();

        // Add new tags
        if (input.getTags() != null) {
            List<TagEntity> tags = input.getTags().stream()
                    .map(tagInput -> TagEntity.builder()
                            .tagId(tagInput.getTagId() != null ? tagInput.getTagId() : UUID.randomUUID().toString())
                            .tagName(tagInput.getTagName())
                            .tagValue(tagInput.getTagValue())
                            .className(tagInput.getClassName())
                            .pattern(entity)
                            .patternId(entity.getId())
                            .build())
                    .collect(Collectors.toList());
            entity.getTags().addAll(tags);
        }
    }
}
