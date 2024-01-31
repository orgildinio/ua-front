'use client'
import React, { useEffect } from "react";
import lerp from "lerpjs";
import gsap from "gsap";

const inti = () => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";

    const cursorF = document.createElement("div");
    cursorF.className = "cursor-f";
    let cursorX = 0;
    let cursorY = 0;
    let pageX = 0;
    let pageY = 0;
    let size = 8;
    let sizeF = 36;
    let followSpeed = 0.16;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorF);

    if ("ontouchstart" in window) {
        cursor.style.display = "none";
        cursorF.style.display = "none";
    }

    cursor.style.setProperty("--size", size + "px");
    cursorF.style.setProperty("--size", sizeF + "px");

    window.addEventListener("mousemove", function (e) {
        pageX = e.pageX;
        pageY = e.pageY;
        cursor.style.left = e.pageX - size / 5 + "px";
        cursor.style.top = e.pageY - size / 5 + "px";
    });

    function loop() {
        cursorX = lerp(cursorX, pageX, followSpeed);
        cursorY = lerp(cursorY, pageY, followSpeed);
        cursorF.style.top = cursorY - sizeF / 2 + "px";
        cursorF.style.left = cursorX - sizeF / 2 + "px";
        requestAnimationFrame(loop);
    }

    loop();

    let startY;
    let endY;
    let clicked = false;

    function mousedown(e) {
        gsap.to(cursor, { scale: 4.5 });
        gsap.to(cursorF, { scale: 0.4 });

        clicked = true;
        startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
    }
    function mouseup(e) {
        gsap.to(cursor, { scale: 1 });
        gsap.to(cursorF, { scale: 1 });

        endY = e.clientY || endY;
        if (clicked && startY && Math.abs(startY - endY) >= 40) {
            // history.go(!Math.min(0, startY - endY) ? 1 : -1);
            clicked = false;
            startY = null;
            endY = null;
        }
    }
    window.addEventListener("mousedown", mousedown, false);
    window.addEventListener("touchstart", mousedown, false);
    window.addEventListener(
        "touchmove",
        function (e) {
            if (clicked) {
                endY = e.touches[0].clientY || e.targetTouches[0].clientY;
            }
        },
        false
    );
    window.addEventListener("touchend", mouseup, false);
    window.addEventListener("mouseup", mouseup, false);

    let scrollTimeout;
    function wheel(e) {
        clearTimeout(scrollTimeout);
        setTimeout(function () {
            if (e.deltaY < -40) {
                // history.go(-1);
            } else if (e.deltaY >= 40) {
                // history.go(1);
            }
        });
    }
    window.addEventListener("mousewheel", wheel, false);
    window.addEventListener("wheel", wheel, false);
};
export default function CustomCursor() {
    useEffect(() => {
        inti();
    }, []);

    return <></>;
}
