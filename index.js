import mysql from 'mysql2/promise';
import 'dotenv/config';
import express from 'express';

const app = express();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM users');
    console.log(rows); // Выводим результаты в консоль
    res.json(rows); // Отправляем результаты в ответе
  } catch (error) {
    console.error(error); // Логируем ошибку
    res.status(500).send('Ошибка при получении данных'); // Отправляем сообщение об ошибке
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
