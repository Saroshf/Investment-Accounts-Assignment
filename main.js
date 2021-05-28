// Investment Accounts Assignment Start Code

// HTML Variables
let containerEl = document.getElementById("container");
let outputEl = document.getElementById("output");
let goBtnEl = document.getElementById("go");
let menuEl = document.getElementById("menu");

// Global Variable
let accounts = [];
for (let n = 1; n <= 200; n++) {
  accounts.push(Math.random() * 5000);
}
console.log(accounts);
let maxAmount = 5000; // account values should be b/t 0 and max

// Display Data
drawArray();

function drawArray() {
  let outputStr = "";
  let divHeight;
  for (let i = 0; i < accounts.length; i++) {
    divHeight = (accounts[i] / maxAmount) * 600; // Scale accounts to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  containerEl.innerHTML = outputStr;
}

// Main Menu & Go Button
goBtnEl.addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = menuEl.value;

  // Take action based on menu selection
  if (selection === "count-range") {
    countRange();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "hacker") {
    hackerAttack();
  } else if (selection === "stats") {
    investmentStats();
  } else if (selection === "add") {
    addAccount();
  } else if (selection === "remove-low") {
    removeLow();
  } else if (selection === "robin-hood") {
    robinHood();
  }

  // Redraw array to show any changes
  drawArray();
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function countRange() {
  // Output the number of accounts with amounts between $2,000 and $4,000, inclusive
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] >= 2000 && accounts[i] <= 4000) {
      count++;
    }
  }
  outputEl.innerHTML = `<p>The number of accounts between $2,000 and $4,000 is: ${count}</p>`;
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000. 
  // Modify the investment account array to apply this donation.
  // Output the total amount of money that was donated.
  let totAmount = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] <= 2000) {
      accounts[i] += 500;
      totAmount += 500;
    }
  }
  outputEl.innerHTML = `<p>Total Amount of Money Donated: $${totAmount}</p>`;
}


function hackerAttack() {
  // A hacker steals 5% from every account.
  // Modify the investment account array to apply this theft.
  // Output the total amount that was stolen.
  let totAmountstl = 0;
  for (let i = 0; i < accounts.length; i++) {
    accounts[i] -= accounts[i] * 0.05;
    totAmountstl += accounts[i] * 0.05;
  }
  outputEl.innerHTML = `<p>Total Amount of Money Stolen: $${totAmountstl}</p>`;
}

function investmentStats() {
  // Output the minimum account amount, the maximum account amount
  // and the average account amount.
  let minAccount = Math.min(...accounts);
  let maxAccount = Math.max(...accounts);
  let avgAccount = (maxAccount + minAccount) / 2;
  outputEl.innerHTML = `<div>
  <p>Minimum Account Amount: $${minAccount}</p>
  <p>Maximum Account Amount: $${maxAccount}</p>
  <p>Average Account Amount: $${avgAccount}</p>
  </div>`;

}

function addAccount() {
  // Prompt for a new account amount and add this to the invesment account
  // array. Output a confirmation that a new account was added with an
  // opening amount of _______.
  let newAccount = Number(prompt("Please Enter An Amount For A New Account!"));
  accounts.push(newAccount);
  outputEl.innerHTML = `<p>A new account has been added with an opening amount of $${newAccount}!</p>`;
}

function removeLow() {
  // Remove all accounts that are below $500.
  // Output how many accounts were removed.
  let accRemoved = 0;
  for (let i = accounts.length - 1; i >= 0; i--) {
    if (accounts[i] < 500) {
      accounts.splice(i, 1);
      accRemoved++;
    }
  }
  outputEl.innerHTML = `<p>Amount of accounts removed: ${accRemoved}</p>`;
}

function robinHood() {
  // Steal from the rich and give to the poor.
  // Take $400 from every account that has over $4000.
  // Then evenly distribute the total amount taken between all the
  // accounts that have less than $1000.
  // Output how many accounts received money and 
  // how much each account received.
  let mnyTaken = 0;
  let accReceived = 0;
  for (let i = 0; i < accounts.length; i++) {
    // Steal from Rich
    if (accounts[i] > 4000) {
      accounts[i] -= 400;
      mnyTaken += 400;
    } else if (accounts[i] < 1000) {  // Count the Poor
      accReceived++;
    }
  }
  let mnyGiven = (mnyTaken / accReceived);
  for (let i = 0; i < accounts.length; i++) { // Give to Poor
    if (accounts[i] < 1000) {
      accounts[i] += mnyGiven;
    }
  }
  console.log(mnyTaken);
  console.log(accReceived);
  outputEl.innerHTML = `<div><p>Amount of accounts that received money: ${accReceived}</p><p>Money that each account received: $${mnyGiven}</p></div>`;
}