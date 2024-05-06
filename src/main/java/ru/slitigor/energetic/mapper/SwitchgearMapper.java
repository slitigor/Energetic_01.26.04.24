package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.SwitchgearDto;
import ru.slitigor.energetic.model.Switchgear;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

@Component
@RequiredArgsConstructor
public class SwitchgearMapper {
    private final SubstationMapper substationMapper;

    public Switchgear convertToModel(SwitchgearDto dto) {
        Switchgear model = new Switchgear();
        model.setId(dto.getId());
        model.setSgType(SGType.getTypeByVal(dto.getSgType()));
        model.setVoltage(Voltage.getNominalByVal(dto.getVoltage()));
        model.setSubstation(substationMapper.convertToModel(dto.getSubstation()));

        return model;
    }

    public SwitchgearDto convertToDto(Switchgear model) {
        SwitchgearDto dto = new SwitchgearDto();
        dto.setId(model.getId());
        dto.setSgType(model.getSgType().getValue());
        dto.setVoltage(model.getVoltage().getValue());
        dto.setSubstation(substationMapper.convertToDto(model.getSubstation()));

        return dto;
    }
}
