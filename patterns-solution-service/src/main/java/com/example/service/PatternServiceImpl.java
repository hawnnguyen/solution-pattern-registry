package com.example.service;

import com.example.entity.PatternEntity;
import com.example.entity.TagEntity;
import com.example.model.Pattern;
import com.example.model.Tag;
import com.example.repository.PatternRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PatternServiceImpl implements PatternService {
    private final PatternRepository patternRepository;
    
    @PersistenceContext
    private EntityManager entityManager;

    public PatternServiceImpl(PatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    private Tag convertToModel(TagEntity entity) {
        if (entity == null) return null;
        return Tag.builder()
                .tagId(entity.getTagId())
                .tagName(entity.getTagName())
                .tagValue(entity.getTagValue())
                .className(entity.getClassName())
                .build();
    }

    private TagEntity convertToEntity(Tag model) {
        if (model == null) return null;
        TagEntity entity = TagEntity.builder()
                .tagId(model.getTagId())
                .tagName(model.getTagName())
                .tagValue(model.getTagValue())
                .className(model.getClassName())
                .build();
        return entity;
    }

    private Pattern convertToModel(PatternEntity entity) {
        if (entity == null) return null;
        return Pattern.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .name(entity.getName())
                .url(entity.getUrl())
                .ring(entity.getRing())
                .quadrant(entity.getQuadrant())
                .status(entity.getStatus())
                .isNew(entity.getIsNew())
                .description(entity.getDescription())
                .pattern(entity.getPattern())
                .useCase(entity.getUseCase())
                .tags(entity.getTags() != null ? entity.getTags().stream()
                        .map(this::convertToModel)
                        .collect(Collectors.toList()) : null)
                .build();
    }

    private PatternEntity convertToEntity(Pattern model) {
        if (model == null) return null;
        PatternEntity entity = PatternEntity.builder()
                .id(model.getId())
                .title(model.getTitle())
                .name(model.getName())
                .url(model.getUrl())
                .ring(model.getRing())
                .quadrant(model.getQuadrant())
                .status(model.getStatus())
                .isNew(model.getIsNew())
                .description(model.getDescription())
                .pattern(model.getPattern())
                .useCase(model.getUseCase())
                .build();

        if (model.getTags() != null) {
            List<TagEntity> tags = model.getTags().stream()
                    .map(tag -> {
                        TagEntity tagEntity = convertToEntity(tag);
                        tagEntity.setPatternId(model.getId());
                        return tagEntity;
                    })
                    .collect(Collectors.toList());
            entity.setTags(tags);
        }

        return entity;
    }

    @Override
    public List<Pattern> getAllPatterns() {
        return patternRepository.findAll().stream()
                .map(this::convertToModel)
                .collect(Collectors.toList());
    }

    @Override
    public Pattern getPatternById(String id) {
        return patternRepository.findById(id)
                .map(this::convertToModel)
                .orElse(null);
    }

    @Override
    public List<Pattern> getPatternsByQuadrant(String quadrant) {
        return patternRepository.findByQuadrantIgnoreCase(quadrant).stream()
                .map(this::convertToModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Pattern> getPatternsByRing(String ring) {
        return patternRepository.findByRingIgnoreCase(ring).stream()
                .map(this::convertToModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Pattern> getPatternsByPhase(String phase) {
        return patternRepository.findByPhaseIgnoreCase(phase).stream()
                .map(this::convertToModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Pattern> getPatternsByStatus(String status) {
        return patternRepository.findByStatusIgnoreCase(status).stream()
                .map(this::convertToModel)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Pattern createPattern(Pattern pattern) {
        PatternEntity patternEntity = convertToEntity(pattern);
        
        // First save the pattern
        patternEntity = patternRepository.save(patternEntity);
        
        // Get the final pattern ID
        final String patternId = patternEntity.getId();
        
        // Then save each tag
        if (patternEntity.getTags() != null) {
            patternEntity.getTags().forEach(tag -> {
                tag.setPatternId(patternId);
                entityManager.persist(tag);
            });
            entityManager.flush();
        }
        
        return convertToModel(patternEntity);
    }

    @Override
    public Pattern updatePattern(String id, Pattern pattern) {
        if (patternRepository.existsById(id)) {
            PatternEntity entity = convertToEntity(pattern);
            entity.setId(id);
            return convertToModel(patternRepository.save(entity));
        }
        return null;
    }

    @Override
    public boolean deletePattern(String id) {
        if (patternRepository.existsById(id)) {
            patternRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
