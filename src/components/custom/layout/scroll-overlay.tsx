import { InlineScript } from "@/components/custom/inline-script";

/**
 * Kenar örtüleri — kaydırılabilir yönde, zemine karışan bir sis.
 *
 * Üstteysen üst yok, alttaysan alt yok; iki yöne de gidilebiliyorsa ikisi
 * birden duruyor. Görünürlük bir eşiğe bağlı değil: kalan mesafe üzerinden
 * smoothstep ile süzülüyor, yani "şimdi belirdi" diye bir an yok.
 *
 * Destekleyen tarayıcıda CSS scroll timeline ilk boyamayla işi bitiriyor.
 * Kalanda aynı eğri, ilk parse'ta çalışan bir betikle — hidrasyon beklenmiyor.
 */
const scrollOverlayScript = `(function(){if(window.__sdOverlay)return;window.__sdOverlay=1;var t=document.getElementById("scroll-overlay-top"),b=document.getElementById("scroll-overlay-bottom");if(!t||!b)return;if(getComputedStyle(t).getPropertyValue("--scroll-overlay-engine").trim()==="css")return;var f=0;function mix(x){x=x<0?0:x>1?1:x;return x*x*(3-2*x)}function go(){f=0;var s=document.scrollingElement||document.documentElement,m=s.scrollHeight-s.clientHeight,r=parseFloat(getComputedStyle(t).getPropertyValue("--scroll-overlay-range"))||160;if(m<=1){t.style.opacity="0";b.style.opacity="0";return}t.style.opacity=String(mix(s.scrollTop/r));b.style.opacity=String(mix((m-s.scrollTop)/r))}function ask(){if(!f)f=requestAnimationFrame(go)}go();window.addEventListener("scroll",ask,{passive:true});window.addEventListener("resize",ask,{passive:true});window.addEventListener("pageshow",go);if(window.visualViewport)window.visualViewport.addEventListener("resize",ask);if(typeof ResizeObserver!=="undefined"){var ro=new ResizeObserver(ask);ro.observe(document.documentElement);if(document.body)ro.observe(document.body)}})()`;

export function ScrollOverlay() {
  return (
    <>
      <div
        id="scroll-overlay-top"
        className="scroll-overlay scroll-overlay-top"
        aria-hidden="true"
      />
      <div
        id="scroll-overlay-bottom"
        className="scroll-overlay scroll-overlay-bottom"
        aria-hidden="true"
      />
      <InlineScript html={scrollOverlayScript} />
    </>
  );
}
