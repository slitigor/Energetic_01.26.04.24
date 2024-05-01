package ru.slitigor.energetic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.slitigor.energetic.mapper.DistrictMapper;
import ru.slitigor.energetic.service.DistrictService;
import ru.slitigor.energetic.utils.validator.DistrictValidator;

@RestController
@RequestMapping("/district")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class DistrictController {
    private final DistrictService service;
    private final DistrictValidator validator;
    private final DistrictMapper mapper;


}
