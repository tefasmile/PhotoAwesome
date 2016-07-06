var yo = require('yo-yo');
var translate = require('../translate');

//agregar contenido que queramos
module.exports = function layout(content){
	return yo`<div>
	<div id="header-container"></div>
		<div class="content">
			${content}
		</div>
	</div>`;
};





