package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.BusBarDto;
import ru.slitigor.energetic.mapper.BusBarMapper;
import ru.slitigor.energetic.model.BusBar;
import ru.slitigor.energetic.service.BusBarService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.BusBarValidator;

import java.util.List;

@RestController
@RequestMapping("/bus-bar")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class BusBarController {
    private final BusBarService service;
    private final BusBarMapper mapper;
    private final BusBarValidator validator;

    @GetMapping("/{id}")
    public ResponseEntity<BusBarDto> getBusBarById(@PathVariable Long id) {
        return new ResponseEntity<>(mapper.convertToDto(service.getBusBarById(id)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BusBarDto>> getAllBusBar() {
        List<BusBarDto> bbList = service.getAllBB().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(bbList , HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BusBarDto> createBB(@RequestBody @Valid BusBarDto busBarDto,
                                              BindingResult bindingResult) {
        BusBar created = mapper.convertToModel(busBarDto);
        validator.validate(created, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.createBusBar(created);

        return new ResponseEntity<>(mapper.convertToDto(created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusBarDto> updateBB(@PathVariable Long id,
                                              @RequestBody @Valid BusBarDto busBarDto,
                                              BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.updateBusBar(id, mapper.convertToModel(busBarDto));

        return new ResponseEntity<>(busBarDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBB(@PathVariable Long id) {
        service.deleteBusBar(id);
        return new ResponseEntity<>(String.format(
                "The BusBar with the id '%s' has been deleted from the database.", id
        ), HttpStatus.OK);
    }
}
