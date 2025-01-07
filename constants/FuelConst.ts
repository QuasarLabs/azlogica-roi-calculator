export const FUEL_CONST = [
  {
    id: 1,
    title: "Economía de combustible",
    desc: "Ahorro de combustible (en km por galón)",
    content: "el-input-number",
    model: "fuelEconomy",
    props: {
      min: 0,
      step: 1,
      size: "large",
    },
  },
  {
    id: 2,
    title: "Precio de combustible por galón",
    desc: "Precio del combustible por galón",
    content: "el-input-number",
    model: "fuelPrice",
    props: {
      min: 0,
      step: 0.01,
      size: "large",
    },
  },
  {
    id: 3,
    title: "Distancia recorrida en rutas",
    desc: "Distancia recorrida por las rutas",
    content: "el-input-number",
    model: "routeDistance",
    props: {
      min: 0,
      step: 1,
      size: "large",
    },
  },
];
export const FUEL_EXPECTED_CONST = [
  {
    id: 1,
    title: "Optimización de desempeño de rutas esperado",
    subtitle: "Optimización esperada del rendimiento de la ruta",
    description:
      "Las empresas de telemetría informan ahorros promedio del 16%.<br />Telematics companies report average savings of 16%.",
    content: "el-input-number",
    model: "routeOptimization",
    props: {
      min: 0,
      max: 100,
      size: "large",
      placeholder: "Ingrese el valor (0%-100%)",
    },
  },
  {
    id: 2,
    title: "Ahorro por mejoramiento de hábitos esperado",
    subtitle:
      "Ahorro esperado debido a la mejora de los hábitos (de los conductores)",
    description:
      "Conducir de manera más eficiente puede mejorar el rendimiento del galón hasta en un 33%.<br />More efficient driving can improve fuel economy by up to 33%.",
    content: "el-input-number",
    model: "habitSavings",
    props: {
      min: 0,
      max: 100,
      size: "large",
      placeholder: "Ingrese el valor (0%-100%)",
    },
  },
  {
    id: 3,
    title: "Control de consumo esperado",
    subtitle: "Control esperado del consumo",
    description:
      "Un control del uso del consumo puede ahorrar hasta un 13%.<br />According to telematics companies, consumption control can save up to 13%.",
    content: "el-input-number",
    model: "consumptionControl",
    props: {
      min: 0,
      max: 100,
      size: "large",
      placeholder: "Ingrese el valor (0%-100%)",
    },
  },
];
