package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.SwitchgearDto;
import ru.slitigor.energetic.mapper.SwitchgearMapper;
import ru.slitigor.energetic.model.Switchgear;
import ru.slitigor.energetic.service.SwitchgearService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.SwitchgearValidator;

import java.util.List;

@RestController
@RequestMapping("/switchgear")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class SwitchgearController {
    private final SwitchgearService service;
    private final SwitchgearMapper mapper;
    private final SwitchgearValidator validator;

    @GetMapping
    public ResponseEntity<List<SwitchgearDto>> getAllSwGear() {
        List<SwitchgearDto> swGear = service.getAllSwitchgear().stream().map(mapper::convertToDto).toList();
        return new ResponseEntity<>(swGear, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SwitchgearDto> getById(@PathVariable Long id) {
        return new ResponseEntity<>(mapper.convertToDto(service.getSwitchgearById(id)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SwitchgearDto> createSwGear(@RequestBody @Valid SwitchgearDto switchgearDto,
                                                      BindingResult bindingResult) {
        Switchgear created = mapper.convertToModel(switchgearDto);
        validator.validate(created, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.createSwitchgear(created);

        return new ResponseEntity<>(mapper.convertToDto(created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SwitchgearDto> updateSwGear(@PathVariable Long id,
                                                      @RequestBody @Valid SwitchgearDto switchgearDto,
                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.updateSwitchgear(id, mapper.convertToModel(switchgearDto));

        return new ResponseEntity<>(switchgearDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSwGear(@PathVariable Long id) {
        service.deleteSwitchgear(id);
        return new ResponseEntity<>(String.format(
                "The Switchgear with the id '%s' has been deleted from the database.", id),
                HttpStatus.OK
        );
    }

}
