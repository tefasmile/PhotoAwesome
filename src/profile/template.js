import yo from 'yo-yo';
import layout from '../layout';

export default function userPageTemplate(user){
		var templateProfile = yo`<div class="profile">
		<div class="container">
			<div class="row margin">
				<div class="col s7 push-l4">
					<img class="circle responsive-img" src="${user.avatar}">
					<h2 class="flow-text hide-on-large-only center-align">${user.username}</h2>
					<h2 class="hide-on-med-and-down left-align">${user.username}</h2>
					<p class="leyend">Description user</p>
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
					return yo`<div class="picture">
						<div class="ihover fade" href="#pageUrl">
							<img src="${picture.src}" class="responsive-img"/>
							<div class="iconos">
								<div class="likes"><i class="fa fa-heart"></i>${picture.likes}</div>
							</div>
						</div>
					</div>`
				})}
			</div>
		</div>`;
		return layout(templateProfile);
}
