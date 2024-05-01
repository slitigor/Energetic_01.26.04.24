package ru.slitigor.energetic.model.enums;

public enum SGType {
    ORU("ОРУ"),
    ZRU("ЗРУ"),
    KRU("КРУ"),
    KRUN("КРУН");

    private String value;

    SGType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static SGType getTypeByVal(String val) {
        for (SGType t: SGType.values())
            if (t.value.equals(val)) return t;
        return null;
    }
}
