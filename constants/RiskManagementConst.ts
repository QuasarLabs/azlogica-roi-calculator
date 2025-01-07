export const RISK_MANAGEMENT_CONST = [
    {
      id: 1,
      title: "Cantidad de activos hurtados por mes",
      model: "stolenAssetsPerMonth",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
      },
      description: "Cantidad de activos hurtados por mes",
    },
    {
      id: 2,
      title: "Valor de los activos",
      model: "assetValue",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
      },
      description: "Valor de los activos",
    },
    {
      id: 3,
      title: "Costo de accidentes",
      model: "accidentCosts",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
      },
      description: "Costo de los accidentes",
    },
    {
      id: 4,
      title: "Valor de prima de seguros anual",
      model: "annualInsurancePremium",
      content: 'el-input-number',
      props: {
        min: 0,
        size: "large",
      },
      description: "Valor de la prima de seguros anual",
    },
];
export const RISK_MANAGEMENT_EXPECTED_CONST = [
  {
    id: 1,
    title: "% de disminución de paradas esperado",
    model: "stopReduction",
    content: 'el-input-number',
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
    description: "Las advertencias tempranas mediante modelos predictivos pueden reducir el costo de las paradas en un 30–45 %",
  },
  {
    id: 2,
    title: "% de ahorros en pólizas esperado",
    model: "insuranceSavings",
    content: 'el-input-number',
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
    description: "Los ahorros por la gestión de accidentes mediante este programa pueden alcanzar hasta un 50 % del costo total de la prima.",
  },
  {
    id: 3,
    title: "% de disminución de hurtos esperado",
    model: "theftReduction",
    content: 'el-input-number',
    props: {
      min: 0,
      max: 100,
      step: 1,
      size: "large",
    },
    description: "El monitoreo y control de activos mediante plataformas IoT puede reducir el número de hurtos en un 95 %. ",
  },
]