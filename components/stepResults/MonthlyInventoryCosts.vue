<template>
    <section class="result">
        <h2 class="">Costos productivos mensuales: {{ calculatedResult1 || "Нет данных для расчета" }}</h2>
        <h2 class="">Ahorros productivos mensuales: {{ calculatedResult2 || "Нет данных для расчета" }}</h2>
    </section>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
    laborHours: {
        type: Number,
        required: true,
    },
    monthlyIncome: {
        type: Number,
        required: true,
    },
    dailyDowntime: {
        type: Number,
        required: true,
    },
    payrollValue: {
        type: Number,
        required: true,
    },
    workerCount: {
        type: Number,
        required: true,
    },
    productiveHRPercentage: {
        type: Number,
        required: true,
    },
    monthlyEnergyCost: {
        type: Number,
        required: true,
    },
    monthlyMachineStopCost: {
        type: Number,
        required: true,
    },
    expectedDowntimeReduction: {
        type: Number,
        required: true,
    },
    expectedEnergyCostReduction: {
        type: Number,
        required: true,
    },
    expectedStopReduction: {
        type: Number,
        required: true,
    },
});

// Первая строка расчета
const calculatedResult1 = computed(() => {
    const firstPart =
        ((props.laborHours * props.monthlyIncome) /
            (props.laborHours - props.dailyDowntime || 1)) -
        props.monthlyIncome;

    const secondPart =
        (props.payrollValue / props.workerCount || 0) *
        props.workerCount *
        (1 - props.productiveHRPercentage / 100);

    return (
        firstPart + secondPart + props.monthlyEnergyCost + props.monthlyMachineStopCost
    );
});

// Вторая строка расчета
const calculatedResult2 = computed(() => {
    const firstPart =
        (((props.laborHours * props.monthlyIncome) /
            (props.laborHours - props.dailyDowntime || 1)) -
            props.monthlyIncome) *
        (props.expectedDowntimeReduction / 100);

    const secondPart =
        (props.payrollValue / props.workerCount || 0) *
        props.workerCount *
        (1 - props.productiveHRPercentage / 100);

    const energyReduction =
        props.monthlyEnergyCost * (props.expectedEnergyCostReduction / 100);

    const stopReduction =
        props.monthlyMachineStopCost * (props.expectedStopReduction / 100);

    return firstPart + secondPart + energyReduction + stopReduction;
});
</script>