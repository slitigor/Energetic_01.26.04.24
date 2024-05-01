package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.DistrictDto;
import ru.slitigor.energetic.mapper.DistrictMapper;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.service.DistrictService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.DistrictValidator;

import java.util.List;

@RestController
@RequestMapping("/district")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class DistrictController {
    private final DistrictService service;
    private final DistrictValidator validator;
    private final DistrictMapper mapper;

    @GetMapping
    public ResponseEntity<List<DistrictDto>> getAllDistrict() {
        List<DistrictDto> districts = service.getAllDistricts().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(districts, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<DistrictDto> getDistrictByZip(@PathVariable String name) {
        return new ResponseEntity<>(mapper.convertToDto(service.getDistrictByName(name)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DistrictDto> createDistrict(@RequestBody @Valid DistrictDto districtDto,
                                                      BindingResult bindingResult) {
        District toCreated = mapper.convertToModel(districtDto);
        validator.validate(toCreated, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.createDistrict(toCreated);

        return new ResponseEntity<>(mapper.convertToDto(toCreated), HttpStatus.CREATED);
    }

    @PutMapping("/{name}")
    public ResponseEntity<DistrictDto> updateDistrict(@PathVariable String name,
                                                      @RequestBody @Valid DistrictDto districtDto,
                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient((bindingResult)));
        service.updateDistrict(name, mapper.convertToModel(districtDto));

        return new ResponseEntity<>(districtDto, HttpStatus.OK);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteDistrict(@PathVariable String name) {
        service.deleteDistrict(name);
        return new ResponseEntity<>(String.format(
                "The district with the name '%s' has been deleted from the database.", name), HttpStatus.OK);
    }
}
