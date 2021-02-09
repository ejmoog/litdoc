var pretxt = document.getElementById("pretxt");
var yahooCJ_e = [];
var yahooCJ_c = [];
var e_storage = [];
document.querySelector(".ejpoot_data_create").addEventListener("click", make_ejpoot_data);
read_cin();
// ejpoot ctrl
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
/* read the cin file */
function read_cin() {
	var cin_file;
	var cin_n = [];
	var cin_n_point = 0;
	if (window.XMLHttpRequest) {
		cin_file = new XMLHttpRequest();
		cin_file.onreadystatechange = function() {
			if (cin_file.readyState == 4 && cin_file.status == 200)
			{
				cin_n = cin_file.responseText.split("\n");
				while (cin_n.length - 1 > cin_n_point) {
					yahooCJ_e[cin_n_point] = cin_n[cin_n_point].split("\t")[0];
					yahooCJ_c[cin_n_point] = cin_n[cin_n_point].split("\t")[1];
					cin_n_point += 1;
				}
				document.querySelector(".crejp_status").innerHTML = cin_n_point + " line loaded.";
			}
		}
		cin_file.open("GET","/ext/ejpoot/yahooCJ.txt",true);
		cin_file.send();
	}
	return;
}
// match_e
function match_e(search_cc) {
	var search_point = 0;
	var single_letter = "";
	var cc_carriage = "";
	var letter_point = 0;
	// clear e_storage
	e_storage = [];
	while (yahooCJ_c.length > search_point) {
		if (yahooCJ_c[search_point] == search_cc) {
			cc_carriage = "";
			letter_point = 0;
			while (yahooCJ_e[search_point].length > letter_point) {
				single_letter = yahooCJ_e[search_point].substr(letter_point,1);
				if ("x" == single_letter) {
					single_letter = "toog";
				}
				else if ("z" == single_letter) {
					single_letter = "hjwg";
				}
				cc_carriage += yahooCJ_c[match_cin(single_letter)];
				letter_point += 1;
			}
			while (5 > letter_point) {
				cc_carriage += yahooCJ_c[match_cin("zxaa")];
				letter_point += 1;
			}
			e_storage.push(cc_carriage);
		}
		search_point += 1;
	}
	return;
}
// match_cin
function match_cin(search_code) {
	var start_point = 0;
	var end_point = yahooCJ_e.length;
	var search_point = Math.floor((start_point + end_point) / 2);

	if ("" == search_code) {
		return yahooCJ_e.length;
	}
	while (search_point > start_point) {
		if (yahooCJ_e[search_point] > search_code) {
			end_point = search_point;
			search_point = Math.floor((start_point + end_point) / 2);
		}
		else if (yahooCJ_e[search_point] < search_code) {
			start_point = search_point;
			search_point = Math.floor((start_point + end_point) / 2);
		}
		else {
			while (yahooCJ_e[search_point] == yahooCJ_e[search_point - 1]) {
				search_point -= 1;
			}
			return search_point;
		}
	}
	if (0 == search_point) {
		return 0;
	}
	else {
		return yahooCJ_e.length;
	}
}
// make_ejpoot_data
function make_ejpoot_data() {
	var pretxt = document.getElementById("pretxt").value;
	var rst = [];
	for (var x = 0; x < pretxt.length; x++) {
		match_e(pretxt[x]);
		prE = (e_storage.length > 0 ? e_storage[0].replace(/[\s]/g, '') : "");
		rst.push({
			"c": pretxt[x],
			"e": prE
		});
	}
	document.getElementById("resulttxt").value = JSON.stringify(rst);
	// init ejpoot_root
	document.querySelector(".ejpoot_root").innerHTML = "";
	// input animate
	var new_textarea = document.createElement("textarea");
	new_textarea.style.display = "none";
	document.querySelector(".ejpoot_root").appendChild(new_textarea);
	document.querySelector(".ejpoot_root>textarea").value = JSON.stringify(rst);
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
}
