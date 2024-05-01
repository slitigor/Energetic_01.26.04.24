package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {
    private String zip;
    private String city;
    private String street;
}
