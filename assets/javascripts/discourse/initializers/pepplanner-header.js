import { withPluginApi } from "discourse/lib/plugin-api";
import { iconNode } from "discourse-common/lib/icon-library";

export default {
    name: "pepplanner-header-icons",
    initialize() {
        withPluginApi("0.8.25", (api) => {
            // Add icons to the header-icons widget
            api.decorateWidget("header-icons:before", (helper) => {
                return [
                    // Calendar Icon
                    helper.h(
                        "li.header-icon.pepplanner-calendar",
                        [
                            helper.h(
                                "a.icon.btn-flat",
                                {
                                    title: "Pepplanner Calendar",
                                    onclick: () => {
                                        // Placeholder: Trigger Calendar logic
                                        console.log("Pepplanner: Open Calendar");
                                        alert("Pepplanner Calendar Clicked");
                                    }
                                },
                                iconNode("calendar-alt")
                            )
                        ]
                    ),
                    // Calculator Icon
                    helper.h(
                        "li.header-icon.pepplanner-calculator",
                        [
                            helper.h(
                                "a.icon.btn-flat",
                                {
                                    title: "Peptide Calculator",
                                    onclick: () => {
                                        // Placeholder: Trigger Calculator logic
                                        console.log("Pepplanner: Open Calculator");
                                        alert("Pepplanner Calculator Clicked");
                                    }
                                },
                                iconNode("calculator")
                            )
                        ]
                    )
                ];
            });
        });
    },
};
