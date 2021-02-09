# ejsoon input animate

## Installation

Copy the extension to phpBB/ext/ejpoox/ejpoot

Go to "ACP" > "Customise" > "Extensions" and enable the "ejpoot" extension.

Add 3 bbcode by your hand:

html:
```
[a speed={NUMBER1;defaultValue=240} delay={NUMBER2;defaultValue=3600}]{TEXT}[/a]
```
bbcode:
```
<span speed={NUMBER1} delay={NUMBER2} class="ejpoot_root">{TEXT}</span>
```

html:
```
[ap]{TEXT}[/ap]
```
bbcode:
```
<span><textarea style="display: none;">{TEXT}</textarea></span>
```

html:
```
[ar]{TEXT;defaultValue=R}[/ar]
```
bbcode:
```
<button class="ejpoot_restart" type="button">{TEXT}</button>
```


## License

[GNU General Public License v2](license.txt)
