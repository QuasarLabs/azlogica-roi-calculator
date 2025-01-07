export interface IFuelManagement {
  fuelEconomy: number, // Экономия топлива (в км на галлон)
  fuelPrice: number,   // Цена топлива за галлон
  routeDistance: number, // Пройденное расстояние по маршрутам

  }
  
  
  export interface IFuelManagementExpectedResults {
    routeOptimization: number, // Ожидаемая оптимизация маршрута (в %)
    habitSavings: number, // Экономия за счет улучшения привычек (в %)
    consumptionControl: number, // Ожидаемый контроль потребления (в %)
  
  }
  