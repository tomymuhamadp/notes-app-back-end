const {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, deleteNoteHandler, editNoteByIdHandler} =require('./handler');

const routes=[
    {
        method: 'POST',
        path: '/notes',
       handler:addNoteHandler,

       options: {
           cors:{
               origin:['*'],
           },
       },
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    
];

module.exports=routes;