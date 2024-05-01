package ru.slitigor.energetic.model.enums;

public enum TypeTO {
    N("Н"),
    K("К"),
    K1("К1"),
    V("В"),
    O("О"),
    OSM("ОСМ"),
    TK("ТК"),
    PR("Прочее");

    private String value;

    TypeTO(String value) {
    this.value = value;
    }

    public String getValue(){
        return value;
    }

    public static TypeTO getTypeTOByVal(String val) {
        for(TypeTO tto: TypeTO.values())
            if(tto.getValue().equals(val))
                return tto;
        return null;
    }
}