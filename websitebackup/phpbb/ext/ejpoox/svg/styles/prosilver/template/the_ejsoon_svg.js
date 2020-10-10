// svg start -->
	var svg_arr = document.getElementsByTagName('svg');
	var new_html_inner = '';
	for (var num = 0; num < svg_arr.length; num++) {
		new_html_inner = svg_arr[num].innerHTML;
		new_html_inner = new_html_inner.replace(/[\[]/g, '<');
		new_html_inner = new_html_inner.replace(/[\]]/g, '>');
		new_html_inner = new_html_inner.replace(/[<\[][\/]?style/g, '');
		svg_arr[num].innerHTML = new_html_inner;
	}
// svg end -->


