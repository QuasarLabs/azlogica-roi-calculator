import { COLOMBIAN_PESO } from "./shared";


export const INVENTORY_EXPECTED_TITLE = `Resultados productivos esperados`

export const INVENTORY_MANAGEMENT_CONST = [
    {
      id: 1,
      title: "Demanda mensual de producto", // Ежемесячная потребность в продукции
      desc:'Demanda promedio de productos por mes',
      content: "el-input-number",
      model: "monthlyDemand",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
      },
    },
    {
      id: 4,
      title: "Costo de mantenimiento de producto", // Стоимость обслуживания продукта
      desc:'Costo de mantener un producto en inventario.teniendo en cuenta riesgos y costos de bodega ',
      content: "el-input-number",
      model: "productMaintenanceCost",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
        prefix: COLOMBIAN_PESO
      },
    },
    {
      id: 2,
      title: "Costo de producto", // Стоимость продукции
      desc:'Costo promedio de productos según su proveedor', // Средняя стоимость продукции по данным вашего поставщика
      content: "el-input-number",
      model: "averageCost",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
        prefix: COLOMBIAN_PESO
      },
    },
    {
      id: 5,
      title: "Costo de pedir producto", // Стоимость размещения заказа у поставщика
      desc:'Costo de realizar un pedido al proveedor',
      content: "el-input-number",
      model: "quantityOrderedProducts",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
        prefix: COLOMBIAN_PESO
      },
  },
    {
      id: 3,
      title: "Tamaño de la orden pedida", // Количество заказываемой продукции
      desc:'Cantidad promedio de productos que le pide a su proveedor',
      content: "el-input-number",
      model: "averageOrderSize",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
      },
    },
];
  
export const INVENTORY_EXPECTED_CONST = [
    {
        id: 1,
        title: "% de reducción de producto en bodega",
        description: "El control adecuado de inventarios reduce las cantidades en bodega hasta en un 50%.",
        content: "el-input-number",
        model: "warehouseReduction",
        props: {
          min: 0,
          max: 100,
          step: 1,
          size: "large",
          placeholder: "Ingrese %",
          prefix:'%'
        },
      },
      {
        id: 2,
        title: "Precisión de pronósticos",
        description: "Controlar inventarios con IoT puede aumentar la precición de los pronósticos en un 85%.",
        content: "el-input-number",
        model: "forecastAccuracy",
        props: {
          min: 0,
          max: 100,
          step: 1,
          size: "large",
          placeholder: "Ingrese %",
          prefix:'%'
        },
      },
]


export const INVENTORY_LABELS = {
  MONTHLY_INVENTORY_COST: { name: "Costos de inventarios mensual", model: "monthlyInventoryCost",    prefix:COLOMBIAN_PESO
  },
  MONTHLY_INVENTORY_SAVINGS: { name: "Ahorro de inventarios mensual", model: "monthlyInventorySavings",    prefix:COLOMBIAN_PESO
  },
};
