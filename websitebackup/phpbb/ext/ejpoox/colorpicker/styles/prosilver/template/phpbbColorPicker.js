init_color_picker();
function init_color_picker() {
	// choose highlight or bg
	var all_btn = document.querySelectorAll("button.button");
	var bg_btn_name = '';
	var bg_btn_html = '';
	var bg_btn_arr = ['bg', 'highlight', 'vsa'];
	for (var x = 0; x < all_btn.length; x++) {
		if (bg_btn_arr.indexOf(all_btn[x].value) > -1) {
			bg_btn_name = all_btn[x].value;
			bg_btn_html += ''
			+ '<input style=" height: 20px; width: 10px; margin-left: 10px; margin-right: 0px;" type="radio" id="insert_type_' + bg_btn_name + '" name="insert_type" value="' + bg_btn_name + '">'
			+ '<label style=" font-size: 20px;" for="insert_type_' + bg_btn_name + '">' + bg_btn_name + '</label>'
			+ '';
		}
	}

	var color_place_hd = document.getElementById('color_palette_placeholder');
	if (color_place_hd) {
		color_place_hd.outerHTML = ''
		+ '<dd id="color_picker" class="color_picker">'
		+ '<div id="color-outer-div" style="position: absolute; background: #fff; padding: 24px; border: 3px solid black; border-radius: 7px; z-index: 99;">'
		+ '<canvas id="color-picker"></canvas>'
		+ '<br>'
		+ '<div style="text-align: center;"><input type="button" onclick="insert_color_btn(this.value)" style="cursor: pointer; width: 200px; font-size: 16px;" type="text" id="color"></input></div>'
		+ '<div id="color_storage" style="cursor: pointer; margin-top: 7px;"></div>'
		+ '<div id="insert_type_outer" style="margin-top: 7px;">'
		+ '<input style=" height: 20px; width: 10px;" type="radio" id="insert_type_color" name="insert_type" value="color" checked>'
		+ '<label style=" font-size: 20px;" for="insert_type_color">color</label>'
		+ bg_btn_html
		+ '<input style=" height: 20px; width: 10px; margin-left: 10px; margin-right: 0px;" type="radio" id="insert_type_value" name="insert_type" value="(value)">'
		+ '<label style=" font-size: 20px;" for="insert_type_value">(value)</label>'
		+ '</div>'
		+ '<div onclick="close_colorpicker()" style="cursor:pointer; border: 2px solid black; display: inline-block; font-size: 24px; position: absolute; left: 7px; top: 7px; width: 30px; height: 30px; text-align: center; line-height: 32px; padding: 0px; border-radius: 50%;">X</div>'
		+ '</div>'
		+ '</dd>'
		+ '';
		// init
		var color_value = "#d24fac";
		// get color store value
		var store_color = localStorage.getItem('color');
		if (null == store_color) {
			localStorage.setItem('color', '');
		} else if (store_color !== '') {
			var color_arr = store_color.split(';');
			if (color_arr.length > 0) {
				color_value = color_arr[color_arr.length - 1];
			}
		}

		new KellyColorPicker({
			color: color_value,
			place : 'color-picker', 
			size : 217, 
			input : 'color',  
			method : 'triangle',
			alphaSlider : true,
			changeCursor : false,
		});

		set_color_div_content();
	}
}

function close_colorpicker() {
	$('#colour_palette').toggle();
}

// insert color button
function insert_color_btn(color_value) {
	// close window
	$('#colour_palette').toggle();
	// insert color
	var insert_type = document.querySelector('input[name="insert_type"]:checked').value;
	if ('(value)' == insert_type) {
		bbfontstyle(color_value, '');
	} else {
		bbfontstyle('[' + insert_type + '=' + color_value + ']', '[/' + insert_type + ']');
	}
	// oparate storage
	oparate_storage(color_value);
	set_color_div_content();
}

// set the color history area
function set_color_div_content() {
	var store_color = localStorage.getItem('color');
	var color_storage_hd = document.getElementById('color_storage');
	color_storage_hd.innerHTML = '';
	if (store_color !== '') {
		var color_arr = store_color.split(';');
		color_arr.forEach(function(color_arr_itm, idx) {
			color_storage_hd.innerHTML = ''
			+ '<span style=" width: 30px; height: 30px; display: inline-block; vertical-align: middle; border: 2px solid black; background:' + color_arr_itm + ';" colorindex="' + idx + '" colorvalue="' + color_arr_itm + '" onclick="select_colorstorage(this)"></span>'
			+ color_storage_hd.innerHTML;
		});
		color_storage_hd.innerHTML += ''
			+ '<span style="text-align: center; width: 30px; height: 30px; display: inline-block; vertical-align: middle; border: 2px solid black; background: #fff; font-size: 24px; line-height: 30px;" id="delete_colorstorage_span" onclick="delete_colorstorage(this)">X</span>'
			+ '<input id="is_delete_mode" type="hidden" value=0>'
			+ '';
	}
}

// click color history span
function select_colorstorage(thus) {
	// get store color
	var store_color = localStorage.getItem('color');
	var color_arr = store_color.split(';');

	// if it is delete_mode
	var is_delete_mode_hd = document.getElementById('is_delete_mode');
	if (parseInt(is_delete_mode_hd.value) == 1) {
		color_arr.splice(thus.getAttribute('colorindex'), 1);
		localStorage.setItem('color', color_arr.join(';'));
		is_delete_mode_hd.value = 0;
		set_color_div_content();
		// document.getElementById('delete_colorstorage_span').style.background = 'white';
	} else {
		// insert color value text
		insert_color_btn((thus.getAttribute('colorvalue')));
		// adjust this color to first
		color_arr.splice(thus.getAttribute('colorindex'), 1);
		color_arr.push(thus.getAttribute('colorvalue'));
		localStorage.setItem('color', color_arr.join(';'));
	}
}

// oparate storage
function oparate_storage(color_value) {
	var store_color = localStorage.getItem('color');
	if (store_color !== '') {
		var color_arr = store_color.split(';');
		// if color is not already have
		if (color_arr.indexOf(color_value) == -1) {
			// add new color value to end
			color_arr.push(color_value);
			if (color_arr.length > 6) {
				// delete first color
				color_arr.shift();
			}
			localStorage.setItem('color', color_arr.join(';'));
		}
	} else {
		localStorage.setItem('color', color_value);
	}
}

// toggle delete_colorstorage mode
function delete_colorstorage(thus) {
	if (parseInt(thus.nextElementSibling.value) == 0) {
		thus.nextElementSibling.value = 1;
		thus.style.background = 'red';
	} else {
		thus.nextElementSibling.value = 0;
		thus.style.background = 'white';
	}
}

