//Script para el menu desplegable del Admin Panel. 
//Creando usando la libreria GSAP, documentacion en: https://greensock.com/docs/v2/TweenMax


/* Capturar las variables*/
let header = document.querySelectorAll(".menuItem"),
    item = document.querySelectorAll(".item"),
    hoverPanelTl = [],
    openedPanel = {};
    
Array.prototype.forEach.call(header, function (el, i) {
    let arrow = el.querySelector(".arrow"),
        spacer = el.querySelector(".hoverMenuItem"),
        panel = el.parentNode,
        content = panel.querySelector(".itemMenuContenido");

    hoverPanelTl[i] = new TimelineLite({paused: true});

    /* Animacion de Hover para cada item */
    hoverPanelTl[i].to(el, 0.2, {
        css: {
            color: "#fff ",
            background: "rgb(0,102,117)",
            background: "linear-gradient(110deg, rgba(0,102,117,1) 22%, rgba(70,199,173,1) 89%)",
            textIndent: "1.5rem"
        },
        ease: Linear.easeNone
    });

    /* Eventos del mouse */
    el.addEventListener("mouseenter", function () {
        if (!hoverPanelTl[i].paused() || panel.classList.contains("cerrado")) {
            hoverPanelTl[i].timeScale(1).play();
            TweenLite.to(spacer, .5, {width: '100%'});
        }
    });

    el.addEventListener("mouseleave", function () {
        if (!hoverPanelTl[i].paused()) {
            hoverPanelTl[i].timeScale(3).reverse();
            TweenLite.to(spacer, .1, {width: 0});
        }
    });

    el.addEventListener("click", function () {
     
        if (!panel.classList.contains("cerrado")) {
            hoverPanelTl[i].paused(false);
            TweenLite.set(spacer, {width: "100%"});
            TweenLite.to(content, 0.3, {height: 0, borderTopWidth: 0});
            TweenMax.to(arrow, 0.3, {rotation: 0, transformOrigin: "25% 50%"});
            panel.classList.add("cerrado");
            openedPanel = {};
        } else {

            /* Cerramos el ultimo panel abierto para no saturar el contenido visual */
            if (openedPanel.el != undefined) {
                console.log(openedPanel);
                let openArrow = openedPanel.el.querySelector(".arrow"),
                    openPanel = openedPanel.el.parentNode,
                    openContent = openPanel.querySelector(".itemMenuContenido");
                    
                hoverPanelTl[openedPanel.hoverTl].paused(false);
                hoverPanelTl[openedPanel.hoverTl].timeScale(3).reverse();
             
                TweenLite.to(openContent, 0.3, {height: 0, borderTopWidth: 0});
                TweenMax.to(openArrow, 0.3, {
                    rotation: 0,
                    transformOrigin: "25% 50%"
                });
                openPanel.classList.add("cerrado");
            }

            /* Funcion para abrir el panel */
            hoverPanelTl[i].paused(true);
            TweenLite.set(spacer, {width: 0});
            TweenLite.set(content, {height: "auto", borderTopWidth: "2px"});
            TweenLite.from(content, 0.5, {
                height: 0,
                borderTopWidth: 0,
                ease: Back.easeOut.config(1.4)
            });
            TweenMax.to(arrow, 0.5, {
                rotation: 90,
                transformOrigin: "25% 50%",
                ease: Back.easeOut.config(1.4)
            });
            panel.classList.remove("cerrado");
            openedPanel.el = el;
            openedPanel.hoverTl = i;
        }
    });
});


//Testing de CLICKS
Array.prototype.forEach.call(item, function (el, i) {
    el.addEventListener("click", function () {
        console.log("El elemento " + el.innerText + " Fue clickeado.");
    });
});


let btnVolverTienda = document.querySelector('.btnVolver a')

btnVolverTienda.setAttribute('href', '/html/catalogo-libros-vista-cliente.html')

