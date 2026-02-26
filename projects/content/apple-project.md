---
title: Apple Project
link: https://kitkatyj.com/apple-project2/
released: 2020-02-18
written: 2026-02-19
type: web
tags:
  - html5canvas
  - game
---
# Apple Project

>*"Someday, UNDERTALE will fade from people’s minds. But, I’m sure in 10 years, some kid who played UNDERTALE will create a game that surpasses it… I look forward to playing that."* [Toby Fox, 2016 ](https://undertale.tumblr.com/post/150397346860/retrospective-on-undertales-popularity)

## The Undertale
Similar to many people in the online communities in late-2015 to early-2016, we were enchanted by this new indie game known as "UNDERTALE" made by a silly white dog who goes by Toby Fox.

I remember watching a playthrough of it and was fascinated by the unique twist it brought to typical role-playing games, not just with its combat mechanics, but also having the option to reason and make friends with all the creatures in the Underground world. I was also mesmerised by the use of music throughout the game, particularly the titular song "Undertale" which plays towards the end and is the only truly acoustic song in the game's soundtrack.

## Unity Sucks
I was inspired to also make an Undertale-style game using the skills that I already know when it comes to building games - ~~Unity,~~ the HTML5 CANVAS. 

Back in my days in school, I was actually taught how to make games using HTML5 Canvas and Javascript. To my credit, I briefly touched Unity while I was making Kerbal Space Program mods in secondary school, but I found the game engine to be overkill for a lot of simple games (and might I add, limiting for a lot of published games out there, I might talk about this some day).

Other game making software also comes with a lot of overhead that I would rather not want to deal with. I did work with Gamemaker MANY many years ago, and it was cool, but I prefer the challenge of writing games from scratch. Therefore, HTML5 Canvas was my tool of choice.

Additionally I have plenty of experience working with HTML5 Canvas in [[graph-transformer|Graph Transformer]] and [[lurdball|Lurdball]], so this is a logical next step in my game making evolution!

## The Story
Most of the game's concepts and story comes from my sister, who has this idea of a girl who has to traverse through many different rooms and doors (and therefore challenges) to return to the outside world. (Which after the fact, kinda reminds me of [Infinity Train](https://en.wikipedia.org/wiki/Infinity_Train), a fascinating show btw)

## Building the demo
As I was essentially building this game from scratch, I needed to pickup a lot more than what was taught in school about HTML5 canvas, which included a moving camera, and generating seeds for procedural generation of the grass. Alongside, I had to ensure the HTML5 Canvas is responsive to the different screen sizes, which was simple enough to implement. It was incredibly exciting to see what I was able to achieve from building all of these capabilities on my own without the need for external libraries.

I even went a step further and created a joystick system such that this demo is playable on mobile as well. This was mostly adapted from the joystick found in [Pony Town](https://pony.town), for which this demo was also inspired by, something which I am pretty proud of achieving.

## Playing Sounds
Playing sound effects was perhaps the most intriguing aspect of development. One of the most key disciplines of my experience building websites is to ensure compatibility across different web browsers, sometimes even older versions of browsers too. The Safari Web Browser (bless its beautiful WebKit), has a built in security feature that prevents audio from playing in a browser unless the user makes an initial interaction.

Now this kind of a bummer, but nothing that a little ingenuity can't fix. This is why you see an initial home screen that has a big "Play" button, which will register as the user's first interaction before any sound is played. From this, I was able to successfully play the walking sound effects. Hooray! (Are those Minecra- SHUSH)

However, it appears that sound effects still get cut off in Safari which does not occur in other browsers like Chrome. I have yet since worked out the reason why this is happening.

## The Future
You might be wondering if this will ever become a full game. Chances are is no, as this is just a technical demo for creating games in HTML5 Canvas. I do believe building out a fully fledged game should probably take a minimal game engine (but I would like to prove myself wrong if given the time and resources). I am open to exploring more game ideas and potentially use the HTML5 Canvas game engine to build mobile games and deploying them on the App Store! Perhaps using Expo or React Native???
