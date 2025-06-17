import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Firebase Admin Credentials
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let db;

// Connect to MongoDB
async function connectToDB() {
    const {
        MONGODB_USERNAME,
        MONGODB_PASSWORD,
        MONGODB_DATABASE_NAME
    } = process.env;
    
    const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_DATABASE_NAME}.bgjmb1w.mongodb.net/?retryWrites=true&w=majority&appName=${MONGODB_DATABASE_NAME}`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    await client.connect();
    db = client.db('full-stack-react-db');
}

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!\/api).+/, (req , res) => {// anything that doesnt start with api
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name: name });
    res.json(article);
});

app.use(async function (req, res, next) {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            const user = await admin.auth().verifyIdToken(authtoken);
            req.user = user;
            next();
        } catch (err) {
            res.status(400).send('Invalid auth token');
        }
    } else {
        res.status(400).send('Missing auth token');
    }
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
        try {
            const updatedArticle = await db.collection('articles').findOneAndUpdate(
                { name },
                {
                    $inc: { upvotes: 1 },
                    $push: { upvoteIds: uid },
                },
                { returnDocument: 'after' }
            );
            res.json(updatedArticle);
        } catch (err) {
            console.error('Error updating article:', err);
            res.status(500).send('Error updating article');
        }
    } else {
        res.sendStatus(403); // Already upvoted or not authorized
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };

    try {
        const updatedArticle = await db.collection('articles').findOneAndUpdate(
            { name: name },
            { $push: { comments: newComment } },
            { returnDocument: 'after' }
        );
        res.json(updatedArticle);
    }
    catch (err) {
        console.error('Error updating article:', err);
        res.status(500).send('Error updating article');
    }
});

// Below is used for testing purposes, you can uncomment it to test the GET and POST endpoints.
// app.get('/hello', function (req, res) {
//     res.send('Hello from a GET endpoint!');
// });

// app.get('/hello/:name', function (req, res) {
//     res.send('Hello, ' + req.params.name + ' from a GET endpoint!');
// });

// app.post('/hello', function (req, res) {
//     res.send('Hello, ' + req.body.name + ' from a POST endpoint!');
// });

const PORT = process.env.PORT || 8000;
async function start() {
    await connectToDB();
    app.listen(PORT, function () {
        console.log('Server is listening on port ' + PORT);
    });
}

start();