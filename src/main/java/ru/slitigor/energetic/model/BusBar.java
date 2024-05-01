package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "system_section", uniqueConstraints = {@UniqueConstraint(name = "unique_is_section_numb_switchgear_id",
columnNames = {"is_section", "numb", "switchgear_id"})})
public class BusBar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Boolean isSection;
    @Column(nullable = false)
    private int numb;
    @ManyToOne
    @JoinColumn(name = "switchgear_id", columnDefinition = "id", nullable = false)
    private Switchgear switchgear;
    @OneToMany(mappedBy = "busBar")
    private Set<Connection> connections = new HashSet<>();

    public void addConnection(Connection connection) {
        if(connections.contains(connection)) return;
        connections.add(connection);
        connection.setBusBar(this);
    }

    public void removeConnection(Connection connection) {
        if(!connections.contains(connection)) return;
        connections.remove(connection);
    }
}
