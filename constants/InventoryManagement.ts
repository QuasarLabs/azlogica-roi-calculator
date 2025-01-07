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
      id: 2,
      title: "Costo de producto", // Стоимость продукции
      desc:'Costo promedio de productos según su proveedor', // Средняя стоимость продукции по данным вашего поставщика
      content: "el-input-number",
      model: "averageCost",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
      },
    },
    {
      id: 3,
      title: "Tamaño de la orden pedida", // Размер заказа заказан
      desc:'Cantidad promedio de productos que le pide a su proveedor',
      content: "el-input-number",
      model: "averageOrderSize",
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
      },
    },
    {
        id: 5,
        title: "Costo de pedir producto", // Количество заказываемой продукции
        desc:'Costo de realizar un pedido al proveedor',
        content: "el-input-number",
        model: "quantityOrderedProducts",
        props: {
          min: 0,
          size: "large",
          placeholder: "Ingrese el valor",
        },
    }
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
        },
      },
]