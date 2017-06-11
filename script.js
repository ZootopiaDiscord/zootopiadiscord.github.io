$(document).ready(function(){
	$('#join-button').click(function(){
		$('.modal').addClass("modal-show");
		$('section,.bukoya').addClass("blur");
		$('.header-link').css({"pointer-events" : "none"});
	});
	$('section').mouseup(function(){
		$('.modal').removeClass("modal-show");
		$('section,.bukoya').removeClass("blur");
		$('.header-link').css({"pointer-events" : "initial"});
	});
});