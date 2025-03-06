// @ts-nocheck
import { STEP_TITLES } from "../constants/StepTitles";
import { TYPES_ASSETS } from "../constants/TypesAssets";
import { RESULT_LABELS } from "~/constants/ResultConst";
import logoPng from '../public/logo.png'

import {
  ASSET_TYPE_QUESTIONS,
  ASSET_COUNT_QUESTIONS,
} from "~/constants/ManagementConst";
import {
  PERFOMANCE_CONST,
  PERFOMANCE_EXPECTED_CONST,
  PERFORMANCE_RESULT_LABELS,
  PERFOMANCE_EXPECTED_TITLE,
} from "../constants/PerfomanceConst";
import {
  RISK_MANAGEMENT_CONST,
  RISK_MANAGEMENT_EXPECTED_CONST,
  RISK_MANAGEMENT_RESULT_LABELS,
  RISK_MANAGEMENT_EXPECTED_TITLE,
} from "~/constants/RiskManagementConst";
import {
  INVENTORY_MANAGEMENT_CONST,
  INVENTORY_EXPECTED_CONST,
  INVENTORY_LABELS,
  INVENTORY_EXPECTED_TITLE,
} from "~/constants/InventoryManagement";
import {
  FUEL_CONST,
  FUEL_EXPECTED_CONST,
  FUEL_RESULT_LABELS,
  FUEL_EXPECTED_TITLE,
} from "~/constants/FuelConst";
import {
  MAINTENANCE_CONST,
  MAINTENANCE_EXPECTED_CONST,
  MAINTENANCE_RESULT_LABELS,
  MAINTENANCE_EXPECTED_TITLE,
} from "~/constants/MaintenanceConst";
import {
  QUALITY_MANAGEMENT_CONST,
  QUALITY_EXPECTED_CONST,
  QUALITY_CONST_LABELS,
  QUALITY_EXPECTED_TITLE,
} from "~/constants/QualityManagementConst";

export class PrintingService {
  data = {};

  setData(newData) {
    this.data = newData;
  }

  generateHtmlResult() {
    const container = document.createElement("div");
    container.classList.add("pdf-container");

    container.innerHTML =
      this.getLogo().outerHTML +
      this.getTitle().outerHTML +
      this.getGridSection(STEP_TITLES[0].name, this.getAssetsTableData()).outerHTML +
      this.getGridSection(STEP_TITLES[1].name, this.getPerfomanceTableData(), PERFORMANCE_RESULT_LABELS, "perfomance").outerHTML +
      this.getGridSection(STEP_TITLES[2].name, this.getRiskManagementTableData(), RISK_MANAGEMENT_RESULT_LABELS, "riskManagement").outerHTML +
      this.getGridSection(STEP_TITLES[3].name, this.getInventoryManagementTableData(), INVENTORY_LABELS, "inventoryManagement").outerHTML +
      this.getGridSection(STEP_TITLES[4].name, this.getFuelManagementTableData(), FUEL_RESULT_LABELS, "fuelManagement").outerHTML +
      this.getGridSection(STEP_TITLES[5].name, this.getMaintenanceOptimizationTableData(), MAINTENANCE_RESULT_LABELS, "maintenanceOptimization").outerHTML +
      this.getGridSection(STEP_TITLES[6].name, this.getQualityManagementTableData(), QUALITY_CONST_LABELS, "qualityManagement").outerHTML  +
      this.getGridSection("Resultados Finales", this.getFinalResultsData(), RESULT_LABELS, "finalResults").outerHTML;

    return container;
  }
  getLogo() {
    const box = document.createElement("div");
    box.classList.add('logo-box')
    const img = document.createElement("img");
    img.classList.add('logo')
    img.src = logoPng; // Путь к файлу в корне проекта
    img.alt = "Company Logo";
    img.classList.add("logo"); // Добавляем CSS-класс (если нужно)
    box.appendChild(img)
    return box;
  }
  
  getTitle() {
    const title = document.createElement("h1");
    title.classList.add("title", "title_large");
    title.style.textAlign = "center";
    title.textContent = "Calculadora de ROI para proyectos de IoT + AI";
    return title;
  }

  getGridSection(titleText:string, tableData, footerData = null, dataField = "") {
    const stepBox = document.createElement("div");
    stepBox.classList.add("step-box");

    const title = document.createElement("h2");
    title.textContent = titleText;
    title.classList.add("step-title");
    const gridContainer = this.createGrid(tableData, footerData, dataField);
    stepBox.append(title, gridContainer);

    return stepBox;
  }

