// swiper start -->
goswiper();
function goswiper() {
	// if img, after img loading
	var isImg = document.querySelector(".imgid");
	var isSvg = document.querySelector(".svgid");
	if (isImg || isSvg) {
		return;
	}
	var ifswiper = document.querySelector(".swiper-container");
	if (ifswiper) {
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
	}
}
// swiper end -->


