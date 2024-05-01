package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "switchgear", uniqueConstraints = {@UniqueConstraint(name = "unique_sg_type_voltage_substation_id_key",
columnNames = {"sg_type", "voltage", "substation_id"})})
public class Switchgear {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private SGType sgType;
    @Column(nullable = false)
    private Voltage voltage;
    @ManyToOne()
    @JoinColumn(name = "substation_id", columnDefinition = "id", nullable = false)
    private Substation substation;
    @OneToMany(mappedBy = "switchgear")
    private Set<BusBar> busBarList = new HashSet<>();

    public void addBusBar(BusBar busBar) {
        if (this.getBusBarList().contains(busBar)) return;
        this.getBusBarList().add(busBar);
        busBar.setSwitchgear(this);
    }

    public void removeBusBar(BusBar busBar) {
        if (!this.getBusBarList().contains(busBar)) return;
        this.getBusBarList().remove(busBar);
    }
}
