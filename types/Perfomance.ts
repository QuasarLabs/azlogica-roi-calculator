export interface IPerfomance {
    laborHours: number,
    dailyDowntime: number,
    workerCount: number,
    payrollValue: number,
    productiveHRPercentage: number,
    monthlyEnergyCost: number,
    monthlyIncome: number,
    monthlyMachineStopCost: number,
}

export interface IPerfomanceExpectedResults {
    reducingExpectedDowntime: number,
    expectedProductividadRRHH: number,
    expectedReductioEnergyCosts: number,
    reductionExpectedShutdowns: number,
}