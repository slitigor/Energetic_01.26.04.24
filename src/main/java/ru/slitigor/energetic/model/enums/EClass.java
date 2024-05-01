package ru.slitigor.energetic.model.enums;

public enum EClass {
    SWITCHING_DEVICE("Коммутационный аппарат"),
    TRANSFORMERS("Трансформаторы"),
    SPARK_GAP("Разрядники, ОПНы"),
    SECONDARY_EQUIPMENT("Вторичное оборудование");

    private String value;

    EClass(String value) {
        this.value = value;
    }

    public String getValue() { return value; }

    public EClass getEClassByVal(String val) {
        for (EClass eClass: EClass.values())
            if (eClass.getValue().equals(val)) return eClass;
        return null;
    }
}
