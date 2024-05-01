package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Switchgear;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.List;

public interface SwitchgearService {
    Long getIdBySwitchgear(Switchgear switchgear);
    Switchgear getSwitchgearById(Long id);
    List<Switchgear> getAllSwitchgear();
    Switchgear createSwitchgear(Switchgear switchgear);
    Switchgear updateSwitchgear(Long id, Switchgear switchgear);
    void deleteSwitchgear(Long id);
}
