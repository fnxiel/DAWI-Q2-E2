const express = require('express');
var mysql      = require('mysql');
const bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dev',
  password : 'pw1234#'
});

const puerto = 3000;

const app = express();

connection.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

////**************Mascotas*****************////

///Trae todas las mascotas con todos sus campos
app.get('/api/v1/mascotas', (req, res) =>{
  connection.query('SELECT id, Nombre, Especies_id, Razas_id FROM Mascotas.Mascotas', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows)
  });  
})


////**************Especies*****************////
///Trae todas las especies que se le pueden asignar a una mascota
app.get('/api/v1/especies', (req, res) =>{
  connection.query('SELECT id, Descripcion FROM Mascotas.Especies', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows)
  });  
})

///Traer una especie filtrada por su id
app.get('/api/v1/especies/:id', (req, res) =>{
  const {id} = req.params;
  connection.query('SELECT id, Descripcion FROM Mascotas.Especies WHERE id = ?', [id] , function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows)
  });  
})

////**************Razas*****************////
///Trae todas las razas que se le pueden asignar a una mascota
app.get('/api/v1/razas', (req, res) =>{
  connection.query('SELECT id, Descripcion FROM Mascotas.Razas', function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows)
  });  
})

///Traer una raza filtrada por id
app.get('/api/v1/razas/:id', (req, res) =>{
  const {id} = req.params;
  connection.query('SELECT id, Descripcion FROM Mascotas.Razas WHERE id = ?', [id] , function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows[0])
  });  
})

///Crea una raza
app.post('/api/v1/razas', (req, res) =>{
  const {descripcion} = req.body;
  
  connection.query('Insert into Mascotas.Razas (Descripcion) Values (?);', [descripcion] , function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows)
  });  
})

///Modificar una raza
app.put('/api/v1/razas/:id', (req, res) =>{
  const {id} = req.params;
  const {descripcion} = req.body;
  connection.query('Update Mascotas.Razas SET Descripcion = ? WHERE id = ?', [descripcion, id] , function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows)
  });  
})

///Eliminar una raza
app.delete('/api/v1/razas/:id', (req, res) =>{
  const {id} = req.params;
  //Consultar si el id existe

  //Si existe borrarlo
  connection.query('Delete from Mascotas.Razas WHERE id = ?', [id] , function(err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows)
  });  

  //Si no existe, retornar 404.
})

app.listen(puerto, () => {
  console.log(`La aplicación se está ejecutando en el puerto ${puerto}`)
})