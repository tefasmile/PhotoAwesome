var yo = require('yo-yo');
var translate = require('../translate');

var el = yo`<div class="row">
	<div class="col s12 m4 l3">Imagen</div>
	<div class="col s12 m8 l9">leyend profile</div>
</div>`;

module.exports = function profile (ctx, next){
	var container = document.getElementById('main-container');
	empty(container).appendChild(el);
	next();
};
