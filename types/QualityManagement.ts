export interface IQualityManagement {
  nonConformingProducts: number; // Ежемесячное количество несоответствующей продукции
  productValue: number; // Коммерческая ценность продукции
}

export interface IQualityManagementExpectedResults {
  nonConformingProductReduction: 0; // Reducción de productos no conformes (%)
}
