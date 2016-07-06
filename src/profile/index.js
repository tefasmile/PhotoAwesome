//nueva manera de importar modulos es6
import page from 'page';
import title from 'title';
import header from '../header';
import empty from 'empty-element';
import templateProfile from './template';


page('/:username',header,loadUser,function(ctx, next){
	title(`PhotoAw - ${ctx.params.username}`);
    var main = document.getElementById('main-container');
    empty(main).appendChild(templateProfile(ctx.user));
});

//asincronismo js es6
//middleware
async function loadUser(ctx, next){
	try{
		ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
		next()
	}catch (err){
		console.log(err);
	}
}




