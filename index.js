const mongoose = require('mongoose');
const { Schema } = mongoose;
const Book = require('./models/Book');
const express = require('express');
const session = require('express-session');
const app = express();
const ejs = require('ejs');
const port = 3000;
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ 
    secret: '2e3740c7c0968bce0754a08451b70ea66ed6bd8baad1642b54035a1937e1b424',
    resave: false,
    cookie: { maxAge: 60000 },
    saveUninitialized: true
}))
app.set('view engine','ejs');

app.listen(port,function(){
    console.log(`Serveur Express lancé sur le port : ${port}`)
})

//Pour voir un livre en détail
app.get('/view-book/:id', async function(request, response) {

    await mongoose.connect('mongodb://localhost:27017/books');

    const book = await Book.findById(request.params.id)

    mongoose.disconnect();

    const data = {book:book};

    response.render('pages/viewBook',data);
});

//Pour supprimer
app.get('/delete-book/:id', async function(request, response) {

    await mongoose.connect('mongodb://localhost:27017/books');

    const book = await Book.deleteOne({ _id: request.params.id })

    mongoose.disconnect();

    response.redirect('/');
});


//Pour créer un nouveau livre
app.get('/new-book', function(request, response) {
    response.render('pages/newBook');
});

//TODO Lorsqu'on fait deux ajouts ça met une erreur Server is closed
app.post('/new-book', async function(request, response) {

    let title = request.body.Title;
    let auteur = request.body.Auteur;
    let type = request.body.Type;
    let description = request.body.Description;
    let nbPages = request.body.nbPages;

    //On enregistre que si toutes les infos sont pas vides
    if(title!=''&&auteur!=''&&type!=''&&description!=''&&nbPages!='')
    {
        await mongoose.connect('mongodb://localhost:27017/books');

        const book = new Book({
            titre: title,
            auteur: auteur,
            type: type,
            description: description,
            nbPages: nbPages,
        })
        book.save()
        .catch(function(error){
            console.log(error);
        })
        .finally(function() {
            mongoose.disconnect();
        });
    }

    response.redirect('/');
});

//Pour modifier un livre (vue seulement)
app.get('/modify-book/:id', async function(request, response) {
    await mongoose.connect('mongodb://localhost:27017/books');

    const book = await Book.findById(request.params.id)

    mongoose.disconnect();

    const data = {book:book};

    response.render('pages/modifyBook',data);
});

//Pour modifier un livre (avec un post)
app.post('/modify-book/:id', async function(request, response) {

    let title = request.body.Title;
    let auteur = request.body.Auteur;
    let type = request.body.Type;
    let description = request.body.Description;
    let nbPages = request.body.nbPages;

    //TODO Lorsqu'on fait deux modifications ça met une erreur Server is closed
    //On enregistre que si toutes les infos sont pas vides
    if(title!=''&&auteur!=''&&type!=''&&description!=''&&nbPages!='')
    {
        await mongoose.connect('mongodb://localhost:27017/books');

        let book = await Book.findOneAndUpdate({
            "_id": request.params.id,}, 
            { $set: { title: title, auteur: auteur, type: type, description: description, nbPages: nbPages } 
        })
        .exec()
        .catch(function(error){
            console.log(error);
        })
        .finally(function() {
            mongoose.disconnect();
        });
    }

    response.redirect('/');
});




//Pour voir tous les livres
app.get('/', async function(request, response) {

    await mongoose.connect('mongodb://localhost:27017/books');

    const books = await Book.find({});

    mongoose.disconnect()

    const data = {books:books};
    response.render('pages/home',data);
});
