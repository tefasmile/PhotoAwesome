var express = require('express');
var multer  = require('multer');
var ext     = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, + Date.now() + '.' + ext(file.originalname));
  }
});

var upload = multer({ storage: storage }).single('picture');
var app = express();


//utiliza pug para vistas
app.set('view engine', 'pug');
//servir archivos staticos
app.use(express.static('public'));
//Solicitando ruta url y su respuesta
app.get('/', function(req,res){
	res.render('index', { title: 'PhotoAwesome' });
});
//ruta2
app.get('/signup', function(req,res){
	res.render('index', { title: 'PhotoAw - signup'});
});
//ruta3
app.get('/signin', function(req,res){
	res.render('index', { title: 'PhotoAw - signin' });
});
//ruta de api con imagenes
app.get('/api/pictures',function(req,res){
	var pictures = [
		{
			user:{
				username: 'doki',
				avatar: 'http://88bb2fc72412aedd47c2-1b674cd4a35812f147ba4109e61caf91.r97.cf2.rackcdn.com/doki.jpg'
			},
			url: 'http://materializecss.com/images/office.jpg',
			likes: 0,
			createdAt: new Date().getTime(),
			liked: false
		},
		{
			user:{
				username: 'doki',
				avatar: 'http://88bb2fc72412aedd47c2-1b674cd4a35812f147ba4109e61caf91.r97.cf2.rackcdn.com/doki.jpg'
			},
			url: 'http://materializecss.com/images/office.jpg',
			likes: 1,
			createdAt: new Date().setDate(new Date().getDate() - 10),
			liked: true
		},
	];

	setTimeout(function (){
		res.send(pictures);	
	},2000);
	
});
//subir imagenes
app.post('/api/pictures', function(req, res, next){
	upload(req, res, function(err){
		if(err){
			return res.send(500, 'Error uploading file');
		}else{
			res.send('File uploaded sucess');
		}
	});
});

//Escuchando puerto servidor
app.listen(3000,function(err){
	if(err) return console.log('Hubo un error'), process.exit(1);
	console.log('PhotoAwesome escuchando el puerto 3000 :)');
});