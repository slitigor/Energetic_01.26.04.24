package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SwitchgearDto {
    private Long id;
    private String sqType;
    private String voltage;
    private SubstationDto substation;
}
