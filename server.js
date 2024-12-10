require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

const apiKey = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // need to be able to see the changes on styles.css reflected

app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/api/openai', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        "response_format": {"type": "json_object"},
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // log the whole response to check its structure
    console.log('OpenAI Response:', response.data);

    // mod the response according to the correct structure
    res.json({ songs: JSON.parse(response.data.choices[0].message.content) });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error fetching response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
