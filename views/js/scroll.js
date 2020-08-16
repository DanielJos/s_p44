let controller = new ScrollMagic.Controller()

let Scene = new ScrollMagic.Scene({
    triggerElement: '#sectionTitle1',
    triggerHook: 0
})
.setClassToggle(".scroll-anim", "fade-out") //adds class to #iconGroup  
// .addIndicators()
.addTo(controller);