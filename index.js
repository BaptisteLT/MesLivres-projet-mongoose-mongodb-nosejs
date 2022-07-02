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


app.get('/', async function(request, response) {

    await mongoose.connect('mongodb://localhost:27017/books');


    /*const book = new Book({
        titre: 'Les 4 animaux',
        auteur: 'Baptiste LT',
        type: 'Thriller',
        nbPages: 95,
    })
    book.save()
        .then((result)=>{
            //Logiquement redirect vers la page avec l'ID
            response.send(result)
        })
        .catch((err)=>{
            console.log(err)
        });
*/
    const books = await Book.find({});



    mongoose.connection.close()

    const data = {books:books};
    response.render('pages/home',data);
});

async function main(){
    try
    {
        await mongoose.connect('mongodb://localhost:27017/books');

        //const users = await User.find({nom: 'Cauchon'});
        const users = await User.find({$or:[
            { age: {$gte:20} },
            { nom: 'Cauchon' }
        ]
            
        });
        
        const users2 = await User.find({
            age: { $gt: 50},
            $or: [
                { prenom:"Bernard" },
                { prenom:"Marina"}
            ]
        }).select('nom prenom')

        console.log(users2);

 
        console.log("connexion ok !");

        /*const bernard = new User({
            email: 'toto@toto.fr',
            prenom: 'Bernard',
            nom: 'Cauchon',
            age: 54,
        })*/



        /*
        const marina = await User.create({
            email: 'toto@tfffotffo.frf',
            prenom: 'Bernard',
            nom: 'Cauchon',
            age: 54,
        })
        */

        //console.log(bernard);
        //await bernard.save();
        mongoose.disconnect();
    }
    catch(error){
        console.log(error);
    }
}

main();