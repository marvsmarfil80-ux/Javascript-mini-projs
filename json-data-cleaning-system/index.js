
const rawOrders = [
  { id: 1, customer: "  juan dela cruz ", email: "JUAN@EMAIL.COM", amount: 1200, status: "completed" },
  { id: 2, customer: "Maria Santos", email: "maria@email.com", amount: -50, status: "pending" },
  { id: 3, customer: "Pedro Reyes", email: null, amount: 800, status: "completed" },
  { id: 4, customer: "Ana Lopez", email: "ana@email.com", amount: 3000, status: "COMPLETED" },
  { id: 1, customer: "juan dela cruz", email: "juan@email.com", amount: 1200, status: "completed" }, // duplicate of #1
  { id: 5, customer: "", email: "unknown@email.com", amount: 500, status: "pending" },
  { id: 6, customer: "Carlo Mendoza", email: "carlo@email.com", amount: 1500, status: "cancelled" }
];


function isValidOrder(order) {
  const hasName = order.customer?.trim().length > 0;
  const hasEmail = order.email !== null && order.email !== undefined;
  const validAmount = order.amount >= 0;

  return hasName && hasEmail && validAmount;
}

const validOrders = rawOrders.filter(isValidOrder);
const rejectedOrders = rawOrders.filter((order) => !isValidOrder(order));


function normalizeOrder(order) {
  const { id, customer, email, amount, status } = order;

  return {
    id,
    customer: customer.trim(),
    email: email.toLowerCase(),
    amount,
    status: status.toUpperCase()
  };
}

const normalizedOrders = validOrders.map(normalizeOrder);

function removeDuplicates(orders) {
  const seenIds = new Set();
  const uniqueOrders = [];

  for (const order of orders) {
    if (!seenIds.has(order.id)) {
      seenIds.add(order.id);
      uniqueOrders.push(order);
    }
  }

  return uniqueOrders;
}

const cleanedOrders = removeDuplicates(normalizedOrders);


const totalRevenue = cleanedOrders
  .filter((order) => order.status === "COMPLETED")
  .reduce((sum, order) => sum + order.amount, 0);

const ordersByStatus = cleanedOrders.reduce((groups, order) => {
  const key = order.status;
  groups[key] = (groups[key] ?? 0) + 1;
  return groups;
}, {});


console.log("===== CLEANED ORDERS =====");
console.log(cleanedOrders);

console.log("\n===== REJECTED ORDERS =====");
console.log(rejectedOrders);

console.log("\n===== SUMMARY =====");
console.log(`Raw records: ${rawOrders.length}`);
console.log(`Valid (after validation): ${validOrders.length}`);
console.log(`Rejected: ${rejectedOrders.length}`);
console.log(`Unique after dedup: ${cleanedOrders.length}`);
console.log(`Total revenue (completed only): ${totalRevenue}`);
console.log("Orders by status:", ordersByStatus);