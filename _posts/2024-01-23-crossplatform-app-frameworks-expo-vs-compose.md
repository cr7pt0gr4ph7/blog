---
layout: article
title: "Choosing a cross-platform framework for mobile apps: Expo vs. Compose"
tags: ["Mobile", "Web Development", "Expo", "React Native", "Compose", "Kotlin", "Android", "iOS"]
article_header:
    type: overlay
    theme: dark
    background_color: "#c6a295"
    background_image:
        src: assets/img/posts/2024-01/pexels-jessica-lewis-thepaintedsquare-583847.jpg
        alignment: 26%
---

While toying around with writing a custom note-taking, CRM-like application for my personal use[^1],
I was surveying the current landscape of cross-platform frameworks for mobile app plus web development.
This article is not gonna be a full survey, but my observations about the two top contenders.

[^1]: Although in the end, I went for an [already existing application][obsidian] instead, that fulfills 99% of my requirements, and is easily extensible via plugins. I'll probably write about my specific plugin setup some time in the future.

### The requirements

My requirements for an ideal solution are as follows:

- **Platforms:**
  - Should be able to run on:
    - Android
    - iOS
    - Web Browsers
  - Should allow me to share as much code between platforms as possible;
    the ideal would be no custom platform-specific code at all.

- **User Interface:**
  - Should provide premade UI components for most common use cases.
  - Should look pretty even without custom styling, but allow a lot of customization when desired.
  - The UI should feel _fast_ and snappy when using it, even on a mobile phone.
  - Should feel like a native application on mobile, and like a full-on web app in browsers.

- **Developer Experience:**
  - Provide a nice development experience with good IDE support and error checking.
  - IDE is ideally also available in the cloud, without locally installed tools.
  - Should allow very quick iteration times between coding and testing it on a phone.

- **Programming Language:**
  - This may be my specific point of view, but I don't care about the specific programming
    language that I have to use; if the framework is the right tool for the job, it'll pay off
    learning something new in the long term.
  - Static type checking is a bonus if it helps me catch errors early, and thus helps me develop faster.
  - A good and mature ecosystem of open source packages readily available for use is a big bonus.

### The first candidate: <img src="{% link assets/img/posts/2024-01/compose-multiplatform-icon.svg %}" height="25"> Jetpack Compose + <img src="{% link assets/img/posts/2024-01/kotlin-icon.svg %}" height="20"> Kotlin Multiplatform

I originally planned on using [Jetpack Compose][jetpack-compose] / [Kotlin Multiplatform][kotlin-multiplatform],
but not all Jetpack libraries are [currently available for Multiplatform][jetpack-multiplatform-availability] use,
though the set of available libraries is continuously being expanded.
In addition, I would like the App to be available on the web too,
which is in theory possible using [compose-web][compose-web], but the latter is experimental.

I have played around with this framework for another app idea in the past, and I think it's architecture and design are quite good &mdash;
it's main problem is actually the existing ecosystem, which was, in most cases, originally written for Android,
and has not always been ported to Kotlin Multiplatform (yet). This made it annoying to actually find libraries that I can use in my scenario.

[jetpack-compose]: https://developer.android.com/jetpack/compose
[kotlin-multiplatform]: https://kotlinlang.org/docs/multiplatform.html
[jetpack-multiplatform-availability]: https://android-developers.googleblog.com/2023/04/whats-new-in-jetpack-multiplatform.html
[compose-web]: https://www.jetbrains.com/lp/compose-multiplatform/
[obsidian]: https://obsidian.md/

#### The Rundown

- **Platforms:**
  - **Available Platforms:** ✔️ Android, ✔️ iOS, (✅) Web (Available but experimental)
  - **Code Sharing:** Possible, but a bit arduous. If you're lucky, there is already an abstraction layer for what you need,
    if not, you'll have to write it yourself, and split the corresponding code across multiple different projects.

    There also does not seem to be a full-stack solution for multiplatform application yet,
    and because the quasi-standard Jetpack libraries for Android are often deeply intertwined with the Android SDK,
    you have to mix-and-match different, lesser known libraries, and manually write integrations between them.

- **User Interface:**
  - **Premade UI components** ✔️ (But good luck if your favorite control has not been ported to multiplatform yet)
  - **Should feel native on mobile & on the Web** ✔️

