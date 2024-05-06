package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.model.Switchgear;
import ru.slitigor.energetic.repository.SwitchgearRepository;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.service.SwitchgearService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SwitchgearServiceImpl implements SwitchgearService {
    private final SwitchgearRepository repository;
    private final SubstationService substationService;

    @Override
    public Long getIdBySwitchgear(Switchgear switchgear) {
        Optional<Switchgear> swGear =
                repository.findBySgTypeAndVoltageAndSubstation_Id(switchgear.getSgType(), switchgear.getVoltage(),
                switchgear.getSubstation().getId());
        return swGear.map(Switchgear::getId).orElse(null);
    }

    @Override
    public Switchgear getSwitchgearById(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Switchgear", "id", id.toString()));
    }

    @Override
    public List<Switchgear> getAllSwitchgear() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Switchgear createSwitchgear(Switchgear switchgear) {
        Optional<Switchgear> isExists = repository.findBySgTypeAndVoltageAndSubstation_Id(
                switchgear.getSgType(), switchgear.getVoltage(), switchgear.getSubstation().getId()
        );
        if(isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The Switchgear ID '%s' already exists in the database!", switchgear.getId()
        ));
        Switchgear created = updateLinkSubstation(switchgear);

        return repository.save(created);
    }

    @Override
    @Transactional
    public Switchgear updateSwitchgear(Long id, Switchgear switchgear) {
        Optional<Switchgear> isExists = repository.findById((id));
        if (isExists.isEmpty()) throw new ResourceNotFoundException("Switchgear", "id", id.toString());
        Switchgear updated = updateLinkSubstation(switchgear);
        updated.setId(id);

        return repository.save(updated);
    }

    @Override
    @Transactional
    public void deleteSwitchgear(Long id) {
        repository.delete(repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Switchgear", "id", id.toString())));
    }

    private Switchgear updateLinkSubstation(Switchgear switchgear) {
        Substation substation = substationService.getByNameAndDistrictId(switchgear.getSubstation().getName(),
                switchgear.getSubstation().getDistrict().getId());
        switchgear.setSubstation(substation);
        substation.getSwitchgearList().add(switchgear);

        return switchgear;
    }
}
