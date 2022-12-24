const {nanoid} =require('nanoid');
const notes = require('./notes');

//tambah notes
const addNoteHandler =(request, h)=>{
    const {title,tags,body} = request.payload;
    
    const id = nanoid(16);

    const createdAt= new Date().toISOString();
    const updateAt= createdAt;

    const newNote={
        title, tags, body, id, createdAt, updateAt,
    };

    notes.push(newNote);
    
const isSuccess =notes.filter((note) => note.id === id).length > 0;

if(isSuccess){
    const response =h.response({

        error:false,
        status:'succes',
        message:'Catatan berhasil ditambah',
        data:{noteId:id,}
    });
   
    response.code(201);
    response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');

    return response;
}
    const  response=h.response({
        
        message: 'Catatan gagal ditambah',
    });
    response.code(500);
    return response;
};

//liat data
const getAllNotesHandler = () => ({

    status: 'success',
    data:{
        notes,
    },
});

//liat list id
const getNoteByIdHandler =(request, h) =>{
    const { id }= request.params;

    const note= notes.filter((n) =>n.id === id)[0];
    if (note !== undefined){
        return{
            status:'succes',
            data:{
                note,
            },
        };
    }

    const response =h.response({
        status:'fail',
        message: ' catatan gagal di temukan',
    });
    response.code(404);
    return response;
};
//edit

const editNoteByIdHandler = (request, h) =>{
    const { id } = request.params;

    const { title, tags, body} =request.payload;

    const updateAt= new Date().toISOString();
const index = notes.findIndex((note) =>note.id === id);

if (index !== -1){
    notes[index]= {
        ...notes[index],
        title,
        tags,
        body,
        updateAt,
    };

    const response= h.response({
        status: 'success',
        message: 'berhasil di update',
    });
    response.code(200);
    return response;
}
const response=h.response({
    status: 'fail',
    message: 'gagal update',
});

    response.code(404);
    return response;

};

//hapus notes
const deleteNoteHandler = (request, h) => {
    const {id} = request.params;
  
  
  const note=notes.filter((n) => n.id===id);
  
  if(note !== -1){
  notes.splice(note,1);
  const response =h.response({
      status:'succes',
      message:' notes erhasil dihapus',
   });
  
      response.code(200);
      return response;
  
  }
      const response=h.response({
      status: 'fail',
      message: 'notes gagal dihapus. id tidak ditemukan',	
  });
      response.code(404);
      return response;
  
  };





module.exports= { addNoteHandler, getAllNotesHandler, getNoteByIdHandler,editNoteByIdHandler,deleteNoteHandler};