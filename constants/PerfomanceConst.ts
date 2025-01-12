import { COLOMBIAN_PESO } from "./shared";

export const PERFOMANCE_CONST = [
  {
    id:1,
    title: "Cantidad de horas en jornada laboral", // Количество часов в рабочем дне
    content: "el-input-number",
    model: "laborHours",
    props: {
      min: 0,
      max: 23.9,
      step: 1,
      size: "large",
    },
  },
  {
    id:5,
    title: "% de RRHH productivo", // % продуктивного персонала
    content: "el-input-number",
    model: "productiveHRPercentage",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix: '%'
    },
  },
  {
    id:2,
    title: "Tiempo muerto diario", // Время простоя в день
    content: "el-input-number",
    model: "dailyDowntime",
    props: {
      min: 0.0,
      max: 23.9,
      step: 0.1,
      size: "large",
    },
  },
  {
    id:6,
    title: "Costo de energía mensual", // Ежемесячная стоимость энергии
    content: "el-input-number",
    model: "monthlyEnergyCost",
    props: {
      min: 0,
      size: "large",
      prefix: COLOMBIAN_PESO
    },
  },
  {
    id:3,
    title: "Cantidad de trabajadores", // Количество работников
    content: "el-input-number",
    model: "workerCount",
    props: {
      min: 0,
      size: "large",
    },
  },
  {
    id:7,
    title: "Ingresos mensuales", // Ежемесячный доход
    content: "el-input-number",
    model: "monthlyIncome",
    props: {
      min: 0,
      size: "large",
      prefix: COLOMBIAN_PESO
    },
  },

  {
    id:4,
    title: "Valor de la nómina", // Сумма заработной платы
    content: "el-input-number",
    model: "payrollValue",
    props: {
      min: 0,
      size: "large",
      prefix: COLOMBIAN_PESO
    },
  },

  {
    id:8,
    title: "Costo de paradas de maquinaria mensuales", //Стоимость ежемесячных остановок техники
    content: "el-input-number",
    model: "monthlyMachineStopCost",
    props: {
      min: 0,
      size: "large",
      prefix: COLOMBIAN_PESO
    },
  },
  
];

export const PERFOMANCE_EXPECTED_CONST = [
  {
    id: 1,
    title: "% de reducción de tiempo improductivo esperado", // % сокращения ожидаемого времени простоя
    content: "el-input-number",
    model: "reducingExpectedDowntime",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix:"%"
    },
    description: "El monitoreo de operadores y equipos reduce el tiempo de inactividad en hasta el 50%",
  },
  {
    id: 3,
    title: "% de productividad de RRHH esperado", // % ожидаемой производительности персонала
    content: "el-input-number",
    model: "expectedProductividadRRHH",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix: '%'
    },
    description: "Plataformas de IoT de gestión de personal pueden aumentar la productividad de RRHH en un 99,99%",
  },
  {
    id: 2,
    title: "% de disminución de paradas esperado", // % сокращения ожидаемых остановок
    content: "el-input-number",
    model: "reductionExpectedShutdowns",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix: '%'
    },
    description: "Las alertas tempranas con modelos predictivos pueden reducir el costo de paradas entre un 30 a un 45%",
  },
  {
    id: 4,
    title: "% esperado de disminución de costos de energía", // Ожидаемое процентное снижение затрат на электроэнергию
    description:'El monitoreo remoto de maquinaria industrial.Reduce entre el 45 a 50% de costos de energía',
    content: "el-input-number",
    model: "expectedReductioEnergyCosts",
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix: '%'
    },
  },
];
