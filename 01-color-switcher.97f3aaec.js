const t={buttonStart:document.querySelector("[data-start]"),buttonStop:document.querySelector("[data-stop]"),background:document.querySelector("body")};let e;function n(){const e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.background.style.backgroundColor=e}t.buttonStop.disabled=!0,t.buttonStart.addEventListener("click",function(t){t.currentTarget.disabled=!0,this.buttonStop.disabled=!1,e=setInterval(n,1e3)}.bind(t)),t.buttonStop.addEventListener("click",function(t){t.currentTarget.disabled=!0,this.buttonStart.disabled=!1,clearInterval(e)}.bind(t));
//# sourceMappingURL=01-color-switcher.97f3aaec.js.map