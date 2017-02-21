$(function(){
	function initialize() {
		var mapCanvas = document.getElementById('mapCanvas');
		var myLatlng = new google.maps.LatLng(49.98935276, 36.22232348);
		var mapOptions = {
			center: myLatlng,
			zoom: 15,
			mapTypeControl: false,
			draggable: true,
			scaleControl: false,
			scrollwheel: false,
			navigationControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(mapCanvas, mapOptions);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Fabrika.space',
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);
});

$(window).on('load', function(){
	if($(window).width() < 768) return;

	$('.mainMenu ul li a').on('click', function(e){
		var hash = e.originalEvent.currentTarget.hash;
		if(!hash) return;

		e.originalEvent.preventDefault();
		$('html, body').animate({
			scrollTop: $(hash).offset().top - $('.rowHeader').height() - 20
		}, 600, 'linear');
	});


	var menuItems = $('.mainMenu').find('a[href^="#"]').map(function(i, a){
		var href = a.getAttribute('href');
		return {
			id: href,
			top: $(href).offset().top - $('.rowHeader').height() - 21
		};
	});
	menuItems = [].slice.call(menuItems).reverse();

	$(window).on('scroll', function(){
		$('.mainMenu li').removeClass('act');
		var item;
		menuItems.forEach(function(n){ !item && n.top < $(window).scrollTop() && (item = n) });
		item && $('.mainMenu').find('a[href="'+item.id+'"]').parent().addClass('act');
	});

	$('[href="https://2event.com/ru/events/712016"]').attr('href', '#');
	$('body').on('click', '[href="#"]', function(e){
		e.preventDefault();
		alert('Все билеты уже проданы');
	});
});