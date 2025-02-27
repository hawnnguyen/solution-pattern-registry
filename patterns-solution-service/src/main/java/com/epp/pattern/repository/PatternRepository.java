package com.epp.pattern.repository;

import com.epp.pattern.entity.PatternEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatternRepository extends JpaRepository<PatternEntity, String> {
    List<PatternEntity> findByQuadrant(String quadrant);
    List<PatternEntity> findByRing(String ring);
    List<PatternEntity> findByPhase(String phase);
    List<PatternEntity> findByStatus(String status);
}
