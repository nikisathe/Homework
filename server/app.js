const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const techerrecord_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "TEACHERRECORD"
});

techerrecord_connection.connect((error) => {
    if (error) {
        console.error("Error while connecting to techerrecord database:", error);
        process.exit(1);
    } else {
        console.log("techerrecord database connected");
    }
});

app.get('/assignments', (req, res) => {
    const sql = 'SELECT * FROM assignment';
    techerrecord_connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({
                error: 'Error fetching assignments'
            });
        } else {
            res.json(result);
        }
    });
});

app.post('/assignment', upload.single('file'), (req, res) => {
    const { deadline, title, createdby, description } = req.body;
    const file = req.file.buffer;

    const sql = 'INSERT INTO assignment (deadline, title, file, `created_by`, description) VALUES (?, ?, ?, ?, ?)';

    techerrecord_connection.query(sql, [deadline, title, file, createdby, description], (err, result) => {
        if (err) {
            console.error('Error creating assignment:', err);
            return res.status(400).send({
                error: 'Failed to add the data'
            });
        } else {
            console.log('Assignment created successfully');
            res.status(201).send({ message: 'Assignment created successfully' });
        }
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is connected on port ${port}`);
});
