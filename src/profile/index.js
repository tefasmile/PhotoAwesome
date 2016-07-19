//nueva manera de importar modulos es6
import page from 'page';
import templateProfile from './template';
import title from 'title';
import empty from 'empty-element';
import header from '../header';


page('/:username',loadUser,header,function(ctx, next){
	title(`PhotoAw - ${ctx.params.username}`);
    var main = document.getElementById('main-container');
    empty(main).appendChild(templateProfile(ctx.user));
    $('.modal-trigger').leanModal();
});

//modal 
page('/:username/:id',loadUser,header,function(ctx, next){
	title(`PhotoAw - ${ctx.params.username}`);
    var main = document.getElementById('main-container');
    empty(main).appendChild(templateProfile(ctx.user));
    $(`#modal${ctx.params.id}`).openModal({
    	complete: function() { 
    		page(`/${ctx.params.username}`) 
    	}
    });
});

//asincronismo js es6
//middleware
async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
    next();
  } catch (err) {
    console.log(err);
  }
}





