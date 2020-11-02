// stick spoiler start -->
let last_known_scroll_position = 0;
let ticking = false;

// stick spoiler
function stick_spoiler(scroll_pos) {
	// get sticky class handle
	var sk_class = document.getElementsByClassName('ejsoon_sticky');
	// per sticky, sum offsetTop, per sticky previousSibling
	var sk, sum_offsetTop, skpre;
	for (var sknum = 0; sknum < sk_class.length; sknum++) {
		sk = sk_class[sknum];
		skpre = sk.previousSibling;
		viewportOffset = sk.getBoundingClientRect();
		//if scroll into the area
		if (viewportOffset.top <= 0 && viewportOffset.bottom >= 0) {
			//set button position fixed when get in
			skpre.style.position = "fixed";
			//change marginTop when skpre is fixed
			sk.style.marginTop = (skpre.offsetHeight + 3).toString() + 'px';
		} else {
			//set button position relative when get in
			skpre.style.position = "relative";
			//change marginTop when skpre is restore
			sk.style.marginTop = '3px';
		}
	}
}

window.addEventListener('scroll', function(e) {
	last_known_scroll_position = window.scrollY;

	if (!ticking) {
		window.requestAnimationFrame(function() {
			stick_spoiler(last_known_scroll_position);
			ticking = false;
		});

		ticking = true;
	}
});
// stick spoiler end -->