- **Developer Experience:**
  - **IDE Support** ✔️ (using Android Studio by JetBrains, although there is not yet
  - **UI Preview in the IDE** ✖️ (Has not been adapted to Multiplatform projects yet)
  - **Quick Iterations** ✖️ (You have to wait for the build to finish, the APK to upload to your phone and install&hell; not unusually slow but definitely not _instant_)

- **Programming Language:**
  - **Language** ✔️ Kotlin is a nice programming language with good documentation.
  - **Static type checking** ✔️
  - **Ecosystem** Both yes _and_ no? The Kotlin ecosystem is split between Android-only libraries and multiplatform libraries,
    which makes looking for usable libraries annoying. Multiplatform compatibility must be chosen explicitly by library authors, instead of being the default.
    So there are multiplatform libraries, but they aren't as numerous as the platform-specific ones.

### The contender: <img src="{% link assets/img/posts/2024-01/expo-icon.svg %}" height="20"> Expo + <img src="{% link assets/img/posts/2024-01/react-icon.svg %}" height="20"> React Native

While setting up [React][react] for another project, I stumbled upon the [Expo framework][expo],
which is a cross-platform (Android, iOS, Web) [React Native][react-native] framework for apps.

Which instantly sold me was their development process, which is optimized for really quick iterations.
You can write your apps using a [web IDE][expo-snack-sample], and using [a companion app][expo-go],
you can immediately view what you have written on your actual smartphone, no build ceremonies necessary.
_It just works._
You also have access to the big and mature ecosystem of packages on [NPM][npm], which is a big bonus.

All in all, this makes it a real pleasure to work with; my only major complaint is that the web implementation does not provide
visual feedback on hover for most out-of-the-box controls, which would be important for for any real-world web UIs.

#### The Rundown

- **Platforms:**
  - **Available Platforms:** ✔️ Android, ✔️ iOS, ✔️ Web
  - **Code Sharing:** ✔️ Code is multiplatform by default, but you can easily write 

- **User Interface:**
  - **Premade UI components** ✔️
  - **Should feel native on mobile & on the Web** ✔️

- **Developer Experience:**
  - **IDE Support** ✔️ because it's also "just" a React framework, so everything that works for React also works here.
  - **UI Preview in the IDE** ✔️ (at least on the [Expo Snack][expo-snack] platform -- although instead of a preview, it's your actual application!)
  - **Quick Iterations** ✔️ using the [Expo Snack][expo-snack] platform, or locally [using the same mechanism][expo-hosting], just with a different server URL.

- **Programming Language:**
  - **Language** ✔️ Both JavaScript and TypeScript are good and mature languages now.
  - **Static type checking** ✔️ using TypeScript, which is mature and well-integrated.
  - **Ecosystem** ✔️ The JavaScript ecosystem seems to be much more used to supporting different environments (browser, serverside)
    and runtimes (NodeJS, Deno, ...), and does not seem to be fragmented between different base frameworks as much as Kotlin[^2].
    It also seems to place a much greater emphasis on portability, which is considered the default instead of the exception.

[^2]: To illustrate this point: If you have a JavaScript library dealing with lists, it will most likely just use the standard [Array][mdn-array] object. In Kotlin, you have to ask yourself which collection base libraries it uses, and if that base library is already available for your target platform, or if you have to rewite your dependency or try to recompile the collection base library yourself.

[react]: https://react.dev/learn/start-a-new-react-project#expo
[expo]: https://docs.expo.dev/
[expo-go]: https://expo.dev/client
[expo-snack]: https://snack.expo.dev/
[expo-snack-sample]: https://snack.expo.dev/@cr7pt0gr4ph7/react-expo-with-drawer-navigation
[expo-hosting]: https://docs.expo.dev/more/expo-cli/#develop
[expo-tutorial]: https://docs.expo.dev/tutorial/introduction/
[expo-samples]: https://github.com/expo/examples
[react-navigation]: https://reactnavigation.org/
[expo-router]: https://docs.expo.dev/router/introduction/
[react-native]: https://reactnative.dev/docs/environment-setup
[react-native-platform-specific-code]: https://reactnative.dev/docs/platform-specific-code
[npm]: https://npmjs.com/
[mdn-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[expo-localization-guide]: https://docs.expo.dev/guides/localization/
[expo-localization-sdk]: https://docs.expo.dev/versions/latest/sdk/localization/
[vector-icons-repo]: https://github.com/oblador/react-native-vector-icons
[vector-icons-docs]: https://oblador.github.io/react-native-vector-icons/

### Summary

All in all, I very much preferred Expo, which is already a mature framework with a very good ecosystem and development experience.
As mentioned in the footnote[^1], I went with a different route for my note-taking needs,
but will keep Expo in my toolbelt for the next cross-platform mobile app project.

#### Bonus: Getting Started with Expo

Here are some useful links for getting started with Expo app development.
The list is by no means complete; it just reflects the stuff I was looking for:

* General
  * [**Editable Live Demo**][expo-snack-sample]
  * [Expo Tutorial][expo-tutorial]
  * [Expo Code Samples][expo-samples] for a wide range of topics
* Navigation
  * [Expo Router][expo-router] (based on [React Navigation][react-navigation])
* Localization
  * [How to localize your app][expo-localization-guide] (using the [expo-localization][expo-localization-sdk] library)
* Vector Icons
  * [Vector Icons][vector-icons-docs] ([GitHub Repository][vector-icons-repo])
