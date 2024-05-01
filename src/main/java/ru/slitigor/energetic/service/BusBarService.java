package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.BusBar;

import java.util.List;

public interface BusBarService {
    Long getIdByIsSectionNumbSwId(Boolean isSection, int numb, Long SId);
    BusBar getBusBarById(Long id);
    List<BusBar> getAllSS();
    BusBar createBusBar(BusBar busbar);
    BusBar updateBusBar(Long id, BusBar busbar);
    void deleteBusBar(Long id);
}
