// Ejpoot Object
/*
 * 1.add a input box
 * 2.go pre input
 * 3.go char input
 *
 * usage example1:
```
<div class="ejpoot_root">
	<textarea style="display: none;">[{"c":"你","e":"人弓火"},{"c":"是","e":"日一卜人"},{"c":"海","e":"水人田卜"},{"c":"鷗","e":"尸口竹日火"}]</textarea>
</div>
<br>*##########<br>
<div class="ejpoot_root">
	<button class="ejpoot_restart" type="button">rst</button>
	<span style="color: red;" class="ewqr"><textarea style="display: none;">[{"c":"她","e":"女心木"}]</textarea></span><span style="color: green;" class="fewqf"><textarea style="display: none;">[{"c":"井","e":"廿廿"},{"c":"井","e":"廿廿"},{"c":"好","e":"女弓木"},{"c":"好","e":"女弓木"},{"c":"玩","e":"一土一一山"},{"c":"，","e":"重難日月"},{"c":"井","e":"廿廿"},{"c":"井","e":"廿廿"},{"c":"真","e":"十月一金"},{"c":"的","e":"竹日心戈"},{"c":"好","e":"女弓木"},{"c":"玩","e":"一土一一山"},{"c":"。","e":"重難日木"}]</textarea></span>
</div>
<script src="ejpoot.1.0.0.js"></script>
<script>
	new EjpootRoot({
		el: ".ejpoot_root",
		autoPlay: true,
		inputBox: {
			background: 'lightblue',
			underLine: 'black',
			color: 'black',
		},
		speed: 240,
		restart: {
			loop: true,
			delay: 3600,
		},
	});
</script>
```
 * usage example2:
```
var ejpoot;
document.querySelectorAll(".ejpoot_root").forEach(function(i) {
	var ejpoot_value = [];
	var ejpoot_parents = [];
	i.querySelectorAll("textarea").forEach(function(j) {
		ejpoot_parents.push(j.parentNode);
	});
	ejpoot = new Ejpoot({
		root: i,
		autoPlay: false,
		parents: ejpoot_parents,
		inputBox: {
			background: 'lightblue',
			underLine: 'black',
			color: 'black',
		},
		speed: 240,
		restart: {
			loop: true,
			delay: 3600,
			restartButton: "false",
		},
		value: ejpoot_value
	});
});
//...newValue...
	// init ejpoot_root
	document.querySelector(".ejpoot_root").innerHTML = "";
	// input animate
	var new_textarea = document.createElement("textarea");
	new_textarea.style.display = "none";
	document.querySelector(".ejpoot_root").appendChild(new_textarea);
	document.querySelector(".ejpoot_root>textarea").value = JSON.stringify(newValue);
	document.querySelectorAll(".ejpoot_root").forEach(function(i) {
		var ejpoot_value = [];
		var ejpoot_parents = [];
		i.querySelectorAll("textarea").forEach(function(j) {
			ejpoot_value.push(JSON.parse(j.value));
			ejpoot_parents.push(j.parentNode);
		});
		//ejpoot
		ejpoot.parents = ejpoot_parents;
		ejpoot.value = ejpoot_value;
		ejpoot.ejpoot_restart();
	})
 * */
