// swiper start -->
	var mySwiper = new Swiper ('.swiper-container', {
		loop: true,
		autoHeight: true, //enable auto height
		pagination: {
			el: '.swiper-pagination-ejsoon',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			},
			dynamicBullets: true,
			dynamicMainBullets: 3,
		},
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
	})
// swiper end -->


