import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {convertDateToFormat, getDay, getMonthYear, selectPassengers} from "../../support/utils";

Given("I am on the Eurostar website", () => {
    cy.visit("https://www.eurostar.com");
    cy.get('#consent_prompt_accept_all_cookies').click({force:true});
});

Given('Intercept {string} as {string}', (url, aliasName) => {
    cy.intercept(url).as(aliasName);
});

Then('Wait for {string} network request', (aliasName) => {
    cy.wait(`@${aliasName}`); // Use the alias directly as the argument for cy.wait()
});

When("Click on {string}",(selector)=>{
    selector =selector.toLowerCase();
    switch (selector){
        case 'from': {
            cy.get("input[placeholder=\"City or station\"]").eq(0).click({force:true});
            cy.contains("Popular Searches").should("be.visible");
            break;
        }
        case 'to':{
            cy.get("input[placeholder=\"City or station\"]").eq(1).click({force:true});
            break;
        }
        case 'when':{
            cy.get("button[name=\"calendar\"]").click({force:true});
            break;
        }
        case 'search':{
            cy.get("button.SearchButton").click({force:true});
            break;
        }
        case 'continue':{
            cy.get("[data-testid=\"total-price\"]").eq(2).scrollIntoView();
            cy.get("[data-testid=\"basket-action\"]").click({force:true});
            break;
        }
        case 'continue without extra':{
            cy.get("[data-testid=\"total-price\"]").scrollIntoView();
            cy.get("[data-testid=\"basket-action\"]").click({force:true});
            break;
        }
        case 'continue as guest':{
            cy.get('[data-testid="continue-as-guest"]').scrollIntoView();
            cy.get('[data-testid="continue-as-guest"]').click({force:true});
            break;
        }
        default:
            throw new Error( `Cannot click on ${selector}`);
    }
});

Then("Select from {string}",(val)=>{
    cy.contains(val).click({force:true});
});

When("Select Date from {string} to {string}",(fromDate,toDate)=>{
    const fromDay = getDay(fromDate);
    const toDay = getDay(toDate);
    const fromYearMonth = getMonthYear(fromDate);
    const toYearMonth = getMonthYear(toDate);
    cy.contains(fromYearMonth).scrollIntoView();
    const fromSelector = "time[datetime='" + convertDateToFormat(fromDate) + "']";
    cy.get(fromSelector).click({force:true});
    cy.contains(toYearMonth).scrollIntoView();
    const toSelector = "time[datetime='" + convertDateToFormat(toDate) + "']";
    cy.get(toSelector).click({force:true});
    cy.contains("button","OK").click({force:true});

});

Then("Select Passengers as {string} Adults, {string} Youth, {string} Child, {string} Infants",(adults,youths,child,infants)=>{
    cy.get("button[name=\"passenger-type\"]").click({force:true});
    cy.contains("Who's travelling?").should("be.visible");
    const adultCount = parseInt(adults);
    selectPassengers("svg.addAdult","svg.removeAdult",adultCount);
    const youthCount = parseInt(youths);
    selectPassengers("svg.addYouth","svg.removeYouth",youthCount);
    const childCount = parseInt(child);
    selectPassengers("svg.addChild","svg.removeChild",childCount);
    const infantCount = parseInt(infants);
    selectPassengers("svg.addInfant","svg.removeInfant",infantCount);
    cy.contains("button","OK").click({force:true});

});

Then("Select OutBound",()=>{
   cy.get("[data-testid=\"outbound-journey-anchor-time-slot-morning\"]").click({force:true});
   cy.get("[data-testid=\"fare-item\"]").eq(0).click({force:true});
   cy.get("[data-testid=\"select-button\"]").eq(0).click({force:true});
});

Then ("Select Return price",()=>{
    cy.get('[data-testid="inbound-journey-direction-header-journey-heading"]').scrollIntoView();
    cy.get("[data-testid='inbound-journey-anchor-time-slot-morning-label']").click({force:true});
    cy.get("[data-testid=\"fare-item\"]").eq(3).click({force:true});
    cy.get("[data-testid=\"select-button\"]").eq(1).click({force:true});

});

Then("Verify that page Contains {string}",(text)=>{
    cy.contains(text).should("be.visible");
});

Then("Get Screenshot of page",()=>{
    cy.get('[data-testid="stubContainer"]').then(($element) => {
        // Scroll the element into view before taking the screenshot
        $element[0].scrollIntoView();
        cy.screenshot('up-to-specific-element', { capture: 'runner' });
    });
})