function Ejpoot(arg) {
	// this is thus
	var thus = this;
	// root
	this.root = arg.root;
	// speed
	this.speed = arg.speed;
	// delay
	this.delay = arg.delay;
	// parents
	this.parents = arg.parents;
	// value
	this.value = arg.value;
	// create input box
	this.inputBox = document.createElement("span");
	// init input box className
	this.inputBox.className = "input_box";
	// init input box color
	this.inputBox.style.color = arg.inputBox.color;
	// init parents
	arg.parents[0].appendChild(thus.inputBox);
	// section Point
	this.sp = 0;
	// input Char Point
	this.cp = 0;
	// input prE Point
	this.ep = 0;
	// restart
	this.ejpoot_restart = function() {
		// clear main_timeout
		clearTimeout(thus.main_timeout);
		// clear restart_timeout
		clearTimeout(thus.restart_timeout);
		// init ep
		thus.ep = 0;
		// init cp
		thus.cp = 0;
		// init sp
		thus.sp = 0;
		// init parents 
		arg.parents.forEach(function(x) {
			x.innerHTML = "";
		});
		// init input box 
		thus.inputBox.innerHTML = "";
		// append input box
		arg.parents[0].appendChild(thus.inputBox);
		// restart
		thus.ejpoot_main();
	}
	// the main function
	this.ejpoot_main = function() {
		// loop section
		if (thus.sp < thus.parents.length) {
			// if cp is not come to an end
			if (thus.cp < thus.value[thus.sp].length) {
				// input prE
				if (thus.ep < thus.value[thus.sp][thus.cp].e.length) {
					// set inputBox background
					thus.inputBox.style.background = arg.inputBox.background;
					// set inputBox borderBottom
					thus.inputBox.style.borderBottom = "1px solid " + arg.inputBox.underLine;
					// set inputBox content
					thus.inputBox.innerHTML += thus.value[thus.sp][thus.cp].e[thus.ep++];
				} else {
					// remove inputBox
					thus.inputBox.remove();
					// init inputBox
					thus.inputBox.innerHTML = "";
					// init background
					thus.inputBox.style.background = "transparent";
					// init borderBottom
					thus.inputBox.style.borderBottom = "1px solid transparent";
					// input cp 
					thus.parents[thus.sp].innerHTML += thus.value[thus.sp][thus.cp].c;
					// append input box
					thus.parents[thus.sp].appendChild(thus.inputBox);
					// init ep
					thus.ep = 0;
					// add thus.cp
					thus.cp += 1;
				}
				// delay
				thus.main_timeout = setTimeout(thus.ejpoot_main, parseInt(arg.speed));
			} else {
				// init cp
				thus.cp = 0;
				// init sp
				thus.sp += 1;
				// delay
				thus.main_timeout = setTimeout(thus.ejpoot_main, parseInt(arg.speed));
			}
		} else if(arg.restart.loop) {
			// restart
			thus.restart_timeout = setTimeout(thus.ejpoot_restart, parseInt(arg.restart.delay));
		}
	}
	// go main
	if (arg.autoPlay) {
		thus.ejpoot_main();
	}
	// restart button
	thus.root.querySelectorAll(".ejpoot_restart").forEach(function(rst_btn) {
		// add click event
		rst_btn.addEventListener("click", function() {
			// restart ejsoon input animate
			thus.ejpoot_restart();
		});
	});
}

// ejpoot root 
function EjpootRoot(ocln) {
	// deepCopy obcject
	function deepCopy(aObject) {
		if (!aObject) {
			return aObject;
		}
		var v, bObject = Array.isArray(aObject) ? [] : {};
		for (var k in aObject) {
			v = aObject[k];
			bObject[k] = (typeof v === "object") ? deepCopy(v) : v;
		}
		return bObject;
	}
	// loop ejpoot root 
	document.querySelectorAll(ocln.el).forEach(function(i) {
		cln = deepCopy(ocln);
		// init root
		cln.root = i;
		// init ejpoot_value
		cln.value = [];
		// init ejpoot_parents
		cln.parents = [];
		// init speed
		if (null != i.getAttribute("speed"))
			cln.speed = i.getAttribute("speed");
		// init delay
		if (null != i.getAttribute("delay"))
			cln.restart.delay = i.getAttribute("delay");
		// set value bye textarea
		i.querySelectorAll("textarea").forEach(function(j) {
			// set ejpoot_value
			cln.value.push(JSON.parse(j.value));
			// set ejpoot_parents
			cln.parents.push(j.parentNode);
		});
		new Ejpoot(cln);
	});
}
