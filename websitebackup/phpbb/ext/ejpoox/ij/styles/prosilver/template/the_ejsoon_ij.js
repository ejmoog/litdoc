/* font ij */
var span_ij = document.getElementsByClassName("font_ij");
var max_ij = span_ij.length;
var oij = "";
var cij = "";
var i_arr = [
	'日-', '橫日',
	'月-', '斜月', '斜月-', '小爪', '覆匡', '覆匡-', '蒙蔽',
	'對點', '八分', '八分-', '四中',
	'寸架', '五中',
	'側水', '底水', '橫水', '又形',
	'底火', '苗火', '絲垂', '小形', '小形-', '不下',
	'士形',

	'竹-', '斜撇', '連脈',
	'點形', '高屋', '私右',
	'深屋',
	'叉形', '尹有', '倚箸',
	'豎形', '縱撇', '側衣', '執事',
	'橫提', '崖屋', '頁首', '工形',
	'豎鉤', '橫鉤', '橫折', '橫折-', '乙形', '乙形-', '飛虱', '夕架', '象頭', '象頭-',

	'人-', '側人', '矢尖', '丘人', '入形', '長捺', '象尾', '象尾-',
	'側心', '小心', '匕形', '匕形-', '七形', '七形-', '弋身', '弋身-', '包囊', '遂心',
	'側手', '奉下', '看中', '降下',
	'口-',

	'外匡', '己上', '刀身', '彎鉤', '長上',
	'草頭', '並十', '羊頭', '並立', '共上', '聯下', '兼上',
	'仰匡', '仰鉤', '初生-', '初生',
	'曲折', '豎折', '豎折-', '撇折', '豎提', '斜鉤', '衣襬',
	'外圍', '母圍',
	'貞占', '齊首', '重點', '行止',

	'重卜', '幾省', '姊右', '淵右', '漢右', '匃廓', '瓦罩',
	];
var j_arr = [
	'⺜', '┌',
	'┍', '┎', '┏', '⺤', '冂', 'ㄇ', '冖',
	'丷', '八', '┵', '┐',
	'┑', '┒',
	'氵', '氺', '┓', '又',
	'灬', '┕', '┖', '小', '└', '┶',
	'士',

	'⺮', '㇒', '⺁',
	'丶', '广', '厶',
	'宀',
	'乂', '┗', '疒',
	'丨', '丿', '衤', '肀',
	'㇀', '厂', '丆', '工',
	'亅', '乛', '㇕', '┘', '乙', '㇍', '⺄', '┙', '⺈', '┚',

	'┛', '亻', '├', '┝', '入', '㇏', '┞', '┟',
	'忄', '⺗', '匕', '┣', '七', '┠', '┡', '┢', '勹', '┤',
	'扌', '┥', '┦', '┧',
	'〇',

	'匚', '┨', '㇆', '㇁', '┩',
	'艹', '卄', '⻀', '┫', '龷', '丱', '䒑',
	'凵', '乚', '屮', '⼬',
	'ㄑ', '㇗', '┴', 'ㄥ', '㇙', '㇂', '┬',
	'囗', '┭',
	'⺊', '亠', '⺀', '辶',

	'┪', '┮', '┯', '┰', '┱', '┲', '┳',
	];
for (var inum = 0; inum < max_ij; inum++) {
	oij = span_ij[inum].innerHTML;
	cij = i_arr.indexOf(oij) > -1 ? j_arr[i_arr.indexOf(oij)] : oij;
	span_ij[inum].innerHTML = cij;
}
// ijr click
var ijr_main = document.getElementsByClassName("ijr_main");
for (var ijx = 0; ijx < ijr_main.length; ijx++) {
	ijr_main[ijx].onclick = function() {
		var ijr_btm = this.parentNode.querySelector(".ijr_bottom");
		ijr_btm.style.height = "20px";
		ijr_btm.style.borderTop = "1px solid black";
		setTimeout(function(){ 
			ijr_btm.style.height = "0";
		}, 5000);
		setTimeout(function(){ 
			ijr_btm.style.borderTop = "0px solid black";
		}, 5500);
	}
}
