// ejsoon imageid extension start -->
var postid;
// imgid
var imgid = document.getElementsByClassName("imageid");
var imgsrc;
for (var iix = 0; iix < imgid.length; iix++) {
	postid = imgid[iix].getAttribute("postid");
	imgsrc = "viewtopic.php?p=" + postid;
	imgid[iix].src = imgsrc;
	imgid[iix].onload = function() {
		var sBody = this.contentWindow.document;
		var sDiv = sBody.getElementById("p" + postid);
		var sImg = sDiv.getElementsByTagName("img")[0];
		sImg.setAttribute("alt", sDiv.querySelector("div.inner div.postbody h3 a").innerHTML);
		this.outerHTML = sImg.outerHTML;
	}
}
// svgid
var svgid = document.getElementsByClassName("svgid");
var svgsrc;
for (var isx = 0; isx < svgid.length; isx++) {
	postid = svgid[isx].getAttribute("postid");
	svgsrc = "viewtopic.php?p=" + postid;
	svgid[isx].src = svgsrc;
	svgid[isx].onload = function() {
		var sBody = this.contentWindow.document;
		var sDiv = sBody.getElementById("p" + postid);
		var sSvg = sDiv.getElementsByTagName("svg")[0];
		this.outerHTML = sSvg.outerHTML;
	}
}
// ejsoon imageid extension end -->


