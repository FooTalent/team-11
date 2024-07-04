package com.dev.foo.footalentpet.utils;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class TagConstants {
    public static final Set<String> PREDEFINED_TAGS;

    static {
        PREDEFINED_TAGS = Set.of("Manchas", "Cicatriz", "Cola cortada", "Orejas caídas", "Orejas erguidas", "Vacunado", "Desparasitado", "Castrado", "Tratamiento especial", "Discapacidad",
                "Cachorro", "Joven", "Adulto", "Pequeño", "Mediano", "Grande", "Pelo corto", "Pelo largo");
    }
}
