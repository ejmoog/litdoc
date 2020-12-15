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
		var sImg = siDiv.getElementsByTagName("img")[0];
		sImg.setAttribute("alt", siDiv.querySelector("div.inner div.postbody h3 a").innerHTML);
		this.outerHTML = sImg.outerHTML;
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
		var sSvg = ssDiv.getElementsByTagName("svg")[0];
		this.outerHTML = sSvg.outerHTML;
	}
}
// ejsoon imageid extension end -->


