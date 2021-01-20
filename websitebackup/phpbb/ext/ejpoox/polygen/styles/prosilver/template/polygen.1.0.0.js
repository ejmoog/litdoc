/*
 * 1.generate standard html
 * 2.data import
 * 3.generate event html
 * 4.click event
 *
 *
 * setting{
 * el: className
 * mode: gen(all is present), img(only image), pre(has click event)
 * }
 * */
// Polygen construction
function Polygen(setting) {
	// this is thus
	var thus = this;
	//*** init setting
	// className that would be a polygen div
	this.className = setting.el;
	// mode: gen(all is present), img(only image), pre(has click event)
	this.genMode = setting.mode;
	// polyform const data
	this.pentominos_color = {
		F: "#55a188",
		I: "#5655a1",
		L: "#a19355",
		P: "#55a055",
		S: "#925096",
		T: "#a57352",
		U: "#82a054",
		V: "#ad6a63",
		W: "#57795c",
		X: "#3e6d76",
		Y: "#6e89b2",
		Z: "#95524f"
	};
	this.soma_color = {
		B: "#55a188",
		D: "#5655a1",
		L: "#a19355",
		R: "#55a055",
		S: "#925096",
		T: "#a57352",
		V: "#82a054",
	};
	this.pentominos_char = ["F", "I", "L", "P", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	this.soma_char = ["B", "D", "L", "R", "S", "T", "V"];
	this.polyform_char = {
		SomaCube: this.soma_char,
		Pentominos: this.pentominos_char
	};
	this.polyform_color = {
		SomaCube: this.soma_color,
		Pentominos: this.pentominos_color
	};
	// picture attribute
	this.up = {
		width : 49,
		height : 59,
		width_per_left : 18,
		length_per_left : -30,
		height_per_bottom : 17,
		width_per_bottom : 26,
		length_per_bottom : -15,
	};
	this.leftright = {
		width : 61,
		height : 58,
		width_per_left : 30,
		length_per_left : -30,
		height_per_bottom : 41,
		width_per_bottom : 9,
		length_per_bottom : -8,
	};
	this.upleft = {
		width : 66,
		height : 78,
		width_per_left : 40,
		length_per_left : -24,
		height_per_bottom : 35,
		width_per_bottom : 15,
		length_per_bottom : -25,
	};
	// set radio checked box
	this.setRadioValue = function(radioObj, newValue) {
		if(!radioObj)
			return;
		var radioLength = radioObj.length;
		if(radioLength == undefined) {
			radioObj.checked = (radioObj.value == newValue.toString());
			return;
		}
		for(var i = 0; i < radioLength; i++) {
			radioObj[i].checked = false;
			if(radioObj[i].value == newValue.toString()) {
				radioObj[i].checked = true;
			}
		}
	}
	// deepCopy array
	this.deepCopy = function(aObject) {
		if (!aObject) {
			return aObject;
		}
		var v, bObject = Array.isArray(aObject) ? [] : {};
		for (var k in aObject) {
			v = aObject[k];
			bObject[k] = (typeof v === "object") ? thus.deepCopy(v) : v;
		}
		return bObject;
	}
	// a polyform item
	 function PolygenItem(poly_num, poly_handle) {
		// that is this
		var that = this;
		// handle the polygen
		var polyhd = poly_handle;
		// get data
		var data_hd = polyhd.querySelector(".polygen_data");
		// json parse data
		this.polyform_data;
		// adjust if the data is not present
		if (data_hd == null || data_hd.value == "") {
			// assign default data
			this.polyform_data = JSON.parse('{"name":"Cube","desc":"A soma cube","type":"SomaCube"}');
		} else {
			// data assign
			this.polyform_data = JSON.parse(data_hd.value);
		}
		// img attribute
		this.standar_left = 0;
		this.standar_bottom = 0;
		this.standar_board_height = 0;
		this.standar_board_width = 0;
		// submit import
		this.import_data = function () {
			// import data
			var a_gen_data = that.polyform_data;
			// change option value
			thus.setRadioValue(polyhd.getElementsByClassName("op_tangle_radio"), a_gen_data.angle);
			// manage solution
			if (-1 < parseInt(a_gen_data.solution_point)) {
				polyhd.querySelector('#solution_step_num').innerHTML = a_gen_data.solution[a_gen_data.solution_point].sort.length;
			}
			// next Step
			that.nextStep();
		}
		// generate a solid
		this.gen_solid = function() {
			var a_gen_data = that.polyform_data;
			// handle piece
			var piece_upleft_handle = polyhd.getElementsByClassName("piece_upleft")[0];
			var piece_leftright_handle = polyhd.getElementsByClassName("piece_leftright")[0];
			var piece_up_handle = polyhd.getElementsByClassName("piece_up")[0];
			var piece_angle_arr = [piece_upleft_handle, piece_leftright_handle, piece_up_handle];
			var piece_angle = piece_angle_arr[parseInt(a_gen_data.angle) - 1];

			var op_board_handle = polyhd.getElementsByClassName("op_board")[0];
			op_board_handle.innerHTML = "";
			// clone handle
			var piece_clone = piece_angle.cloneNode();
			// add piece
			that.solid_outer_area();
			var angle_arr = [thus.upleft, thus.leftright, thus.up];
			var piece_angle = angle_arr[parseInt(a_gen_data.angle) - 1];
			for (var pih = 0; pih < a_gen_data.height; pih++) {
				for (var pil = 0; pil < a_gen_data.length; pil++) {
					for (var piw = 0; piw < a_gen_data.width; piw++) {
						piece_clone.style.bottom = piece_angle.height_per_bottom * pih + piece_angle.length_per_bottom * pil + that.standar_bottom - piece_angle.width_per_bottom * piw + "px";
						piece_clone.style.left = piece_angle.length_per_left * pil + that.standar_left + piece_angle.width_per_left * piw + "px";
						piece_clone.setAttribute("pih", a_gen_data.height - pih);
						piece_clone.setAttribute("pil", pil + 1);
						piece_clone.setAttribute("piw", piw + 1);
						op_board_handle.appendChild(piece_clone.cloneNode());
					}
				}
			}
			// adjust board width and height
			op_board_handle.style.width = that.standar_board_width;
			op_board_handle.style.height = that.standar_board_height;

		}
		// build solid every option change
		this.build_solid = function() {
			var a_gen_data = that.polyform_data;
			var piece_display;
			for (var genh = 1; genh <= a_gen_data.value.length; genh++) {
				for (var genl = 1; genl <= a_gen_data.value[0].length; genl++) {
					for (var genw = 1; genw <= a_gen_data.value[0][0].length; genw++) {
						if (a_gen_data.value[genh - 1][genl - 1][genw - 1] == "1") {
							piece_display = "inline";
						} else {
							piece_display = "none";
						}
						that.gen_piece(genw, genl, genh, piece_display);
					}
				}
			}
		}
		//generate piece
		this.gen_piece = function(piw, pil, pih, piece_display) {
			var a_gen_data = that.polyform_data;
			var piece_upleft_handle = polyhd.getElementsByClassName("piece_upleft");
			var piece_leftright_handle = polyhd.getElementsByClassName("piece_leftright");
			var piece_up_handle = polyhd.getElementsByClassName("piece_up");
			var piece_angle_arr = [piece_upleft_handle, piece_leftright_handle, piece_up_handle];
			var piece_name_arr = ["upleft", "leftright", "up"];
			var piece_y_arr = [78, 58, 59];
			var angle_num = parseInt(a_gen_data.angle) - 1;
			var piece_name = piece_name_arr[angle_num];
			var piece_angle = piece_angle_arr[angle_num];
			var piece_y = piece_y_arr[angle_num];
			for (var phx = 0; phx < piece_angle.length; phx++) {
				if ( piece_angle[phx].getAttribute('piw') == piw &&
				piece_angle[phx].getAttribute('pil') == pil &&
				piece_angle[phx].getAttribute('pih') == pih
				) {
					piece_angle[phx].style.display = piece_display;
					// transparent
					if (undefined != a_gen_data.transparent) {
						if (a_gen_data.length - pil < a_gen_data.transparent) {
							piece_angle[phx].classList.add('in_opacity');
						}
					}
					// solution
					if (undefined == a_gen_data.solution_point) {
						a_gen_data.solution_point = -1;
					}
					if (-1 != a_gen_data.solution_point) {
						var solution_value = a_gen_data.solution[a_gen_data.solution_point].value;
						var charindex = thus.polyform_char[a_gen_data.type].indexOf(solution_value[pih - 1][pil - 1][piw - 1]);
						if (charindex >= 0) {
							piece_angle[phx].src = "" + polygen_root + "img/" + piece_name + "-t.png";
							piece_angle[phx].style.backgroundImage = "url(" + polygen_root + "img/" + piece_name + "-f.png)";
							piece_angle[phx].style.backgroundPositionY = (-piece_y * charindex) + "px";
						}
						// manage step
						var solution_step_num = polyhd.querySelector("#solution_step_num");
						var stepnum = parseInt(solution_step_num.innerHTML);
						var solution_sort = a_gen_data.solution[a_gen_data.solution_point].sort;
						var ssSlice = solution_sort.slice(0, stepnum);
						var sortIndex = ssSlice.indexOf(solution_value[pih - 1][pil - 1][piw - 1]);
						if (sortIndex >= 0) {
							piece_angle[phx].style.display = piece_display;
						} else {
							piece_angle[phx].style.display = "none";
						}
					}
				}
			}
		}
		// gen_solution
		this.gen_solution = function() {
			var a_gen_data = that.polyform_data;
			// handle
			var solution_step = polyhd.querySelector("#solution_step");
			var solve_num = polyhd.querySelector("#solve_num");
			var solutionpoint = polyhd.querySelector("#solutionpoint");
			var solvectrl_delete = polyhd.querySelector("#solvectrl_delete");
			var solvectrl_edit = polyhd.querySelector("#solvectrl_edit");
			var solvectrl_add = polyhd.querySelector("#solvectrl_add");
			// init a_gen_data.solution
			if (!Array.isArray(a_gen_data.solution)) {
				a_gen_data.solution = [];
			}
			// manage solution generator
			var pointInner = '<option value="-1">not selected</option>';
			if (0 < a_gen_data.solution.length) {
			// if solution exit
				solve_num.innerHTML = a_gen_data.solution.length;
				// opera the solutionpoint innerHTML
				for (var solux = 0; solux < a_gen_data.solution.length; solux++) {
					var soluxone = solux + 1;
					pointInner += '<option value="' + solux + '">' + soluxone + '</option>';
				}
			} else {
				solve_num.innerHTML = 0;
			}
			solutionpoint.innerHTML = pointInner;
			solutionpoint.value = a_gen_data.solution_point;
			solutionpoint.addEventListener('change', that.solutionpointChange)
			// display the step area
			if (parseInt(a_gen_data.solution_point) >= 0) {
			// if point one solution
				if (solvectrl_add.getAttribute("add_state") == '1') {
					solvectrl_edit.style.display =
					solvectrl_delete.style.display =
					solution_step.style.display =  "none";
				} else if (solvectrl_edit.getAttribute("edit_state") == '1') {
					solvectrl_add.style.display =
					solvectrl_delete.style.display =
					solution_step.style.display =  "none";
				} else {
					solvectrl_add.style.display =
					solvectrl_edit.style.display =
					solvectrl_delete.style.display =
					solution_step.style.display =  "inline";
				}
			} else {
				solvectrl_edit.style.display =
				solvectrl_delete.style.display =
				solution_step.style.display = "none";
			}
		}
		// generate text
		this.gen_text = function() {
			var a_gen_data = that.polyform_data;
			var tb_name = polyhd.querySelector("#tb_name");
			var tb_desc = polyhd.querySelector("#tb_desc");
			var tb_type = polyhd.querySelector("#tb_type");
			var tb_difficulty = polyhd.querySelector("#tb_difficulty");
			var difficulty_arr = ["very easy", "easy", "midium", "hard", "extremely hard"]
			var tb_size = polyhd.querySelector("#tb_size");
			var tb_solve = polyhd.querySelector("#tb_solve");
			tb_desc.innerHTML = a_gen_data.desc;
			tb_type.innerHTML = a_gen_data.type;
			tb_name.innerHTML = a_gen_data.name + tb_type.outerHTML;
			tb_type.remove();
			if (0 == parseInt(a_gen_data.difficulty)) {
				tb_difficulty.style.display = "none";
			} else {
				tb_difficulty.innerHTML = difficulty_arr[a_gen_data.difficulty];
			}
			tb_size.innerHTML = a_gen_data.width + " X " + a_gen_data.length + " X " + a_gen_data.height;
			if (1 == parseInt(a_gen_data.solve_state)) {
				tb_solve.innerHTML = "more than " + a_gen_data.solve_number;
			} else if (2 == parseInt(a_gen_data.solve_state)) {
				tb_solve.innerHTML = "total is " + a_gen_data.solve_number;
			} else if (0 == parseInt(a_gen_data.solve_state)) {
				tb_solve.innerHTML = "impossible";
			} else {
				tb_solve.style.display = "none";
			}
		}
		// solution point change
		this.solutionpointChange = function() {
			var a_gen_data = that.polyform_data;
			// change step value
			var solution_step_num = polyhd.querySelector("#solution_step_num");
			a_gen_data.solution_point = parseInt(this.value);
			if (a_gen_data.solution_point > -1) {
				var spSort = a_gen_data.solution[a_gen_data.solution_point].sort;
				solution_step_num.innerHTML = spSort.length;
			}
			// goto next step
			that.nextStep();
		}
		// set the front transparent that show the inside
		this.operaTransparent = function(cal) {
			// init
			var a_gen_data = that.polyform_data;
			var trsprt;
			if (undefined == a_gen_data.transparent) {
				a_gen_data.transparent = 0;
			}
			trsprt = a_gen_data.transparent;
			// switch in or out
			if ("in" == cal) {
				trsprt++;
			} else {
				trsprt--;
			}
			if (trsprt < 0) {
				a_gen_data.transparent = 0;
			} else if (trsprt > a_gen_data.length) {
				a_gen_data.transparent = a_gen_data.length;
			} else {
				a_gen_data.transparent = trsprt;
			}
			// goto next step
			that.nextStep();
		}
		// outer area calculation
		this.solid_outer_area = function() {
			var a_gen_data = that.polyform_data;
			var angle_arr = [thus.upleft, thus.leftright, thus.up];
			var piece_angle = angle_arr[parseInt(a_gen_data.angle) - 1];

			that.standar_left = Math.abs(piece_angle.length_per_left * (a_gen_data.length - 1));
			that.standar_bottom = piece_angle.width_per_bottom * (a_gen_data.width - 1) + Math.abs(piece_angle.length_per_bottom * (a_gen_data.length - 1));
			that.standar_board_width = piece_angle.width + Math.abs(piece_angle.length_per_left * (a_gen_data.length - 1)) + Math.abs(piece_angle.width_per_left * (a_gen_data.width - 1)) + 'px';
			that.standar_board_height = piece_angle.height + Math.abs(piece_angle.height_per_bottom * (a_gen_data.height - 1)) + Math.abs(piece_angle.length_per_bottom * (a_gen_data.length - 1)) + Math.abs(piece_angle.width_per_bottom * (a_gen_data.width - 1)) + 'px';
		}
		// toggleText
		this.toggleText = function(toggleTextState) {
			var toggleTextBtn = polyhd.querySelector(".toggleTextBtn");
			var op_textboard = polyhd.querySelector("#op_textboard");
			if ("off" == toggleTextBtn.getAttribute("toggleTextState")) {
				toggleTextBtn.setAttribute("toggleTextState", "on");
				op_textboard.style.display = "inline-block";
				op_textboard.classList.remove( "fadeOutLeft");
				op_textboard.classList.add( "animated", "fadeInLeft");
			} else {
				toggleTextBtn.setAttribute("toggleTextState", "off");
				// op_textboard.style.display = "none";
				op_textboard.classList.remove( "fadeInLeft");
				op_textboard.classList.add( "animated", "fadeOutLeft");
				op_textboard.addEventListener('animationend', handleAnimationEnd);
				function handleAnimationEnd() {
					op_textboard.removeEventListener('animationend', handleAnimationEnd)
					op_textboard.style.display = "none";
				}
			}
		}
		// minus step value
		this.solution_step_minus = function() {
			// change step value
			var solution_step_num = polyhd.querySelector("#solution_step_num");
			var stepnum = solution_step_num.innerHTML;
			stepnum = parseInt(stepnum) - 1;
			stepnum = (stepnum < 1 ? 1 : stepnum);
			solution_step_num.innerHTML = stepnum;
			that.nextStep();
		}
		// plus step value
		this.solution_step_plus = function() {
			var a_gen_data = that.polyform_data;
			// change step value
			var solution_step_num = polyhd.querySelector("#solution_step_num");
			var stepnum = solution_step_num.innerHTML;
			var sortLength = a_gen_data.solution[a_gen_data.solution_point].sort.length;
			stepnum = parseInt(stepnum) + 1;
			stepnum = (stepnum > sortLength ? sortLength : stepnum);
			solution_step_num.innerHTML = stepnum;
			that.nextStep();
		}
		// start step value
		this.solution_step_start = function() {
			// change step value
			var solution_step_num = polyhd.querySelector("#solution_step_num");
			var stepnum = solution_step_num.innerHTML;
			solution_step_num.innerHTML = 1;
			that.nextStep();
		}
		// the end step value
		this.solution_step_end = function() {
			var a_gen_data = that.polyform_data;
			// change step value
			var solution_step_num = polyhd.querySelector("#solution_step_num");
			var sortLength = thus.polyform_char[a_gen_data.type].length;
			solution_step_num.innerHTML = sortLength;
			that.nextStep();
		}
		// goto next step when data is complete
		this.nextStep = function() {
			console.log('// nextStep();');
			// opera the solution
			that.gen_solution();
			// build the basic solid
			that.gen_solid();
			// display the solid
			that.build_solid();
			// manage the text
			that.gen_text();
		}
		// turnAngle: trun up down right left 90 angle
		this.turnAngle = function(angle) {
			var a_gen_data = that.polyform_data;
			console.log('that.polyform_data', that.polyform_data);
			console.log('that.hn', that.hn);
			if ("right" == angle || "left" == angle) {
				// exchange width and length
				var exWL = a_gen_data.width;
				a_gen_data.width = a_gen_data.length;
				a_gen_data.length = exWL;
				// create new empty data
				var arow = [], alayer = [], aset = [];
				for (var xgw = 0; xgw < a_gen_data.width; xgw++) {
					arow.push(0);
				}
				for (var xgl = 0; xgl < a_gen_data.length; xgl++) {
					alayer.push(thus.deepCopy(arow));
				}
				for (var xgh = 0; xgh < a_gen_data.height; xgh++) {
					aset.push(thus.deepCopy(alayer));
				}
				// create empty solution
				var solution_clone = thus.deepCopy(aset);
				var solution_clones = [];
				for (var solox = 0; solox < a_gen_data.solution.length; solox++) {
					solution_clones.push(thus.deepCopy(solution_clone));
				}
				// assign the value to new empty data, for aset
				for (var exh = 0; exh < a_gen_data.height; exh++) {
					for (var exl = 0; exl < a_gen_data.length; exl++) {
						for (var exw = 0; exw < a_gen_data.width; exw++) {
							if ("right" == angle) {
								aset[exh][exl][exw] = a_gen_data.value[exh][exw][a_gen_data.length - exl - 1];
								// turn solution
								for (var slx = 0; slx < solution_clones.length; slx++) {
									solution_clones[slx][exh][exl][exw] = a_gen_data.solution[slx].value[exh][exw][a_gen_data.length - exl - 1];
								}
							} else if ("left" == angle) {
								aset[exh][exl][exw] = a_gen_data.value[exh][a_gen_data.width - exw - 1][exl];
								for (var slx = 0; slx < solution_clones.length; slx++) {
									solution_clones[slx][exh][exl][exw] = a_gen_data.solution[slx].value[exh][a_gen_data.width - exw - 1][exl];
								}
							}
						}
					}
				}
			} else if ("up" == angle || "down" == angle) {
				// exchange height
				var exH = a_gen_data.height;
				a_gen_data.height = a_gen_data.length;
				a_gen_data.length = exH;
				// create new empty data
				var arow = [], alayer = [], aset = [];
				for (var xgw = 0; xgw < a_gen_data.width; xgw++) {
					arow.push(0);
				}
				for (var xgl = 0; xgl < a_gen_data.length; xgl++) {
					alayer.push(thus.deepCopy(arow));
				}
				for (var xgh = 0; xgh < a_gen_data.height; xgh++) {
					aset.push(thus.deepCopy(alayer));
				}
				// create empty solution
				var solution_clone = thus.deepCopy(aset);
				var solution_clones = [];
				for (var solox = 0; solox < a_gen_data.solution.length; solox++) {
					solution_clones.push(thus.deepCopy(solution_clone));
				}
				// assign the value to new empty data, for aset
				for (var exh = 0; exh < a_gen_data.height; exh++) {
					for (var exl = 0; exl < a_gen_data.length; exl++) {
						for (var exw = 0; exw < a_gen_data.width; exw++) {
							if ("up" == angle) {
								aset[exh][exl][exw] = a_gen_data.value[exl][a_gen_data.height - exh - 1][exw];
								for (var slx = 0; slx < solution_clones.length; slx++) {
									solution_clones[slx][exh][exl][exw] = a_gen_data.solution[slx].value[exl][a_gen_data.height - exh - 1][exw];
								}
							} else if ("down" == angle) {
								aset[exh][exl][exw] = a_gen_data.value[a_gen_data.length - exl - 1][exh][exw];
								for (var slx = 0; slx < solution_clones.length; slx++) {
									solution_clones[slx][exh][exl][exw] = a_gen_data.solution[slx].value[a_gen_data.length - exl - 1][exh][exw];
								}
							}
						}
					}
				}
			}
			// assign the value to the_data
			a_gen_data.value = thus.deepCopy(aset);
			for (var agsx = 0; agsx < a_gen_data.solution.length; agsx++) {
				a_gen_data.solution[agsx].value = thus.deepCopy(solution_clones[agsx]);
			}
			that.nextStep();
		}
		// generate html
		var gen_standard_html = ''
			+ '<div class="optionouter">'
			+ '	<div id="h_op_gen" style="display: none;">'
			+ '		<span class="gen_area_level">1:</span>'
			+ '		<div class="gen_area">'
			+ '			<div class="gen_row">'
			+ '				<div class="gen_cell gen_toptitle" onclick="gentoptitleclick(this)"><div class="vm"></div><div class="gen_txt">0</div></div>'
			+ '				<div class="gen_cell gen_toptitle" onclick="gentoptitleclick(this)"><div class="vm"></div><div class="gen_txt">1</div></div>'
			+ '			</div>'
			+ '			<div class="gen_row">'
			+ '				<div class="gen_cell gen_toptitle" onclick="gentoptitleclick(this)"><div class="vm"></div><div class="gen_txt">1</div></div>'
			+ '				<div class="gen_cell gen_blank" added=0 onclick="blankclick(this)"></div>'
			+ '			</div>'
			+ '			<div class="gen_area_bottom"></div>'
			+ '		</div>'
			+ '		<img style="display: none;" class="piece piece_upleft" src="' + polygen_root + 'img/upleft.png" alt="upleft">'
			+ '		<img style="display: none;" class="piece piece_leftright" src="' + polygen_root + 'img/leftright.png" alt="leftright">'
			+ '		<img style="display: none;" class="piece piece_up" src="' + polygen_root + 'img/up.png" alt="up">'
			+ '	</div>'
			+ '	<div id="cube_operation">'
			+ '		<div class="op_tangle">'
			+ '			<input id="poly_tangle1" class="op_tangle_radio" type="radio" name="poly_angle" checked value="1">'
			+ '			<label for="poly_tangle1">'
			+ '				<img class="angle_img" src="' + polygen_root + 'img/upleft.png" alt="upleft">'
			+ '			</label>'
			+ '			<input id="poly_tangle2" class="op_tangle_radio" type="radio" name="poly_angle" value="2">'
			+ '			<label for="poly_tangle2">'
			+ '				<img class="angle_img" src="' + polygen_root + 'img/leftright.png" alt="leftright">'
			+ '			</label>'
			+ '			<input id="poly_tangle3" class="op_tangle_radio" type="radio" name="poly_angle" value="3">'
			+ '			<label for="poly_tangle3">'
			+ '				<img class="angle_img" src="' + polygen_root + 'img/up.png" alt="up">'
			+ '			</label>'
			+ '		</div>'
			+ '		<div class="op_generating">'
			+ '			<button type="button" direction="up" class="turnAngle">↑</button>'
			+ '			<button type="button" direction="down" class="turnAngle">↓</button>'
			+ '			<button type="button" direction="right" class="turnAngle">→</button>'
			+ '			<button type="button" direction="left" class="turnAngle">←</button>'
			+ '			<button type="button" direction="in" class="operaTransparent">TI</button>'
			+ '			<button type="button" direction="out" class="operaTransparent">TO</button>'
			+ '			<button type="button" class="toggleTextBtn" toggleTextState="on" class="toggleTextBtn">info</button>'
			+ '		</div>'
			+ '		<div class="op_result">'
			+ '			<div class="op_board">'
			+ '			</div>'
			+ '		</div>'
			+ '		<div id="op_textboard">'
			+ '			<div id="tb_name"></div>'
			+ '			<div id="tb_desc"></div>'
			+ '			<div id="tb_type"></div>'
			+ '			<div class="tb_item">'
			+ '				<span class="tb_label">difficulty: </span>'
			+ '				<span id="tb_difficulty"></span>'
			+ '			</div>'
			+ '			<div class="tb_item">'
			+ '				<span class="tb_label">size: </span>'
			+ '				<span id="tb_size"></span>'
			+ '			</div>'
			+ '			<div class="tb_item">'
			+ '				<span class="tb_label">solve: </span>'
			+ '				<span id="tb_solve"></span>'
			+ '			</div>'
			+ '		</div>'
			+ '		<div id="solop_outer">'
			+ '			<div class="solutionpoint_outer">'
			+ '				<span>Solution:<span id="solve_num">0</span></span>'
			+ '				<div class="solutionpoint_inner">'
			+ '					<label for="solutionpoint">solution point:</label>'
			+ '					<select id="solutionpoint" name="solutionpoint">'
			+ '						<option value="-1" selected>not selected</option>'
			+ '					</select>'
			+ '				</div>'
			+ '				<div id="solution_step">'
			+ '					<button class="solution_step_start">start</button>'
			+ '					<button class="solution_step_minus">-</button>'
			+ '					<span id="solution_step_num">0</span>'
			+ '					<button class="solution_step_plus">+</button>'
			+ '					<button class="solution_step_end">end</button>'
			+ '				</div>'
			+ '			</div>'
			+ '			<div id="solop" onhtml="no">'
			+ '				<div class="op_solvectrl">'
			+ '					<div class="solvectrl_top">'
			+ '						<button add_state="0" onclick="solvectrl_add()" id="solvectrl_add">add</button>'
			+ '						<button onclick="solvectrl_submit()" id="solvectrl_submit">submit</button>'
			+ '						<button edit_state="0" onclick="solvectrl_edit()" id="solvectrl_edit">edit</button>'
			+ '						<button onclick="solvectrl_delete()" id="solvectrl_delete">delete</button>'
			+ '						<span id="solutiondescspan">'
			+ '							<label for="solutiondesc">describe:</label>'
			+ '							<input id="solutiondesc" type="input">'
			+ '						</span>'
			+ '						<div id="solvemode">'
			+ '							<input id="solvemode1" class="solvemodeinput" type="radio" name="solvemode" value="1">'
			+ '							<label class="solvemodelabel" for="solvemode1">sort</label>'
			+ '							<input id="solvemode2" class="solvemodeinput" type="radio" name="solvemode" value="2">'
			+ '							<label class="solvemodelabel" for="solvemode2">solve</label>'
			+ '						</div>'
			+ '					</div>'
			+ '					<div id="solvectrl_btm">'
			+ '						<div id="solvectrl_sorting"></div>'
			+ '						<div id="solvectrl_sorted">'
			+ '							<!--'
			+ '							<div class="solvectrl_cell" style="background:#55a188">F</div>'
			+ '							<div class="solvectrl_cell" style="background:#5655a1">I</div>'
			+ '							<div class="solvectrl_cell" style="background:#a19355">L</div>'
			+ '							<div class="solvectrl_cell" style="background:#55a055">P</div>'
			+ '							<div class="solvectrl_cell" style="background:#925096">S</div>'
			+ '							<div class="solvectrl_cell" style="background:#a57352">T</div>'
			+ '							<div class="solvectrl_cell" style="background:#82a054">U</div>'
			+ '							<div class="solvectrl_cell" style="background:#ad6a63">V</div>'
			+ '							<div class="solvectrl_cell" style="background:#57795c">W</div>'
			+ '							<div class="solvectrl_cell" style="background:#3e6d76">X</div>'
			+ '							<div class="solvectrl_cell" style="background:#6e89b2">Y</div>'
			+ '							<div class="solvectrl_cell" style="background:#95524f">Z</div>'
			+ '							-->'
			+ '						</div>'
			+ '					</div>'
			+ '				</div>'
			+ '			</div>'
			+ '		</div>'
			+ '	</div>'
			+ '</div>'
			+ '';
		// generate html
		polyhd.innerHTML = gen_standard_html;
		// import data
		this.import_data();
		// display cube_operation
		polyhd.querySelector('#cube_operation').style.display = "block";
		// add change event to angle option
		polyhd.querySelectorAll('.op_tangle_radio').forEach(function(e, n){
			// change the name
			e.name = "poly" + poly_num;
			// change the id
			e.id = e.name + "_tangle" + n;
			// add change event
			e.addEventListener('change', function(event) {
				// a gen data
				var a_gen_data = that.polyform_data;
				a_gen_data.angle = event.target.value;
				that.nextStep();
			})
		})
		// change the label target
		polyhd.querySelectorAll('.op_tangle>label').forEach(function(e, n){
			e.setAttribute("for", "poly" + poly_num + "_tangle" + n);
		})
		// click event
		polyhd.addEventListener('click', function(event) {
			if (event.target.classList.contains('turnAngle')) {
				// turnAngle
				that.turnAngle(event.target.getAttribute("direction"));
			}
			if (event.target.classList.contains('operaTransparent')) {
				// set the front transparent that show the inside
				that.operaTransparent(event.target.getAttribute("direction"));
			}
			if (event.target.classList.contains('toggleTextBtn')) {
				// set the front transparent that show the inside
				that.toggleText(event.target.getAttribute("toggleTextState"));
			}
			if (event.target.classList.contains('solution_step_minus')) {
				// set the front transparent that show the inside
				that.solution_step_minus();
			}
			if (event.target.classList.contains('solution_step_start')) {
				// set the front transparent that show the inside
				that.solution_step_start();
			}
			if (event.target.classList.contains('solution_step_plus')) {
				// set the front transparent that show the inside
				that.solution_step_plus();
			}
			if (event.target.classList.contains('solution_step_end')) {
				// set the front transparent that show the inside
				that.solution_step_end();
			}
		})
	}
	// ctrl class
	this.polygen_ctrl_class = [];
	// opera every polygen
	this.polygen_class = document.getElementsByClassName(this.className);
	for (var x = 0; x < this.polygen_class.length; x++) {
		this.polygen_ctrl_class.push(new PolygenItem(x, this.polygen_class[x]));
	}
}
