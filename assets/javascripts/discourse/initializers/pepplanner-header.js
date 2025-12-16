import { withPluginApi } from "discourse/lib/plugin-api";
import $ from "jquery";

export default {
    name: "pepplanner-header-icons",
    initialize() {
        console.log("Pepplanner: Initializer loaded"); // Debug log

        withPluginApi("0.8", (api) => {
            const injectIcons = () => {
                // Selector from user's example
                const headerIcons = $('.panel.clearfix .header-buttons, .d-header .icons');

                if (headerIcons.length) {
                    console.log("Pepplanner: Header icons container found", headerIcons);

                    if ($('.pepplanner-header-icon').length > 0) {
                        return; // Already injected
                    }

                    // --- Calculator Icon ---
                    const calcIcon = $('<i>').addClass('fa fa-calculator d-icon d-icon-calculator');
                    const calcLink = $('<a>')
                        .addClass('btn btn-flat btn-icon no-text pepplanner-btn')
                        .attr('title', 'Peptide Calculator')
                        .attr('href', '#')
                        .on('click', (e) => {
                            e.preventDefault();
                            console.log("Pepplanner: Open Calculator");
                            const container = api.container;
                            if (container.lookup('service:modal')) {
                                container.lookup('service:modal').show('pepplanner-calculator');
                            } else {
                                const modalRoute = container.lookup('route:application');
                                modalRoute.send('showModal', 'pepplanner-calculator');
                            }
                        })
                        .append(calcIcon);

                    const calcWrapper = $('<li>').addClass('header-icon pepplanner-header-icon').append(calcLink);

                    // --- Calendar Icon ---
                    const calIcon = $('<i>').addClass('fa fa-calendar-alt d-icon d-icon-calendar-alt');
                    const calLink = $('<a>')
                        .addClass('btn btn-flat btn-icon no-text pepplanner-btn')
                        .attr('title', 'Pepplanner Calendar')
                        .attr('href', '#')
                        .on('click', (e) => {
                            e.preventDefault();
                            console.log("Pepplanner: Open Calendar");
                            // Ideally, this would open a similar modal for the calendar
                            // For now, we will use a placeholder modal or just alert if no modal exists yet
                            const container = api.container;
                            if (container.lookup('service:modal')) {
                                container.lookup('service:modal').show('pepplanner-calendar');
                            } else {
                                const modalRoute = container.lookup('route:application');
                                modalRoute.send('showModal', 'pepplanner-calendar');
                            }
                        })
                        .append(calIcon);

                    const calWrapper = $('<li>').addClass('header-icon pepplanner-header-icon').append(calLink);

                    headerIcons.prepend(calWrapper);
                    headerIcons.prepend(calcWrapper);
                    console.log("Pepplanner: Icons injected");
                } else {
                    console.log("Pepplanner: Header icons container NOT found");
                }
            };

            // Try injecting on page change (and initial load)
            api.onPageChange(() => {
                console.log("Pepplanner: Page Changed");
                // Poll for a bit to ensure header is rendered
                let attempts = 0;
                const interval = setInterval(() => {
                    attempts++;
                    injectIcons();
                    // If we found the header or tried 10 times (2 seconds), stop.
                    if ($('.pepplanner-header-icon').length > 0 || attempts > 10) {
                        clearInterval(interval);
                    }
                }, 200);
            });
        });
    },
};
