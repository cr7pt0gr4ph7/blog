---
layout: article
title: Applying container principles to the desktop
tags: ["Linux","Bluefin"]
permalink: /articles/applying-container-principles-to-the-desktop/
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-03/pexels-pixabay-236482.jpg
    alignment: 100%
---

I've recently migrated my personal PC from Windows to Linux, mainly because I did not see any value
in purchasing yet another Windows version, when I mainly use it to run cross-platform applications
and a web browser.

After reading about it somewhere else, I decided to base it on the [Bluefin] distribution, which is itself based on [Fedora Silverblue].
The main idea of both is the same, and boils down to bringing the "Container" paradigms from the cloud world onto the desktop:

[Bluefin]: https://projectbluefin.io/
[Fedora Silverblue]: https://fedoraproject.org/atomic-desktops/silverblue/

In contrast to the usual approach of patching and modifying your local system setup during updates &ndash;
which more often than not introduces a certain amount of non-determinism and associated problems &ndash;
you always perform the system install from scratch in a pristine, isolated environment, snapshot the result,
and then use the resulting immutable images as the basis for your local system.

> This works great for the same reason that IT guys always tell you to "reboot the system and try again" (and who hasn't heard that):
>
> Computers are really great at doing the same thing over and over again, given a known starting point (e.g. the powered off state)
> &ndash; but problems begin to arise when the starting point turns out to be something the original programmer hadn't anticipated.
> And, given a system that has been running long enough, or has seen any amount of interaction with external interaction or users,
> there **_will_** absolutely be stuff that no one could have anticipated [^1].
>
> _(Initial Install) &rarr; Install A &rarr; Install B &rarr; Partially uninstall A &rarr; Install of C that was aborted midway through &rarr; Install of C &rarr; (Probably B and C installed?)_
>
> By instead defining your current system state through a series of clean, well-defined steps
> from a clean, well-defined starting point, you can avoid this problem entirely.
>
> _(Initial Install) &rarr; Install A &rarr; (A installed)_
> <br>
> _(Initial Install) &rarr; Install A &rarr; Install B &rarr; (A and B installed)_
> <br>
> _(Initial Install) &rarr; ~~Install A &rarr;~~ Install B &rarr; (B installed)_
> <br>
> _(Initial Install) &rarr; Install B &rarr; Install C &rarr; (B and C installed)_
>
> As another benefit, anyone else in your department can use the same base image as you &ndash; which helps to minimize configuration drift within your team.

[Bluefin] builds on [Fedora Silverblue] by pre-configuring sensible defaults for everything, and giving you a ready-to-use desktop from the start.
Bluefin DX does the same, but also preinstalls and preconfigures a number of developer tools, like Visual Studio Code.
My experience with it so far has been very pleasant &ndash; all in all, the system just works.

It also matches the mental model of how I deal with my personal computers:
I don't really care what specific kernel modules are installed, which patch version of a certain component is installed, and so on
&ndash; I just want the base system to run smoothly, and not get in the way of my actual work.
Instead of trying to fix something that is broken, I just replace it with a known-good copy and continue on my merry way.
(Note: This philosophy only applies to software &ndash; I'm all for "Repair instead of Rebuy" when it comes to hardware).

Like with Docker in the container world, it's also quite easy to create your own base images
if the prebuilt ones do not satisfy all of your requirements
&ndash; which will be covered in a [future article].

[^1]: Who would have thought that the driver of the USB soundcard you plugged in two years ago would cause problems
      when you switched to a newer display that also has integrated speakers? Yeah, me neither.

[future article]: {% link _posts/2024-03-20-creating-your-own-bluefin-distribution.md %}
