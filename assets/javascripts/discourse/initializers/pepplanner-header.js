import { withPluginApi } from "discourse/lib/plugin-api";
import $ from "jquery";

export default {
    name: "pepplanner-header-icons",
    initialize() {
        withPluginApi("0.8", (api) => {
            api.onPageChange(() => {
                setTimeout(() => {
                    // Remove any existing instance to avoid duplicates
                    $('.pepplanner-header-icon').remove();

                    const headerIcons = $('.panel.clearfix .header-buttons, .d-header .icons');

                    if (headerIcons.length) {
                        // --- Calculator Icon ---
                        const calcIcon = $('<i>').addClass('fa fa-calculator d-icon d-icon-calculator');
                        const calcLink = $('<a>')
                            .addClass('btn btn-flat btn-icon no-text pepplanner-btn')
                            .attr('title', 'Peptide Calculator')
                            .attr('href', '#') // Prevent default navigation
                            .on('click', (e) => {
                                e.preventDefault();
                                // Placeholder logic
                                console.log("Pepplanner: Open Calculator");
                                alert("Pepplanner Calculator Clicked");
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
                                // Placeholder logic
                                console.log("Pepplanner: Open Calendar");
                                alert("Pepplanner Calendar Clicked");
                            })
                            .append(calIcon);

                        const calWrapper = $('<li>').addClass('header-icon pepplanner-header-icon').append(calLink);

                        // Inject into header (prepend puts them effectively on the left of the icons list, or modify to append)
                        headerIcons.prepend(calWrapper);
                        headerIcons.prepend(calcWrapper);
                    }
                }, 100); // Wait for DOM render
            });
        });
    },
};
