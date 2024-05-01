package ru.slitigor.energetic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.slitigor.energetic.dto.SwitchgearDto;
import ru.slitigor.energetic.mapper.SwitchgearMapper;
import ru.slitigor.energetic.service.SwitchgearService;
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
}
