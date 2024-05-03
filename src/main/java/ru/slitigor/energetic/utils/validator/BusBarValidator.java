package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.BusBar;
import ru.slitigor.energetic.repository.BusBarRepository;

@Component
@RequiredArgsConstructor
public class BusBarValidator implements Validator {
    private final BusBarRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return BusBar.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        BusBar busBar = (BusBar) target;
        if (repository.findByIsSectionAndNumbAndSwitchgear_Id(busBar.getIsSection(),
                busBar.getNumb(), busBar.getSwitchgear().getId()).isPresent())
            errors.rejectValue("type", String.format(
                    "The %s %s kV %s %s already exists in the database!",
                    busBar.getSwitchgear().getSgType(), busBar.getSwitchgear().getVoltage(), busBar.getNumb(),
                    busBar.getIsSection() ? "С" : "СШ"
            ));
    }
}
