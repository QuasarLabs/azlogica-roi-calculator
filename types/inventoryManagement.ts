export interface IInventoryManagement {
  monthlyDemand: number;
  averageCost: number;
  averageOrderSize: number;
  maintenanceCost: number;
  quantityOrderedProducts:number,
}

export interface IInventoryManagementExpectedResults {
  warehouseReduction: number, // % уменьшения товара на складе
  forecastAccuracy: number, // % точности прогноза
}