export const ISLAND_0_LOCATION = 5; //Dragon Bottom
export const ISLAND_1_LOCATION = 14; //Dragon Top
export const ISLAND_2_LOCATION = 108; //HR Republic
export const ISLAND_3_LOCATION = 179; //Montaville
export const ISLAND_4_LOCATION = 202; //Lion Island
export const ISLAND_5_LOCATION = 240; //Noyarc
export const ISLAND_6_LOCATION = 336; //Fuler
export const ISLAND_7_LOCATION = 381; //Rico
export const ISLAND_8_LOCATION = 499; //Tamu
export const ISLAND_9_LOCATION = 542; //Shor
export const ISLAND_10_LOCATION = 676; //Keoni
export const ISLAND_11_LOCATION = 670; //Eagle Top
export const ISLAND_12_LOCATION = 708; //Eagle Botton

export const DRAGON_ISLAND_ID = 0;
export const HR_REPUBLIC_ISLAND_ID = 1;
export const MONTAVILLE_ISLAND_ID = 2;
export const LION_ISLAND_ID = 3;
export const NOYARC_ISLAND_ID = 4;
export const FULER_ISLAND_ID = 5;
export const RICO_ISLAND_ID = 6;
export const TAMU_ISLAND_ID = 7;
export const SHOR_ISLAND_ID = 8;
export const KEONI_ISLAND_ID = 9;
export const EAGLE_ISLAND_ID = 10;

//TODO: island names / capture point names?
//TODO: use actual island names in these constants, easier to reset / change later (don't reference numbers if you don't have to)
//TODO: probably rethink this file, and possible the database naming convention for island (flag) positions?

export const ALL_ISLAND_LOCATIONS = [
    ISLAND_0_LOCATION,
    ISLAND_1_LOCATION,
    ISLAND_2_LOCATION,
    ISLAND_3_LOCATION,
    ISLAND_4_LOCATION,
    ISLAND_5_LOCATION,
    ISLAND_6_LOCATION,
    ISLAND_7_LOCATION,
    ISLAND_8_LOCATION,
    ISLAND_9_LOCATION,
    ISLAND_10_LOCATION,
    ISLAND_11_LOCATION,
    ISLAND_12_LOCATION
];

export const ALL_ISLAND_NAMES = {
    0: "Dragon Island",
    1: "Dragon Island",
    2: "H.R. Republic",
    3: "Montaville",
    4: "Lion Island",
    5: "Noyarc",
    6: "Fuler Island",
    7: "Rico Island",
    8: "Tamu Island",
    9: "Shor",
    10: "Keoni",
    11: "Eagle Island",
    12: "Eagle Island"
};

export let ISLAND_POINTS = {};
ISLAND_POINTS[DRAGON_ISLAND_ID] = 5;
ISLAND_POINTS[HR_REPUBLIC_ISLAND_ID] = 5;
ISLAND_POINTS[MONTAVILLE_ISLAND_ID] = 5;
ISLAND_POINTS[LION_ISLAND_ID] = 5;
ISLAND_POINTS[NOYARC_ISLAND_ID] = 5;
ISLAND_POINTS[FULER_ISLAND_ID] = 5;
ISLAND_POINTS[RICO_ISLAND_ID] = 5;
ISLAND_POINTS[TAMU_ISLAND_ID] = 5;
ISLAND_POINTS[SHOR_ISLAND_ID] = 5;
ISLAND_POINTS[KEONI_ISLAND_ID] = 5;
ISLAND_POINTS[EAGLE_ISLAND_ID] = 5;

export const LAND_TYPE = "land";
export const WATER_TYPE = "water";

export const AIRFIELD_TYPE = "airfield";
export const MISSILE_SILO_TYPE = "missile";
export const FLAG_TYPE = "flag";

export const AIRFIELD_TITLE = "Airfield";
export const MISSILE_SILO_TITLE = "Missile Silo";

export const IGNORE_TITLE_TYPES = [LAND_TYPE, WATER_TYPE];

//TODO: airfield locations
//TODO: missile silos
