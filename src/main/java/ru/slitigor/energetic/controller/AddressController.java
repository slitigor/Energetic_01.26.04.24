package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.AddressDto;
import ru.slitigor.energetic.mapper.AddressMapper;
import ru.slitigor.energetic.model.Address;
import ru.slitigor.energetic.service.AddressService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.AddressValidator;

import java.util.List;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class AddressController {
    private final AddressService service;
    private final AddressMapper mapper;
    private final AddressValidator validator;

    @GetMapping
    public ResponseEntity<List<AddressDto>> getAllAddresses() {
        List<AddressDto> addresses = service.getAllAddress().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AddressDto> createAddress(@RequestBody @Valid AddressDto addressDto,
                                                    BindingResult bindingResult) {
        Address createdAddress = mapper.convertToModel(addressDto);
        validator.validate(createdAddress, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));

        service.createAddress(createdAddress);
        return new ResponseEntity<>(addressDto, HttpStatus.CREATED);
    }

    @PutMapping("/{zip}")
    public ResponseEntity<AddressDto> updateAddress(@PathVariable String zip,
                                                    @RequestBody @Valid AddressDto addressDto,
                                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));

        service.updateAddress(zip, mapper.convertToModel(addressDto));
        return new ResponseEntity<>(addressDto, HttpStatus.OK);
    }

    @DeleteMapping("/{zip}")
    public ResponseEntity<String> deleteAddress(@PathVariable String zip) {
        service.deleteAddress(zip);
        return new ResponseEntity<>(String.format(
                "The address with the zip code '%s' has been deleted from the database.", zip),
                HttpStatus.OK);
    }
}
