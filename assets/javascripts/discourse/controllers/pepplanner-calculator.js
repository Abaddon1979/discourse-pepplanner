import Controller from "@ember/controller";
import { computed } from "@ember/object";
import ModalFunctionality from "discourse/mixins/modal-functionality";

export default Controller.extend(ModalFunctionality, {
    syringeSize: "1.0",
    peptideAmount: 5,
    waterAmount: 2,
    desiredDosage: 250,

    syringeSizes: computed(function () {
        return [
            { id: "0.3", name: "0.3ml (30 units)" },
            { id: "0.5", name: "0.5ml (50 units)" },
            { id: "1.0", name: "1.0ml (100 units)" }
        ];
    }),

    calculatedUnits: computed("peptideAmount", "waterAmount", "desiredDosage", function () {
        const peptide = parseFloat(this.peptideAmount) || 0;
        const water = parseFloat(this.waterAmount) || 0;
        const dosage = parseFloat(this.desiredDosage) || 0;

        if (peptide <= 0 || water <= 0) return 0;

        // Concentration = mg / ml
        // Dosage is in mcg. 1mg = 1000mcg.
        // Concentration in mcg/ml = (mg * 1000) / ml
        const concentration = (peptide * 1000) / water;

        // Volume needed (ml) = dosage / concentration
        const volumeParams = dosage / concentration; // ml

        // Units (assuming U-100 insulin syringe where 1ml = 100 units)
        const units = volumeParams * 100;

        return Math.round(units * 10) / 10;
    }),

    calculatedTicks: computed("calculatedUnits", function () {
        // 1 unit = 1 tick usually on 100 unit syringe
        return this.calculatedUnits;
    })
});
