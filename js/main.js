$(function(){
	function initialize() {
		var mapCanvas = document.querySelector('.mapCanvas');
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
			scrollTop: $(hash).offset().top - 70
		}, 600, 'linear');
	});


	var menuItems = $('.mainMenu').find('a[href^="#"]').map(function(i, a){
		var href = a.getAttribute('href');
		return {
			id: href,
			top: $(href).offset().top - 70
		};
	});
	menuItems = [].slice.call(menuItems).reverse();

	$(window).on('scroll', function(){
		$('.mainMenu li').removeClass('act');
		var item;
		menuItems.forEach(function(n){ !item && n.top < $(window).scrollTop() && (item = n) });
		item && $('.mainMenu').find('a[href="'+item.id+'"]').parent().addClass('act');
	});
});

$(window).on('load', function(){
	const wrapper = document.querySelector('.timer');
	if(!wrapper) return;
	const template = `
		<div class="months">
			<div class="counter">00</div>
			<div class="label">місяців</div>
		</div>
		<div class="separator"></div>
		<div class="days">
			<div class="counter">00</div>
			<div class="label">днів</div>
		</div>
		<div class="separator"></div>
		<div class="hours">
			<div class="counter">00</div>
			<div class="label">годин</div>
		</div>
		<div class="separator"></div>
		<div class="minutes">
			<div class="counter">00</div>
			<div class="label">хв</div>
		</div>
		<div class="separator"></div>
		<div class="seconds">
			<div class="counter">00</div>
			<div class="label">сек</div>
		</div>
	`;

	let daysEl, hoursEl, minutesEl, secondsEl, monthsEl;
	let countDownDate = new Date('Mar 8, 2020 10:00:00').getTime();

	let timer = setInterval(function() {
		if (wrapper.innerHTML === '') {
			wrapper.innerHTML = template;
			monthsEl = document.querySelector('.months .counter');
			daysEl = document.querySelector('.days .counter');
			daysEl = document.querySelector('.days .counter');
			hoursEl = document.querySelector('.hours .counter');
			minutesEl = document.querySelector('.minutes .counter');
			secondsEl = document.querySelector('.seconds .counter');
		}
		let currentDate = new Date().getTime();
		let distance = countDownDate - currentDate;

		// Time calculations for days, hours, minutes and seconds
		let months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
		let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Fix for 0
		months = months < 10 ? '0' + months : months;
		days = days < 10 ? '0' + days : days;
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		// Output calculations
		monthsEl.innerHTML = months;
		daysEl.innerHTML = days;
		hoursEl.innerHTML = hours;
		minutesEl.innerHTML = minutes;
		secondsEl.innerHTML = seconds;

		// If the count down is over, write some text 
		if (distance < 0) {
			clearInterval(timer)
			wrapper.remove();
		}
	}, 1000)
});
