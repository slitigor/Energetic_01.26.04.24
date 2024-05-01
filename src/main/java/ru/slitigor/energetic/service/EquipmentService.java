package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Equipment;

import java.util.List;

public interface EquipmentService {
    Long getIdByType(String eqType);
    Equipment getEquipmentByType(String eqType);
    List<Equipment> getAllEquipment();
    Equipment createEquipment(Equipment equipment);
    Equipment updateEquipment(Long id, Equipment equipment);
    void deleteEquipment(Long id);
}
