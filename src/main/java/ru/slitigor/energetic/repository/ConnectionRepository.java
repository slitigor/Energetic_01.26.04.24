package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.Connection;

import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    Optional<Connection> findByNameAndBusBar_Id(String name, Long busBarId);
}
