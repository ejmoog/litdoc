# ejsoon imageid

## Installation

Copy the extension to phpBB/ext/ejpoox/

Go to "ACP" > "Customise" > "Extensions" and enable the "ejsoon imageid" extension.

Add the imgid bbcode in the ACP:
bbcode:
```
[imgid]{NUMBER}[/imgid]
```

html:
```
<iframe class="imageid" style="display: none;" postid="{NUMBER}"></iframe>
```

tips:
```
get the post id, and write into imgid.
```


Also add the svgid bbcode in the ACP:
bbcode:
```
[svgid]{NUMBER}[/svgid]
```

html:
```
<iframe class="svgid" style="display: none;" postid="{NUMBER}"></iframe>
```

tips:
```
get the post id, and write into svgid.
```


## License

[GNU General Public License v2](license.txt)
