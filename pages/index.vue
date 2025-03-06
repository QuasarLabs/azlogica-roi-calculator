<script lang="ts" setup>
import { STEP_TITLES } from "~/constants/StepTitles";
import { PrintingService } from "~/services/PrintingService";
import type ICommonData from "~/types/ICommonData";
import type IResultData from "~/types/IResultData";
import { ref, reactive } from "vue";

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
  riskManagementResult: null,
  inventoryResult: null,
  fuelResult: null,
  qualityResult: null,
  maintenanceResult: null,
});

const globalResultData = reactive({
  totalMonthlySavings: null,
  systemCost: null,
  netMonthlySavings: null,
  totalAnnualSavings: null,
  annualSystemCost: null,
  netAnnualSavings: null,
  roi: null,
});

/**
 * Обновляет данные commonData
 */
function updateData(key: keyof ICommonData, newValue: Partial<ICommonData[keyof ICommonData]>) {
  if (commonData[key] && commonData[key] !== null) {
    Object.assign(commonData[key], newValue);
  } else {
    commonData[key] = newValue as any; // Приводим к типу, так как commonData[key] может быть null
  }
}

/**
 * Обновляет глобальные данные результата
 */
function updateGlobalResultData(newData: Partial<typeof globalResultData>) {
  Object.assign(globalResultData, newData);
}

/**
 * Обновляет данные результата
 */
 function updateResultData<K extends keyof IResultData>(
  key: K,
  obj: Partial<NonNullable<IResultData[K]>>
) {
  if (resultData[key]) {
    Object.assign(resultData[key], obj);
  } else {
    resultData[key] = obj as IResultData[K]; // Приведение типов, если поле было null
  }
}
const pdfContent = ref<string | null>(null);

/**
 * Генерирует HTML и отправляет на сервер
 */
const generateAndSendPDF = async (userEmail:string) => {
  pdfContent.value = getResultHtmlMarkup() || "";
  if (!pdfContent.value) return;

  try {
    await sendHTMLToBackend(pdfContent.value,userEmail);
  } catch (error) {
    console.error("❌ Ошибка при отправке HTML:", error);
  }
};

/**
 * Отправляет HTML на сервер
 */
 const sendHTMLToBackend = async (htmlContent, userEmail:string) => {
  const formData = new FormData();
  formData.append("html", new Blob([htmlContent], { type: "text/html" }), "report.html");
  formData.append("email", userEmail); // Append the email to the form data

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("📨 Ответ сервера:", result);
  } catch (error) {
    console.error("❌ Ошибка сети:", error);
  }
};


/**
 * Генерирует HTML-структуру отчета
 */
function getResultHtmlMarkup(): string {
  const printServiceInstance = new PrintingService();
  printServiceInstance.setData({
    ...commonData,
    ...resultData,
    finalResults: globalResultData,
  });

  return printServiceInstance.generateHtmlResult().outerHTML ?? "";
}
</script>

<template>
  <div class="container">
    <el-collapse>
      <!-- ШАГ 1 -->
      <el-collapse-item name="1">
        <template #title>
          <div class="section-step">
            <BaseIcon :icon="`material-symbols:circle`" />
            <h2 class="step-title">{{ STEP_TITLES[0].name }}</h2>
          </div>
        </template>
        <div>
          <StepManagementMain @update="updateData" />
        </div>
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
            :monthlyEnergyCost="commonData?.perfomance?.monthlyEnergyCost"
            :monthlyMachineStopCost="commonData?.perfomance?.monthlyMachineStopCost"
            :percentageReductionExpectedStops="
              commonData?.perfomance?.reducingExpectedDowntime
            "
            :expectedPercentageReductionEnergyCosts="
              commonData?.perfomance?.expectedReductioEnergyCosts
            "
            :expectedProductividadRRHH="commonData?.perfomance?.expectedProductividadRRHH"
            :percentageProductiveStaff="commonData?.perfomance?.productiveHRPercentage"
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
            @updateResultData="updateResultData"
            :stolenAssetsPerMonth="commonData?.riskManagement?.stolenAssetsPerMonth"
            :assetValue="commonData?.riskManagement?.assetValue"
            :accidentCost="commonData?.riskManagement?.accidentCosts"
            :accidentCosts="commonData?.riskManagement?.accidentCosts"
            :annualInsurancePremium="commonData?.riskManagement?.annualInsurancePremium"
            :expectedAccidentGap="commonData?.riskManagement?.expectedAccidentGap"
            :expectedSavingsFromPolicy="
              commonData?.riskManagement?.expectedSavingsFromPolicy
            "
            :expectedReductionThefts="commonData?.riskManagement?.expectedReductionThefts"
            :reductionExpectedShutdowns="commonData?.riskManagement?.expectedAccidentGap"
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
            @updateResultData="updateResultData"
            :monthlyDemand="commonData?.inventoryManagement?.monthlyDemand"
            :averageCost="commonData?.inventoryManagement?.averageCost"
            :quantityOrderedProducts="
              commonData?.inventoryManagement?.quantityOrderedProducts
            "
            :averageOrderSize="commonData?.inventoryManagement?.averageOrderSize"
            :productMaintenanceCost="
              commonData?.inventoryManagement?.productMaintenanceCost
            "
            :forecastAccuracy="commonData?.inventoryManagement?.forecastAccuracy"
            :warehouseReduction="commonData?.inventoryManagement?.warehouseReduction"
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
            @updateResultData="updateResultData"
            :fuelEconomy="commonData?.fuelManagement?.fuelEconomy"
            :fuelPrice="commonData?.fuelManagement?.fuelPrice"
            :routeDistance="commonData?.fuelManagement?.routeDistance"
            :controlledAssets="commonData?.assets?.numberControlledAssets"
            :expectedRouteOptimization="
              commonData?.fuelManagement?.expectedRouteOptimization
            "
            :expectedHabitSavings="commonData?.fuelManagement?.expectedHabitSavings"
            :expectedConsumptionControl="
              commonData?.fuelManagement?.expectedConsumptionControl
            "
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
            @updateResultData="updateResultData"
            :maintenanceCost="commonData?.maintenanceOptimization?.maintenanceCost"
            :expectedCostReduction="commonData?.maintenanceOptimization?.costReduction"
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
          :defectiveProductCount="commonData?.qualityManagement?.nonConformingProducts"
          :productCommercialValue="commonData?.qualityManagement?.productValue"
          :reductionPercentage="
            commonData?.qualityManagement?.nonConformingProductReduction
          "
        />
      </el-collapse-item>
    </el-collapse>
    <TheCalculatorResult
      :assetsToControl="commonData.assets?.numberControlledAssets"
      :monthlyProductivitySavings="resultData.perfomanceResult?.monthlyProductionSavings"
      :monthlyRiskSavings="resultData.riskManagementResult?.monthlyRiskSavings"
      :monthlyInventorySavings="resultData.inventoryResult?.monthlyInventorySavings"
      :totalFuelSavings="resultData.fuelResult?.fuelSavings"
      :maintenanceSavings="resultData.qualityResult?.totalMaintenanceCost"
      :maintenanceCosts="resultData.maintenanceResult?.savingsOnMaintenance"
      @updateGlobalResultData="updateGlobalResultData"
    />
    <TheResultForm @generateAndSendPDF="generateAndSendPDF" />
  </div>
</template>
<style>
@import url("../assets/styles/index.scss");
</style>
