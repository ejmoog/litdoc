// ejsoon imageid extension start -->
// imgid
var imgid = document.getElementsByClassName("imageid");
for (var iix = 0; iix < imgid.length; iix++) {
	var postid = imgid[iix].getAttribute("postid");
	var imgsrc = "viewtopic.php?p=" + postid;
	imgid[iix].src = imgsrc;
	imgid[iix].onload = function() {
		var siBody = this.contentWindow.document;
		var siDiv = siBody.getElementById("p" + postid);
		// the postid is true
		if (null != siDiv) {
			var sImg = siDiv.getElementsByTagName("img");
			// get img and replace
			if (sImg.length > 0) {
				sImg[0].setAttribute("alt", siDiv.querySelector("div.inner div.postbody h3 a").innerHTML);
				this.outerHTML = sImg[0].outerHTML;
			}
		}
	}
}
// svgid
var svgid = document.getElementsByClassName("svgid");
for (var isx = 0; isx < svgid.length; isx++) {
	var sPostid = svgid[isx].getAttribute("postid");
	var svgsrc = "viewtopic.php?p=" + sPostid;
	svgid[isx].src = svgsrc;
	svgid[isx].onload = function() {
		var ssBody = this.contentWindow.document;
		var ssDiv = ssBody.getElementById("p" + sPostid);
		// the postid is true
		if (null != ssDiv) {
			var sSvg = ssDiv.getElementsByTagName("svg");
			// get svg and replace
			if (sSvg.length > 0) {
				this.outerHTML = sSvg[0].outerHTML;
			}
		}
	}
}
// ejsoon imageid extension end -->


