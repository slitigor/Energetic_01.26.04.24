package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.BusBarDto;
import ru.slitigor.energetic.model.BusBar;

@Component
@RequiredArgsConstructor
public class BusBarMapper {
    private final SwitchgearMapper swMapper;

    public BusBar convertToModel(BusBarDto dto) {
        BusBar model = new BusBar();
        model.setId(dto.getId());
        model.setIsSection(dto.getIsSection());
        model.setNumb(dto.getNumb());
        model.setSwitchgear(swMapper.convertToModel(dto.getSwitchgear()));

        return model;
    }

    public BusBarDto convertToDto(BusBar model) {
        BusBarDto dto = new BusBarDto();
        dto.setId(model.getId());
        dto.setIsSection(model.getIsSection());
        dto.setNumb(model.getNumb());
        dto.setSwitchgear(swMapper.convertToDto(model.getSwitchgear()));

        return dto;
    }
}
