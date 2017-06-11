$(document).ready(function(){
	$('#join-button').click(function(){
		$('.modal').addClass("modal-show");
		$('section').addClass("blur");
		$('.bukoya').addClass("blur");
		$('.header-link').css({"pointer-events" : "none"});
	});
	$('section').mouseup(function(){
		$('.modal').removeClass("modal-show");
		$('section').removeClass("blur");
		$('.bukoya').removeClass("blur");
		$('.header-link').css({"pointer-events" : "initial"});
	});
});