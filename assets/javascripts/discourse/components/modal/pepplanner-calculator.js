import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class PepplannerCalculator extends Component {
    @tracked syringeSize = "1.0";
    @tracked peptideAmount = 5;
    @tracked waterAmount = 2;
    @tracked desiredDosage = 250;

    get syringeSizes() {
        return [
            { id: "0.3", name: "0.3ml (30 units)" },
            { id: "0.5", name: "0.5ml (50 units)" },
            { id: "1.0", name: "1.0ml (100 units)" }
        ];
    }

    get calculatedUnits() {
        const peptide = parseFloat(this.peptideAmount) || 0;
        const water = parseFloat(this.waterAmount) || 0;
        const dosage = parseFloat(this.desiredDosage) || 0;

        if (peptide <= 0 || water <= 0) return 0;

        // Concentration = mg / ml
        // Dosage is in mcg. 1mg = 1000mcg.
        const concentration = (peptide * 1000) / water;
        const volumeParams = dosage / concentration; // ml
        const units = volumeParams * 100;

        return Math.round(units * 10) / 10;
    }

    get calculatedTicks() {
        return this.calculatedUnits;
    }
}
