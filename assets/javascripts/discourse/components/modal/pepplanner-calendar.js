import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class PepplannerCalendar extends Component {
    @service currentUser;
    @tracked calendarData = "";

    constructor(owner, args) {
        super(owner, args);
        this.loadData();
    }

    loadData() {
        if (!this.currentUser) return;

        // Parse settings from custom_field JSON string if it exists
        const saved = this.currentUser.custom_fields['pepplanner_calendar_data'];
        if (saved) {
            // Assuming for now it's just a string or JSON. 
            // If it's a JSON object, we might want to stringify it for a text area, 
            // or parse it if we had a real calendar widget.
            // For this placeholder, we'll treat it as a string note.
            this.calendarData = typeof saved === 'object' ? JSON.stringify(saved) : saved;
        }
    }

    @action
    saveData() {
        if (!this.currentUser) return;

        // Save to server
        this.currentUser.custom_fields['pepplanner_calendar_data'] = this.calendarData;
        this.currentUser.save(['custom_fields']);
    }
}
