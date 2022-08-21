const billAmount = document.querySelector("#input-billamount"),
  cashGiven = document.querySelector("#input-cashgiven"),
  nextBtn = document.querySelector("#next-btn"),
  checkBtn = document.querySelector("#check-btn"),
  backBtn = document.querySelector("#back-btn"),
  cashGivenCtn = document.querySelector("#cash-given-container"),
  returnChangeCtn = document.querySelector("#return-change-container"),
  notes = document.querySelectorAll(".notes"),
  errorMsg = document.querySelector("#error-message"),
  availableNotes = [2000, 500, 100, 20, 10, 5, 1];

function validateBillAmount() {
  if (billAmount.value <= 0) {
    showError("Bill Amount should be greater than 0");
  } else {
    errorMsg.style.display = "none";
    nextBtn.style.display = "none";
    cashGivenCtn.style.display = "block";
    billAmount.disabled = true;
  }
}

function validateCashGiven() {
  const cashGivenValue = Number(cashGiven.value);
  const billAmountValue = Number(billAmount.value);

  if (cashGivenValue <= 0) {
    showError("Cash given should be greater than 0");
  } else if (cashGivenValue < billAmountValue) {
    showError(
      "Do you wanna wash plates?\n Please enter amount greater than bill amount"
    );
    returnChangeCtn.style.display = "none";
  } else {
    calculateReturnChange(billAmountValue, cashGivenValue);
  }
}

function showError(errorMessage) {
  errorMsg.style.display = "block";
  errorMsg.innerText = errorMessage;
  returnChangeCtn.display = "none";
}

function calculateReturnChange(billAmount, cashGiven) {
  errorMsg.style.display = "none";
  returnChangeCtn.style.display = "block";
  var amountToBeReturned = cashGiven - billAmount;
  for (let i = 0; i < availableNotes.length; i++) {
    var noOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]);
    notes[i].innerText = noOfNotes;
    amountToBeReturned = amountToBeReturned - noOfNotes * availableNotes[i];
  }
}

function backAction() {
  billAmount.disabled = false;
  nextBtn.style.display = "block";
  cashGivenCtn.style.display = "none";
  returnChangeCtn.style.display = "none";
  errorMsg.style.display = "none";
}

nextBtn.addEventListener("click", validateBillAmount);

checkBtn.addEventListener("click", validateCashGiven);

backBtn.addEventListener("click", backAction);
