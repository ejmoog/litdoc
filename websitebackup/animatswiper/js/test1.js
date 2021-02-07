function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function sli_animate(index) {
	// init
	// * slider 1
	document.querySelector(".sli1_title1").style.display =
	document.querySelector(".sli1_txt1").style.display =
	document.querySelector(".sli1_txt2").style.display =
		"none";
	document.querySelector(".sli1_title1").classList.remove('animated', 'slower', 'infinite', 'shake');
	document.querySelector(".sli1_txt1").classList.remove('animated', 'slow', 'infinite', 'swing');
	// * slider 2
	document.querySelector(".sli2_title").style.display =
	document.querySelector(".sli2_arrow").style.display =
	document.querySelector(".sli2_ol").style.display =
	document.querySelector(".sli2_li1").style.display =
	document.querySelector(".sli2_li2").style.display =
	document.querySelector(".sli2_li3").style.display =
	document.querySelector(".sli2_li4").style.display =
		"none";
	// # slider 3
	document.querySelector(".sli3_arrow_outer").style.display =
	document.querySelector(".sli3_title").style.display =
	document.querySelector(".sli3_txt1").style.display =
	document.querySelector(".sli3_txt2").style.display =
	document.querySelector(".sli3_img1").style.display =
	document.querySelector(".sli3_txt3").style.display =
		"none";
	document.querySelector(".sli3_txt1").style.top = "42vh";
	document.querySelector(".sli3_txt2").style.top = "56vh";
	document.querySelector(".sli3_txt3_inner").classList.remove('animated', 'slow', 'infinite', 'heartBeat');
	// slider 4
	document.querySelector(".sli4_title").style.display =
	document.querySelector(".sli4_img1").style.display =
	document.querySelector(".sli4_txt1").style.display =
	document.querySelector(".sli4_arrow_outer").style.display =
		"none";
	document.querySelector(".sli4_txt1").classList.remove('animated', 'infinite', 'heartBeat');
	// slider 5
	document.querySelector(".sli5_title").style.display =
	document.querySelector(".sli5_img1").style.display =
	document.querySelector(".sli5_txt1").style.display =
	document.querySelector(".sli5_arrow_outer").style.display =
		"none";
	document.querySelector(".sli5_txt1").classList.remove('animated', 'infinite', 'swing');
	// slider 6
	document.querySelector(".sli6_title").style.display =
	document.querySelector(".sli6_img1").style.display =
	document.querySelector(".sli6_txt1").style.display =
	document.querySelector(".sli6_arrow_outer").style.display =
		"none";
	document.querySelector(".sli6_txt1").classList.remove('animated', 'infinite', 'swing');
	document.querySelector(".sli6_img1").style.height = "55vh";
	document.querySelector(".sli6_img1").style.top = "24vh";
	// slider 7
	document.querySelector(".sli7_title").style.display =
	document.querySelector(".sli7_img1").style.display =
	document.querySelector(".sli7_txt1").style.display =
	document.querySelector(".sli7_arrow_outer").style.display =
		"none";
	document.querySelector(".sli7_txt1").classList.remove('animated', 'infinite', 'shake', 'slower');
	document.querySelector(".sli7_img1").style.height = "55vh";
	document.querySelector(".sli7_img1").style.top = "24vh";
	// slider 8
	document.querySelector(".sli8_title").style.display =
	document.querySelector(".sli8_img1_outer").style.display =
	document.querySelector(".sli8_txt1").style.display =
	document.querySelector(".sli8_arrow_outer").style.display =
		"none";
	document.querySelector(".sli8_img1").classList.remove('sli8_img1_moveup');
	document.querySelector(".sli8_txt1").classList.remove('animated', 'infinite', 'shake', 'slower');
	// slider 9
	document.querySelector(".sli9_title").style.display =
	document.querySelector(".sli9_img1").style.display =
	document.querySelector(".sli9_txt1").style.display =
	document.querySelector(".sli9_arrow_outer").style.display =
		"none";
	document.querySelector(".sli9_txt1").classList.remove('animated', 'infinite', 'shake', 'slower');
	// slider 10
	document.querySelector(".sli10_title").style.display =
	document.querySelector(".sli10_img1").style.display =
	document.querySelector(".sli10_txt1").style.display =
	document.querySelector(".sli10_txt2").style.display =
	document.querySelector(".sli10_txt3").style.display =
	document.querySelector(".sli10_arrow_outer").style.display =
		"none";
	document.querySelector(".sli10_txt3").classList.remove('animated', 'infinite', 'shake', 'slower');
	document.querySelector(".sli10_img1").style.height = "55vh";
	document.querySelector(".sli10_img1").style.top = "24vh";
	// slider 11
	document.querySelector(".sli11_title").style.display =
	document.querySelector(".sli11_img1").style.display =
	document.querySelector(".sli11_txt1").style.display =
	document.querySelector(".sli11_arrow_outer").style.display =
		"none";
	// slider 12
	document.querySelector(".sli12_title").style.display =
	document.querySelector(".sli12_img1").style.display =
	document.querySelector(".sli12_img2").style.display =
	document.querySelector(".sli12_txt1").style.display =
	document.querySelector(".sli12_txt2").style.display =
	document.querySelector(".sli12_arrow_outer").style.display =
		"none";
	// switch slider index
	if ('0' == index) {
		// first slider
		animateCSS(".sli1_img1", "zoomIn", sli1_img1_ani);
		function sli1_img1_ani() {
			document.querySelector(".sli1_title1").style.display = "block";
			animateCSS(".sli1_title1", "fadeInDown", sli1_title1_ani);
		}
		function sli1_title1_ani() {
			document.querySelector(".sli1_title1").classList.add('animated', 'slower', 'infinite', 'shake');
			document.querySelector(".sli1_txt1").style.display = "block";
			animateCSS(".sli1_img3", "fadeInLeft", 'function() { }');
			animateCSS(".txt1_content", "fadeInRight", txt1_content_ani);
		}
		function txt1_content_ani() {
			document.querySelector(".sli1_txt1").classList.add('animated', 'slow', 'infinite', 'swing');
			document.querySelector(".sli1_txt2").style.display = "block";
		}
	} else if (1 == index) {
		var sli2_ol_ani = function() {
			document.querySelector(".sli2_ol").style.display = "block";
			animateCSS(".sli2_ol", "fadeInLeft", sli2_li_ani);
		}
		var sli2_li_ani = function() {
			document.querySelector(".sli2_li2").classList.add('delay-1s');
			document.querySelector(".sli2_li3").classList.add('delay-2s');
			document.querySelector(".sli2_li4").classList.add('delay-3s');
			document.querySelector(".sli2_li1").style.display =
			document.querySelector(".sli2_li2").style.display =
			document.querySelector(".sli2_li3").style.display =
			document.querySelector(".sli2_li4").style.display = "block";
			animateCSS(".sli2_li1", "fadeInRight", 'sli2_li_ani');
			animateCSS(".sli2_li2", "fadeInRight", 'sli2_li_ani');
			animateCSS(".sli2_li3", "fadeInRight", 'sli2_li_ani');
			animateCSS(".sli2_li4", "fadeInRight", function() {
				document.querySelector(".sli2_arrow").style.display = "block"
			});
		}
		document.querySelector(".sli2_title").style.display = "block";
		animateCSS(".sli2_title", "zoomIn", sli2_ol_ani);
	} else if (2 == index) {
		var sli3_txt1_ani = function() {
			document.querySelector(".sli3_txt1").style.display = "block";
			animateCSS(".sli3_txt1", "fadeInDown", sli3_txt2_ani);
		}
		var sli3_txt2_ani = function() {
			document.querySelector(".sli3_txt2").style.display = "block";
			animateCSS(".sli3_txt2", "fadeInDown", sli3_img1_ani);
		}
		var sli3_img1_ani = function() {
			document.querySelector(".sli3_txt1").style.top = "15vh";
			document.querySelector(".sli3_txt2").style.top = "24vh";
			document.querySelector(".sli3_img1").style.display = "block";
			animateCSS(".sli3_img1", "fadeInRight", sli3_txt3_ani);
		}
		var sli3_txt3_ani = function() {
			document.querySelector(".sli3_txt3").style.display = "block";
			animateCSS(".sli3_txt3", "fadeInRight", sli3_arrow_ani);
		}
		var sli3_arrow_ani = function() {
			document.querySelector(".sli3_txt3_inner").classList.add('animated', 'slow', 'infinite', 'heartBeat');
			document.querySelector(".sli3_arrow_outer").style.display = "block";
			animateCSS(".sli3_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli3_title").style.display = "block";
		animateCSS(".sli3_title", "fadeInDown", sli3_txt1_ani);
	} else if (3 == index) {
		var sli4_img1_ani = function() {
			document.querySelector(".sli4_img1").style.display = "block";
			animateCSS(".sli4_img1", "fadeInRight", sli4_txt1_ani);
		}
		var sli4_txt1_ani = function() {
			document.querySelector(".sli4_txt1").style.display = "block";
			animateCSS(".sli4_txt1", "fadeInLeft", sli4_arr_ani);
		}
		var sli4_arr_ani = function() {
			document.querySelector(".sli4_txt1").classList.add('animated', 'infinite', 'heartBeat');
			document.querySelector(".sli4_arrow_outer").style.display = "block";
			animateCSS(".sli4_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli4_title").style.display = "block";
		animateCSS(".sli4_title", "fadeInDown", sli4_img1_ani);
	} else if (4 == index) {
		var sli5_img1_ani = function() {
			document.querySelector(".sli5_img1").style.display = "block";
			animateCSS(".sli5_img1", "fadeInRight", sli5_txt1_ani);
		}
		var sli5_txt1_ani = function() {
			document.querySelector(".sli5_txt1").style.display = "block";
			animateCSS(".sli5_txt1", "fadeInLeft", sli5_arr_ani);
		}
		var sli5_arr_ani = function() {
			document.querySelector(".sli5_txt1").classList.add('animated', 'infinite', 'swing');
			document.querySelector(".sli5_arrow_outer").style.display = "block";
			animateCSS(".sli5_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli5_title").style.display = "block";
		animateCSS(".sli5_title", "fadeInDown", sli5_img1_ani);
	} else if (5 == index) {
		var sli6_img1_ani = function() {
			document.querySelector(".sli6_img1").style.display = "block";
			animateCSS(".sli6_img1", "fadeInRight", sli6_txt1_ani);
		}
		var sli6_txt1_ani = function() {
			document.querySelector(".sli6_img1").style.height = "90vh";
			document.querySelector(".sli6_img1").style.top = "16vh";
			document.querySelector(".sli6_txt1").style.display = "block";
			animateCSS(".sli6_txt1", "fadeInLeft", sli6_arr_ani);
		}
		var sli6_arr_ani = function() {
			document.querySelector(".sli6_txt1").classList.add('animated', 'infinite', 'swing');
			document.querySelector(".sli6_arrow_outer").style.display = "block";
			animateCSS(".sli6_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli6_title").style.display = "block";
		animateCSS(".sli6_title", "fadeInDown", sli6_img1_ani);
	} else if (6 == index) {
		var sli7_img1_ani = function() {
			document.querySelector(".sli7_img1").style.display = "block";
			animateCSS(".sli7_img1", "fadeInRight", sli7_txt1_ani);
		}
		var sli7_txt1_ani = function() {
			document.querySelector(".sli7_img1").style.height = "90vh";
			document.querySelector(".sli7_img1").style.top = "17vh";
			document.querySelector(".sli7_txt1").style.display = "block";
			animateCSS(".sli7_txt1", "fadeInLeft", sli7_arr_ani);
		}
		var sli7_arr_ani = function() {
			document.querySelector(".sli7_txt1").classList.add('animated', 'infinite', 'shake', 'slower');
			document.querySelector(".sli7_arrow_outer").style.display = "block";
			animateCSS(".sli7_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli7_title").style.display = "block";
		animateCSS(".sli7_title", "fadeInDown", sli7_img1_ani);
	} else if (7 == index) {
		var sli8_img1_outer_ani = function() {
			document.querySelector(".sli8_img1_outer").style.display = "block";
			animateCSS(".sli8_img1_outer", "fadeInRight", sli8_img1_ani);
		}
		var sli8_img1_ani = function() {
			document.querySelector(".sli8_img1").classList.add('sli8_img1_moveup');
			document.querySelector(".sli8_txt1").style.display = "block";
			animateCSS(".sli8_txt1", "fadeInLeft", sli8_arr_ani);
		}
		var sli8_arr_ani = function() {
			document.querySelector(".sli8_txt1").classList.add('animated', 'infinite', 'shake', 'slower');
			document.querySelector(".sli8_arrow_outer").style.display = "block";
			animateCSS(".sli8_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli8_title").style.display = "block";
		animateCSS(".sli8_title", "fadeInDown", sli8_img1_outer_ani);
	} else if (8 == index) {
		var sli9_img1_ani = function() {
			document.querySelector(".sli9_img1").style.display = "block";
			animateCSS(".sli9_img1", "fadeInRight", sli9_txt1_ani);
		}
		var sli9_txt1_ani = function() {
			document.querySelector(".sli9_img1").style.height = "70vh";
			document.querySelector(".sli9_img1").style.top = "17vh";
			document.querySelector(".sli9_txt1").style.display = "block";
			animateCSS(".sli9_txt1", "fadeInLeft", sli9_arr_ani);
		}
		var sli9_arr_ani = function() {
			document.querySelector(".sli9_txt1").classList.add('animated', 'infinite', 'shake', 'slower');
			document.querySelector(".sli9_arrow_outer").style.display = "block";
			animateCSS(".sli9_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli9_title").style.display = "block";
		animateCSS(".sli9_title", "fadeInDown", sli9_img1_ani);
	} else if (9 == index) {
		var sli10_img1_ani = function() {
			document.querySelector(".sli10_img1").style.display = "block";
			animateCSS(".sli10_img1", "fadeInRight", sli10_txt1_ani);
		}
		var sli10_txt1_ani = function() {
			document.querySelector(".sli10_img1").style.height = "70vh";
			document.querySelector(".sli10_img1").style.top = "17vh";
			document.querySelector(".sli10_txt1").style.display = "block";
			animateCSS(".sli10_txt1", "fadeInLeft", sli10_txt2_ani);
		}
		var sli10_txt2_ani = function() {
			document.querySelector(".sli10_txt2").style.display = "block";
			animateCSS(".sli10_txt2", "fadeInLeft", sli10_txt3_ani);
		}
		var sli10_txt3_ani = function() {
			document.querySelector(".sli10_txt3").style.display = "block";
			animateCSS(".sli10_txt3", "fadeInLeft", sli10_arr_ani);
		}
		var sli10_arr_ani = function() {
			document.querySelector(".sli10_txt3").classList.add('animated', 'infinite', 'heartBeat', 'slow');
			document.querySelector(".sli10_arrow_outer").style.display = "block";
			animateCSS(".sli10_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli10_title").style.display = "block";
		animateCSS(".sli10_title", "fadeInDown", sli10_img1_ani);
	} else if (10 == index) {
		var sli11_img1_outer_ani = function() {
			document.querySelector(".sli11_img1").style.display = "block";
			animateCSS(".sli11_img1", "fadeInRight", sli11_img1_ani);
		}
		var sli11_img1_ani = function() {
			document.querySelector(".sli11_txt1").style.display = "block";
			animateCSS(".sli11_txt1", "fadeInLeft", sli11_arr_ani);
		}
		var sli11_arr_ani = function() {
			document.querySelector(".sli11_arrow_outer").style.display = "block";
			animateCSS(".sli11_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli11_title").style.display = "block";
		animateCSS(".sli11_title", "fadeInDown", sli11_img1_outer_ani);
	} else if (11 == index) {
		var sli12_img1_outer_ani = function() {
			document.querySelector(".sli12_img1").style.display = "block";
			animateCSS(".sli12_img1", "fadeInRight", sli12_txt1_ani);
		}
		var sli12_txt1_ani = function() {
			document.querySelector(".sli12_txt1").style.display = "block";
			animateCSS(".sli12_txt1", "fadeInLeft", sli12_img2_outer_ani);
		}
		var sli12_img2_outer_ani = function() {
			document.querySelector(".sli12_img2").classList.add('delay-1s');
			document.querySelector(".sli12_img2").style.display = "block";
			animateCSS(".sli12_img2", "fadeInRight", sli12_txt2_ani);
		}
		var sli12_txt2_ani = function() {
			document.querySelector(".sli12_txt2").style.display = "block";
			animateCSS(".sli12_txt2", "fadeInLeft", sli12_arr_ani);
		}
		var sli12_arr_ani = function() {
			document.querySelector(".sli12_arrow_outer").style.display = "block";
			animateCSS(".sli12_arrow_outer", "fadeInDown", 'end');
		}
		document.querySelector(".sli12_title").style.display = "block";
		animateCSS(".sli12_title", "fadeInDown", sli12_img1_outer_ani);
	}
}

var mySwiper = new Swiper ('.swiper-container', {
	// initialSlide: 12,
	direction: 'vertical',
	on: {
		init: function () {
			sli_animate(this.realIndex);
		},
		slideChange: function () {
			sli_animate(this.realIndex);
		},
    },
})
