---
layout: article
title: "Discoveries & Random Stuff: Manual IMAP Access"
tags: ["Discoveries & Random Stuff","IMAP"]
permalink: /articles/manual-imap-commands-via-telnet-and-openssl/
article_header:
  type: overlay
  theme: dark
  background_color: "#364F59"
  background_image:
    src: assets/img/posts/2024-01/pexels-scott-webb-1029604.jpg
    blur: 4px
    alignment: 100%
---

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
