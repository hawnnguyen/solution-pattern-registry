package com.example.repository;

import com.example.entity.PatternEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatternRepository extends JpaRepository<PatternEntity, String> {
    List<PatternEntity> findByQuadrantIgnoreCase(String quadrant);
    List<PatternEntity> findByRingIgnoreCase(String ring);
    List<PatternEntity> findByPhaseIgnoreCase(String phase);
    List<PatternEntity> findByStatusIgnoreCase(String status);
}
