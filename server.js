const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));