---
layout: article
title: "Discoveries & Random Stuff: Github Pages and custom Ruby gems"
tags: ["Discoveries of the Week", "Jekyll"]
permalink: /articles/github-pages-with-custom-ruby-gems/
redirect_from:
  - /articles/github-pages-with-custom-ruby-gems
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

While working on this blog, and scratching my head about the build errors
related to using a custom theme, this article helped me a lot:

> [How to build and deploy GitHub Pages with custom gems](https://www.fatlemon.co.uk/2023/12/custom-gems-with-github-pages/) by [Andrew Freemantle](https://www.fatlemon.co.uk/)

Just note that &ndash; contrary to the linked article &ndash; replacing the `ruby-version: 3.1`
is neither necessary nor recommended anymore, because [Jekyll](https://jekyllrb.com/) supports Ruby 3.0+ now,
and Bundler even requires Ruby 3.0+.
