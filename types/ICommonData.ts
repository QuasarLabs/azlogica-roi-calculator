export default interface ICommonData {
  assets: {
    radio: boolean;
    type: number;
    answer: string;
    numberControlledAssets: number;
  } | null;
  perfomance: {
    laborHours: number;
    dailyDowntime: number;
    workerCount: number;
    payrollValue: number;
    productiveHRPercentage: number;
    monthlyEnergyCost: number;
    monthlyIncome: number;
    monthlyMachineStopCost: number;
    reduccionTiempoImproductivo: number;
    productividadRRHH: number;
    reduccionCostosEnergia: number;
    reduccionParadas: number;
  } | null;
}
