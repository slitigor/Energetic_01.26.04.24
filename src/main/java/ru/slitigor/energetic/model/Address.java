package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "address", uniqueConstraints = {@UniqueConstraint(name = "unique_city_street_key",
columnNames = {"city", "street"})})
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Pattern(regexp = "\\d{6}", message = "The 'Postal Code' consists of 6 digits, for example: 123456")
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(6)")
    private String zip;
    @Column(nullable = false, columnDefinition = "VARCHAR(40)")
    private String city;
    @Column(nullable = false, columnDefinition = "VARCHAR(60)")
    private String street;
    @OneToOne(mappedBy = "address")
    private District district;
}
