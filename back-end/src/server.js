import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

let db;
// Connect to MongoDB

async function connectToDB() {
   // const uri = 'mongodb://127.0.0.1:27017'; // run only if on local environment
   const uri = process.env.MONGO_URI;


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

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ articleName: name });

    res.json(article);
});

//Could use => instead of function 
app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

   const updatedArticle = await db.collection('articles').findOneAndUpdate({ 
    articleName: name }, {
        $inc: { upvotes: 1 } 
    }, {
        returnDocument: 'after'}).then(updatedArticle => {
            res.json(updatedArticle);
    }).catch(err => {
        console.error('Error updating article:', err);
        res.status(500).send('Error updating article');
    });
});


app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };
    
    try {
        const updatedArticle = await db.collection('articles').findOneAndUpdate(
            { articleName: name },
            { $push: { comments: newComment }},
            { returnDocument: 'after'}
        );
        res.json(updatedArticle);
    } 
        catch (err) {
            console.error('Error updating article:', err);
            res.status(500).send('Error updating article');
        }
});

    
//Below is used for testing purposes, you can uncomment it to test the GET and POST endpoints.
// app.get('/hello', function (req, res) {
//     res.send('Hello from a GET endpoint!');
// });

// app.get('/hello/:name', function (req, res) {
//     res.send('Hello, ' + req.params.name + ' from a GET endpoint!');
// });

// app.post('/hello', function (req, res) {
//     res.send('Hello, ' + req.body.name + ' from a POST endpoint!');
// });

async function start() {
    await connectToDB();
    app.listen(8000, function () {
        console.log('Server is listening on port 8000');
    });
} 

start();
