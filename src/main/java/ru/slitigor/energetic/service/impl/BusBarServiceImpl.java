package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.BusBar;
import ru.slitigor.energetic.model.Switchgear;
import ru.slitigor.energetic.repository.BusBarRepository;
import ru.slitigor.energetic.service.BusBarService;
import ru.slitigor.energetic.service.SwitchgearService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BusBarServiceImpl implements BusBarService {
    private final BusBarRepository repository;
    private final SwitchgearService switchgearService;

    @Override
    public BusBar getBusBarById(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("BusBar", "id", id.toString()));
    }

    @Override
    public List<BusBar> getAllBB() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public BusBar createBusBar(BusBar busbar) {
        Optional<BusBar> isExists = repository.findByIsSectionAndNumbAndSwitchgear_Id(
                busbar.getIsSection(),
                busbar.getNumb(),
                busbar.getSwitchgear().getId()
        );
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The %s %s kV %s %s already exists in the database!",
                busbar.getSwitchgear().getSgType(), busbar.getSwitchgear().getVoltage(), busbar.getNumb(),
                busbar.getIsSection() ? "С" : "СШ"
        ));
        BusBar created = updateLinkSwitchgear(busbar);

        return repository.save(created);
    }

    @Override
    @Transactional
    public BusBar updateBusBar(Long id, BusBar busbar) {
        Optional<BusBar> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("BusBar", "id", id.toString());
        BusBar updated = updateLinkSwitchgear(busbar);
        updated.setId(id);

        return repository.save(updated);
    }

    @Override
    @Transactional
    public void deleteBusBar(Long id) {
        repository.delete(repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("BusBar", "id", id.toString())));
    }

    private BusBar updateLinkSwitchgear(BusBar busBar) {
        Switchgear switchgear = switchgearService.getSwitchgearById(
                switchgearService.getIdBySwitchgear(busBar.getSwitchgear()));
        busBar.setSwitchgear(switchgear);
        switchgear.getBusBarList().add(busBar);

        return busBar;
    }
}
