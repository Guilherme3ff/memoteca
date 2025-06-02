const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Rotas
app.get('/memorias', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM memorias');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar memórias:', error);
    res.status(500).json({ error: 'Erro ao buscar memórias' });
  }
});

app.get('/memorias/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM memorias WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Memória não encontrada' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar memória:', error);
    res.status(500).json({ error: 'Erro ao buscar memória' });
  }
});

app.post('/memorias', upload.single('midia'), async (req, res) => {
  try {
    const { titulo, descricao, data, autor } = req.body;
    const midia = req.file ? req.file.filename : null;
    await db.query(
      'INSERT INTO memorias (titulo, descricao, data, autor, midia) VALUES (?, ?, ?, ?, ?)',
      [titulo, descricao, data, autor, midia]
    );
    res.json({ message: 'Memória criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar memória:', error);
    res.status(500).json({ error: 'Erro ao criar memória' });
  }
});

app.put('/memorias/:id', upload.single('midia'), async (req, res) => {
  try {
    const { titulo, descricao, data, autor, midiaAntiga } = req.body;
    const midia = req.file ? req.file.filename : midiaAntiga || null;

    const [result] = await db.query(
      'UPDATE memorias SET titulo = ?, descricao = ?, data = ?, autor = ?, midia = ? WHERE id = ?',
      [titulo, descricao, data, autor, midia, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Memória não encontrada para atualizar' });
    }

    res.json({ message: 'Memória atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar memória:', error);
    res.status(500).json({ error: 'Erro ao atualizar memória' });
  }
});

app.delete('/memorias/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM memorias WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Memória não encontrada para deletar' });
    }
    res.json({ message: 'Memória deletada!' });
  } catch (error) {
    console.error('Erro ao deletar memória:', error);
    res.status(500).json({ error: 'Erro ao deletar memória' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
