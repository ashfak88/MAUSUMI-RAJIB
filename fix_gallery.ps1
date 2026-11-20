$file = "c:\Users\ashfa\Desktop\RAJIB-MAUSUMI\src\App.jsx"
$content = Get-Content $file -Raw

# Find start and end line numbers
$lines = Get-Content $file
$startLine = -1
$endLine = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -match '^function GallerySection') { $startLine = $i }
  if ($startLine -ge 0 -and $i -gt $startLine -and $lines[$i] -match '^const weddingTimestamp') { $endLine = $i; break }
}
Write-Host "GallerySection: lines $startLine to $endLine"

$before = ($lines[0..($startLine-1)]) -join "`r`n"
$after  = ($lines[$endLine..($lines.Count-1)]) -join "`r`n"

$newGallery = @'
function GallerySection() {
  if (!WEDDING_DATA.gallery || WEDDING_DATA.gallery.length === 0) return null;
  const scrollRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const photoTitles = [
    "Together in Love","Moments of Joy","Cherished Vows",
    "A Beautiful Beginning","Heartbeats as One","Golden Smiles",
    "Timeless Bond","Forever & Always","Sweet Whispers",
    "Walking Hand in Hand","Radiant Together","Our Eternal Story",
    "Blissful Moments","Love Unfolding","Hearts Entwined",
  ];

  const scrollToIdx = React.useCallback((idx) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll("[data-gallery-card]");
    if (cards[idx]) cards[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  const scroll = (dir) => {
    const next = dir === "left"
      ? Math.max(activeIndex - 1, 0)
      : Math.min(activeIndex + 1, WEDDING_DATA.gallery.length - 1);
    scrollToIdx(next);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const c = scrollRef.current;
    const center = c.scrollLeft + c.offsetWidth / 2;
    let best = 0, bestDist = Infinity;
    c.querySelectorAll("[data-gallery-card]").forEach((el, i) => {
      const d = Math.abs((el.offsetLeft + el.offsetWidth / 2) - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActiveIndex(best);
  };

  const gold = "#d4af37";

  return (
    <section style={{ position:"relative", overflow:"hidden", padding:"64px 0", background:"#2B070C", borderTop:"1px solid rgba(212,175,55,0.3)", borderBottom:"1px solid rgba(212,175,55,0.3)" }}>
      <div style={{ pointerEvents:"none", position:"absolute", inset:0, opacity:0.4 }}>
        <div style={{ position:"absolute", top:"25%", left:"50%", transform:"translateX(-50%)", width:"288px", height:"288px", borderRadius:"50%", filter:"blur(64px)", background:"rgba(212,175,55,0.15)" }} />
      </div>
      <div style={{ textAlign:"center", marginBottom:"32px", padding:"0 20px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"8px" }}>
          <span style={{ display:"block", width:"40px", height:"1px", background:"linear-gradient(90deg,transparent,#d4af37 50%,transparent)" }} />
          <span style={{ color:gold, fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", fontWeight:600 }}>Moments of Love</span>
          <span style={{ display:"block", width:"40px", height:"1px", background:"linear-gradient(90deg,transparent,#d4af37 50%,transparent)" }} />
        </div>
        <h2 style={{ color:"#f5f0e8", fontSize:"clamp(1.5rem,6vw,2rem)", fontWeight:300, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"Cinzel Decorative, serif", margin:"4px 0" }}>Captured Memories</h2>
        <p style={{ color:"rgba(212,175,55,0.75)", fontSize:"0.68rem", letterSpacing:"0.25em", textTransform:"uppercase", marginTop:"6px" }}>Swipe gently to explore</p>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ display:"flex", overflowX:"auto", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", scrollbarWidth:"none", msOverflowStyle:"none", gap:"14px", paddingLeft:"11%", paddingRight:"11%", paddingTop:"8px", paddingBottom:"8px" }}
      >
        {WEDDING_DATA.gallery.map((imgSrc, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              data-gallery-card
              onClick={() => scrollToIdx(idx)}
              style={{ flexShrink:0, width:"78%", maxWidth:"310px", scrollSnapAlign:"center", transition:"transform 0.4s ease, opacity 0.4s ease", transform:isActive?"scale(1)":"scale(0.9)", opacity:isActive?1:0.6, cursor:"pointer" }}
            >
              <div style={{ borderRadius:"28px", border:isActive?"2px solid rgba(212,175,55,0.9)":"2px solid rgba(212,175,55,0.4)", padding:"4px", background:"linear-gradient(180deg,rgba(212,175,55,0.45) 0%,rgba(212,175,55,0.08) 50%,rgba(212,175,55,0.3) 100%)", boxShadow:isActive?"0 8px 40px rgba(212,175,55,0.3),0 2px 16px rgba(0,0,0,0.7)":"0 4px 20px rgba(0,0,0,0.5)" }}>
                <div style={{ borderRadius:"22px", overflow:"hidden", background:"#0a0002", width:"100%", aspectRatio:"3/4", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <img
                    src={imgSrc}
                    alt={"Memory " + (idx + 1)}
                    loading="lazy"
                    style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center", display:"block" }}
                  />
                </div>
              </div>
              <p style={{ textAlign:"center", marginTop:"10px", fontSize:"0.72rem", letterSpacing:"0.16em", fontStyle:"italic", fontFamily:"Georgia, serif", color:isActive?"rgba(212,175,55,0.95)":"rgba(212,175,55,0.4)", transition:"color 0.4s" }}>
                <span style={{ fontFamily:"Jost, sans-serif", fontWeight:700, fontStyle:"normal", marginRight:"5px" }}>{String(idx + 1).padStart(2,"0")}</span>
                · {photoTitles[idx % photoTitles.length]}
              </p>
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:"400px", margin:"20px auto 0", padding:"0 24px" }}>
        <button onClick={() => scroll("left")} aria-label="Previous" style={{ width:"40px", height:"40px", borderRadius:"50%", border:"1px solid rgba(212,175,55,0.5)", background:"rgba(26,4,7,0.9)", color:gold, display:"grid", placeItems:"center", cursor:"pointer" }}>
          <IconChevronLeft style={{ width:"20px", height:"20px" }} />
        </button>
        <div style={{ display:"flex", gap:"6px", alignItems:"center", overflow:"hidden", maxWidth:"180px", padding:"0 8px" }}>
          {WEDDING_DATA.gallery.map((_,i) => (
            <span key={i} onClick={() => scrollToIdx(i)} style={{ height:"6px", borderRadius:"3px", background:i===activeIndex?gold:"rgba(212,175,55,0.3)", width:i===activeIndex?"20px":"6px", transition:"all 0.3s", flexShrink:0, cursor:"pointer", display:"block" }} />
          ))}
        </div>
        <button onClick={() => scroll("right")} aria-label="Next" style={{ width:"40px", height:"40px", borderRadius:"50%", border:"1px solid rgba(212,175,55,0.5)", background:"rgba(26,4,7,0.9)", color:gold, display:"grid", placeItems:"center", cursor:"pointer" }}>
          <IconChevronRight style={{ width:"20px", height:"20px" }} />
        </button>
      </div>
    </section>
  );
}

'@

$newContent = $before + "`r`n" + $newGallery + "`r`n" + $after
Set-Content $file -Value $newContent -NoNewline
Write-Host "Done. Lines replaced: $startLine to $($endLine-1)"
