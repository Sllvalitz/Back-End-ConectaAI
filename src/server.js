const express = require('express');
const cors = require('cors');
const artigoRoutes = require('./routes/artigo.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/artigos', artigoRoutes);

app.listen(3333, () => console.log('🔥 Servidor rodando na porta 3333'));
