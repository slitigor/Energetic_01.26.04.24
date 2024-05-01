package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DistrictDto {
    private String name;
    private String dDesc;
    private AddressDto address;
}
