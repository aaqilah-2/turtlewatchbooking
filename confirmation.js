//retrieving summarytable stored in tickets page - table collapses too
// Retrieve the selected categories from localStorage


const storedNumlocalAdultTickets = parseInt(localStorage.getItem("numlocalAdultTickets"));
const storedNumlocalChildTickets = parseInt(localStorage.getItem("numlocalChildTickets"));
const storedNumforeignerAdultTickets = parseInt(localStorage.getItem("numforeignerAdultTickets"));
const storedNumforeignerChildTickets = parseInt(localStorage.getItem("numforeignerChildTickets"));
const storedNuminfantTickets = parseInt(localStorage.getItem("numinfantTickets"));

// Function to show or hide table rows based on ticket counts
function setRowVisibilityBasedOnTicketCount(rowId, ticketCount) {
    const row = document.getElementById(rowId);
    row.classList.toggle("hidden-row", ticketCount === 0);
}

// Retrieve the stored summary table from localStorage
const retrievedSummaryTable1 = JSON.parse(localStorage.getItem('summaryTable'));

//retrieving details form info to include into the table
const savedFullName = localStorage.getItem("fullName");
const savedMobileNumber = localStorage.getItem("mobileNumber");
const savedEmail = localStorage.getItem("email");
const savedConfirmEmail = localStorage.getItem("confirmEmail");
const savedGender = localStorage.getItem("gender");

const savedSelectedDate = localStorage.getItem("selectedDate");

document.getElementById('tableinputdate').textContent = savedSelectedDate;
document.getElementById('tableinputtime').textContent = retrievedSummaryTable1.tableinputtime;
document.getElementById('tableinputduration').textContent = retrievedSummaryTable1.tableinputduration;
document.getElementById("fullNameTable").textContent = savedFullName;
document.getElementById("phoneTable").textContent = savedMobileNumber;
document.getElementById("emailTable").textContent = savedConfirmEmail;
document.getElementById("genderTable").textContent = savedGender;

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



