# ejsoon ij font extension

## Installation

Copy the extension to phpBB/ext/ejpoox/ij

Go to "ACP" > "Customise" > "Extensions" and enable the "ejsoon ij" extension.

There are three BBCode should be add by hands: ij, ijp, ijr.

ij:
bbcode:
```
[ij]{TEXT}[/ij]
```
html:
```
<span class="font_ij">{TEXT}</span>
```
tips:
```
ij倉頡小字型
```

ijp:
bbcode:
```
[ijp]{TEXT}[/ijp]
```
html:
```
<span class="ijp_outer"><div class="ijp_main"><span class="font_ij">{TEXT}</span></div><div class="ijp_bottom"> {TEXT} </div></span>
```
tips:
```
ij plus
```

ijr:
bbcode:
```
[ijr]{TEXT}[/ijr]
```
html:
```
<span class="ijp_outer"><div class="ijr_main"><span class="font_ij">{TEXT}</span></div><div class="ijr_bottom"> {TEXT} </div></span>
```
tips:
```
ij font has a region
```


## License

[GNU General Public License v2](license.txt)
