const mongoose = require('mongoose');

// Schema pentru un utilizator
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true // nu pot exista doi useri cu același username
    },
    email: { 
        type: String, 
        unique: true, // email-ul este opțional, dar dacă e pus trebuie să fie unic
        sparse: true 
    },
    password: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true // adaugă automat createdAt și updatedAt
});

// Exportăm modelul User
module.exports = mongoose.model('User', userSchema);
