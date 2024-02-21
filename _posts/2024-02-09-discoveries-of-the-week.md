---
layout: article
title: Discoveries of the Week &ndash; 2024/03
tags: ["Discoveries of the Week", "Web Development", "Web Design", "Privacy"]
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

## #1 &mdash; Favicons in 2024

It is a suprisingly complex topic to supply all the correct favicons for the [diverse range][screen-stats] of [devices][device-stats] and [browsers][browser-stats] that are in use today.
It started with just `favicon.ico` in 32x32 (or 16x16), but now you also need high-resolution icons for iPhone and iPad
even larger icons for Progressive Web Application (PWA) splash screens &mdash;
and Google for example [requires icons that are a multiple of 48x48px square][google-ico-guidelines]...
it's quite a mess for something that is just supposed to be a little icon, albeit one of the main brandings of your website. 

Well, worry no more! This **[blog post][six-favicon-files]** contains a good guide on which files are still required today.

[device-stats]: https://gs.statcounter.com/ "Desktop vs Mobile vs Tablet Market Share Worldwide | Statcounter Global Stats"
[browser-stats]: https://gs.statcounter.com/browser-market-share "Browser Market Share Worldwide | Statcounter Global Stats"
[screen-stats]: https://gs.statcounter.com/screen-resolution-stats "Screen Resolution Stats Worldwide | Statcounter Global Stats"
[google-ico-guidelines]: https://developers.google.com/search/docs/appearance/favicon-in-search?hl=en#guidelines "Define Website Favicon for Search Results | Google Search Central | Documentation | Google for Developers"
[six-favicon-files]: https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs "How to Favicon in 2024: Six files that fit most needs—Martian Chronicles, Evil Martians’ team blog"

## #2 &mdash; Browser fingerprinting

Did you know that one does not need cookies, or any locally stored state, to identify your specific browser/computer in a globally unique way?
Browser fingerprinting is scary.

If you also want to go down this rabbit hole, and see how unique your browser's fingerprint is:

* https://amiunique.org/
* https://coveryourtracks.eff.org/

You can even distinguish between otherwise identical devices by basically [measuring manufacturing variations in the GPU via the rendering output][gpu-fingerprinting];
these hardware-based fingerprinting techniques all require the ability to locally execute JavaScript or code, though, so turning JS off is an effective prevention measure.

[gpu-fingerprinting]: https://blog.amiunique.org/an-explicative-article-on-drawnapart-a-gpu-fingerprinting-technique/
