const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res) => {
console.log('Datos recibidos:', req.body);
  const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbzfl389Wc-2zDyqWB2UBFpRvUtUC0aQ8t7DgEtypVcauuUpkyuhtE8JPF7cKLNlEwqF/exec';

  try {
    const response = await fetch(googleAppsScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al reenviar al Apps Script:', error);
    res.status(500).json({ error: 'Fallo al reenviar al Apps Script' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy activo en puerto ${PORT}`);
});
