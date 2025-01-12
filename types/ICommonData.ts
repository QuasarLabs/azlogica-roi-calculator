import type { IFuelManagement, IFuelManagementExpectedResults } from './FuelManagement';
import type { IInventoryManagement, IInventoryManagementExpectedResults } from './inventoryManagement';
import type {IRiskManagement,IRiskManagementExpectedResults} from './IRiskManagement'
import type { IMaintenance, IMaintenanceExpectedResults } from './Maintenance';
import type { IPerfomance, IPerfomanceExpectedResults } from './Perfomance';
import type { IQualityManagement, IQualityManagementExpectedResults } from './QualityManagement';
export default interface ICommonData {
  assets: {
    radio: boolean;
    type: number;
    answer: string;
    numberControlledAssets: number;
  } | null;
  perfomance: (IPerfomance & IPerfomanceExpectedResults )| null;
  riskManagement: (IRiskManagement & IRiskManagementExpectedResults) | null;
  inventoryManagement: (IInventoryManagement & IInventoryManagementExpectedResults) | null;
  fuelManagement: (IFuelManagement & IFuelManagementExpectedResults) | null;
  maintenanceOptimization:(IMaintenance & IMaintenanceExpectedResults) | null;
  qualityManagement:(IQualityManagement & IQualityManagementExpectedResults) | null;
}
