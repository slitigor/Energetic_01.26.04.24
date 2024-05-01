package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Address;
import ru.slitigor.energetic.repository.AddressRepository;
import ru.slitigor.energetic.service.AddressService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AddressServiceImpl implements AddressService {
    private final AddressRepository repository;

    @Override
    public Address getAddressByZip(String zip) {
        return repository.findByZip(zip).orElseThrow(() ->
                new ResourceNotFoundException("Address", "zip", zip));
    }

    @Override
    public List<Address> getAllAddress() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Address createAddress(Address address) {
        Optional<Address> existsAddress = repository.findByZip(address.getZip());
        if (existsAddress.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The address with the zip code '%s' already exists!", address.getZip()
        ));

        return repository.save(address);
    }

    @Override
    @Transactional
    public Address updateAddress(String zip, Address address) {
        Optional<Address> existsAddress = repository.findByZip(zip);
        if (existsAddress.isEmpty()) throw new ResourceNotFoundException("Address", "zip", zip);
        address.setId(existsAddress.get().getId());

        return repository.save(address);
    }

    @Override
    @Transactional
    public void deleteAddress(String zip) {
        repository.delete(getAddressByZip(zip));
    }
}
