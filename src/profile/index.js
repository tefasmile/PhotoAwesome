var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var header = require('../header');
var title = require('title');


page('/profile',header,profile,function(ctx, next){
	title('Profile');
    var main = document.getElementById('main-container');
	empty(main).appendChild(template);
});
