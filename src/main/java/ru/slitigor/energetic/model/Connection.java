package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "e_connection", uniqueConstraints = {@UniqueConstraint(name = "unique_system_section_id_name_key",
columnNames = {"system_section_id", "name"})})
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(nullable = false, columnDefinition = "VARCHAR(150)")
    private String dName;
    @ManyToOne
    @JoinColumn(nullable = false, columnDefinition = "id")
    private BusBar busBar;
    @ManyToMany
    private Set<Equipment> equipmentList = new HashSet<>();

    public void addEquipment(Equipment equipment) {
        if (this.equipmentList.contains(equipment)) return;
        this.equipmentList.add(equipment);
        equipment.getConnectionList().add(this);
    }

    public void removeEquipment(Equipment equipment) {
        if (!this.equipmentList.contains(equipment)) return;
        this.equipmentList.remove(equipment);
        equipment.getConnectionList().remove(this);
    }
}
