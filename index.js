const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Your Muthobarta API token
const token = 'a01672bb001e285a3563fd652118422866d8f97a';

app.get('/', async (req, res) => {
  const { receiver, message } = req.query;

  if (!receiver || !message) {
    return res.status(400).send('Missing receiver or message');
  }

  try {
    const response = await axios.post('https://sysadmin.muthobarta.com/api/v1/send-sms', {
      receiver: receiver,
      message: message,
      remove_duplicate: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.response ? error.response.data : error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
