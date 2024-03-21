var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




let marcas = [

  {id: 1,
    nombre: "Ford",
    fundacion: "1903",
    sede: "Dearborn, Michigan, Estados Unidos",
    fundador: "Henry Ford",
    img: "https://listcarbrands.com/wp-content/uploads/2016/03/ford-new-logo.jpg"},


  {id: 2,
    nombre: "Toyota",
    fundacion: "1937",
    sede: "Dubai city, Japon",
    fundador: "Kichrio Khan",
    img: "https://th.bing.com/th/id/OIP.-83F4CtW7-Av9GwZhJj88wHaDo?rs=1pid=ImgDetMain"},

  {id: 3,
    nombre: "Chevrolet",
    fundacion: "1911",
    sede: "Barcelona, Estados Unidos",
    fundador: "Luis Chevrolet",
    img: "https://logos-world.net/wp-content/uploads/2021/03/Chevrolet-Logo-2013-present.png"},

  {id: 4,
    nombre: "Honda",
    fundacion: "1948",
    sede: "Tokio, Japon",
    fundador: "Soichrio",
    img: "https://logos-world.net/wp-content/uploads/2021/03/Honda-Emblem.png"},

  {id: 5,
    nombre: "BMW",
    fundacion: "1916",
    sede: "Munich, Alemania",
    fundador: "Karl Rapp",
    img: "https://wallsdesk.com/wp-content/uploads/2016/05/bmw-logo-images.jpg"},
]

let modelos = [

  {id: 1,
    nombre: "Mustang",
    marca_referencia: "Ford",
    ano: "1964",
    tipo: "Deportes",
    precio: "30000€",
    img: "https://th.bing.com/th/id/R.6f221f0d33959fb50492b0a5f928df1b?rik=vh4nm8D8FPldkw&riu=http%3a%2f%2fwww.trbimg.com%2fimg-5a2a5126%2fturbine%2fla-fi-hy-ford-mustang-review-20171209&ehk=3wXPNYrcTubw%2bTt%2bNGOAWWavGmP5AzBYjL2KyuJrmGo%3d&risl=&pid=ImgRaw&r=0"},


  {id: 2,
    nombre: "Camry",
    marca_referencia: "Toyota",
    ano: "1982",
    tipo: "Clasico",
    precio: "25000€",
    img: "https://www.coches.com/fotos_historicas/toyota/Camry-XSE-2014/toyota_camry-xse-2014_r25.jpg"},

  {id: 3,
    nombre: "Corvette",
    marca_referencia: "Chevrolet",
    ano: "1953",
    tipo: "Deportes",
    precio: "50000€",
    img: "https://wallup.net/wp-content/uploads/2019/09/807196-2014-chevrolet-corvette-3-lt-z51-stingray-cars-coupe-red.jpg"},

  {id: 4,
    nombre: "Civic",
    marca_referencia: "Honda",
    ano: "1972",
    tipo: "Classico",
    precio: "22000€",
    img: "https://www.hdcarwallpapers.com/download/2017_honda_civic_type_r_5-2560x1440.jpg"},

  {id: 5,
    nombre: "Series",
    marca_referencia: "BMW",
    ano: "1975",
    tipo: "Deportes",
    precio: "45000€",
    img: "https://www.carscoops.com/wp-content/uploads/2022/05/2023-BMW-3-Series-Sedan-550.jpg"},



]



///////////////////////////////////////////////////////////////////////// MODELOS ///////////////////////////////////////////////////////////////
function findModelo(id){
  for (let i = 0; i < modelos.length ; i++) {

    if (modelos[i].id == id){
      return i
    }
  }
  return -1;
}

// API //////


// Show ALL marcas
app.get('/api/modelos', (req, res) => {
  res.status(200).send(modelos)
});

// MARCAS DETAIL
app.get('/api/modelos/:id', (req, res)=>{
  const id = parseInt(req.params.id)
  console.log(typeof (id))

  let modelo = null
  for (let i = 0; i < modelos.length  ; i++) {
    if (modelos[i].id == id){
      modelo = modelos[i]
      break
    }
  }

  if (!modelo){
    res.status(404).json(' Modelo ' + id + ' not found')
  }else{
    res.status(200).json(modelo)
  }

});

function findModeloByIndex(id){
  for (let i = 0; i < modelos.length ; i++) {
    if (modelos[i].id == id){
      return i
    }
  }
  return -1
}








// Delete item by id
app.delete('/api/modelos/:id', (req, res)=>{
  const id = parseInt(req.params.id)

  console.log('Received DELETE request for ID:', id);

  let foundIndex = findModelo(id)



  if (foundIndex == -1){ // si no encontrado
    console.log('Modelos not found');
    res.status(404).send('Not found');
  }else {
    console.log('Deleting marca at index:', foundIndex);
    marcas.splice(foundIndex, 1);
    console.log('Marca deleted');
    res.status(204).send();
  }
})












