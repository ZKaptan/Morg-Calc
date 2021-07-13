function getValues() {
	// Get input values
	let loan = document.getElementById("loan-amount").value;
	let months = document.getElementById("loan-time").value;
	let rate = document.getElementById("loan-rate").value;
	// Validate inputs
	if (validateLoan() && validateMonths() && validateRate()) {
		displayData(loan, months, rate);
	}
}

function totalMonthlyPayment(loan, months, rate) {
	return (loan * (rate / 1200)) / (1 - Math.pow(1 + rate / 1200, -months));
}

function principalPayment(totalMonthlyPayment, interestPayment) {
	return totalMonthlyPayment - interestPayment;
}

function interestPayment(previousBalance, rate) {
	return (previousBalance * rate) / 1200;
}

function validateLoan() {
	const loan = document.getElementById("loan-amount");
	const re = /^[0-9]{0,10}$/;
	// If input does not satisfy regex, add alert class styling and return false
	if (!re.test(loan.value)) {
		loan.classList.add("alert-danger");
		return false;
	}
	// Otherwise remove alert class and return true
	loan.classList.remove("alert-danger");
	return true;
}
// Same logic for following two methods
function validateMonths() {
	const months = document.getElementById("loan-time");

	const re = /^[0-9]{0,5}$/;

	if (!re.test(months.value)) {
		console.log(!re.test(months));
		months.classList.add("alert-danger");
		return false;
	}
	months.classList.remove("alert-danger");
	return true;
}

function validateRate() {
	const rate = document.getElementById("loan-rate");
	const re = /^[0-9]{0,3}$/;

	if (!re.test(rate.value)) {
		rate.classList.add("alert-danger");
		return false;
	}
	rate.classList.remove("alert-danger");
	return true;
}

function displayData(loan, months, rate) {
	let totalInterest = 0;
	let balance = loan;
	let output = "";

	// Loop through months
	for (let i = 0; i < months; i++) {
		// Concat to output
		/* Using finance functions, calculate each metric for the given month and add to output variable. Also, ensure data is formatted correctly using template literals
		 */
		output += `
        <tr>
        <td>${i + 1}</td>
        <td>
        $${totalMonthlyPayment(loan, months, rate).toFixed(2)}
        </td>
        <td>$${interestPayment(balance, rate).toFixed(2)}</td>

        <td>$${principalPayment(
					totalMonthlyPayment(loan, months, rate),
					interestPayment(balance, rate)
				).toFixed(2)}</td>
        <td>$${(totalInterest += interestPayment(balance, rate)).toFixed(
					2
				)}</td>
        <td>$${Math.abs(
					(balance -= principalPayment(
						totalMonthlyPayment(loan, months, rate),
						interestPayment(balance, rate)
					)).toFixed(2)
				)}
            </td>
        </tr>`;
	}
	// Append the data to the DOM and format correctly
	document.getElementById(
		"monthly-payment"
	).textContent = `$${totalMonthlyPayment(loan, months, rate).toFixed(2)}`;
	document.getElementById("total-principal").textContent = `$${loan}`;
	document.getElementById(
		"total-interest"
	).textContent = `$${totalInterest.toFixed(2)}`;
	document.getElementById("total-cost").textContent = `$${parseInt(
		totalInterest + loan
	).toFixed(2)}`;

	document.getElementById("results").innerHTML = output;
}

document.getElementById("btnSubmit").addEventListener("click", (e) => {
	e.preventDefault();
	getValues();
});

document.getElementById("loan-amount").addEventListener("keyup", validateLoan);
document.getElementById("loan-time").addEventListener("keyup", validateMonths);
document.getElementById("loan-rate").addEventListener("keyup", validateRate);
