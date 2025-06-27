const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const { getArtigoById, criarArtigo } = require('../controllers/artigo.controller');

// Rota para buscar artigo por ID
router.get('/:id', getArtigoById);

// Rota para criar artigo
router.post('/', criarArtigo);

// Rota para buscar por slug
router.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const artigo = await prisma.artigo.findUnique({
      where: { slug }
    });
    if (!artigo) return res.status(404).json({ erro: 'Artigo não encontrado.' });
    res.json(artigo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar artigo por slug.' });
  }
});

module.exports = router;
