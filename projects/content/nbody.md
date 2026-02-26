---
title: N-Body Music Box
link: https://musicbox.kitkatyj.com
released: 2021-09-07
written: 2026-02-20
type: web
tags:
  - html5canvas
  - toy
---
>"Pythagoras believed that a mathematical harmony underlies all of nature. The modern tradition of mathematical argument essential in all of science owes much to him. And the notion that the heavenly bodies move to a kind of music of the spheres was also derived from Pythagoras. It was he who first used the word “cosmos” to mean a well-ordered and harmonious universe; a world amenable to human understanding." [Carl Sagan, Cosmos, 1980](https://www.organism.earth/library/document/cosmos-7)

## Music of the Spheres
As mentioned in my previous projects, I have a deep passion for astronomy and interactive media. One of my inspirations is [Cary Huang](https://www.youtube.com/@carykh), who co-created one of my favourite shows known as [Battle for Dream Island](https://bfdi.tv), for which I dedicated plenty of my time with the community. But also, he was an intensely creative computer science student just like me. 

One of Cary's many projects was [Many Bodies Sonified](https://youtu.be/gJEvWuyK7xs), where a bunch of point masses are subject to Newton's Laws of Gravitation, and if they come into close proximity, they produce a tone. This was in turn inspired by NorlamFile's Three-body problem sonified, where they were able to make a nice little tune via the infamous [three-body problem](https://en.wikipedia.org/wiki/Three-body_problem).

I believe this has a lot of potential for fun and whimsy, and I decided to take a gander at producing this myself and for others to have a chance to play it too. This also ties into the whole learning via playing methodology I am oh so fond of.

## Taking Charge
I had just completed developing my extra-curricular research project [[boops|Bunch Of Online Physics Simulations (BOOPS)]] earlier in the year, and one of the simulations - PlayCharge is made to be expanded upon for a new kind of simulation, one for the Newton's Law of Gravitation instead of Coloumb's Law for electric charges. In fact, they are pretty much the same, except instead of charges, it is of masses; and their constants being different. They are both subject to the [inverse square law](https://en.wikipedia.org/wiki/Inverse-square_law).

## Particle Pairs
Additionally, I had to incorporate the tones for when the particles come into proximity with one another. Instead of just implementing a "minimum distance" threshold to trigger the tone, I decided that the tone is triggered the moment a pair of particles' distance increases. This provides a distinct singular moment for which the tone will be produced. This mapping introduces the concept that pairs of particles producing unique tones rather than individual particles.

Both the "minimum distance" which in this simulation I have called "Periapsis Threshold" as well as the individual tones that will be played, can be defined by the user. This is such that users can produce all kinds of symphonies from this simulation alone. This atop all previous features that were implemented in PlayCharge such as moving the camera, addition of new particles, moving of existing particles are all implemented.

## The Music Box
From my experience working with audio in Javascript in [[apple-project|Apple Project]], we need the user to click 'Play' for the simulation to run, which resolves the interaction needed to trigger audio in the Safari Web Browser.

To have Javascript play a tone, I was able to use the Web Audio API [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) along with supplementary classes to have it play a specific sine wave, that fades overtime. 

After all of this, I believe naming this the N-Body Music Box as fitting as the simple tones that are played do essentially work like a music box!

## Sharing Symphonies
This goal behind this project was to allow for anyone to be able to create their own symphonies that can be shared with anyone. But that idea means properly introducing a database that can store the metadata that is used to generate the World and its Particles. This was something I wanted to do since the days of [[sandbox-elements|Sandbox Elements]], and I believe the time was ripe to implement this.

All information about the World is stored in JSON, and that is automatically saved in the browser's local storage, this can be extended to storing in the cloud. Looking at options at the time, I decided on Firebase as my database provider, as I did have some experience working with it in a school project. 

In the top-left hamburger, I have added the function "Share" which creates a new Firebase document and stores the World object in it. The Document ID is then generated and presented to the user as a shareable link. This link which contains the Document ID as a query parameter can then be read to fetch the same world from the database, with all the particles notes, velocities, and colours preserved!

Hooray!! I achieved implementing a database for own project. 🎉

## Deploying the Box
The result of this project is one of the biggest standalone projects I have ever done, and I wanted to properly deploy this on a proper environment rather than just using GitHub pages. Since I was already using Firebase for storing data, I figured I would use Firebase to host the project too.

Using the Firebase CLI, I was able to package and deploy my project using Firebase Functions. Since Firebase allows for hosting on a subdomain, I was able to use musicbox.kitkatyj.com!

## Future
If I were given the time to develop this project further, I would like to further develop my backend development skills and perhaps optimise the delivery of the site as I am aware that it takes about 5 seconds to load it initially from a cold start.

Maybe additionally, implement a 3D simulation so that it can realistically simulate who wildly unpredictable the n-body problem truly is.

All in all, this is perhaps my magnum opus in terms of full stack development, and I am incredibly proud of what I was able to do on my own.