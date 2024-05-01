package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.Address;
import ru.slitigor.energetic.repository.AddressRepository;

@Component
@RequiredArgsConstructor
public class AddressValidator implements Validator {
    private final AddressRepository repository;
    @Override
    public boolean supports(Class<?> clazz) {
        return Address.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Address address = (Address) target;
        if (repository.findByZip(address.getZip()).isPresent())
            errors.rejectValue("postalCode", String.format(
                    "The address with the specified zip code '%s' already exists in the database.",
                    address.getZip()));
    }
}
