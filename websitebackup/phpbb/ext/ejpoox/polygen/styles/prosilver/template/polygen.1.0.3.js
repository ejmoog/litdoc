/*
 * 1.generate standard html
 * 2.data import
 * 3.generate event html
 * 4.click event
 *
 *
 * setting{
 * el: className
 * mode: gen(all is present), img(only image, but not word currently), ctrl(only has click event)
 * polygen_root : the root location, img/ must put in this location
 * }
 * */
// Polygen construction
function Polygen(setting) {
	// this is thus
	var thus = this;
	// polygen_root
	var polygen_root = setting.polygen_root;
	//*** init setting
	// className that would be a polygen div
	this.className = setting.el;
	// mode: gen(all is present), img(only image), ctrl(has click event)
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
	// getPolyformURLParameter
	this.getPolyformURLParameter = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
	}
	// create solution
	function CreateSolution(value, sort ,desc) {
		this.value = thus.deepCopy(value);
		this.sort = sort;
		this.desc = desc;
	}
	// get parent class
	this.checkParentsClassName = function (elem, classname) {
		// return the right parent element
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if (elem.classList.contains(classname)) {
				return elem;
			}
		}
		return null;
	};
	// a polyform item
	 function PolygenItem(poly_num, poly_handle) {
		// that is this
		var that = this;
		// handle the polygen
		var polyhd = poly_handle;
		// get data
		var data_hd = polyhd.querySelector(".polygen_data");
		// json parse data
		this.polyform_data = "";
		// if generate mode
		if (thus.genMode == "gen") {
			this.polyform_data = JSON.parse('{"name":"Cube","desc":"A soma cube","type":"SomaCube","angle":"1"}');
		} else {
			// adjust if the data is not present
			if (data_hd == null || data_hd.value == "") {
				// assign default data
				this.polyform_data = JSON.parse('{"name":"Cube","desc":"A soma cube","type":"SomaCube"}');
			} else {
				// data assign
				this.polyform_data = JSON.parse(data_hd.value);
			}
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
			// if genMode is gen
			if (thus.genMode == "gen") {
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
			} else {
				// if ctrl mode
				if (parseInt(a_gen_data.solution_point) >= 0) {
					solution_step.style.display =  "inline";
				} else {
					solution_step.style.display = "none";
				}
			}
		}
		// generate the click area
		this.gen_area = function() {
			var a_gen_data = that.polyform_data;
			// handle generator
			var op_generator_handle = polyhd.getElementsByClassName("op_generator")[0];
			var h_op_gen = polyhd.querySelector("#h_op_gen");
			var op_level_handle = h_op_gen.getElementsByClassName("gen_area_level")[0];
			var op_level_padding_handle = h_op_gen.getElementsByClassName("gen_area_bottom")[0];
			var gen_area_handle = h_op_gen.getElementsByClassName("gen_area")[0];
			var gen_row_handle = h_op_gen.getElementsByClassName("gen_row")[0];
			var gen_toptitle_handle = h_op_gen.getElementsByClassName("gen_toptitle")[0];
			var gen_blank_handle = h_op_gen.getElementsByClassName("gen_blank")[0];
			// clone handle
			var op_level_clone = op_level_handle.cloneNode(true);
			op_level_clone.style.display = "block";
			var op_level_padding_clone = op_level_padding_handle.cloneNode(true);
			var gen_area_clone = gen_area_handle.cloneNode();
			gen_area_clone.style.display = "block";
			var gen_row_clone = gen_row_handle.cloneNode();
			var gen_toptitle_clone = gen_toptitle_handle.cloneNode(true)
			var gen_blank_clone = gen_blank_handle.cloneNode(true)
			// if it is not gen mode
			if (thus.genMode != "gen") {
				return;
			}
			// start generate, clear generator
			op_generator_handle.innerHTML = "";
			// add area
			for (var genh = 0; genh < a_gen_data.value.length; genh++) {
				for (var genl = 0; genl <= a_gen_data.value[0].length; genl++) {
					gen_row_clone.innerHTML = "";
					for (var genw = 0; genw <= a_gen_data.value[0][0].length; genw++) {
						// first title row
						if (0 == genl) {
							gen_toptitle_clone.getElementsByClassName("gen_txt")[0].innerHTML = genw;
							gen_toptitle_clone.setAttribute("title_row", genw )
							gen_toptitle_clone.setAttribute("title_column", genl)
							gen_toptitle_clone.setAttribute("title_level", genh + 1)
							gen_row_clone.appendChild(gen_toptitle_clone.cloneNode(true));
						} else {
							// below row 
							if (0 == genw) {
								// first column
								gen_toptitle_clone.getElementsByClassName("gen_txt")[0].innerHTML = genl;
								gen_toptitle_clone.setAttribute("title_row", genw )
								gen_toptitle_clone.setAttribute("title_column", genl)
								gen_toptitle_clone.setAttribute("title_level", genh + 1)
								gen_row_clone.appendChild(gen_toptitle_clone.cloneNode(true));
							} else {
								// blank column
								gen_blank_clone.setAttribute("blank_row", genw);
								gen_blank_clone.setAttribute("blank_column", genl);
								gen_blank_clone.setAttribute("blank_level", genh + 1);
								if (0 == a_gen_data.value[genh][genl - 1][genw - 1]) {
									gen_blank_clone.setAttribute("added", 0);
									gen_blank_clone.style.background = "#d2f4d4";
									gen_blank_clone.innerHTML = "";
								} else {
									gen_blank_clone.setAttribute("added", 1);
									gen_blank_clone.style.background = that.gen_blank_color(genh, genl - 1, genw - 1);
									gen_blank_clone.innerHTML = that.gen_blank_text(genh, genl - 1, genw - 1);
								}
								gen_row_clone.appendChild(gen_blank_clone.cloneNode(true));
							}
						}
					}
					gen_area_clone.appendChild(gen_row_clone.cloneNode(true));
				}
				// add level padding
				op_level_clone.innerHTML = (parseInt(genh) + 1) + ":";
				op_generator_handle.appendChild(op_level_clone.cloneNode(true));
				// add one generator area
				op_generator_handle.appendChild(gen_area_clone.cloneNode(true));
				op_generator_handle.appendChild(op_level_padding_clone.cloneNode(true));
				gen_area_clone.innerHTML = "";
			}
		}
		// gen_blank_color
		this.gen_blank_color = function(ch, cl, cw) {
			var a_gen_data = that.polyform_data;
			var rescolor = "red";
			if (-1 != a_gen_data.solution_point) {
				var solutionLength = a_gen_data.solution.length;
				var desvalue = a_gen_data.solution[a_gen_data.solution_point].value[ch][cl][cw];
				if (desvalue != 1) {
					rescolor = thus.polyform_color[a_gen_data.type][desvalue];
				}
			}
			return rescolor;
		}
		// gen_blank_text
		this.gen_blank_text = function(ch, cl, cw) {
			var a_gen_data = that.polyform_data;
			var restext = "";
			if (-1 != a_gen_data.solution_point) {
				var solutionLength = a_gen_data.solution.length;
				var desvalue = a_gen_data.solution[a_gen_data.solution_point].value[ch][cl][cw];
				if (desvalue != 1) {
					restext = desvalue;
				}
			}
			return restext;
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
			tb_difficulty.parentNode.style.display = "block";
			if (0 == parseInt(a_gen_data.difficulty)) {
				tb_difficulty.parentNode.style.display = "none";
			} else {
				tb_difficulty.innerHTML = difficulty_arr[a_gen_data.difficulty];
			}
			tb_size.innerHTML = a_gen_data.width + " X " + a_gen_data.length + " X " + a_gen_data.height;
			tb_solve.parentNode.style.display = "block";
			if (1 == parseInt(a_gen_data.solve_state)) {
				tb_solve.innerHTML = "more than " + a_gen_data.solve_number;
			} else if (2 == parseInt(a_gen_data.solve_state)) {
				tb_solve.innerHTML = "total is " + a_gen_data.solve_number;
			} else if (0 == parseInt(a_gen_data.solve_state)) {
				tb_solve.innerHTML = "impossible";
			} else {
				tb_solve.parentNode.style.display = "none";
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
			// display the operation area
			that.cube_operation_display();
			// opera the solution
			that.gen_solution();
			// opera the generation area
			that.gen_area();
			// build the basic solid
			that.gen_solid();
			// display the solid
			that.build_solid();
			// manage the text
			that.gen_text();
		}
		// display the operation area
		this.cube_operation_display = function() {
			// display the operation area
			polyhd.querySelector("#cube_operation").style.display = "block";
			// toggle setting
			if (thus.genMode == "gen") {
				// toggle setting
				var toggle_setting_btn = polyhd.querySelector('#toggle_setting_btn');
				toggle_setting_btn.setAttribute("onsetting", "on");
				that.toggle_setting();
			}
		}
		// turnAngle: trun up down right left 90 angle
		this.turnAngle = function(angle) {
			var a_gen_data = that.polyform_data;
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
		// toggle setting
		this.toggle_setting = function() {
			var upop0inner = polyhd.querySelector('#upop0inner');
			var toggle_setting_btn = polyhd.querySelector('#toggle_setting_btn');
			if (toggle_setting_btn.getAttribute("onsetting") == "off") {
				//open import data
				upop0inner.style.display = "block";
				toggle_setting_btn.setAttribute("onsetting", "on");
			} else {
				//close import data
				upop0inner.style.display = 'none';
				toggle_setting_btn.setAttribute("onsetting", "off");
			}
		}
		// submit setting
		this.op_submit = function() {
			var a_gen_data = that.polyform_data;
			// assign value
			that.polyform_data.name = polyhd.querySelector("#polyname").value;
			that.polyform_data.desc = polyhd.querySelector("#polydesc").value;
			if (polyhd.querySelector('input.op_polyform_radio:checked') == null) {
				thus.setRadioValue(polyhd.getElementsByClassName("op_polyform_radio"), "SomaCube");
			}
			that.polyform_data.type = polyhd.querySelector('input.op_polyform_radio:checked').value;
			that.polyform_data.difficulty = polyhd.querySelector("#polydifficulty").value;
			if (polyhd.querySelector('input.op_tangle_radio:checked') == null) {
				thus.setRadioValue(polyhd.getElementsByClassName("op_tangle_radio"), "2");
			}
			that.polyform_data.angle = polyhd.querySelector("input.op_tangle_radio:checked").value;
			that.polyform_data.solve_state = polyhd.querySelector("#polysolvestate").value;
			that.polyform_data.solve_number = polyhd.querySelector("#solve_number").value;
			that.polyform_data.width = polyhd.querySelector("#op_column_width").value;
			that.polyform_data.height = polyhd.querySelector("#op_column_height").value;
			that.polyform_data.length = polyhd.querySelector("#op_column_length").value;
			// create empty data
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
			// assign data
			if (undefined == a_gen_data.value) {
				a_gen_data.value = thus.deepCopy(aset);
			} else {
				var awpart, alpart, ahpart, xagh, xagl, xagw;
				// if width is change
				if (a_gen_data.value[0][0].length != a_gen_data.width) {
					awpart = a_gen_data.width - a_gen_data.value[0][0].length;
					for (xagh = 0; xagh < a_gen_data.value.length; xagh++) {
						for (xagl = 0; xagl < a_gen_data.value[0].length; xagl++) {
							if (awpart > 0) {
								for (xagw = 0; xagw < awpart; xagw++) {
									a_gen_data.value[xagh][xagl].push(0);
								}
							} else {
								for (xagw = 0; xagw > awpart; xagw--) {
									a_gen_data.value[xagh][xagl].pop();
								}
							}
						}
					}
				}
				// if length is change
				if (a_gen_data.value[0].length != a_gen_data.length) {
					alpart = a_gen_data.length - a_gen_data.value[0].length;
					for (xagh = 0; xagh < a_gen_data.height; xagh++) {
						if (alpart > 0) {
							for (xagl = 0; xagl < alpart; xagl++) {
								a_gen_data.value[xagh].push(thus.deepCopy(arow));
							}
						} else {
							for (xagl = 0; xagl > alpart; xagl--) {
								a_gen_data.value[xagh].pop();
							}
						}
					}
				}
				// if height is change
				if (a_gen_data.value.length != a_gen_data.height) {
					ahpart = a_gen_data.height - a_gen_data.value.length;
					if (ahpart > 0) {
						for (xagh = 0; xagh < ahpart; xagh++) {
							a_gen_data.value.push(thus.deepCopy(alayer));
						}
					} else {
						for (xagh = 0; xagh > ahpart; xagh--) {
							a_gen_data.value.pop();
						}
					}
				}
			}
			// next step
			that.nextStep();
		}
		// toggle import data
		this.toggle_import_data = function() {
			var tbtn = polyhd.querySelector('#toggle_import_data_btn');
			var tidarea = polyhd.querySelector('#tidarea');
			var upop = polyhd.querySelector('#upop0');
			if (tbtn.getAttribute("ontg") == 0) {
			//open import data
				upop.style.display = 'none';
				tidarea.style.display = "block";
				tbtn.setAttribute("ontg", 1);
				that.export_data();
			} else {
			//close import data
				upop.style.display = "block";
				tidarea.style.display = 'none';
				tbtn.setAttribute("ontg", 0);
			}
		}
		//export data
		this.export_data = function() {
			// handle
			var ta_gen_data = document.getElementById("ta_gen_data");
			// assign value
			ta_gen_data.value = JSON.stringify(that.polyform_data);
			// select textarea
			ta_gen_data.select();
			// data_link
			polyhd.querySelector(".data_link").href = ''
				+ location.origin
				+ location.pathname
				+ "?data=" + encodeURI(JSON.stringify(that.polyform_data));
		}
		// submit import
		this.submit_import_data = function() {
			// import data
			var ta_gen_data = polyhd.querySelector("#ta_gen_data");
			var a_gen_data = that.polyform_data = Object.assign({}, JSON.parse(ta_gen_data.value));
			// change option value
			polyhd.querySelector("#polyname").value = a_gen_data.name;
			polyhd.querySelector("#polydesc").value = a_gen_data.desc;
			thus.setRadioValue(polyhd.getElementsByClassName("op_polyform_radio"), a_gen_data.type);
			polyhd.querySelector("#polydifficulty").value = a_gen_data.difficulty;
			thus.setRadioValue(polyhd.getElementsByClassName("op_tangle_radio"), a_gen_data.angle);
			polyhd.querySelector("#op_column_width").value = a_gen_data.width;
			polyhd.querySelector("#op_column_height").value = a_gen_data.height;
			polyhd.querySelector("#op_column_length").value = a_gen_data.length;
			polyhd.querySelector("#solve_number").value = a_gen_data.solve_number;
			polyhd.querySelector("#polysolvestate").value = a_gen_data.solve_state;
			// manage solution
			if (-1 < parseInt(a_gen_data.solution_point)) {
				polyhd.querySelector("#solution_step_num").innerHTML = a_gen_data.solution[a_gen_data.solution_point].sort.length;
			}
			// toggle import data display
			that.toggle_import_data();
			var toggle_setting_btn = polyhd.querySelector("#toggle_setting_btn");
			toggle_setting_btn.setAttribute("onsetting", "on");
			that.toggle_setting();
			// generate
			that.nextStep();
		}
		// blank gen area click
		this.blankclick = function(e) {
			var a_gen_data = that.polyform_data;
			var cw = e.getAttribute("blank_row");
			var cl = e.getAttribute("blank_column");
			var ch = e.getAttribute("blank_level");
			cw = parseInt(cw) - 1;
			cl = parseInt(cl) - 1;
			ch = parseInt(ch) - 1;
			// if adding solution
			var solvecell_selected = polyhd.querySelector(".solvecell_selected");
			if (null == solvecell_selected) {
			// normal click
				a_gen_data.value[ch][cl][cw] = Math.abs(a_gen_data.value[ch][cl][cw] - 1);
			} else {
				if (1 == a_gen_data.value[ch][cl][cw]) {
					// if input already
					if (a_gen_data.solution[a_gen_data.solution.length - 1].value[ch][cl][cw] == solvecell_selected.innerHTML) {
						a_gen_data.solution[a_gen_data.solution.length - 1].value[ch][cl][cw] = "1";
					} else {
						a_gen_data.solution[a_gen_data.solution.length - 1].value[ch][cl][cw] = solvecell_selected.innerHTML;
					}
				}
			}
			that.nextStep();
		}
		// toggle solution
		this.toggle_solop = function() {
			var solop = polyhd.querySelector('#solop');
			if (solop.getAttribute("onhtml") == "no") {
				solop.style.display = "block";
				solop.setAttribute("onhtml", "yes");
			} else {
				solop.style.display = "none";
				solop.setAttribute("onhtml", "no");
			}
		}
		// solvectrl add click
		this.solvectrl_add = function() {
			var a_gen_data = that.polyform_data;
			var solvemode = document.getElementById("solvemode");
			var solutiondescspan = document.getElementById("solutiondescspan");
			var solvectrl_btm = document.getElementById("solvectrl_btm");
			var solutionpoint = document.getElementById("solutionpoint");
			var solvectrl_submit = document.getElementById("solvectrl_submit");
			var solvectrl_add = document.getElementById("solvectrl_add");
			var solvectrl_sorting = document.getElementById("solvectrl_sorting");
			switch (parseInt(solvectrl_add.getAttribute("add_state"))) {
				case 0:
				// adding
					// manage ctrl button
					that.add_solution();
					that.solution_step_end();
					solvectrl_add.setAttribute("add_state", 1);
					solvectrl_add.innerHTML = "Cancel";
					solvemode.style.display =
					solutiondescspan.style.display =
					solvectrl_submit.style.display =
					solvectrl_btm.style.display = "inline";
					solvectrl_sorting.style.display = "inline-block";
					document.getElementById("solvemode1").checked = true;
					solutionpoint.disabled = true;
					// manage point solution
					var solutionlength = a_gen_data.solution.length;
					var solutionOpValue = solutionlength - 1;
					var optionHTML = '<option value="' + solutionOpValue + '" selected>' + solutionlength + '</option>';
					solutionpoint.innerHTML += optionHTML;
					a_gen_data.solution_point =
					solutionpoint.value = solutionOpValue;
					that.man_sort(solutionOpValue);
					that.solvectrl_event_bind();
					break;
				case 1:
				// cancel
					// manage ctrl button
					solutionpoint.disabled = false;
					solvectrl_add.setAttribute("add_state", 0);
					solvectrl_add.innerHTML = "add";
					solutiondescspan.style.display =
					solvemode.style.display =
					solvectrl_btm.style.display = "none";
					// manage point solution
					a_gen_data.solution.pop();
					solutionpoint.lastChild.remove();
					a_gen_data.solution_point =
					solutionpoint.value = -1;
					solvectrl_submit.style.display = "none";
					break;
			}
			that.nextStep();
			// point_solution(solvectrl_add.getAttribute("add_state"));
		}
		// solvectrl_submit
		this.solvectrl_submit = function() {
			var a_gen_data = that.polyform_data;
			var solvemode = polyhd.querySelector("#solvemode");
			var solutiondescspan = polyhd.querySelector("#solutiondescspan");
			var solvectrl_btm = polyhd.querySelector("#solvectrl_btm");
			var solvectrl_submit = polyhd.querySelector("#solvectrl_submit");
			var solvectrl_add = polyhd.querySelector("#solvectrl_add");
			var solvectrl_edit = polyhd.querySelector("#solvectrl_edit");
			var solutionpoint = polyhd.querySelector("#solutionpoint");
			var solutiondesc = polyhd.querySelector("#solutiondesc");
			// manage ctrl button
			solutionpoint.disabled = false;
			solvectrl_add.setAttribute("add_state", 0);
			solvectrl_edit.setAttribute("edit_state", 0);
			solvectrl_add.innerHTML = "add";
			solvectrl_edit.innerHTML = "edit";
			solutiondescspan.style.display =
			solvemode.style.display =
			solvectrl_btm.style.display =
			solvectrl_submit.style.display = "none";
			// solution describe
			a_gen_data.solution[solutionpoint.value].desc = solutiondesc.value;
			that.nextStep();
		}
		// manage solution
		this.man_sort = function(sNum) {
			var a_gen_data = that.polyform_data;
			var solvectrl_sorted = document.getElementById("solvectrl_sorted");
			var sort_data =  a_gen_data.solution[sNum].sort;
			var sort_inner =  "";
			for (var ssx = 0; ssx < sort_data.length; ssx++) {
				sort_inner += '<div class="solvectrl_cell" style="background:'
					+ thus.polyform_color[a_gen_data.type][sort_data[ssx]]
					+ '">'
					+ sort_data[ssx]
					+ '</div> ';
			}
			solvectrl_sorted.innerHTML = sort_inner;
		}
		// solvectrl_cell click
		this.solvectrl_event_bind = function(sNum) {
			// binding solvectrl_cell click event
			binding_solvectrl_cell();
			function binding_solvectrl_cell() {
				var solvectrl_cell = document.getElementsByClassName("solvectrl_cell");
				var solvectrl_sorting = document.querySelector('#solvectrl_sorting');
				var solvectrl_sorted = document.querySelector('#solvectrl_sorted');
				for (var scx = 0; scx < solvectrl_cell.length; scx++) {
					solvectrl_cell[scx].addEventListener("click", function() {
						var sort_state = document.querySelector('.solvemodeinput:checked').value;
						if ('1' == sort_state) {
						// sorting
							solvectrl_sorting.innerHTML += this.outerHTML + " ";
							this.remove();
							if (0 == solvectrl_sorted.getElementsByClassName("solvectrl_cell").length) {
								var solvemode2 = document.getElementById("solvemode2");
								solvemode2.checked = true;
								solvemode_change_fun(2);
							}
						} else {
							if (this.classList.contains("solvecell_selected")) {
								this.classList.remove("solvecell_selected");
							} else {
								var solvecell_selected = document.getElementsByClassName("solvecell_selected");
								for (var scs = 0; scs < solvecell_selected.length; scs++) {
									solvecell_selected[scs].classList.remove("solvecell_selected");
								}
								this.classList.add("solvecell_selected");
							}
						}
					});
				}
			}
			// binding sorted or sorting radio
			var solvemodeinput = document.getElementsByClassName("solvemodeinput");
			for (var smx = 0; smx < solvemodeinput.length; smx++) {
				solvemodeinput[smx].addEventListener("change", solvemode_change);
			}
			function solvemode_change() {
				solvemode_change_fun(this.value);
			}
			function solvemode_change_fun(this_value) {
				var solvectrl_sorting = document.querySelector('#solvectrl_sorting');
				var solvectrl_sorted = document.querySelector('#solvectrl_sorted');
				if (1 == this_value) {
				// start sorting
					solvectrl_sorting.style.display = 'inline-block';

					// remove solvecell_selected
					var solvecell_selected = document.getElementsByClassName("solvecell_selected");
					for (var scs = 0; scs < solvecell_selected.length; scs++) {
						solvecell_selected[scs].classList.remove("solvecell_selected");
					}
				} else {
				// sorted
					solvectrl_sorted.innerHTML = solvectrl_sorting.innerHTML + solvectrl_sorted.innerHTML;
					solvectrl_sorting.innerHTML = "";
					binding_solvectrl_cell();
					solvectrl_sorting.style.display = 'none';
					gen_sort();
				}
			}
			// generate solution sort
			function gen_sort() {
				var a_gen_data = that.polyform_data;
				var solvectrl_cells = document.getElementsByClassName("solvectrl_cell");
				var gsort = [];
				for (var scxx = 0; scxx < solvectrl_cells.length; scxx++) {
					gsort.push(solvectrl_cells[scxx].innerHTML);
				}
				a_gen_data.solution[a_gen_data.solution_point].sort = thus.deepCopy(gsort);
			}
		}
		// solvectrl_delete
		this.solvectrl_delete = function() {
			var a_gen_data = that.polyform_data;
			var solutionpoint = document.getElementById("solutionpoint");
			a_gen_data.solution.splice([a_gen_data.solution_point], 1);
			solutionpoint.value =
			a_gen_data.solution_point = -1;
			// goto next step
			that.nextStep();
		}
		// solvectrl edit click
		this.solvectrl_edit = function() {
			var a_gen_data = that.polyform_data;
			var solvectrl_edit = polyhd.querySelector("#solvectrl_edit");
			var solvectrl_add = polyhd.querySelector("#solvectrl_add");
			var solvemode = polyhd.querySelector("#solvemode");
			var solutiondescspan = polyhd.querySelector("#solutiondescspan");
			var solvectrl_btm = polyhd.querySelector("#solvectrl_btm");
			var solvectrl_sorting = polyhd.querySelector("#solvectrl_sorting");
			var solutionpoint = polyhd.querySelector("#solutionpoint");
			var solvectrl_submit = polyhd.querySelector("#solvectrl_submit");
			var solution_step = polyhd.querySelector("#solution_step");
			var solutiondesc = polyhd.querySelector("#solutiondesc");
			// set edit state
			if ("0" == solvectrl_edit.getAttribute("edit_state")) {
			// edit
				solvectrl_edit.setAttribute("edit_state", 1);
				solvectrl_edit.innerHTML = "Cancel"
				solvectrl_add.style.display = "none";
				solvemode.style.display =
				solutiondescspan.style.display =
				solvectrl_submit.style.display =
				solvectrl_btm.style.display = "inline";
				solvectrl_sorting.style.display = "inline-block";
				polyhd.querySelector("#solvemode1").checked = true;
				solutionpoint.disabled = true;
				// manage point solution
				that.solution_step_end();
				solutiondesc.value = a_gen_data.solution[solutionpoint.value].desc;
				that.man_sort(solutionpoint.value);
				that.solvectrl_event_bind();
			} else {
				solvectrl_edit.setAttribute("edit_state", 0);
				solvectrl_edit.innerHTML = "edit"
				solution_step.style.display = "inline-block";
				solvectrl_add.style.display = "inline";
				solvemode.style.display =
				solutiondescspan.style.display =
				solvectrl_submit.style.display =
				solvectrl_btm.style.display = "none";
				solutionpoint.disabled = false;
			// cancel
			}
			// goto next step
			that.nextStep();
		}
		// add solution to data
		this.add_solution = function() {
			var a_gen_data = that.polyform_data;
			if (a_gen_data.solution == undefined) {
				a_gen_data.solution = [];
			}
			a_gen_data.solution.push(new CreateSolution(a_gen_data.value, thus.polyform_char[a_gen_data.type], "a solution"));
		}
		// title click
		this.gentoptitleclick = function(e) {
			var a_gen_data = that.polyform_data;
			var cw = e.getAttribute("title_row");
			var cl = e.getAttribute("title_column");
			var ch = e.getAttribute("title_level");
			cw = parseInt(cw) - 1;
			cl = parseInt(cl) - 1;
			ch = parseInt(ch) - 1;
			// if adding solution
			var solvecell_selected = document.querySelector(".solvecell_selected");
			if (null == solvecell_selected) {
			// normal click
				if (cl == -1 && cw == -1) {
					for (var al = 0; al < a_gen_data.length; al++) {
						for (var aw = 0; aw < a_gen_data.width; aw++) {
							a_gen_data.value[ch][al][aw] = Math.abs(a_gen_data.value[ch][al][aw] - 1);
						}
					}
				} else if (cl == -1) {
					for (var al = 0; al < a_gen_data.length; al++) {
						a_gen_data.value[ch][al][cw] = Math.abs(a_gen_data.value[ch][al][cw] - 1);
					}
				} else if (cw == -1) {
					for (var aw = 0; aw < a_gen_data.width; aw++) {
						a_gen_data.value[ch][cl][aw] = Math.abs(a_gen_data.value[ch][cl][aw] - 1);
					}
				}
			}
			that.nextStep();
		}
		// if gen mode
		var gen_option = '', op_generator_html = '', solop_html = '';
		if (thus.genMode == "gen") {
			gen_option = ''
			+ '<div id="upop0" class="upop">'
			+ '	<button onsetting="on" class="toggle_setting_btn" id="toggle_setting_btn">Toggle setting</button>'
			+ '	<div id="upop0inner">'
			+ '		<div class="op_polyname">'
			+ '			<label for="polyname">name:</label>'
			+ '			<input id="polyname" type="input" value="A Polyform">'
			+ '		</div>'
			+ '		<div class="op_polydesc">'
			+ '			<label for="polydesc">desc:</label>'
			+ '			<input id="polydesc" type="input" value="A Polyform">'
			+ '		</div>'
			+ '		<div class="op_polyform">'
			+ '			<input id="polyform_type1" class="op_polyform_radio" type="radio" name="polyform_type' + poly_num + '" value="SomaCube" checked>'
			+ '			<label class="op_polyform_label" for="polyform_type1">SomaCube</label>'
			+ '			<input id="polyform_type2" class="op_polyform_radio" type="radio" name="polyform_type' + poly_num + '" value="Pentominos">'
			+ '			<label class="op_polyform_label" for="polyform_type2">Pentominos</label>'
			+ '			<input id="polyform_type3" class="op_polyform_radio" type="radio" name="polyform_type' + poly_num + '" value="Any Cube">'
			+ '			<label class="op_polyform_label" for="polyform_type3">Any Cube</label>'
			+ '		</div>'
			+ '		<div class="op_polydifficulty">'
			+ '			<label for="polydifficulty">difficulty:</label>'
			+ '			<select id="polydifficulty" name="polydifficulty">'
			+ '				<option value="0" selected>do not mind</option>'
			+ '				<option value="1">very easy</option>'
			+ '				<option value="2">esay</option>'
			+ '				<option value="3">midium</option>'
			+ '				<option value="4">hard</option>'
			+ '				<option value="5">extremely hard</option>'
			+ '			</select>'
			+ '		</div>'
			+ '		<div class="op_solvestate">'
			+ '			<label for="polysolvestate">solve state:</label>'
			+ '			<select id="polysolvestate" name="polysolvestate">'
			+ '				<option value="-1" selected>do not mind</option>'
			+ '				<option value="0">impossible</option>'
			+ '				<option value="1">counting...</option>'
			+ '				<option value="2">solved already</option>'
			+ '			</select>'
			+ '			<label for="solve_number">solve number:</label>'
			+ '			<input type="input" id="solve_number" name="solve_number">'
			+ '		</div>'
			+ '		<div class="op_column">'
			+ '			<label class="op_column_label" for="op_column_width">width</label>'
			+ '			<input id="op_column_width" class="op_column_input" type="input" name="op_column_width" value="3">'
			+ '			<label class="op_column_label" for="op_column_length">length</label>'
			+ '			<input id="op_column_length" class="op_column_input" type="input" name="op_column_length" value="3">'
			+ '			<label class="op_column_label" for="op_column_height">height</label>'
			+ '			<input id="op_column_height" class="op_column_input" type="input" name="op_column_height" value="3">'
			+ '		</div>'
			+ '		<div class="op_submit">'
			+ '			<button class="op_submit_btn" type="button">submit</button>'
			+ '		</div>'
			+ '	</div>'
			+ '</div>'
			+ '<div class="imop">'
			+ '	<button ontg="0" class="toggle_import_data_btn" id="toggle_import_data_btn">Toggle data</button>'
			+ '	<div id="tidarea" style="display: none;">'
			+ '		<br>'
			+ '		<textarea id="ta_gen_data" cols="30" rows="10"></textarea>'
			+ '		<br>'
			+ '		<button class="submit_import_data">submit import</button>'
			+ '		<a class="data_link" src=".">link</a>'
			+ '	</div>'
			+ '</div>'
			+ '';
			op_generator_html = '<div class="op_generator"></div>';
			solop_html = ''
			+ '			<button class="toggle_solop" id="toggle_solop" type="button">toggle solution control</button>'
			+ '			<div id="solop" onhtml="no">'
			+ '				<div class="op_solvectrl">'
			+ '					<div class="solvectrl_top">'
			+ '						<button type="button" add_state="0" id="solvectrl_add" class="solvectrl_add">add</button>'
			+ '						<button type="button" id="solvectrl_submit" class="solvectrl_submit">submit</button>'
			+ '						<button type="button" edit_state="0" class="solvectrl_edit" id="solvectrl_edit">edit</button>'
			+ '						<button type="button" class="solvectrl_delete" id="solvectrl_delete">delete</button>'
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
			+ '';
		}
		// generate html
		var gen_standard_html = ''
			+ '<div class="optionouter">'
			+ '	<div id="h_op_gen" style="display: none;">'
			+ '		<span class="gen_area_level">1:</span>'
			+ '		<div class="gen_area">'
			+ '			<div class="gen_row">'
			+ '				<div class="gen_cell gen_toptitle"><div class="vm"></div><div class="gen_txt">0</div></div>'
			+ '				<div class="gen_cell gen_toptitle"><div class="vm"></div><div class="gen_txt">1</div></div>'
			+ '			</div>'
			+ '			<div class="gen_row">'
			+ '				<div class="gen_cell gen_toptitle"><div class="vm"></div><div class="gen_txt">1</div></div>'
			+ '				<div class="gen_cell gen_blank" added=0></div>'
			+ '			</div>'
			+ '			<div class="gen_area_bottom"></div>'
			+ '		</div>'
			+ '		<img style="display: none;" class="piece piece_upleft" src="' + polygen_root + 'img/upleft.png" alt="upleft">'
			+ '		<img style="display: none;" class="piece piece_leftright" src="' + polygen_root + 'img/leftright.png" alt="leftright">'
			+ '		<img style="display: none;" class="piece piece_up" src="' + polygen_root + 'img/up.png" alt="up">'
			+ '	</div>'
			+ gen_option
			+ '	<div id="cube_operation">'
			+ '		<div class="op_tangle">'
			+ '			<input id="poly_tangle1" class="op_tangle_radio" type="radio" name="poly_angle" checked="true" value="1">'
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
			+ '					<label for="solutionpoint">point:</label>'
			+ '					<select id="solutionpoint" name="solutionpoint">'
			+ '						<option value="-1" selected>not selected</option>'
			+ '					</select>'
			+ '				</div>'
			+ '				<div id="solution_step">'
			+ '					<button type="button" class="solution_step_start">start</button>'
			+ '					<button type="button" class="solution_step_minus">-</button>'
			+ '					<span id="solution_step_num">0</span>'
			+ '					<button type="button" class="solution_step_plus">+</button>'
			+ '					<button type="button" class="solution_step_end">end</button>'
			+ '				</div>'
			+ '			</div>'
			+ solop_html
			+ '		</div>'
			+ op_generator_html
			+ '	</div>'
			+ '</div>'
			+ '';
		// generate html
		polyhd.innerHTML = gen_standard_html;
		// import data
		if (thus.genMode != "gen") {
			this.import_data();
			// display cube_operation
			polyhd.querySelector('#cube_operation').style.display = "block";
		} else {
			// manage url
			if (thus.getPolyformURLParameter("data")) {
				that.toggle_setting();
				that.toggle_import_data();
				polyhd.querySelector("#ta_gen_data").value = thus.getPolyformURLParameter("data");
				that.submit_import_data();
			}
		}
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
			if (event.target.classList.contains('toggle_setting_btn')) {
				// toggle setting
				that.toggle_setting();
			}
			if (event.target.classList.contains('op_submit_btn')) {
				// submit setting
				that.op_submit();
			}
			if (event.target.classList.contains('toggle_import_data_btn')) {
				// toggle import data
				that.toggle_import_data();
			}
			if (event.target.classList.contains('submit_import_data')) {
				// set import submit button click event
				that.submit_import_data();
			}
			if (event.target.classList.contains('gen_blank')) {
				// blank click
				that.blankclick(event.target);
			}
			if (thus.checkParentsClassName(event.target, 'gen_toptitle') != null) {
				// top title click
				that.gentoptitleclick(thus.checkParentsClassName(event.target, 'gen_toptitle'));
			}
			if (event.target.classList.contains('toggle_solop')) {
				// toggle_solution option
				that.toggle_solop();
			}
			if (event.target.classList.contains('solvectrl_add')) {
				// add a soludtion
				that.solvectrl_add();
			}
			if (event.target.classList.contains('solvectrl_submit')) {
				// submit a soludtion
				that.solvectrl_submit();
			}
			if (event.target.classList.contains('solvectrl_edit')) {
				// edit a soludtion
				that.solvectrl_edit();
			}
			if (event.target.classList.contains('solvectrl_delete')) {
				// delete a soludtion
				that.solvectrl_delete();
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
