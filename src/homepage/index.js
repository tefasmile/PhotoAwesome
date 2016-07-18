var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');


page('/',header, loading, asyncLoad, function(ctx, next){
	title('PhotoAwesome');
    var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.pictures));
});

//spinner loading
function loading(ctx, next){
	var el = document.createElement('div');
	el.classList.add('loader');
	document.getElementById('main-container').appendChild(el);
	next();
}

//lib superagent
function loadPictures(ctx, next){
	request
	  .get('/api/pictures')
	  .end(function (err, res){
	    if (err) return console.log(err);
	    
	    ctx.pictures = res.body;
	    next();
	});
}

//libreria con axios
function loadPicturesAxios(ctx, next){
	axios
	  .get('/api/pictures')
	  .then(function (res) {
	    ctx.pictures = res.data;
	    next();
	})
	.catch(function (err) {
	    console.log(err);
	});
}

//lib fetch
function loadPicturesFetch(ctx, next){
	fetch('/api/pictures')
	 .then(function (res){
	 	return res.json();
	 })
	 .then(function (pictures){
	 	ctx.pictures = pictures;
	 	next();
	 })
	 .catch(function (err){
	 	console.log(err);
	 });
}

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(arguments);
  }
}

setTimeout(function (){

});

/*var page = require('page');

page('/', function(ctx, next){
	var main = document.getElementById('main-container');
	main.innerHTML = '<a href="/signup">signup</a>';
});*/
