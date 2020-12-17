# ejsoon image

## Installation

Copy the extension to phpBB/ext/ejpoox/

Go to "ACP" > "Customise" > "Extensions" and enable the "ejsoon image" extension.

Add 3 bbcode in the ACP: imgid, svgid, svg.






bbcode:
```
[imgid]{NUMBER}[/imgid]
```

html:
```
<iframe class="image" style="display: none;" postid="{NUMBER}"></iframe>
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
