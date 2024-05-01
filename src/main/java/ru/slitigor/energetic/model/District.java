package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "district")
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(35)")
    private String name;
    private String dDesc;
    @OneToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false, unique = true)
    private Address address;
    @OneToMany(mappedBy = "district")
    private Set<Substation> substations = new HashSet<>();

    public void addSubstation(Substation substation) {
        if (this.substations.contains(substation)) return;
        this.substations.add(substation);
        substation.setDistrict(this);
    }

    public void removeSubstation(Substation substation) {
        if (!this.substations.contains(substation)) return;
        this.substations.remove(substation);
    }
}
