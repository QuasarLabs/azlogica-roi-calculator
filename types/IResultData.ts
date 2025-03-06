export default interface IResultData {
    perfomanceResult:{
        monthlyProductionCosts:string,
        monthlyProductionSavings:string
    } | null,
    riskManagementResult:{
        monthlyRiskCosts: string,
        monthlyRiskSavings: string,
    } | null,
    inventoryResult:{
        monthlyInventoryCost: string,
        monthlyInventorySavings: string,
    } | null,
    fuelResult:{
        fuelCost: string,
        fuelSavings: string,
    } | null,
    qualityResult:{
        totalMaintenanceCost:string,
    } | null,
    maintenanceResult:{
        monthlyMaintenanceCosts: string,
        savingsOnMaintenance: string,
    }  | null,
}