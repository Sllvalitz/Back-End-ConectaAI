const prisma = require('../config/prisma');
const slugify = require('slugify');

const getArtigoById = async (req, res) => {
  const { id } = req.params;
  try {
    const artigo = await prisma.artigo.findUnique({
      where: { id: Number(id) }
    });

    if (!artigo) return res.status(404).json({ mensagem: 'Artigo não encontrado.' });

    res.json(artigo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar artigo.' });
  }
};

const criarArtigo = async (req, res) => {
  const { titulo, conteudo, imagemUrl } = req.body;
  const slug = slugify(titulo, { lower: true, strict: true });
  
  try {
    const novoArtigo = await prisma.artigo.create({
      data: { titulo, conteudo, imagemUrl, slug },
    });
    res.status(201).json(novoArtigo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar artigo.' });
  }
};

module.exports = {
  getArtigoById,
  criarArtigo
};

