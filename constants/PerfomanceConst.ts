export const PERFOMANCE_CONST = [
  {
    id:1,
    title: "Cantidad de horas en jornada laboral",
    content: "el-input-number",
    model: "laborHours",
    props: {
      min: 0,
      max: 24,
      step: 1,
      size: "large",
    },
  },
  {
    id:5,
    title: "% de RRHH productivo", 
    content: "el-input-number",
    model: "productiveHRPercentage",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
  },
  {
    id:2,
    title: "Tiempo muerto diario", // Время простоя в день
    content: "el-input-number",
    model: "dailyDowntime",
    props: {
      min: 0.0,
      max: 24.0,
      step: 0.1,
      size: "large",
    },
  },
  {
    id:6,
    title: "Costo de energía mensual",
    content: "el-input-number",
    model: "monthlyEnergyCost",
    props: {
      min: 0,
      size: "large",
    },
  },
  {
    id:3,
    title: "Cantidad de trabajadores",
    content: "el-input-number",
    model: "workerCount",
    props: {
      min: 0,
      size: "large",
    },
  },
  {
    id:7,
    title: "Ingresos mensuales",
    content: "el-input-number",
    model: "monthlyIncome",
    props: {
      min: 0,
      size: "large",
    },
  },

  {
    id:4,
    title: "Valor de la nómina",
    content: "el-input-number",
    model: "payrollValue",
    props: {
      min: 0,
      size: "large",
    },
  },

  {
    id:8,
    title: "Costo de paradas de maquinaria mensuales",
    content: "el-input-number",
    model: "monthlyMachineStopCost",
    props: {
      min: 0,
      size: "large",
    },
  },
  
];

export const PERFOMANCE_EXPECTED_CONST = [
  {
    id: 1,
    title: "% Reducción esperada del tiempo de inactividad",
    content: "el-input-number",
    model: "reduccionTiempoImproductivo",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
    description: "El monitoreo de operadores y equipos reduce el tiempo de inactividad en hasta el 50%",
  },
  {
    id: 2,
    title: "% Reducción esperada de paradas",
    content: "el-input-number",
    model: "reduccionParadas",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
    description: "Las alertas tempranas mediante modelos predictivos pueden reducir el costo de las paradas en un 30-45%",
  },
  {
    id: 3,
    title: "% Productividad esperada del personal",
    content: "el-input-number",
    model: "productividadRRHH",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
    description: "Las plataformas de gestión de personal IoT pueden aumentar la productividad laboral del personal en un 99,99%",
  },
  {
    id: 4,
    title: "% Reducción esperada en costos de energía",
    content: "el-input-number",
    model: "reduccionCostosEnergia",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
    description: "El monitoreo remoto de equipos industriales reduce los costos de energía en un 45-50%",
  },
];
