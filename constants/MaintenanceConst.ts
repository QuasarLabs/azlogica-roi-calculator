export const MAINTENANCE_CONST = [
  {
    id: 1,
    title: "Costo de mantenimiento y/o fallas mensual",
    content: "el-input-number",
    model: "maintenanceCost",
    props: {
      min: 0,
      size: "large",
      placeholder: "Ingrese el valor",
    },
  },
];
export const MAINTENANCE_EXPECTED_CONST = [
  {
    id: 1,
    title: "Reducción en costos de mantenimiento esperados",
    desc:
      "El control estadístico de procesos y la visualización de artículos disminuye la cantidad de productos no conformes entre un 10 y un 20%.",
    content: "el-input-number",
    model: "costReduction",
    props: {
      min: 0,
      max: 100,
      size: "large",
      placeholder: "Ingrese el valor (0%-100%)",
    },
  },
];
