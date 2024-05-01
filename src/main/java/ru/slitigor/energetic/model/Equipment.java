package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.slitigor.energetic.model.enums.EClass;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Voltage voltage;
    @Column(nullable = false)
    private EClass eClass;
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(40)")
    private String equipmentType;
    @Column(columnDefinition = "VARCHAR(150)")
    private String eDesc;
    @ManyToMany
    @JoinTable(name = "equipment_connection",
    joinColumns = @JoinColumn(name = "equipment_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "connection_id", referencedColumnName = "id"))
    Set<Connection> connectionList = new HashSet<>();
}
