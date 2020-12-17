// stick spoiler start -->
let last_known_scroll_position = 0;
let ticking = false;

// stick spoiler
function stick_spoiler(scroll_pos) {
	// get sticky class handle
	var sk_class = document.getElementsByClassName('ejsoon_sticky');
	// per sticky, sum offsetTop, per sticky previousSibling
	for (var sknum = 0; sknum < sk_class.length; sknum++) {
		var sk = sk_class[sknum];
		var skpre = sk.parentNode.querySelector(".spoiler_button");
		var skpercent = sk.parentNode.querySelector(".spoiler_percent");
		var viewportOffset = sk.getBoundingClientRect();
		//if scroll into the area
		if (viewportOffset.top < 0 && viewportOffset.bottom > 0) {
			//set button position fixed when get in
			skpre.style.position = "fixed";
			skpercent.style.display = "inline";
			skpercent.style.right = (window.innerWidth - viewportOffset.x - viewportOffset.width) + "px";
			console.log("window.innerWidth", window.innerWidth);
			skpercent.innerHTML = Math.round(viewportOffset.top * -100 / viewportOffset.height) + "%";
		} else {
			//set button position relative when get in
			skpre.style.position = "absolute";
			skpercent.style.display = "none";
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


