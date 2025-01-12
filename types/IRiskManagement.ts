export interface IRiskManagement {
  stolenAssetsPerMonth: number;
  assetValue: number;
  accidentCosts: number;
  annualInsurancePremium: number;
}


export interface IRiskManagementExpectedResults {
  expectedAccidentGap: number,
  expectedSavingsFromPolicy: number, 
  expectedReductionThefts: number, 
}
