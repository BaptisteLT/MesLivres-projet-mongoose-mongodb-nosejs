const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./models/User');

async function main(){
    try
    {
        await mongoose.connect('mongodb://localhost:27017/demo');

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