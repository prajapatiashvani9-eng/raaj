const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

// Animate left rectangles
tl.from(".rect1", { 
    x: -500, 
    // opacity: , 
    scale: 0.8 ,
    repet:1
})

  .from(".rect2", { 
    x: 500, 
    opacity: 1, 
    scale: 0.8 
    }, "-=0.5")

  .from(".rect3", { 
    x: -500, 
    opacity: 0, 
    scale: 0.8 }, 
    "-=0.5")

  .to(".rect4", { 
    x: -500, 
    opacity: 0, 
    scale: 0.8 }, 
    "-=0.5");

// Animate right rectangles
tl.to(".rect5", { 
    x: 500, 
    opacity: 0, 
    scale: 0.8 }, 
    "-=0.5")

  .to(".rect6", { 
    x: 500, 
    opacity: 0, 
    scale: 0.8 }, 
    "-=0.5")

  .to(".rect7", { 
    x: 500, 
    opacity: 0, 
    scale: 0.8 }, 
    "-=0.5")

  .to(".rect8", { 
    x: 500, 
    opacity: 0, 
    scale: 0.8 }, 
    "-=0.5");
