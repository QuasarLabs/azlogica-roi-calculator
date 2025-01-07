export const QUALITY_MANAGEMENT_CONST = [
    {
      id: 1,
      title: "Cantidad de productos no conformes mensual",
      model: "nonConformingProducts",
      content: "el-input-number",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
      },
    },
    {
      id: 2,
      title: "Valor comercial de productos ",
      model: "productValue",
      content: "el-input-number",
      props: {
        min: 0,
        size: "large",
        placeholder: "Ingrese el valor",
      },
    },
  ];
  
export const QUALITY_EXPECTED_CONST = [
  {
    id: 1,
    title: "Reducción de productos no conformes",
    desc: "El control estadístico de procesos y la visualización de artículos.disminuye la cantidad de productos no conformes entre un 10 y un 20% ",
    model: "nonConformingProductReduction",
    content: "el-input-number",
    props: {
      min: 0,
      size: "large",
      placeholder: "Ingrese el valor",
    },
  },
]