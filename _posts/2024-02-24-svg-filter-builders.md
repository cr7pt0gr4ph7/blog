---
layout: article
title: "Discoveries & Random Stuff: SVG Filter Builders"
tags: ["Discoveries & Random Stuff", "SVG"]
permalink: /articles/svg-filter-builders/
redirect_from:
  - /articles/svg-filter-builders
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

SVG filters are a very nice thing if you want to add some dynamic graphic effects to your website.
Coding them purely using XML can be a bit cumbersome, though, and the UI of e.g. Inkscape isn't that great, either.
But fear not, the following great web tools can be used for this task instead:

## [svgfilters.client.io](https://svgfilters.client.io/)
This is a drag-and-drop-based generic SVG filter builder that displays the filter structure as a a graph.#

**Pros:** It has a very nice UI that clearly visualizes the data flow of a filter.

**Cons:** &hellip;but some SVG filter types are not (yet?) supported, namely`feComponentTransfer`, `feBlend`, `feDropShadow`.

## [yoksel.github.io](https://yoksel.github.io/svg-filters/#/)
This is another drag-and-drop SVG filter builder, but without the graph visualization.

**Cons:** The UI is a bit rudimentary (when compared to the previous, very polished entry).

**Pros:** &hellip;but it supports all SVG filter types.

## [justcode.today](https://justcode.today/filters/)
This last entry is mainly intended for creating CSS- and SVG-based filters for image processing,
and contains a nice live visualization.

**Pros:** Easy slider-based configuration.

**Cons:** Not a generic filter builder (but does not try to be one).
