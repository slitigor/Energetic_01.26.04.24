package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.Switchgear;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.Optional;

public interface SwitchgearRepository extends JpaRepository<Switchgear, Long> {
    Optional<Switchgear> findBySgTypeAndVoltageAndSubstation_Id(SGType sgType, Voltage voltage, Integer id);
}
