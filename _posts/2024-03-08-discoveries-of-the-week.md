---
layout: article
title: "Discoveries of the Week &ndash; 2024/05: Manual IMAP access & @supports in CSS"
tags: ["Discoveries of the Week", "CSS", "IMAP"]
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

# Manual IMAP commands

Imagine you want to modify some folders in your IMAP mailbox, but you don't currently have a suitable email client at hand
(and e.g. your mobile mail client isn't able to create folders).
Fortunately, a command line with `telnet`/`openssl` is enough for this task:

Because IMAP is a just a very simple, text based protocol over a `telnet`-like connection,
you can quite easily create, rename and delete folders this way, and do everything else your email client can.

> If you are using a mailserver that supports SSL encryption (which I hope you are!),
> you can connect to it using `openssl` (lines entered by the user are prefixed with `❯` for clarity):
>
> ```bash
> ❯ openssl s_client -connect imap.<yourmailprovider>.com:993 -crlf -quiet
> <SSL certificate verification info>
> * OK [CAPABILITY IMAP4rev1 CHILDREN ENABLE ID IDLE LIST-EXTENDED LIST-STATUS LITERAL- MOVE NAMESPACE QUOTA SASL-IR SORT SPECIAL-USE THREAD=ORDEREDSUBJECT UIDPLUS UNSELECT WITHIN AUTH=LOGIN AUTH=PLAIN] IMAP server ready <some other information>
> 
> ❯ A1 login myaccount@<yourmailprovider>.com MyVeryS e c u r e Password
> A1 OK login completed
>
> ❯ <do what you want>
> ```
>
> The server responds with an initial `OK` message that tells you which features the server supports.
> You can then type out your commands, and submit them using Enter.
> The very first step is to authenticate yourself to the server; after that, you can use all other IMAP commands.
> When you're done, just exit the command prompt using `Ctrl+C`.

A more complete tutorial, including a list of commands, can be found [here][manual-imap-sessions].

[manual-imap-sessions]: https://www.atmail.com/blog/imap-101-manual-imap-sessions/

# CSS @supports directive

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
