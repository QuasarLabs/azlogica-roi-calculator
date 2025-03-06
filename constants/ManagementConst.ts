import { TYPES_ASSETS } from "./TypesAssets";
export const MANAGEMENT_SELECT_OPTIONS_ELEMENTS = [
  {
    id: TYPES_ASSETS[0].id,
    props: {
      label: TYPES_ASSETS[0].name,
      value: TYPES_ASSETS[0].value,
    },
  },
  {
    id: TYPES_ASSETS[1].id,
    props: {
      label: TYPES_ASSETS[1].name,
      value: TYPES_ASSETS[1].value,
    },
  },
  {
    id: TYPES_ASSETS[2].id,
    props: {
      label: TYPES_ASSETS[2].name,
      value: TYPES_ASSETS[2].value,
    },
  },
  {
    id: TYPES_ASSETS[3].id,
    props: {
      label: TYPES_ASSETS[3].name,
      value: TYPES_ASSETS[3].value,
    },
  },
];

export const ASSET_TYPE_QUESTIONS: Record<number, string> = {
  1: "¿Qué tipo de activos estacionarios desea controlar?",
  2: "¿Qué tipo de activos móviles desea gestionar?",
  3: "¿En qué le gustaría enfocarse al gestionar personas y procesos?",
  4: "¿Qué tipo de otros activos desea controlar?",
};

export const ASSET_COUNT_QUESTIONS: Record<number, string> = {
  1: "¿Cuántos activos desea controlar?",
  2: "¿Cuántos activos desea controlar?",
  3: "¿A cuántas personas desea monitorear?",
  4: "¿Qué tipo de otros activos desea controlar?",
};
