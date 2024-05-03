package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusBarDto {
    private Long id;
    private Boolean isSection;
    private int numb;
    private SwitchgearDto switchgear;
}
