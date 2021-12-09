
const {v4: uuidv4} = require('uuid');

const users = [{
    id: '73dfa0d7-e233-4762-9037-5ac8f433c971',
    name: 'Random User',
    login: 'login',
    password: 'password'
},
{
    id: uuidv4(),
    name: 'Alesha',
    login: 'login',
    password: 'password'  
}];

module.exports = {users};