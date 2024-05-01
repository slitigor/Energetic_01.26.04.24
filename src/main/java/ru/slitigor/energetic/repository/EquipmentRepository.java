package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.Equipment;

import java.util.Optional;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    Optional<Equipment> findByEquipmentType (String eType);
}
