package ru.slitigor.energetic.model.enums;

public enum Category {
    ADMIN("Администрация"),
    OVB("Оперативный персонал"),
    REM("Ремонтный персонал"),
    SPEC("Специалисты"),
    OTHER("Прочие");

    private String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Category getCategoryByVal(String val) {
        for(Category category: Category.values())
            if (category.getValue().equals(val))
                return category;
        return null;
    }
}
