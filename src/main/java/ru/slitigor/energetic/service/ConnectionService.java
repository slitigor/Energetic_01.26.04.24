package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.Equipment;

import java.util.List;

public interface ConnectionService {
    Long getIdByNameAndBusBarId(String name, Long ssId);
    Connection getConnById(Long id);
    List<Connection> getAllConnection();
    Connection createConnection(Connection connection);
    Connection updateConnection(Long id, Connection connection);
    void deleteConnection(Long id);
    void addEquipment(Long id, Equipment equipment);
    void removeEquipment(Long id, Equipment equipment);
    Long getCountConnections();
}
