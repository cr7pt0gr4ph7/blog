---
layout: article
title: "Discoveries & Random Stuff: Browser Fingerprinting"
tags: ["Discoveries & Random Stuff", "Privacy"]
permalink: /articles/browser-fingerprinting-is-scary/
redirect_from:
  - /articles/browser-fingerprinting-is-scary
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

Did you know that one does not need cookies, or any locally stored state, to identify your specific browser/computer in a globally unique way?
Browser fingerprinting is scary.

If you also want to go down this rabbit hole, and see how unique your browser's fingerprint is:

* https://amiunique.org/
* https://coveryourtracks.eff.org/

You can even distinguish between otherwise identical devices by basically [measuring manufacturing variations in the GPU via the rendering output][gpu-fingerprinting];
these hardware-based fingerprinting techniques all require the ability to locally execute JavaScript or code, though, so turning JS off is an effective prevention measure.

[gpu-fingerprinting]: https://blog.amiunique.org/an-explicative-article-on-drawnapart-a-gpu-fingerprinting-technique/
