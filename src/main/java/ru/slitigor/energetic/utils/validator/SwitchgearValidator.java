package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.Switchgear;
import ru.slitigor.energetic.repository.SwitchgearRepository;

@Component
@RequiredArgsConstructor
public class SwitchgearValidator implements Validator {
    private final SwitchgearRepository repository;


    @Override
    public boolean supports(Class<?> clazz) {
        return Switchgear.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Switchgear switchgear = (Switchgear) target;
        if (repository.findBySgTypeAndVoltageAndSubstation_Id(switchgear.getSgType(), switchgear.getVoltage(),
                switchgear.getSubstation().getId()).isPresent())
            errors.rejectValue("type", String.format(
                    "The switchgear '%s' in substation '%s' already exists in the database!",
                    switchgear.getSgType(), switchgear.getSubstation().getName()
            ));
    }
}
