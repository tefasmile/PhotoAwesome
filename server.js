var express = require('express');
var multer  = require('multer');
var ext     = require('file-extension');
var fs      = require('graceful-fs');

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
//ruta4
app.get('/profile/:username', function(req,res){
	res.render('index', { title: 'PhotoAw - Profile' });
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
				username: 'alf',
				avatar: 'http://mla-s1-p.mlstatic.com/alf-juego-de-naipes-especiales-cromy-con-stickers-retro-4053-MLA123898154_2774-O.jpg'
			},
			url: 'http://materializecss.com/images/office.jpg',
			likes: 1,
			createdAt: new Date().setDate(new Date().getDate() - 10),
			liked: true
		}
	];

	setTimeout(() => res.send(pictures),2000);
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

//ruta de usuarios-->nos devuelve informacion unica de usuario
app.get('/api/user/:username',function(req,res){
	const user = {
		username: 'Doki',
		avatar  : 'http://www.fmbox.cl/wp-content/uploads/2015/04/Apr19_544_doki_2501.jpg',
		pictures: [
			{
				id: 1,
				src: 'http://www.allforwall.net/reimg/resize-img.php?src=http://downimgs.allforwall.net/images/o4epw33wyxr.jpg&h=250&w=250',
				likes:3
			},
			{
				id: 2,
				src: 'http://www.allforwall.net/reimg/resize-img.php?src=http://downimgs.allforwall.net/images/gtlbgxgmyox.jpg&h=250&w=250',
				likes:10
			},
			{
				id: 3,
				src: 'http://www.allforwall.net/reimg/resize-img.php?src=http://downimgs.allforwall.net/images/gtlbgxgmyox.jpg&h=250&w=250',
				likes:23
			},
			{
				id: 4,
				src: 'http://www.allforwall.net/reimg/resize-img.php?src=http://downimgs.allforwall.net/images/gtlbgxgmyox.jpg&h=250&w=250',
				likes:6
			},
			{
				id: 5,
				src: 'http://www.allforwall.net/reimg/resize-img.php?src=http://downimgs.allforwall.net/images/o4epw33wyxr.jpg&h=250&w=250',
				likes:2
			},
			{
				id: 6,
				src: 'http://www.allforwall.net/reimg/resize-img.php?src=http://downimgs.allforwall.net/images/o4epw33wyxr.jpg&h=250&w=250',
				likes:0
			}
		]
	};
	//devulve objeto user
	res.send(user);
});

//ruta de usuario con page-user ej: www.web.com/doki
app.get('/:username', function(req,res){
	res.render('index', {title: `PhotoAw - ${req.params.username}` })
});

//Escuchando puerto servidor
app.listen(3000,function(err){
	if(err) return console.log('Hubo un error'), process.exit(1);
	console.log('PhotoAwesome escuchando el puerto 3000 :)');
});
