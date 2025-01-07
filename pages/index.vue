<script lang="ts" setup>
import type { ValueOf } from "element-plus/es/components/table/src/table-column/defaults.mjs";
import { STEP_TITLES } from "~/constants/StepTitles";
import type ICommonData from "~/types/ICommonData";
import type IResultData from "~/types/IResultData";
const activeNames = ref(["1"]);
const commonData: ICommonData = reactive({
  assets: null,
  perfomance: null,
  riskManagement: null,
  inventoryManagement: null,
  fuelManagement: null,
  maintenanceOptimization: null,
  qualityManagement: null,
});
const resultData: IResultData = reactive({
  perfomanceResult: null,
});
function updateData(key: keyof ICommonData, newValue: ValueOf<ICommonData>) {
  if (commonData[key]) {
    Object.assign(commonData, { [key]: { ...commonData[key], ...newValue } });
  } else {
    Object.assign(commonData, { [key]: newValue });
  }
}

function updateResultData(key: keyof IResultData, obj: ValueOf<IResultData>) {
  resultData[key] = obj;
}
</script>

<template>
  <div class="container">
    commonData = {{ commonData }}
    <br />
    <br />
    <br />
    resultData = {{ resultData }}
    <el-collapse v-model="activeNames">
      <!-- ШАГ 1 -->
      <el-collapse-item class="" name="1">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[0].name }}</h2>
          </div>
        </template>
        <StepManagementMain @update="updateData" />
      </el-collapse-item>
      <!-- ШАГ 2 -->
      <el-collapse-item name="2">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[1].name }}</h2>
          </div>
        </template>
        <div class="container">
          <StepPerformanceMain @update="updateData" />
          <StepPerformanceExpectedResults @update="updateData" />
          <StepPerformanceResult
            @updateResultData="updateResultData"
            :laborHours="commonData?.perfomance?.laborHours"
            :monthlyIncome="commonData?.perfomance?.monthlyIncome"
            :dailyDowntime="commonData?.perfomance?.dailyDowntime"
            :payrollValue="commonData?.perfomance?.payrollValue"
            :workerCount="commonData?.perfomance?.workerCount"
            :productiveHRPercentage="
              commonData?.perfomance?.productiveHRPercentage
            "
            :monthlyEnergyCost="commonData?.perfomance?.monthlyEnergyCost"
            :monthlyMachineStopCost="
              commonData?.perfomance?.monthlyMachineStopCost
            "
            :expectedDowntimeReduction="
              commonData?.perfomance?.reduccionTiempoImproductivo
            "
            :expectedStopReduction="commonData?.perfomance?.reduccionParadas"
            :expectedEnergyCostReduction="
              commonData?.perfomance?.reduccionCostosEnergia
            "
          />
        </div>
      </el-collapse-item>
      <!-- ШАГ 3 -->
      <el-collapse-item name="3">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[2].name }}</h2>
          </div>
        </template>
        <div class="container">
          <StepRiskManagementMain @update="updateData" />
          <StepRiskManagementExpectedResults @update="updateData" />
          <StepRiskManagementResult
            :stolenAssetsPerMonth="
              commonData?.riskManagement?.stolenAssetsPerMonth
            "
            :assetValue="commonData?.riskManagement?.assetValue"
            :accidentCost="commonData?.riskManagement?.accidentCosts"
            :annualInsurancePremium="
              commonData?.riskManagement?.annualInsurancePremium
            "
            :theftReductionPercentage="
              commonData?.riskManagement?.theftReduction
            "
            :insuranceSavingsPercentage="
              commonData?.riskManagement?.insuranceSavings
            "
            :stopReductionPercentage="commonData?.riskManagement?.stopReduction"
          />
        </div>
      </el-collapse-item>
      <!-- ШАГ 4 -->
      <el-collapse-item name="4">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[3].name }}</h2>
          </div>
        </template>
        <div class="container">
          <StepInventoryMain @update="updateData" />
          <StepInventoryExpectedResults @update="updateData" />
          <StepInventoryResult
            :monthlyDemand="commonData?.inventoryManagement?.monthlyDemand"
            :averageCost="commonData?.inventoryManagement?.averageCost"
            :averageOrderSize="
              commonData?.inventoryManagement?.averageOrderSize
            "
            :maintenanceCost="commonData?.inventoryManagement?.maintenanceCost"
            :orderPlacementCost="
              commonData?.inventoryManagement?.quantityOrderedProducts
            "
            :warehouseReduction="
              commonData?.inventoryManagement?.warehouseReduction
            "
          />
        </div>
      </el-collapse-item>
      <!-- ШАГ 5 -->
      <el-collapse-item name="5">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[4].name }}</h2>
          </div>
        </template>
        <div class="container">
          <StepFuelMain @update="updateData" />
          <StepFuelExpectedResults @update="updateData" />
          <StepFuelResult
            :consumptionControl="commonData?.fuelManagement?.consumptionControl"
            :fuelEconomy="commonData?.fuelManagement?.fuelEconomy"
            :fuelPrice="commonData?.fuelManagement?.fuelPrice"
            :habitSavings="commonData?.fuelManagement?.habitSavings"
            :routeDistance="commonData?.fuelManagement?.routeDistance"
            :routeOptimization="commonData?.fuelManagement?.routeOptimization"
            :controlledAssets="commonData?.assets?.numberControlledAssets"
          />
        </div>
      </el-collapse-item>
      <!-- ШАГ 6 -->
      <el-collapse-item name="6">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[5].name }}</h2>
          </div>
        </template>
        <div class="container">
          <StepMaintenanceMain @update="updateData" />
          <StepMaintenanceExpectedResults @update="updateData" />
          <StepMaintenanceResult
            :maintenanceCost="
              commonData?.maintenanceOptimization?.maintenanceCost
            "
            :expectedCostReduction="
              commonData?.maintenanceOptimization?.costReduction
            "
          />
        </div>
      </el-collapse-item>
      <!-- ШАГ 7 -->
      <el-collapse-item name="7">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[6].name }}</h2>
          </div>
        </template>
        <StepQualityMain @update="updateData" />
        <StepQualityExpectedResults @update="updateData" />
        <StepQualityResult
          @updateResultData="updateResultData"
          :defectiveProductCount="
            commonData?.qualityManagement?.nonConformingProducts
          "
          :productCommercialValue="commonData?.qualityManagement?.productValue"
          :reductionPercentage="
            commonData?.qualityManagement?.nonConformingProductReduction
          "
          :maintenanceCost="
            commonData?.maintenanceOptimization?.maintenanceCost
          "
        />
      </el-collapse-item>
    </el-collapse>
    <!-- <TheCalculatorResult/> -->
  </div>
</template>
