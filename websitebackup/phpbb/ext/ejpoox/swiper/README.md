# ejsoon swiper

## Installation

Copy the extension to phpBB/ext/ejpoox/swiper

Go to "ACP" > "Customise" > "Extensions" and enable the "ejsoon swiper" extension.

And then add the bbcode [swiper], [ss], [st]:

bbcode:
```
[swiper]{TEXT}[/swiper]
```

html:
```
<div class="swiper-container"><!-- Additional required wrapper -->
<div class="swiper-wrapper"><!-- Slides -->
{TEXT}
</div>
<!-- Add Pagination -->
<div class="swiper-pagination-ejsoon"></div>
<!-- If we need navigation buttons -->
<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>
</div>
```

tips:
```
swiper-container
```


bbcode:
```
[ss]{TEXT}[/ss]
```

html:
```
<div class="swiper-slide">{TEXT}</div>
```

tips:
```
swiper-slide
```


bbcode:
```
[st]{TEXT}[/st]
```

html:
```
<div style="position: absolute; bottom: 0; background-color: rgba(0,0,0,0.5); color: white; padding: 12px; width: 100%;">{TEXT}</div>
```

tips:
```
swiper text below
```

## License

[GNU General Public License v2](license.txt)


