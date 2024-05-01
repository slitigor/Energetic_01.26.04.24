package ru.slitigor.energetic.model.enums;

public enum Section {
    IN_TORO("в ТОРО"),
    WITHOUT_TORO("вне ТОРО"),
    IRREGULAR("Нерегламентные работы"),
    LOSS_OF_TIME("Технологические потери времени"),
    LACK_OF("Отсутствие");

    private String value;

    private Section(String value) {
        this.value = value;
    }

    public String getValue() { return value; }

    public static Section getSectionByVal(String val) {
        for (Section s: Section.values())
            if (s.getValue().equals(val))
                return s;
        return null;
    }
}
