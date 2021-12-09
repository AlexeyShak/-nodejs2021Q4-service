const {v4: uuidv4} = require('uuid');

const columns = [{
    id: 'c8f746c3-7089-4abc-af07-000000000000',
    title: 1,
    order: 'Random order'
},
{
    id: "00000000-0000-0000-0000-000000000001",
    title: 'Task 2',
    order: 2,
    description: 'Some other description'
}
];

module.exports = {columns};