import type { IFuelManagement, IFuelManagementExpectedResults } from './FuelManagement';
import type { IInventoryManagement, IInventoryManagementExpectedResults } from './inventoryManagement';
import type {IRiskManagement,IRiskManagementExpectedResults} from './IRiskManagement'
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
  riskManagement: (IRiskManagement & IRiskManagementExpectedResults) | null;
  inventoryManagement: (IInventoryManagement & IInventoryManagementExpectedResults) | null;
  fuelManagement: (IFuelManagement & IFuelManagementExpectedResults) | null;
}