// Insert marca
app.post('/api/modelos',(req, res)=>{
  let params = req.body
  params.id = modelos.length +1
  modelos.push(params) // DB.insert(...)
  res.status(201).json(params)
})




// WEB //////////////////////////////////////

// INDEX
app.get('/', (req, res) => {
  res.render('index',{title:'WEB DE MARCAS DE COCHES'})
});

// Show ALL Marcas
app.get('/modelos', (req, res) => {
  res.render('modelos',
      {
        title:'MODELOS',
        modelos:modelos    }
  )
})


// INSERT MARCAS GET: show form
app.get('/modelos/insert', (req,res)=>{
  res.render('insert_modelos',
      {title:'insert modelo'}
  )
});
// INSERT ITEM POST: get params and do your mojo!
app.post('/modelos',(req, res)=>{
  const params = req.body
  params.id = modelos.length +1
  modelos.push(params) // DB.insert(...)
  res.redirect('/modelos')
});




////////////////////////////////////////////////////////////////////////  MARCAS//////////////////////////////////////////////////////////////
function findMarca(id){
  for (let i = 0; i < items.length ; i++) {

    if (marcas[i].id == id){
      return i
    }
  }
  return -1;
}

// API //////

// Show ALL marcas
app.get('/api/marcas', (req, res) => {
  res.status(200).send(marcas)
});

// MARCAS DETAIL
app.get('/api/marcas/:id', (req, res)=>{
  const id = parseInt(req.params.id)
  console.log(typeof (id))

  let marca = null
  for (let i = 0; i < marcas.length  ; i++) {
    if (marcas[i].id == id){
      marca = marcas[i]
      break
    }
  }

  if (!marca){
    res.status(404).json(' Marca ' + id + ' not found')
  }else{
    res.status(200).json(marca)
  }

});

function findMarcaByIndex(id){
  for (let i = 0; i < marcas.length ; i++) {
    if (marcas[i].id == id){
      return i
    }
  }
  return -1
}



// update a SINGLE marca
app.post("/marcas/update", (req, res)=>{
  //destructuring
  let {id, nombre, fundacion, sede, fundador, img} = req.body;

  let foundIndex = findMarca(id);
  // if error show msg
  //update DB / file


  Marcas[foundIndex].nombre= nombre
  Marcas[foundIndex].fundacion = fundacion
  Marcas[foundIndex].sede = sede
  Marcas[foundIndex].fundador = fundador
  Marcas[foundIndex].img = img
  // items[foundIndex] = {id, nom, rol }

  res.redirect('/marcas')

});

// Delete item by id
app.delete('/api/marcas/:id', (req, res)=>{
  const id = parseInt(req.params.id)

  console.log('Received DELETE request for ID:', id);

  let foundIndex = findMarca(id)



  if (foundIndex == -1){ // si no encontrado
    console.log('Marca not found');
    res.status(404).send('Not found');
  }else {
    console.log('Deleting marca at index:', foundIndex);
    marcas.splice(foundIndex, 1);
    console.log('Marca deleted');
    res.status(204).send();
  }
})









// Insert marca
app.post('/api/marcas',(req, res)=>{
  let params = req.body
  params.id = marcas.length +1
  marcas.push(params) // DB.insert(...)
  res.status(201).json(params)
})




// WEB //////////////////////////////////////

// INDEX
app.get('/', (req, res) => {
  res.render('index',{title:'WEB DE MARCAS DE COCHES'})
});

// Show ALL Marcas
app.get('/marcas', (req, res) => {
  res.render('marcas',
      {
        title:'MARCAS',
        marcas:marcas    }
  )
})


// INSERT MARCAS GET: show form
app.get('/marcas/insert', (req,res)=>{
  res.render('insert_marca',
      {title:'insert marca'}
  )
});
// INSERT ITEM POST: get params and do your mojo!
app.post('/marcas',(req, res)=>{
  const params = req.body
  params.id = marcas.length +1
  marcas.push(params) // DB.insert(...)
  res.redirect('/marcas')
});



// UPDATE ITEM
app.get('/marcas/update/:id', (req,res)=>{
  const id = req.params.id
  console.log('/marcas/update id:',id)

  let index =findMarca(id)
  if (index == -1){
    let msg = 'Error marcas ' + id + ' nofound'
    res.status(404).send({msg})
  }

  let marca = marcas[index];
  let options ={
    title:'update marca',
    marca:marca
  }
  res.render('update_marca',options)
});







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
