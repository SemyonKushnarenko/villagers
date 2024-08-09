import mysql from 'mysql2/promise';
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(cors())

const jsonParser = bodyParser.json()


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});



app.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при получении данных'); // Отправляем сообщение об ошибке
  }
});

app.get('/users/:tg_id', async (req, res) => {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM users where tg_id=' + req.params.tg_id);
      if (!rows[0]) {
        return res.status(404).send('Нет такого пользователя!');
      }
      res.json(rows[0]);
    } catch (error) {
      console.error(error); 
      res.status(500).send('Ошибка при получении данных'); 
    }
})

app.post('/users', jsonParser, async (req, res) => {
  try {
    const {tg_id, name} = req.body;
    const [rows, fields] = await pool.query(`insert into users (tg_id, name, villagers) values (${tg_id}, '${name}', 0)`);
    return res.status(201).send(req.body)
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при получении данных');
  }
});
