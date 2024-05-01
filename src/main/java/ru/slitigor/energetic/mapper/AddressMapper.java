package ru.slitigor.energetic.mapper;

import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.AddressDto;
import ru.slitigor.energetic.model.Address;

@Component
public class AddressMapper {
    public Address convertToModel(AddressDto dto) {
        Address model = new Address();
        model.setZip(dto.getZip());
        model.setCity(dto.getCity());
        model.setStreet(dto.getStreet());

        return model;
    }
    public AddressDto convertToDto(Address model) {
        AddressDto dto = new AddressDto();
        dto.setZip(model.getZip());
        dto.setCity(model.getCity());
        dto.setStreet(model.getStreet());

        return dto;
    }
}
