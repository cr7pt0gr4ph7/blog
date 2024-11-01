---
layout: article
title: About Flatpaks
tags: ["Linux","Bluefin","Flatpak"]
permalink: /articles/about-flatpaks/
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-03/pexels-pixabay-236482.jpg
    alignment: 100%
---

What is one thing that everybody loves about smartphones?
The app store (or however your vendor's version of it is called).

It is really easy to install and uninstall additional apps, because they are:
- **Bundled** with their binary dependencies and ready to run

- **Isolated** from each other (so no conflicting binary dependencies,
  no accidental overwrites of shared config files or databases).

- **Sandboxed** from each other and the system, so (leaving aside intentionally
  malicious applications which almost always find a way) you even sloppily
  programmed applications won't wreak too much havoc e.g. on your filesystem,
  except if you allow them to.

- Provided with a **reproducible environment** (so e.g. no binary libraries left
  over from an incomplete uninstallation of another app that get loaded accidentally)
  that abstracts away differences between different vendors.

Bundling the binary dependencies trades a possible increase in disk space usage
against a large increase in [ease of use, reproducibility, easier updates and more][flatpak-introduction].

# But what if my favorite application isn't available as a Flatpak?

In an ideal world, all applications that you need would be available as a Flatpak.
Unfortunately, though most applications with a large user base have a Flatpak already available,
this is not the case for some more niché applications.

So what to do in that case?

1. **Ask the original app developer/maintainer to provide a Flatpak**

   This is the way [preferred by Flatpak], because it removes complexity.

2. **Build the Flatpak yourself**

   This is what we'll be doing in the next installments of the series!

[flatpak-introduction]: https://docs.flatpak.org/en/latest/introduction.html
[preferred by Flatpak]: https://docs.flathub.org/docs/for-app-authors/submission#theres-an-app-that-id-like-to-see-on-flathub-but-im-not-the-developer
