function calculateTotalAmountPayable(){

// Get references to the input fields and select element
const localAdultInput = document.getElementById("localAdult");
const localChildInput = document.getElementById("localChild");
const foreignerAdultInput = document.getElementById("foreignerAdult");
const foreignerChildInput = document.getElementById("foreignerChild");
const infantInput = document.getElementById("infant");
const durationSelect = document.getElementById("duration");


    // Get the date input element
    const dateInput = document.getElementById("dateInput");

    
    // Get today's date
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0
    const yyyy = today.getFullYear();

    // Format the date as "YYYY-MM-DD" for comparison with input values
    const formattedToday = yyyy + "-" + (mm < 10 ? "0" : "") + mm + "-" + (dd < 10 ? "0" : "") + dd;

    // Set the minimum attribute of the date input to today's date
    dateInput.setAttribute("min", formattedToday);
     const selectedDate = dateInput.value;
    localStorage.setItem("selectedDate", selectedDate);
      


    const numlocalAdultTickets = parseInt(document.getElementById('localAdult').value);
    const numlocalChildTickets = parseInt(document.getElementById('localChild').value);
    const numforeignerAdultTickets = parseInt(document.getElementById('foreignerAdult').value);
    const numforeignerChildTickets = parseInt(document.getElementById('foreignerChild').value);
    const numinfantTickets = parseInt(document.getElementById('infant').value);

     // Store the values in the local storage
     localStorage.setItem("numlocalAdultTickets", numlocalAdultTickets);
     localStorage.setItem("numlocalChildTickets", numlocalChildTickets);
     localStorage.setItem("numforeignerAdultTickets", numforeignerAdultTickets);
     localStorage.setItem("numforeignerChildTickets", numforeignerChildTickets);
     localStorage.setItem("numinfantTickets", numinfantTickets);

     
     const selectedTimeSlots = []; //this is important
    for (let option of durationSelect.options) {
        if (option.selected) {
            selectedTimeSlots.push(option.value);
        }
    }
        localStorage.setItem("selectedTimeSlots", JSON.stringify(selectedTimeSlots));

        function storeSelectedOptions(event){
            event.preventDefault(); //prevents form from submitting
            const durationSelect = document.getElementById("duration");
            const selectedOptions = [];
        
            for(let i =0; i<durationSelect.options.length; i++){
                if(durationSelect.options[i].selected){
                    selectedOptions.push(durationSelect.options[i].value);
                }
            }
            
            //store the selected options in local storage
            localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
            console.log("Selected Options:", selectedOptions);
        
        }

    // Define the normal and peak hour ranges (hours 10 to 1 pm and 3 to 6 pm)
    const normalHours = [7,8, 9, 13, 14];
    const peakHours = [10, 11, 12, 15, 16, 17];

    // Initialize variables to store the counts of normal and peak hours
    let normalCount = 0;
    let peakCount = 0;

    // Calculate the counts of normal and peak hours from the selected time slots
    for (let slot of selectedTimeSlots) {
        const hour = parseInt(slot.split(":")[0]);
        if (normalHours.includes(hour)) {
            normalCount++;
        } else if (peakHours.includes(hour)) {
            peakCount++;
        }
    }
    totalHours = normalCount + peakCount;

    localStorage.setItem("normalCount", normalCount); 
    localStorage.setItem("peakCount", peakCount); 
    localStorage.setItem("totalHours", totalHours);

     // Define the normal and peak prices for each category
     const normalPriceLocalAdult = 4;
     const peakPriceLocalAdult = 6;
     const normalPriceLocalChild = 2;
     const peakPriceLocalChild = 3;
     const normalPriceForeignerAdult =10;
     const peakPriceForeignerAdult =13;
     const normalPriceForeignerChild = 5;
     const peakPriceForeignerChild = 8;
 
     
     
 
     // Calculate the total cost for each category based on normal and peak hours
     const totalCostLocalAdult = (normalCount * normalPriceLocalAdult + peakCount * peakPriceLocalAdult)*numlocalAdultTickets;
     const totalCostLocalChild = (normalCount * normalPriceLocalChild + peakCount * peakPriceLocalChild)*numlocalChildTickets;
     const totalCostForeignerAdult= (normalCount * normalPriceForeignerAdult + peakCount * peakPriceForeignerAdult)*numforeignerAdultTickets;
     const totalCostForeignerChild = (normalCount * normalPriceForeignerChild + peakCount * peakPriceForeignerChild)*numforeignerChildTickets;
     const totalCostInfant =0;
 
     // Store the calculated total costs in the local storage
     localStorage.setItem("totalCostLocalAdult", totalCostLocalAdult);
     localStorage.setItem("totalCostLocalChild", totalCostLocalChild);
     localStorage.setItem("totalCostForeignerAdult", totalCostForeignerAdult);
     localStorage.setItem("totalCostForeignerChild", totalCostForeignerChild);
     localStorage.setItem("totalCostInfant", totalCostInfant);
     
     // Calculate and update the total amount payable
     const totalAmountPayable = totalCostLocalAdult + totalCostLocalChild + totalCostForeignerAdult + totalCostForeignerChild; 
     
 
     // Store the totalAmountPayable in the local storage
     localStorage.setItem("totalAmountPayable", totalAmountPayable);

     function getFormattedTime(timeSlots) {

        // Helper function to get the formatted time for selected time slots
        const startTime = timeSlots[0].split(" to ")[0];
        const endTime = timeSlots[timeSlots.length - 1].split(" to ")[1];
        return startTime + " to " + endTime;
    }

    const formattedTime = getFormattedTime(selectedTimeSlots);
    // Store the formattedTime in the local storage
     localStorage.setItem("formattedTime", formattedTime);


     //adding values into the table
document.getElementById("tableinputdate").innerHTML = selectedDate;
document.getElementById("tableinputtime").innerHTML = formattedTime;
document.getElementById("tableinputduration").innerHTML = `${totalHours} hrs (${normalCount} Normal:${peakCount} Peak)`;


document.getElementById("totalPayableprice").innerHTML = `$ ${totalAmountPayable}` ;

// Function to hide or show a row based on the number of tickets.


function setRowVisibilityBasedOnTicketCount(rowId, ticketCount) {
    const row = document.getElementById(rowId);
    row.classList.toggle("hidden-row", ticketCount === 0);
  }

  // Setting the innerHTML and visibility for each row based on ticket counts
  document.getElementById("localadulttable").innerHTML = `${numlocalAdultTickets} SL Adult`;
  document.getElementById("localadulttableprice").innerHTML = `$ ${totalCostLocalAdult}`;
  setRowVisibilityBasedOnTicketCount("rowlocaladult", numlocalAdultTickets);
  
  document.getElementById("localchildtable").innerHTML = `${numlocalChildTickets} SL Child`;
  document.getElementById("localchildtableprice").innerHTML = `$ ${totalCostLocalChild}`;
  setRowVisibilityBasedOnTicketCount("rowlocalchild", numlocalChildTickets);
  
  document.getElementById("foriegnadulttable").innerHTML = `${numforeignerAdultTickets} Foreigner Adult`;
  document.getElementById("foriegnadulttableprice").innerHTML = `$ ${totalCostForeignerAdult}`;
  setRowVisibilityBasedOnTicketCount("rowforiegnadult", numforeignerAdultTickets);
  
  document.getElementById("foriegnchildtable").innerHTML = `${numforeignerChildTickets} Foreigner Child`;
  document.getElementById("foriegnchildtableprice").innerHTML = `$ ${totalCostForeignerChild}`;
  setRowVisibilityBasedOnTicketCount("rowforiegnchild", numforeignerChildTickets);
  
  document.getElementById("infanttable").innerHTML = `${numinfantTickets} Infant`;
  document.getElementById("infanttableprice").innerHTML = "Free";
  setRowVisibilityBasedOnTicketCount("rowinfant", numinfantTickets);


  //storing the entire table in local storage
const summaryTable = {
    tableinputdate: selectedDate,
    tableinputtime: formattedTime,
    tableinputduration: ` ${totalHours}hrs  (${normalCount} Normal :  ${peakCount} Peak )`,
   localadulttable: numlocalAdultTickets + " SL Adult",
   localchildtable: numlocalChildTickets + " SL Child",
   foriegnadulttable: numforeignerAdultTickets + " Foreigner Adult",
   foriegnchildtable: numforeignerChildTickets + " Foreigner Child",
   infanttable: numinfantTickets + " Infant",
    localadulttableprice: "$" + totalCostLocalAdult,
    localchildtableprice: "$" + totalCostLocalChild,
    foriegnadulttableprice: "$" + totalCostForeignerAdult,
    foriegnchildtableprice: "$" + totalCostForeignerChild,
    infanttableprice: "$" + totalCostInfant,
    totalPayableprice: "$" + totalAmountPayable
  };
  // Convert the summaryTable object into a JSON string and store it
  localStorage.setItem('summaryTable', JSON.stringify(summaryTable));
  




  const purchaseBtn = document.getElementById("purchasebtn");
    
  if (numlocalAdultTickets > 0 || numlocalChildTickets > 0 ||
      numforeignerAdultTickets > 0 || numforeignerChildTickets > 0 ||
      numinfantTickets > 0) {
      purchaseBtn.disabled = false;
      purchaseBtn.innerHTML = '<a href="details.html"><i>Continue with purchase</i></a>';
  } else {
      purchaseBtn.disabled = true;
      purchaseBtn.innerHTML = '<i>Continue with purchase</i>';
  }

  setRowVisibilityBasedOnTicketCount();
}




  window.onload = function() {
    /*
   const now = new Date();
   const date = now.toDateString();
   
  document.getElementById('tableinputdate').innerHTML = date;

  document.getElementById('tableinputtime').innerHTML="07:00am to 08:00am";
  document.getElementById('tableinputduration').innerHTML=" 1 hrs ( 01 Normal : 00 Peak)";
  
  document.getElementById('rowlocaladult').style.display = 'none';
  document.getElementById('rowlocalchild').style.display = 'none';
  document.getElementById('foriegnadulttable').innerHTML = "1 Foreigner Adult";
  document.getElementById('foriegnadulttableprice').innerHTML = "$10";
  document.getElementById('rowforiegnchild').style.display = 'none';
  document.getElementById('rowinfant').style.display = 'none';
  document.getElementById('totalPayableprice').innerHTML = '$10';
*/

  
  }



// Add event listeners to the input fields and select element
dateInput.addEventListener("change", calculateTotalAmountPayable);
localAdultInput.addEventListener("change", calculateTotalAmountPayable);
localChildInput.addEventListener("change", calculateTotalAmountPayable);
foreignerAdultInput.addEventListener("change", calculateTotalAmountPayable);
foreignerChildInput.addEventListener("change", calculateTotalAmountPayable);
infantInput.addEventListener("change", calculateTotalAmountPayable);
durationSelect.addEventListener("change", calculateTotalAmountPayable);
