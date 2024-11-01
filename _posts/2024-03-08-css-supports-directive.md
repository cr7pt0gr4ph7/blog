---
layout: article
title: "Discoveries & Random Stuff: Utilizing @supports in CSS"
permalink: /articles/css-supports-directive/
tags: ["Discoveries", "Random Stuff", "CSS"]
redirect_from:
  - /articles/css-supports-directive
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

The pace of innovation has accelerated quite a lot since I started writing HTML and CSS a few years ago
(see as [mentioned before](./2024-01-19-discoveries-of-the-week.md)).

The [`@supports` directive][mdn-supports] is really useful if you want to take full advantage
of a new feature if supported, while providing a graceful fallback on other browsers:

```css
.first-word-of-paragraph {
  font-weight: bold;
}

@supports (initial-letter: 2) {
  .first-word-of-paragraph {
    font-weight: normal;
    initial-letter: 2;
  }
}
```

[mdn-supports]: https://developer.mozilla.org/en-US/docs/Web/CSS/@supports
