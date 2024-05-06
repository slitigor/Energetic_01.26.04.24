package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Substation;

import java.util.List;

public interface SubstationService {
    Integer getIdBySubstation(Substation substation);
    Substation getSubstationById(Integer id);
    Substation getByNameAndDistrictId(String name, Integer id);
    List<Substation> getAllSubstation();
    Substation createSubstation(Substation substation);
    Substation updateSubstation(Integer id, Substation substation);
    void deleteSubstation(Integer id);

}
