package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Address;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.repository.DistrictRepository;
import ru.slitigor.energetic.service.AddressService;
import ru.slitigor.energetic.service.DistrictService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DistrictServiceImpl implements DistrictService {
    private final DistrictRepository repository;
    private final AddressService addressService;

    @Override
    public District getDistrictByName(String name) {
        return repository.findByName(name).orElseThrow(() ->
                new ResourceNotFoundException("District", "name", name));
    }

    @Override
    public List<District> getAllDistricts() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public District createDistrict(District district) {
        Optional<District> existsDistrict = repository.findByName(district.getName());
        if (existsDistrict.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The District named '%s' already exists in the database!", district.getName()
        ));
        District districtToCreated = updateLinkAddress(district);

        return repository.save(districtToCreated);
    }

    @Override
    @Transactional
    public District updateDistrict(String name, District district) {
        Optional<District> existsDistrict = repository.findByName(name);
        if (existsDistrict.isEmpty()) throw new ResourceNotFoundException("District", "Name", name);
        District districtToUpdated = existsDistrict.get();
        districtToUpdated.setDDesc(district.getDDesc());

        return repository.save(updateLinkAddress(districtToUpdated));
    }

    @Override
    @Transactional
    public void deleteDistrict(String name) {
        District district = getDistrictByName(name);
        Address address = addressService.getAddressByZip(district.getAddress().getZip());
        address.setDistrict(null);
        repository.delete(district);
    }

    private District updateLinkAddress(District district) {
        Address address = addressService.getAddressByZip(district.getAddress().getZip());
        district.setAddress(address);
        address.setDistrict(district);

        return district;
    }
}
