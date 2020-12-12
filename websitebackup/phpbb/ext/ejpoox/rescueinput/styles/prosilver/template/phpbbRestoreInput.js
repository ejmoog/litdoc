var input_textarea_outer = document.getElementById("message-box");
var input_textarea = document.getElementById("message");
var input_title = document.getElementById("subject");
var add_element = document.createElement("div");
// set rescue local storage
input_textarea.oninput = function() { set_storage(); }
input_title.oninput = function() { set_storage(); }
function set_storage() {
	localStorage.setItem('rescue_input', input_textarea.value);
	localStorage.setItem('rescue_title', input_title.value);
	localStorage.setItem('rescue_time', getdatetime());
	add_element.style.background = "#8ff0e7";
}
// add the rescue button
add_element.id = "rescue_btn";
add_element.setAttribute("used", 0);
add_element.onclick = function() {
	// change value
	var iptval = localStorage.getItem('rescue_input');
	var titval = localStorage.getItem('rescue_title');
	var o_iptval = input_textarea.value;
	var o_titval = input_title.value;
	input_textarea.value = iptval;
	input_title.value = titval;
	localStorage.setItem('rescue_input', o_iptval);
	localStorage.setItem('rescue_title', o_titval);
	// change color
	if (this.getAttribute("used") == 1) {
		this.style.background = "#8ff0e7";
		this.setAttribute("used", 0);
	} else {
		this.style.background = "#eee7b0";
		this.setAttribute("used", 1);
	}
	describe_rescue();
}
input_textarea_outer.appendChild(add_element);
var detial_element = document.createElement("span");
detial_element.style.display = 'none';
detial_element.id = "rescue_dtl";
input_textarea_outer.appendChild(detial_element);
// describe this change
var deto;
function describe_rescue() {
	detial_element.style.display = 'inline';
	detial_element.innerHTML = localStorage.getItem('rescue_time');
	clearTimeout(deto);
	deto = setTimeout(function(){
		detial_element.style.display = 'none';
	}, 3000);
}
// get the date time
function getdatetime() {
	var todayDate = new Date();
	var todayNum = ''
		+ todayDate.getFullYear()
		+ "-"
		+ todayDate.getMonth()
		+ "-"
		+ todayDate.getDate()
		+ " "
		+ (todayDate.getHours() < 10 ? "0" : "")
		+ todayDate.getHours()
		+ ":"
		+ (todayDate.getMinutes() < 10 ? "0" : "")
		+ todayDate.getMinutes()
		+ ":"
		+ (todayDate.getSeconds() < 10 ? "0" : "")
		+ todayDate.getSeconds()
		+ '';
	return todayNum;
}
