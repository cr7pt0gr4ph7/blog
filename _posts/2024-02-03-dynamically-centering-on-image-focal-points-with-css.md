---
layout: article
title: Dynamically centering an image via CSS
subtitle: How to keep the focal point of a background image visible on different screen sizes
article_header:
  type: overlay
  theme: dark
  background_color: "#034959"
  background_image:
    src: assets/img/posts/2024-02/pexels-pixabay-235990.jpg
    alignment: 100%
    blur: 10px
tags: ["CSS", "In-depth"]
---

Well, imagine this: You have website with a big background image, and you want it to work well across all screen sizes.
That is, it should fill the whole viewport, no matter the screen size or aspect ratio.
You also want to do this using CSS only.

In this post, we will first cover how to do this for `background-image`, and at the end, I will extend the solution to `<img>` tags.

**TLDR &ndash; I just want the solution**: Thats great! You can [find the solution here](#final-solution).

 If you're interested in the details, read on!

# Using `background-size: cover` to auto-size the image

Our first attempt might be using just `background-size: cover` to make the image always fill its container:

{: .show-code-block-title }
```html
<div class="container">
</div>
```

{: data-sample-id="sample-1 sample-2 sample-3" }
```css
.container {
    background-image: url('{% link assets/img/posts/2024-02/pexels-pixabay-235990.jpg %}');
    background-size: cover;
    background-repeat: no-repeat;
}
```

The result will look something like below. Note the following:
- **Good:** The image always fills the whole container (due to `background-size: cover`)
- **Bad:** We basically zoom in on the top left corner of the image.
  This lets the main motif of the image disappear in some cases, which is arguably not ideal.

<div class="sample-preview" data-sample-comment="Try resizing the image!" data-sample-id="sample-1">
</div>

<details class="boilerplate-code">
<summary>Show additional boilerplate code</summary>
<div class="boilerplate-content" markdown="block">

{: .subtle-text }
The following code is used throughout all examples to to allow playing around with the size of the image container.

{: data-sample-id="sample-1 sample-2 sample-3 sample-4 sample-5" }
```css
.container {
    width: 100%;
    height: 100%;
}

.resizeable {
    overflow: hidden;
    resize: both;
    border: 1px solid black;
}

.natural-size {
    --image-aspect-ratio: calc(3848 / 2565);
    --initial-width: 200px;
    --initial-height: calc(var(--initial-width) / var(--image-aspect-ratio));

    width: var(--initial-width);
    height: var(--initial-height);
}

.half-width {
    width: calc(0.5 * var(--initial-width));
}

.half-height {
    height: calc(0.5 * var(--initial-height));
}

/* Arrange the samples in a row instead of in a column */

body {
    display: flex;
    flex-direction: row;
}

body > div {
    margin-right: 1rem;
    flex-shrink: 0;
}

/* Add a marker for the point where we zoom in on */

.show-focal-point {
    position: relative;
}

.show-focal-point::after {
    --focal-point-size: 10px;

    position: absolute;
    top: calc(var(--focal-point-y) - (var(--focal-point-size) / 2));
    left: calc(var(--focal-point-x) - (var(--focal-point-size) / 2));
    width: calc(var(--focal-point-size) + var(--focal-point-x) - var(--focal-point-x)); /* Hack to set `width: unset`` when --focal-point-x is not defined */

    content: "";
    background-color: red;
    aspect-ratio: 1/1;
    border-radius: 100%;
    z-index: 1;
}
```

{: data-sample-id="sample-1 sample-2 sample-3 sample-4" }
```html
<div class="resizeable natural-size">
    <div class="container">
    </div>
</div>
<div class="natural-size">
    <div class="container show-focal-point">
    </div>
</div>
<div class="natural-size half-width">
    <div class="container">
    </div>
</div>
<div class="natural-size half-height">
    <div class="container">
    </div>
</div>
```
</div></details>

## Centering with `background-position`

We can easily fix the latter problem by using `background-position: 50% 50%` to zoom in
on the center of the image instead of the top left corner:

{: .show-code-block-title }
```css
.container { /* ... */
    background-position: 50% 50%;
}
```

As a bonus, here is the same solution using CSS variables:

{: data-sample-id="sample-2" }
```css
.container { /* ... */
    --focal-point-x: 50%;
    --focal-point-y: 50%;
    background-position: var(--focal-point-x) var(--focal-point-y);
}
```

<div class="sample-preview" data-sample-comment="Try resizing the image!" data-sample-id="sample-2">
</div>

## Non-centered focal points
### Nested heading
### Nested heading

Okay, that works! But now you have an image where that focal point isn't in the center?
Well, just set `background-position` to the center, and call it a day:

{: data-sample-id="sample-3" }
```css
.container {
    --focal-point-x: 75%;
    --focal-point-y: 23%;
    background-position: var(--focal-point-x) var(--focal-point-y);
}
```

<div class="sample-preview" data-sample-comment="Try resizing the image!" data-sample-id="sample-3">
</div>

# Final solution&hellip;

## &hellip;for background images using `background-image`

Here is the full solution for `background-image` so far:

{: data-sample-id="sample-4" }
```css
.container {
    background-image: url('{% link assets/img/posts/2024-02/pexels-pixabay-235990.jpg %}');
    background-size: cover;
    background-repeat: no-repeat;

    --focal-point-x: 75%;
    --focal-point-y: 23%;
    background-position: var(--focal-point-x) var(--focal-point-y);
}
```

{: .show-code-block-title }
```html
<div class="container">
</div>
```

<div class="sample-preview" data-sample-comment="Try resizing the image!" data-sample-id="sample-4">
</div>

## Bonus: &hellip;for `<img>` tags

We can use basically the same solution for `<img>` tags, by using `object-fit`/`object-position`
instead of `background-size`/`background-position`:

{: data-sample-id="sample-5" }
```css
img.container {
    --focal-point-x: 75%;
    --focal-point-y: 23%;
    object-position: var(--focal-point-x) var(--focal-point-y); /* object-position is analogous to background-position */
    object-fit: cover; /* object-fit is analogous to background-size */
}
```

{: .show-code-block-title }
```html
<img class="container" src="{% link assets/img/posts/2024-02/pexels-pixabay-235990.jpg %}">
```

{: data-sample-id="sample-5" .hidden }
```html
<div class="resizeable natural-size">
    <img class="container" src="{% link assets/img/posts/2024-02/pexels-pixabay-235990.jpg %}">
</div>
<div class="natural-size">
    <img class="container" src="{% link assets/img/posts/2024-02/pexels-pixabay-235990.jpg %}">
</div>
<div class="natural-size half-width">
    <img class="container" src="{% link assets/img/posts/2024-02/pexels-pixabay-235990.jpg %}">
</div>
<div class="natural-size half-height">
    <img class="container" src="{% link assets/img/posts/2024-02/pexels-pixabay-235990.jpg %}">
</div>
```

<div class="sample-preview" data-sample-comment="Try resizing the image!" data-sample-id="sample-5">
</div>

{% comment %}
### Next time

The next part will cover how to move non-centered focal points towards the center when zooming in to the image.

See you next time!
{% endcomment %}
