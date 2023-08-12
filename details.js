
//referencing
const dForm = document.getElementById("detailsForm"); 
const fullName = document.getElementById("name");
const mobileNumber = document.getElementById("phone");
const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirmemail");
const gender = document.getElementById("gender");
const btnContPurchase = document.getElementById("btn");


const fullNameControl = document.getElementById("fullNameControl"); // Add this line
const emailControl =  document.getElementById("emailControl");
const confirmEmailControl =  document.getElementById("confirmEmailControl");


dForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
 
   
});



  
function checkInputs() {

    fullNameControl.classList.remove('success', 'error');
    emailControl.classList.remove('success', 'error');
    confirmEmailControl.classList.remove('success', 'error');

    // Get the values from user inputs
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const confirmEmailValue = confirmEmail.value.trim();

    // Validate full name
    if (fullNameValue === '') {
        setErrorFor(fullNameControl, 'Full name cannot be blank');
    } else {
        setSuccessFor(fullNameControl);
    }

    // Validate email
    if (emailValue === '') {
        setErrorFor(emailControl, 'Email cannot be blank');
    } else {
        setSuccessFor(emailControl);
    }

    // Validate confirm email
    if (confirmEmailValue === '') {
        setErrorFor(confirmEmailControl, 'Confirm email cannot be blank');
    } else if (confirmEmailValue !== emailValue) {
        setErrorFor(confirmEmailControl, 'Emails do not match');
    } else {
        setSuccessFor(confirmEmailControl);
    }

    
   
        if (mobileNumber.checkValidity()) {
            mobileNumber.style.borderColor = 'green';
        } else {
            mobileNumber.style.borderColor = 'red';
        }
    
updateSubmitButtonStatus();
}

function updateSubmitButtonStatus() {
    const isValid =
        fullName.value.trim() !== "" &&
        email.checkValidity() &&
        confirmEmail.value === email.value &&
        mobileNumber.checkValidity();

    const submitButton = document.getElementById('btn');
    submitButton.disabled = !isValid;
    if (isValid) {
         // Save user inputs to localStorage
         localStorage.setItem("fullName", fullName.value);
         localStorage.setItem("mobileNumber", mobileNumber.value);
         localStorage.setItem("email", email.value);
         localStorage.setItem("confirmEmail", confirmEmail.value);
         localStorage.setItem("gender", gender.value);

        window.location.href = "payments.html";
    }
}





function setErrorFor(input, message) {
    const formControl = input;
    const span = formControl.querySelector('span');
    span.innerHTML = message;
    formControl.classList.add('error');
    formControl.classList.remove('success');
}

function setSuccessFor(input) {
    const formControl = input;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}


//retrieving summarytable stored in tickets page - table collapses too
// Retrieve the selected categories from localStorage


const storedNumlocalAdultTickets = parseInt(localStorage.getItem("numlocalAdultTickets"));
const storedNumlocalChildTickets = parseInt(localStorage.getItem("numlocalChildTickets"));
const storedNumforeignerAdultTickets = parseInt(localStorage.getItem("numforeignerAdultTickets"));
const storedNumforeignerChildTickets = parseInt(localStorage.getItem("numforeignerChildTickets"));
const storedNuminfantTickets = parseInt(localStorage.getItem("numinfantTickets"));

// Hide specific rows
document.getElementById("rowFullName").style.display = "none";
document.getElementById("rowMobileNum").style.display = "none";
document.getElementById("rowEmail").style.display = "none";
document.getElementById("rowGender").style.display = "none";


// Function to show or hide table rows based on ticket counts
function setRowVisibilityBasedOnTicketCount(rowId, ticketCount) {
    const row = document.getElementById(rowId);
    row.classList.toggle("hidden-row", ticketCount === 0);
}

// Retrieve the stored summary table from localStorage
const retrievedSummaryTable1 = JSON.parse(localStorage.getItem('summaryTable'));

const savedSelectedDate = localStorage.getItem("selectedDate");

document.getElementById('tableinputdate').textContent = savedSelectedDate;
document.getElementById('tableinputtime').textContent = retrievedSummaryTable1.tableinputtime;
document.getElementById('tableinputduration').textContent = retrievedSummaryTable1.tableinputduration;

// Populate the summary table based on selected categories
setRowVisibilityBasedOnTicketCount('rowlocaladult', storedNumlocalAdultTickets);
if (storedNumlocalAdultTickets > 0) {
    document.getElementById('localadulttable').textContent = retrievedSummaryTable1.localadulttable;
    document.getElementById('localadulttableprice').textContent = retrievedSummaryTable1.localadulttableprice;
    
}

setRowVisibilityBasedOnTicketCount("rowlocalchild", storedNumlocalChildTickets);
if (storedNumlocalChildTickets > 0) {
    document.getElementById("localchildtable").innerHTML = retrievedSummaryTable1.localchildtable;
    document.getElementById("localchildtableprice").innerHTML = retrievedSummaryTable1.localchildtableprice;
    
}
setRowVisibilityBasedOnTicketCount("rowforiegnadult", storedNumforeignerAdultTickets);
if (storedNumforeignerAdultTickets > 0) {
    document.getElementById("foriegnadulttable").innerHTML = retrievedSummaryTable1.foriegnadulttable;
    document.getElementById("foriegnadulttableprice").innerHTML = retrievedSummaryTable1.foriegnadulttableprice;
   
}

setRowVisibilityBasedOnTicketCount("rowforiegnchild", storedNumforeignerChildTickets);
if (storedNumforeignerChildTickets > 0) {
    document.getElementById("foriegnchildtable").innerHTML = retrievedSummaryTable1.foriegnchildtable;
    document.getElementById("foriegnchildtableprice").innerHTML = retrievedSummaryTable1.foriegnchildtableprice;   
}

setRowVisibilityBasedOnTicketCount("rowinfant", storedNuminfantTickets);
if (storedNuminfantTickets > 0) {
    document.getElementById("infanttable").innerHTML = retrievedSummaryTable1.infanttable;
    document.getElementById("infanttableprice").innerHTML = retrievedSummaryTable1.infanttableprice;
}

document.getElementById('totalPayableprice').innerHTML = retrievedSummaryTable1.totalPayableprice;








  







  




    






