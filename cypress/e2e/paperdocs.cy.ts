/**
 * "paperdocs" redirects from:
 * /paperdocs/...#(heading)
 * /paperdocs/...
 * To:
 * /paperdocs/(heading)/...
 * /paperdocs/-/...
 */
describe("PaperDocs Backward Support", () => {
    context("Without Heading", () => {
        it("should redirect from #field-summary to no-heading", () => {
            cy.visit("/paperdocs/org/bukkit/Fluid.html#field-summary");

            cy.url().should("include", "/paperdocs/-/org/bukkit/Fluid.html");
        });

        it("should redirect from #enum-constant-summary to no-heading", () => {
            cy.visit("/paperdocs/org/bukkit/block/BlockFace.html#enum-constant-summary");

            cy.url().should("include", "/paperdocs/-/org/bukkit/block/BlockFace.html");
        });

        it("should redirect from no-hash to no-heading", () => {
            cy.visit("/paperdocs/org/bukkit/block/Bed.html");

            cy.url().should("include", "/paperdocs/-/org/bukkit/block/Bed.html");
        });
    });

    context("With Heading", () => {
        it("should redirect from #(class-use) to heading", () => {
            cy.visit("/paperdocs/org/bukkit/block/class-use/BlockState.html#org.bukkit.block");

            cy.url().should("include", "/paperdocs/org.bukkit.block/org/bukkit/block/class-use/BlockState.html");
        });
    });
});
