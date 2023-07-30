
export function getDay(dateString){
    const dateComponents = dateString.split(' ');
    return dateComponents[0];
}

export function getMonthYear(dateString){
    const dateComponents = dateString.split(' ');
    const month = dateComponents[1];
    const year = dateComponents[2];
    return month + " " + year;
}

export function convertDateToFormat(dateString){
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return year + "-" + month + "-" + day;
}

export function selectPassengers(addPassengerSelector,removePassengerSelector,count){
    if(count>0){
        if(addPassengerSelector === "svg.addAdult"){
            count = count -1;
        }
        for(let i =0 ; i<count;i++) {
            cy.get(addPassengerSelector).parent().click({force: true});
        }
    }else if(count === 0){
        cy.get(removePassengerSelector).parent().parent().find("span").then(($el)=>{
            const getCurrentCount = parseInt($el.text());
            if(getCurrentCount > 0){
                for(let j=0;j<getCurrentCount;j++) {
                    cy.get(removePassengerSelector).parent().click({force: true});
                }
            }
        })

    }else {
        throw new Error(`Not a valid passengers number ${count}`);
    }
}