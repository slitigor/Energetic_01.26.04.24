package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.BusBar;

import java.util.Optional;

public interface BusBarRepository extends JpaRepository<BusBar, Long> {
    Optional<BusBar> findByIsSectionAndNumbAndSwitchgear_Id(
            Boolean isSection, int numb, Long sId
    );
}
