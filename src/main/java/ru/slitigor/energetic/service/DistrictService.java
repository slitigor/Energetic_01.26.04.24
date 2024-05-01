package ru.slitigor.energetic.service;


import ru.slitigor.energetic.model.District;

import java.util.List;

public interface DistrictService {
    District getDistrictByName(String name);
    List<District> getAllDistricts();
    District createDistrict(District district);
    District updateDistrict(String name, District district);
    void deleteDistrict(String name);
}
