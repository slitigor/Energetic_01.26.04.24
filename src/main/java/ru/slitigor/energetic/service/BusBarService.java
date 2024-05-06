package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.BusBar;

import java.util.List;

public interface BusBarService {
    BusBar getBusBarById(Long id);
    List<BusBar> getAllBB();
    BusBar createBusBar(BusBar busbar);
    BusBar updateBusBar(Long id, BusBar busbar);
    void deleteBusBar(Long id);
}
