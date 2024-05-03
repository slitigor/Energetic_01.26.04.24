package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.repository.SubstationRepository;
import ru.slitigor.energetic.service.DistrictService;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubstationServiceImpl implements SubstationService {
    private final SubstationRepository repository;
    private final DistrictService districtService;

    @Override
    public Integer getIdBySubstation(Substation substation) {
        District district = districtService.getDistrictByName(substation.getDistrict().getName());
        Substation isExists = repository.findByNameAndDistrict_Id(substation.getName(), district.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Substation", "name", substation.getName()));
        return isExists.getId();
    }

    @Override
    public Substation getSubstationById(Integer id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Substation", "id", id.toString()));
    }

    @Override
    public List<Substation> getAllSubstation() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Substation createSubstation(Substation substation) {
        Optional<Substation> existsSubstation =
                repository.findByNameAndDistrict_Id(substation.getName(),
                        getIdBySubstation(substation));
        if (existsSubstation.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The Substation named '%s' already exists in the database!", substation.getName()
        ));
        Substation substationToCreated = updateLinkDistrict(substation);

        return repository.save(substationToCreated);
    }

    @Override
    @Transactional
    public Substation updateSubstation(Integer id, Substation substation) {
        Optional<Substation> existsSubstation = repository.findById(id);
        if (existsSubstation.isEmpty()) throw new ResourceNotFoundException(
                "Substation", "id", id.toString()
        );
        Substation updated = updateLinkDistrict(substation);
        updated.setId(id);

        return repository.save(updated);
    }

    @Override
    @Transactional
    public void deleteSubstation(Integer id) {
        repository.delete(repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Substation", "id", id.toString())));
    }

    private Substation updateLinkDistrict(Substation substation) {
        District district = districtService.getDistrictByName(substation.getDistrict().getName());
        substation.setDistrict(district);
        district.getSubstations().add(substation);

        return substation;
    }
}
