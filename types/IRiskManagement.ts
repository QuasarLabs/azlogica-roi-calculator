export interface IRiskManagement {
  stolenAssetsPerMonth: number;
  assetValue: number;
  accidentCosts: number;
  annualInsurancePremium: number;
}


export interface IRiskManagementExpectedResults {
  stopReduction: number;
  insuranceSavings: number;
  theftReduction: number;
}
