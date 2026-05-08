const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Wallet = require('./models/Wallet');
const Transaction = require('./models/Transaction');
const User = require('./models/User');
// No helpers import

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('DB Connected');
  try {
    const wallets = await Wallet.find({ balance: 0 }); // Find wallets with 0 balance
    let count = 0;

    for (let wallet of wallets) {
      wallet.balance = 50000;
      wallet.totalDeposits = (wallet.totalDeposits || 0) + 50000;
      await wallet.save();

      await Transaction.create({
        transactionId: `TXN-DEP-${Date.now()}-${Math.floor(Math.random()*1000)}`,
        type: 'deposit',
        amount: 50000,
        status: 'successful',
        senderId: wallet.userId,
        receiverId: wallet.userId,
      });
      count++;
    }

    console.log(`Successfully credited 50,000 PKR to ${count} existing zero-balance wallets!`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}).catch(err => console.log(err));