  createGrid(tableData, footerData = null, dataField = "") {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    if (dataField === "finalResults") {
      gridContainer.classList.add("grid-final-container");
      const firstColumnData = tableData.slice(0, 3);
      const secondColumnData = tableData.slice(3, 6);

      const createColumn = (title, entries) => {
        const column = document.createElement("div");
        column.classList.add("grid-column");

        const columnTitle = document.createElement("h3");
        columnTitle.textContent = title;
        columnTitle.classList.add("grid-column-title");
        column.appendChild(columnTitle);

        entries.forEach(({ q, a }) => {
          const box = document.createElement("div");
          box.classList.add("grid-box");

          const question = document.createElement("div");
          question.textContent = q;
          question.classList.add("grid-item", "grid-question");

          const answer = document.createElement("div");
          answer.textContent = a || "No especificado";
          answer.classList.add("grid-item", "grid-answer");

          box.append(question, answer);
          column.append(box);
        });

        return column;
      };
      // ✅ Добавляем два столбца в gridContainer
      gridContainer.append(createColumn("Ahorro mensual", firstColumnData));
      gridContainer.append(createColumn("Ahorro anual", secondColumnData));
      // ✅ Добавляем ROI в самый низ
      const roiBox = document.createElement("h1");
      roiBox.classList.add("title", "title_large","roi-box");

      const roiQuestion = document.createElement("div");
      roiQuestion.textContent = "ROI=";
      
      const roiValue = document.createElement("div");
      const roi = this.data.finalResults?.roi;
      roiValue.textContent = roi != null ? `${roi}%` : "No especificado";
      
      roiBox.append(roiQuestion, roiValue);
      gridContainer.append(roiBox); 
      return gridContainer;
    }

    tableData.forEach(({ q, a,isExpectedTitle }) => {
    
      if(isExpectedTitle){
        gridContainer.append(this.getExpectedTitle(q));
        return
      }
      const box = document.createElement("div");
      box.classList.add("grid-box");

      const question = document.createElement("div");
      question.textContent = q;
      question.classList.add("grid-item", "grid-question");

      const answer = document.createElement("div");
      answer.textContent = a ?? "No especificado";
      answer.classList.add("grid-item", "grid-answer");

      box.append(question, answer);
      gridContainer.append(box);
    });
    console.log(gridContainer);
    return gridContainer;
  }
  getExpectedTitle(expectedTitle:string){
    const title = document.createElement("h2");
    title.classList.add("title", "expected-title");
    title.style.textAlign = "center";
    title.textContent = expectedTitle;
    return title;

  }
  mapTableData(mainArray, expectedArray, expectedTitle, dataField) {
    let tableData = [];

    tableData.push(
      ...mainArray.map((item) => {
        let value = this.data[dataField]?.[item.model] ?? "No especificado";
        debugger
        if (item.props?.prefix && value !== "No especificado") {
          value = `${item.props.prefix} ${value}`;
        }
        return { q: item.title, a: value };
      })
    );

    if (expectedArray.length > 0) {
      if(expectedTitle){
       debugger
       tableData.push({q: expectedTitle,isExpectedTitle:true});
      }
      // tableData.push({ q: expectedTitle, isExpectedTitle : true }); // 🔥 Добавляем заголовок `expectedTitle` в `div`
      tableData.push(
        ...expectedArray.map((item) => {
          let value = this.data[dataField]?.[item.model] ?? "No especificado";
          if (item.props?.prefix && value !== "No especificado") {
            value = `${item.props.prefix} ${value}`;
          }
          return { q: item.title, a: value };
        })
      );
    }

    return tableData;
  }
  getAssetsTableData() {
    const tableData = [
      {
        q: "¿Qué tipo de Activo desea controlar?",
        a: this.data.assets?.type
          ? TYPES_ASSETS[this.data.assets.type]?.name
          : "No seleccionado",
      },
    ];

    if (this.data.assets?.type) {
      tableData.push(
        {
          q: ASSET_TYPE_QUESTIONS[this.data.assets.type],
          a: this.data.assets.answer || "No especificado",
        },
        {
          q: ASSET_COUNT_QUESTIONS[this.data.assets.type],
          a: this.data.assets.numberControlledAssets || "No especificado",
        }
      );
    }

    return tableData;
  }

  getQualityManagementTableData() {
    return this.mapTableData(
      QUALITY_MANAGEMENT_CONST, 
      QUALITY_EXPECTED_CONST, 
      QUALITY_EXPECTED_TITLE, // ✅ Добавили заголовок
      "qualityManagement"
    );
  }
  
  getPerfomanceTableData() {
    return this.mapTableData(
      PERFOMANCE_CONST, 
      PERFOMANCE_EXPECTED_CONST, 
      PERFOMANCE_EXPECTED_TITLE, // ✅ Заголовок для секции
      "perfomance"
    );
  }
  
  getRiskManagementTableData() {
    return this.mapTableData(
      RISK_MANAGEMENT_CONST, 
      RISK_MANAGEMENT_EXPECTED_CONST, 
      RISK_MANAGEMENT_EXPECTED_TITLE, // ✅ Заголовок
      "riskManagement"
    );
  }
  
  getInventoryManagementTableData() {
    return this.mapTableData(
      INVENTORY_MANAGEMENT_CONST, 
      INVENTORY_EXPECTED_CONST, 
      INVENTORY_EXPECTED_TITLE, // ✅ Заголовок
      "inventoryManagement"
    );
  }
  
  getFuelManagementTableData() {
    return this.mapTableData(
      FUEL_CONST, 
      FUEL_EXPECTED_CONST, 
      FUEL_EXPECTED_TITLE, // ✅ Заголовок
      "fuelManagement"
    );
  }
  
  getMaintenanceOptimizationTableData() {
    return this.mapTableData(
      MAINTENANCE_CONST, 
      MAINTENANCE_EXPECTED_CONST, 
      MAINTENANCE_EXPECTED_TITLE, // ✅ Заголовок
      "maintenanceOptimization"
    );
  }
    /** 🔥 Метод для генерации итоговой секции */
  getFinalResultsData() {
    return Object.values(RESULT_LABELS).map((item) => {
      let value = this.data.finalResults?.[item.model] ?? "No especificado";

      // ✅ Добавляем префикс, если он есть
      if (item.prefix && value !== "No especificado") {
        value = `${item.prefix} ${value}`;
      }

      return { q: item.name, a: value };
    });
  }
}