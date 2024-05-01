package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.repository.DistrictRepository;

@Component
@RequiredArgsConstructor
public class DistrictValidator implements Validator {
    public final DistrictRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return District.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        District district = (District) target;
        if (repository.findByName(district.getName()).isPresent())
            errors.rejectValue("name", String.format(
                    "The district named '%s' already exists in the database!", district.getName()));
    }
}
