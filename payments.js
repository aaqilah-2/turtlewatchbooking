
//referencing elememts
const paymentForm = document.getElementById("paymentForm");
const cardNumberInput = document.getElementById("cardNumber");
const expiaryDateInput = document.getElementById("expiaryDate");
const verificationInput = document.getElementById("verification");
const cardNameInput = document.getElementById("cardName");
const payButton = document.getElementById("payButton");

// Regular expression for card name validation (only alphabets and spaces are allowed)
const cardNameRegex = /^[a-zA-Z\s]+$/;




paymentForm.addEventListener("input", updatePayButtonState);

function handleFormSubmit(event) {
  event.preventDefault();
  // Get the amount being paid (you need to set the actual amount here)
  
  window.location.href = `confirmation.html?amount=${storedTotalAmountPayable}`;
}





function updatePayButtonState() {
  const cardNumber = cardNumberInput.value.trim();
  const expiaryDate = expiaryDateInput.value.trim();
  const verification = verificationInput.value.trim();
  const cardName = cardNameInput.value.trim();

  // Validate card number (you can add more specific validation if needed)
  const isCardNumberValid = cardNumber.length >= 14 && cardNumber.length <= 16;
  if (!isCardNumberValid) {
    onError(cardNumberInput, "Invalid card number");
  } else {
    onSuccess(cardNumberInput);
  }

  // Validate expiary date (you can add more specific validation if needed)
  const expiaryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const isExpiaryDateValid = expiaryRegex.test(expiaryDate);
  if (!isExpiaryDateValid) {
    onError(expiaryDateInput, "Invalid expiary date (use MM/YY format)");
  } else {
    const [month, year] = expiaryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
      onError(expiaryDateInput, "Card is too old");
    } else {
      onSuccess(expiaryDateInput);
    }
  }

  


  // Validate verification (you can add more specific validation if needed)
  const isVerificationValid = verification.length >= 3;
  if (!isVerificationValid) {
    onError(verificationInput, "Invalid verification (CVC/CVV)");
  } else {
    onSuccess(verificationInput);
  }

  // Validate card name
  const isCardNameValid = cardNameRegex.test(cardName);
  if (!isCardNameValid) {
    onError(cardNameInput, "Invalid name on card");
  } else {
    onSuccess(cardNameInput);
  }
  

  
// Retrieve the stored totalAmountPayable from the local storage
const storedTotalAmountPayable = parseInt(localStorage.getItem("totalAmountPayable"));

// You can now use the storedTotalAmountPayable variable as needed.
console.log("Stored Total Amount Payable:", storedTotalAmountPayable);


  const isFormValid =
    isCardNumberValid && isExpiaryDateValid && isVerificationValid && isCardNameValid;

  payButton.disabled = !isFormValid;
  payButton.innerText = isFormValid ? `Pay ${storedTotalAmountPayable}` : "Pay";
  
}





function onSuccess(input){
    // for the input element the parent is the div form control
    let parent = input.parentElement; // fetches the parent element of the input parameter
    let messageEle=parent.querySelector("span"); // tells parent element to find the span element
    messageEle.style.visibility="hidden";
    messageEle.innerHTML="";
    parent.classList.add("success");
    parent.classList.remove("error");


}

function onError(input, message){
    let parent = input.parentElement;
    let messageEle=parent.querySelector("span"); // tells parent element to find the span element
    messageEle.style.visibility="visible";
    messageEle.innerHTML=message;
    parent.classList.remove("success");
    parent.classList.add("error");
}


//retrieving summarytable stored in tickets page - table collapses too
// Retrieve the selected categories from localStorage
const storedNumlocalAdultTickets = parseInt(localStorage.getItem("numlocalAdultTickets")) || 0;
const storedNumlocalChildTickets = parseInt(localStorage.getItem("numlocalChildTickets")) || 0;
const storedNumforeignerAdultTickets = parseInt(localStorage.getItem("numforeignerAdultTickets")) || 0;
const storedNumforeignerChildTickets = parseInt(localStorage.getItem("numforeignerChildTickets")) || 0;
const storedNuminfantTickets = parseInt(localStorage.getItem("numinfantTickets")) || 0;

// Function to show or hide table rows based on ticket counts
function setRowVisibilityBasedOnTicketCount(rowId, ticketCount) {
    const row = document.getElementById(rowId);
    row.classList.toggle("hidden-row", ticketCount === 0);
}

// Retrieve the stored summary table from localStorage
const retrievedSummaryTable2 = JSON.parse(localStorage.getItem('summaryTable'));

const savedSelectedDate = localStorage.getItem("selectedDate");

document.getElementById('tableinputdate').textContent = savedSelectedDate;
document.getElementById('tableinputtime').textContent = retrievedSummaryTable2.tableinputtime;
document.getElementById('tableinputduration').textContent = retrievedSummaryTable2.tableinputduration;

// Populate the summary table based on selected categories
setRowVisibilityBasedOnTicketCount('rowlocaladult', storedNumlocalAdultTickets);
if (storedNumlocalAdultTickets > 0) {
    document.getElementById('localadulttable').textContent = retrievedSummaryTable2.localadulttable;
    document.getElementById('localadulttableprice').textContent = retrievedSummaryTable2.localadulttableprice;
    
}

setRowVisibilityBasedOnTicketCount("rowlocalchild", storedNumlocalChildTickets);
if (storedNumlocalChildTickets > 0) {
    document.getElementById("localchildtable").innerHTML = retrievedSummaryTable2.localchildtable;
    document.getElementById("localchildtableprice").innerHTML = retrievedSummaryTable2.localchildtableprice;
    
}
setRowVisibilityBasedOnTicketCount("rowforiegnadult", storedNumforeignerAdultTickets);
if (storedNumforeignerAdultTickets > 0) {
    document.getElementById("foriegnadulttable").innerHTML = retrievedSummaryTable2.foriegnadulttable;
    document.getElementById("foriegnadulttableprice").innerHTML = retrievedSummaryTable2.foriegnadulttableprice;
   
}

setRowVisibilityBasedOnTicketCount("rowforiegnchild", storedNumforeignerChildTickets);
if (storedNumforeignerChildTickets > 0) {
    document.getElementById("foriegnchildtable").innerHTML = retrievedSummaryTable2.foriegnchildtable;
    document.getElementById("foriegnchildtableprice").innerHTML = retrievedSummaryTable2.foriegnchildtableprice;   
}

setRowVisibilityBasedOnTicketCount("rowinfant", storedNuminfantTickets);
if (storedNuminfantTickets > 0) {
    document.getElementById("infanttable").innerHTML = retrievedSummaryTable2.infanttable;
    document.getElementById("infanttableprice").innerHTML = retrievedSummaryTable2.infanttableprice;
}

document.getElementById('totalPayableprice').innerHTML = retrievedSummaryTable2.totalPayableprice;

