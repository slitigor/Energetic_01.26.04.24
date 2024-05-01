package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.SubstationDto;
import ru.slitigor.energetic.mapper.SubstationMapper;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.SubstationValidator;

import java.util.List;

@RestController
@RequestMapping("/substation")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class SubstationController {
    private final SubstationService service;
    private final SubstationMapper mapper;
    private final SubstationValidator validator;

    @GetMapping
    public ResponseEntity<List<SubstationDto>> getAllSubstation() {
        List<SubstationDto> substations = service.getAllSubstation().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(substations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubstationDto> getById(@PathVariable Integer id) {
        return new ResponseEntity<>(
                mapper.convertToDto(service.getSubstationById(id)), HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<SubstationDto> createSubstation(@RequestBody @Valid SubstationDto substationDto,
                                                          BindingResult bindingResult) {
        Substation created = mapper.convertToModel(substationDto);
        validator.validate(created, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.createSubstation(created);

        return new ResponseEntity<>(mapper.convertToDto(created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubstationDto> updareSubstation(@PathVariable Integer id,
                                                          @RequestBody @Valid SubstationDto substationDto,
                                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.updateSubstation(id, mapper.convertToModel(substationDto));

        return new ResponseEntity<>(substationDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubstation(@PathVariable Integer id) {
        service.deleteSubstation(id);
        return new ResponseEntity<>(String.format(
                "The Substation with the id '%s' has been deleted from the database.", id),
                HttpStatus.OK);
    }

}
