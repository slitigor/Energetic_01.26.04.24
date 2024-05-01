package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.SubstationDto;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.model.enums.PSSchema;

@Component
@RequiredArgsConstructor
public class SubstationMapper {
    private final DistrictMapper districtMapper;

    public Substation convertToModel(SubstationDto dto) {
        Substation model = new Substation();
        model.setId(dto.getId());
        model.setName(dto.getName());
        model.setDistrict(districtMapper.convertToModel(dto.getDistrict()));
        model.setPsSchema(PSSchema.getSchemaByVal(dto.getPsSchema()));

        return model;
    }

    public SubstationDto convertToDto(Substation model) {
        SubstationDto dto = new SubstationDto();
        dto.setId(model.getId());
        dto.setName(model.getName());
        dto.setDistrict(districtMapper.convertToDto(model.getDistrict()));
        dto.setPsSchema(model.getPsSchema().getValue());

        return dto;
    }
}
