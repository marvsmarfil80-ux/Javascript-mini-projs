var customers = [
    {name: "Juan Dela Cruz", email: "juan@email.com", purchases: [1200, 450, 300]},
    { name: "Maria Santos", email: "maria@email.com", purchases: [5000, 200] },
    { name: "Pedro Reyes", email: "", purchases: [800, -50] },
    { name: "Ana Lopez", email: "ana@email.com", purchases: [] },
    { name: "", email: "unknown@email.com", purchases: [1000, 1500, 250] }
];

function isValidCustomer(customer) {
    if (customer.name === "") {
        return false;
    }
    if (customer.email === "") {
        return false;
    }
    for (var i = 0; i < customer.purchases.length; i++) {
        if (customer.purchases[i] < 0) {
            return false;
        }
    }
    return true;
}

function calculateTotal(customer) {
  var total = 0;
  for (var i = 0; i < customer.purchases.length; i++) {
    total = total + customer.purchases[i];
  }
  return total;
}


var validCustomers = [];
var invalidCustomers = [];
var grandTotal = 0;

for (var i = 0; i < customers.length; i++) {
  var currentCustomer = customers[i];

  if (isValidCustomer(currentCustomer)) {
    var customerTotal = calculateTotal(currentCustomer);
    grandTotal = grandTotal + customerTotal;

    validCustomers.push(currentCustomer);

    console.log(currentCustomer.name + " - Total: " + customerTotal);
  } else {
    invalidCustomers.push(currentCustomer);
  }
}

console.log("\n======== Summary ====");
console.log("Valid customers: " + validCustomers.length);
console.log("Invalid customers: " + invalidCustomers.length);
console.log("Grand total revenue: " + grandTotal);

if (validCustomers.length > 0) {
  var average = grandTotal / validCustomers.length;
  console.log("Average revenue per valid customer: " + average);
}