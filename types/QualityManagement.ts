export interface IQualityManagement {
  nonConformingProducts: number; // Ежемесячное количество несоответствующей продукции
  productValue: number; // Коммерческая ценность продукции
}

export interface IQualityManagementExpectedResults {
  nonConformingProductReduction: number; // Reducción de productos no conformes (%)
}
