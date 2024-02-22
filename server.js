// server.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'petshop',
});

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor PetShop!');
});

// Rota para buscar pets
app.get('/pets', (req, res) => {
  connection.query('SELECT * FROM pets', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar pets.');
    } else {
      res.json(results);
    }
  });
});


app.post('/pets', (req, res) => {
  const { tipo, nome, dono_nome, telefone, data_nascimento } = req.body;

  connection.query(
    'INSERT INTO pets (tipo, nome, dono_nome, telefone, data_nascimento) VALUES (?, ?, ?, ?, ?)',
    [tipo, nome, dono_nome, telefone, data_nascimento],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao cadastrar pet.');
      } else {
        res.json({ id: results.insertId });
      }
    }
  );
});


app.delete('/pets/:id', (req, res) => {
  const petId = req.params.id;

  console.log('ID do pet a ser excluído:', petId); 

  connection.query('DELETE FROM pets WHERE id = ?', [petId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Erro ao excluir pet com ID ${petId}.`);
    } else {
      res.json({ message: `Pet com ID ${petId} excluído com sucesso.` });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


