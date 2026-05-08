const checkSuspicious = (user, amount, type, receiverId) => {
  let flag = false;
  let reasons = [];

  // Rule 1: High Value
  if (amount > 100000) {
    flag = true;
    reasons.push("Transaction amount exceeds 100,000 PKR");
  }

  // Rule 2: Blocked User Attempt (Should technically be stopped earlier, but log it)
  if (user && user.status === 'blocked') {
    flag = true;
    reasons.push("Blocked user attempted financial action");
  }

  // Rule 3: Self Transfer
  if (type === 'transfer' && user && user._id.toString() === receiverId) {
    flag = true;
    reasons.push("Attempted self-transfer");
  }

  // Rule 4: Negative or Zero Amount (Data manipulation attempt)
  if (amount <= 0) {
    flag = true;
    reasons.push("Attempted zero or negative value transaction");
  }

  // Rule 5: New Account Spike (Simulation: assume newly created if within 24h)
  if (user && user.createdAt) {
    const isNewAccount = (Date.now() - new Date(user.createdAt).getTime()) < 86400000;
    if (isNewAccount && amount > 50000) {
      flag = true;
      reasons.push("High value transaction on newly created account");
    }
  }

  return { suspiciousFlag: flag, suspiciousReasons: reasons };
}

module.exports = checkSuspicious;
