# ejsoon bbcode html

## Installation

Copy the extension to phpBB/ext/ejpoox/

Go to "ACP" > "Customise" > "Extensions" and enable the "ejsoon svg" extension.

Add the svg bbcode in the ACP:
bbcode:
```
[svg width={TEXT1;defaultValue=100%} height={TEXT2;defaultValue=100%} viewBox={TEXT3;defaultValue=none}]{TEXT4}[/svg]
```

html:
```
<svg width={TEXT1} height={TEXT2} viewBox={TEXT3}  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">{TEXT4}</svg>
```

tips:
```
convert svg to bbcode at blog.ejsoon.win/svg before parsing it.
```

That's all!

If you want the svg to bbcode html code and domine yourself, see this:
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>convert svg to bbcode</title>
</head>
<body>
<style>
textarea {
	width: 90%;
	background: pink;
}
	</style>
	You can edit a svg image at <a href="https://editor.method.ac/" target="_blank">editor.method.ac</a> or <a href="https://svg-edit.github.io/svgedit/src/editor/svg-editor.html" target="_blank">svg-editor</a>, Inkscape is also a good choice, then convert the source here. <br>
	<span>svg:</span>
	<br>
	<textarea id="svgxml" cols="30" rows="10"></textarea>
	<br>
	<span>bbcode:</span>
	<br>
	<textarea id="svgbbcode" cols="30" rows="10"></textarea>
	<br>
	<button type="button" onclick="convbtn()">convert!</button>
	<script>
		function convbtn() {
			// handle textarea
			var svgxmlhd = document.getElementById('svgxml');
			var svgbbcodehd = document.getElementById('svgbbcode');
			convsvg2bbcode(svgxmlhd, svgbbcodehd);
		}
		function convsvg2bbcode(svgxmlhd, svgbbcodehd) {
			// svg xml
			var svgxml = svgxmlhd.value;
			// remove line return
			svgxml = svgxml.replace(new RegExp('\r?\n','g'), '');

			// convert <svg> tag
			svgxml = svgxml.replace(/.*<svg .+?>/, function (match, p1, offset, s) {
				var svg_width = '"100%"', svg_height = '"100%"', svg_viewBox = "none";
				match.replace(/ width=(".+?")/g, function (match, p1, offset, s) {
					svg_width = p1;
				})
				match.replace(/ height=(".+?")/g, function (match, p1, offset, s) {
					svg_height = p1;
				})
				match.replace(/ viewBox=(".+?")/g, function (match, p1, offset, s) {
					svg_viewBox = p1;
				})
				return '[svg width=' + svg_width + ' height=' + svg_height + ' viewBox=' + svg_viewBox + '>';
			})
			// remove blank space
			svgxml = svgxml.replace(/>[\s]*</g, '><');
			// replace all gl or tl
			svgxml = svgxml.replace(/</g, '[');
			svgxml = svgxml.replace(/>/g, ']');

			// remove links
			svgxml = svgxml.replace(/"http.*?"/g, '""');
			svgxml = svgxml.replace(/"www.*?"/g, '""');
			svgbbcodehd.value = svgxml;
		}
	</script>
</body>
</html>
```

## License

[GNU General Public License v2](license.txt)
