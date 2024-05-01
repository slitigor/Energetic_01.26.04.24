package ru.slitigor.energetic.model.enums;

public enum PSSchema {
    SCHEMA_110_35_10("110/35/10 кВ"),
    SCHEMA_110_35_6("110/35/6 кВ"),
    SCHEMA_110_10("110/10 кВ"),
    SCHEMA_110_6("110/6 кВ"),
    SCHEMA_35_10("35/10 кВ"),
    SCHEMA_35_6("35/6 кВ");

    private String value;

    PSSchema(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static PSSchema getSchemaByVal(String val) {
        for(PSSchema schema: PSSchema.values()) {
            if (schema.getValue().equals(val))
                return schema;
        }
        return null;
    }
}
