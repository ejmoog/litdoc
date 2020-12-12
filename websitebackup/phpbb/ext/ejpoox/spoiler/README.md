# phpbb spoiler

## Installation

Copy the extension to phpBB/ext/ejpoox/spoiler

Go to "ACP" > "Customise" > "Extensions" and enable the "phpbb spoiler" extension.

And then add the bbcode [spoiler]:

bbcode:
[spoiler={INTTEXT;defaultValue=Spoiler}]{TEXT}[/spoiler]

html:
```
<div style="padding-top:30px; position: relative;"><input type="button" value="{INTTEXT}" style="z-index:1111; height: 30px; position: absolute;font-size:20px; padding: 0px 3px; border-radius: 2px; top: 0;" onclick="nextSibling.style.height = nextSibling.style.height == '70px' ? 'auto' : '70px'; window.scrollTo({top: nextSibling.getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});" /><div style="margin-top: 3px; padding: 5px; border: 3px dotted #f92f2f; height: 70px; overflow: hidden;" class="ejsoon_sticky">{TEXT}</div></div>
```
help:
Spoiler: [spoiler]text[/spoiler], [spoiler=Title]text[/spoiler]

## License

[GNU General Public License v2](license.txt)