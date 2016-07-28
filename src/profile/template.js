import yo from 'yo-yo';
import layout from '../layout';
import { message as translate } from '../translate';


module.exports =  function (user){
		var templateProfile = yo`<div class="profile">
		<div class="container">
			<div class="row margin">
				<div class="col s10 push-s2 m5 push-m4 l7 push-l4">
					<img class="circle responsive-img" src="${user.avatar}">
					<h2 class="flow-text hide-on-large-only center-align">${user.username}</h2>
					<h2 class="hide-on-med-and-down left-align">${user.username}</h2>
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
							<div id="modal${picture.id}" class="modal modal-fixed-footer">
								<div class="modal-content">
									<img class="image" src="${picture.src}"/>
								</div>
								<div class="modal-footer">
									<div class="lik"><i class="fa fa-heart"></i> ${translate('likes', { likes: picture.likes })}</div>
								</div>
							</div>
					</div>`
				})}
			</div>
		</div>`;
		return layout(templateProfile);
};
