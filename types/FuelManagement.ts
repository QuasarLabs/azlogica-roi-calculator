export interface IFuelManagement {
  fuelEconomy: number, // Экономия топлива (в км на галлон)
  fuelPrice: number,   // Цена топлива за галлон
  routeDistance: number, // Пройденное расстояние по маршрутам

  }
  
  
  export interface IFuelManagementExpectedResults {
    expectedRouteOptimization:number, // Ожидаемая оптимизация маршрута (в %)
    expectedHabitSavings: number, // Экономия за счет улучшения привычек (в %)
    expectedConsumptionControl: number, // Ожидаемый контроль потребления (в %)
    
  }
  