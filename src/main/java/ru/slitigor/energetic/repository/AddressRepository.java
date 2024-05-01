package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.Address;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findByZip(String zip);
}
