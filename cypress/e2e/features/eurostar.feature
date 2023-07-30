Feature: Eurostar Ticket Booking

 Scenario: Book a return railway ticket from London to Paris
  Given Intercept "https://fonts.googleapis.com/css2*" as "euroLoadApi"
  Given I am on the Eurostar website
  Then Wait for "euroLoadApi" network request
  When Click on "from"
  Then Select from "London St Pancras Int'l"
  Then Click on "to"
  And Select from "Paris Gare du Nord"
  When Click on "when"
  Then Select Date from "20 September 2023" to "10 November 2023"
  Then Intercept "https://collect-eu-west-1.tealiumiq.com/eurostar/main/2/i.gif" as "passCall"
  Then Select Passengers as "2" Adults, "0" Youth, "0" Child, "0" Infants
  Then Wait for "passCall" network request
  Then Intercept "https://api.prod.eurostar.com/gateway" as "gateway"
  Then Click on "search"
  Then Wait for "passCall" network request
  Then Wait for "gateway" network request
  Then Select OutBound
  Then Wait for "passCall" network request
  Then Select Return price
  Then Click on "continue"
  Then Wait for "gateway" network request
  Then Verify that page Contains "Travel Extra"
  Then Click on "continue without extra"
  Then Click on "continue as guest"
  Then Get Screenshot of page

