package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.DistrictDto;
import ru.slitigor.energetic.model.District;

@Component
@RequiredArgsConstructor
public class DistrictMapper {
    private final AddressMapper addressMapper;

    public District convertToModel(DistrictDto dto) {
        District model = new District();
        model.setName(dto.getName());
        model.setDDesc(dto.getDDesc());
        model.setAddress(addressMapper.convertToModel(dto.getAddress()));

        return model;
    }

    public DistrictDto convertToDto(District model) {
        DistrictDto dto = new DistrictDto();
        dto.setName(model.getName());
        dto.setDDesc(model.getDDesc());
        dto.setAddress(addressMapper.convertToDto(model.getAddress()));

        return dto;
    }
}
