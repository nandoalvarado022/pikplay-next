export default function handler(req, res) {
  if (req.method === 'GET') {
    const response = {
      data: {
        trividId: 1234,
      },
    };
    res.status(200).json(response);
  } else if (req.method === 'POST') {
    const newTransaction = req.body;
    newTransaction.id = transactions.length + 38; // Adjust ID generation logic as needed
    transactions.push(newTransaction);
    res.status(201).json({ code: 201, message: 'Transaction added successfully' });
  } else {
    res.status(405).json({ code: 405, message: 'Method not allowed' });
  }
}
