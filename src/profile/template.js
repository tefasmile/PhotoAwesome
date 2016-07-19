import yo from 'yo-yo';
import layout from '../layout';
import translate from '../translate';

module.exports =  function (user){
		var templateProfile = yo`<div class="profile">
		<div class="container">
			<div class="row margin">
				<div class="col s7 push-l4">
					<img class="circle responsive-img" src="${user.avatar}">
					<h2 class="flow-text hide-on-large-only center-align">${user.username}</h2>
					<h2 class="hide-on-med-and-down left-align">${user.username}</h2>
					<p class="leyend">Description del usuario perfil</p>
					<div class="text">
						<p class="text__item">100 publicaciones</p>
						<p class="text__item">5.350 seguidores</p>
						<p class="text__item">52 seguidos</p>
					</div>
				</div>
				<div class="col s5 pull-s6"></div>
			</div>
			<div class="row">
				${user.pictures.map(function (picture){
					return yo`<div class="col s12 m6 l4">
							<a href="/${user.username}/${picture.id}" class="picture-container">
								<img src="${picture.src}" class="picture"/>
								<div class="likes"><i class="fa fa-heart"></i>${picture.likes}</div>
							</a>
							<img src="${picture.src}" class="materialboxed" width="650">
							<div id="modal${picture.id}" class="modal modal-fixed-footer">
								<div class="modal-content">
									<img src="${picture.src}"/>
								</div>
								<div class="modal-footer">
									<div class="btn btn-flat likes"><i class="fa fa-heart"></i> ${translate('likes', { likes: picture.likes })}</div>
								</div>
							</div>
					</div>`
				})}
			</div>
		</div>`;
		return layout(templateProfile);
}
