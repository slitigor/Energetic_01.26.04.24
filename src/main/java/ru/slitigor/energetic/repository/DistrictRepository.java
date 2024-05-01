package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.District;

import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, Integer> {
    Optional<District> findByName(String name);
}
