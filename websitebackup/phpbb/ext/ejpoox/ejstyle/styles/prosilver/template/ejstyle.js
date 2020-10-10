/* decoding the [char/] */
var span_char = document.getElementsByClassName("span_char");
var char_num = span_char.length;
var cnvt = ct = "";
for (var cnum = 0; cnum < char_num; cnum++) {
	cnvt = span_char[cnum].innerHTML;
	ct = '&' + cnvt + ';';
	span_char[cnum].innerHTML = ct;
}

/* decoding the [/decodeURI] */
var span_decodeURI = document.getElementsByClassName("span_decodeURI");
var max_num = span_decodeURI.length;
var enc = "";
var dec = "";
for (var num = 0; num < max_num; num++) {
	enc = span_decodeURI[num].innerHTML;
	dec = decodeURI(enc);
	span_decodeURI[num].innerHTML = dec;
}

