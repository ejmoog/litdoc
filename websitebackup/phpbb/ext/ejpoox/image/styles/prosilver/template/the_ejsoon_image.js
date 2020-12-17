// ejsoon image extension start -->
// html string to element
function htmlToElems(html) {
  let temp = document.createElement('template');
  temp.innerHTML = html;
  return temp.content;
}
// get image by ajax
function ajximg(type, img, postid) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var aac = htmlToElems(xmlhttp.responseText);
			var aaccc = aac.getElementById("p" + postid);
			if ('img' == type) {
				var aacccimg = aaccc.getElementsByTagName("img");
				if (aacccimg.length > 0) {
					img.src = aacccimg[0].src;
				}
			} else if ('svg' == type) {
				var aacccsvg = aaccc.getElementsByTagName("svg");
				if (aacccsvg.length > 0) {
					img.outerHTML = converSVG(aacccsvg[0].outerHTML);
				}
			}
		}
	}
	xmlhttp.open("GET","viewtopic.php?p=" + postid,true);
	xmlhttp.send("p=" + postid);
}
// imgid
var imgid = document.getElementsByClassName("imgid");
for (var iix = 0; iix < imgid.length; iix++) {
	var postid = imgid[iix].getAttribute("postid");
	ajximg('img', imgid[iix], postid);
}
// svgid
var svgid = document.getElementsByClassName("svgid");
for (var iix = 0; iix < svgid.length; iix++) {
	var postid = svgid[iix].getAttribute("postid");
	ajximg("svg", svgid[iix], postid);
}
// conver bbcode to SVG 
var svg_arr = document.getElementsByTagName('svg');
for (var num = 0; num < svg_arr.length; num++) {
	svg_arr[num].innerHTML = converSVG(svg_arr[num].innerHTML);
}
// conver bbcode to SVG, string replace
function converSVG(originaltxt) {
	originaltxt = originaltxt.replace(/[\[]/g, '<');
	originaltxt = originaltxt.replace(/[\]]/g, '>');
	return originaltxt;
}
// ejsoon image extension end -->
