---
layout: article
title: Non-linear functions on px values in CSS
tags: ["CSS"]
permalink: /articles/non-linear-functions-on-px-values-in-css/
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

Arithmetic with unit values is quite restricted in CSS.
There are many mathematical functions available &ndash; like `sin()`, `cos()`, `pow()` and `sqrt()` &ndash; but almost all of them only support unitless values.
If you want to calculate something, e.g. to scale the height of an image based on the viewport width,
you are therefore restricted to linear relationships only:

<img src="{% link assets/img/posts/2024-02/graph-linear.svg %}" style="max-height: 200px; width: 100%;"> 

Although you can cheat a bit by creating piecewise-linear functions using `clamp()`/`min()`/`max()`.
This should work for most practical cases, and could probably be packaged into some nice SASS wrapper function,
but isn't really satisfying for me from a perfectionis standpoint.

<img src="{% link assets/img/posts/2024-02/graph-piecewise.svg %}" style="max-height: 200px; width: 100%;"> 

Well, turns out there is [one function][hypot-spec] that is not linear _**and**_ allows unit values: `hypot(x, y)`,
which calculates the result of `sqrt(x*x + y*y)`.
Using it, you can create limited non-linear-relationships, like this one:

<img src="{% link assets/img/posts/2024-02/graph-hypot.svg %}" style="max-height: 200px; width: 100%;"> 

The maximum curvature you can achieve using a single `hypot()` function is limited,
but can be overcome by nesting `hypot()` multiple times.

I haven't been able to find a practical, real-world application for using `hypot()` this way.
Though I have experimented quite a lot with it, and might write a more detailed article about it in the future.
