package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Address;

import java.util.List;

public interface AddressService {
    Address getAddressByZip(String zip);
    List<Address> getAllAddress();
    Address createAddress(Address address);
    Address updateAddress(String zip, Address address);
    void deleteAddress(String zip);
}
