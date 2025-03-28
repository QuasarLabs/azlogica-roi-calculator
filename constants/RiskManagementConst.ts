import { COLOMBIAN_PESO } from "./shared";

export const RISK_MANAGEMENT_EXPECTED_TITLE = `Resultados esperados de gestión del riesgo`

export const RISK_MANAGEMENT_CONST = [
    {
      id: 1,
      title: "Cantidad de activos hurtados por mes", // Сумма украденных активов за месяц
      model: "stolenAssetsPerMonth",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
      },
    },
    {
      id: 3,
      title: "Costo de accidentes", // Стоимость аварии
      model: "accidentCosts",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
        prefix: COLOMBIAN_PESO
      },
      description: "Costo de los accidentes por mes",
    },
    {
      id: 2,
      title: "Valor de los activos hurtados por mes", // стоимость активов
      model: "assetValue",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
        prefix: COLOMBIAN_PESO
      },
      description: "Valor de los activos",
    },
    {
      id: 4,
      title: "Valor de prima de seguros anual",
      model: "annualInsurancePremium",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
         prefix: COLOMBIAN_PESO
      },
      description: "Valor de la prima de seguros anual",
    },
    {
      id: 4,
      title: "Descripción de accidentes",
      model: "descriptionAccident",
      content: 'el-input',
      props: {
        size: "large",
        placeholder: "Escriba una descripción"
      },
      description: "Describe los accidentes ocurridos",
    },
];



export const RISK_MANAGEMENT_EXPECTED_CONST = [
  {
    id: 1,
    title: "% de disminución de accidentes esperado", 
    //  % ожидаемого сокращения несчастных случаев
    model: "expectedAccidentGap",
    content: 'el-input-number',
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix:'%'
    },
    description: "Compañías que usan programas de calificación de desempeño de conductores (hasta 50% de mejora estimada)",
  },
  {
    id: 3,
    title: "% de disminución de hurtos esperado",
    // % ожидаемого снижения краж
    model: "expectedReductionThefts",
    content: 'el-input-number',
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix:'%'
    },
    description: "El monitoreo y control de activos mediante plataformas IoT puede reducir el número de hurtos en un 95 %. ",
  },
  {
    id: 2,
    title: "% de ahorros en pólizas esperado",
    // % ожидаемой экономии от политики
    model: "expectedSavingsFromPolicy",
    content: 'el-input-number',
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
      prefix:'%'
    },
    description: "Los ahorros por la gestión de accidentes mediante este programa pueden alcanzar hasta un 50 % del costo total de la prima",
  },

]

export const RISK_MANAGEMENT_RESULT_LABELS = {
  MONTHLY_RISK_COSTS: { name: "Costos de riesgos mensuales", model: "monthlyRiskCosts",prefix:COLOMBIAN_PESO },
  MONTHLY_RISK_SAVINGS: { name: "Ahorros de riesgos mensuales", model: "monthlyRiskSavings",prefix:COLOMBIAN_PESO },
};