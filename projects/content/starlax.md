---
title: Starlax
link: https://kitkatyj.com/starlax/
released: 2020-08-09
written: 2026-02-20
type: web
tags:
  - html5canvas
---
# Starlax

>The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself." [Carl Sagan, Cosmos, 1980](https://en.wikipedia.org/wiki/Cosmos_(Sagan_book))

## A new kitkatyj
At the time of COVID, my portfolio website has been up for about 3 years, and I felt like the time was ripe for some major changes! I have seen many portfolio websites with very engaging backgrounds, and I wanted to see if I can do the same. However, I am not particularly fond of how performance intensive some of these interfaces are. I wanted something lightweight, but is able to punch well above its weight in terms of its immersion.

From my experience developing interactive tools such as [[graph-transformer|Graph Transformer]] and [[apple-project|Apple Project]] using HTML5 Canvas, I felt like I could use that to an extent and build a simple immersive experience for visitors. Plus, I really like astronomy, so I wanted to see if I can incorporate a feel of zooming through space as they scroll down the site.

## Parallax Power
I don't think I have to explain what parallax is, but I do believe that it is a very effective way of creating a 3D effect without going deep into creating 3D world. All I have to do is map the scrolling effect to differing degrees of objects in my canvas animation. Add in a little opacity adjustment alongside the parallax effect, and it creates a pretty convincing pseudo-3D effect!

Plus with the experience gained from creating responsive canvases in Apple Project, this background is available on mobile too, and it remain as performant on the desktop.

## My very own Javascript library
After publishing the revamp of my website, I believed that it would be great if I could also package this as a Javascript file that anyone can use in their own projects too. Hence, I rewrote my code such that it is contained within its own Javascript file and packaged it with more customisation features, such as colour, shape, size, and speed.

All of this was simple enough to do, and not long after, I was able to decouple the animation code from my website and have it call a dedicated Starlax class (Starlax being a portmanteau of Star and Parallax, duh). 

## What's next?
As I am writing this in February 2026, it has been 5.5 years since I last released my very own Javascript library. My website design has remained stagnant since, and I think it is overdue for a revamp.

Among the many things to go into updating the website is to further improve Starlax and give it some much needed features. I will likely be sharing these in a blog post as I begin development. But additionally I would like to package this as an npm module so that it's really out there. Hoping things work out!