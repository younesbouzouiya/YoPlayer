import { useState, useRef, useEffect, useCallback } from "react";

// ── SVG Icons ──────────────────────────────────────────────────────────────
const IcoPlay = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <polygon points="6,3 20,12 6,21" />
  </svg>
);
const IcoPause = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <rect x="5" y="3" width="4" height="18" rx="1"/>
    <rect x="15" y="3" width="4" height="18" rx="1"/>
  </svg>
);
const IcoBack = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IcoFullscreen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);
const IcoExitFullscreen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <polyline points="8 3 3 3 3 8"/><polyline points="21 8 21 3 16 3"/>
    <polyline points="3 16 3 21 8 21"/><polyline points="16 21 21 21 21 16"/>
  </svg>
);
const IcoSun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IcoVolHigh = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="none"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);
const IcoVolMid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="none"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);
const IcoVolMute = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="none"/>
    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
);
const IcoLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IcoUnlock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);
const IcoSpeed = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
    <path d="M20 2l-5 5"/><path d="M22 4l-5 5"/>
  </svg>
);
const IcoSkip = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 4 15 12 5 20 5 4" fill="currentColor" stroke="none"/>
    <line x1="19" y1="5" x2="19" y2="19"/>
  </svg>
);
const IcoSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcoFolder = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);
const IcoFolderPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
  </svg>
);
const IcoFilm = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/>
    <line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
);
const IcoGrid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IcoList = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IcoX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcoChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = (s) => {
  if (!s || isNaN(s)) return "00:00";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`
    : `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
};

const EXT_COLOR = { mp4:"#6c8bff", mkv:"#a78bfa", avi:"#34d399", mov:"#f59e0b", webm:"#ec4899" };
const ec = name => EXT_COLOR[(name||"").split(".").pop().toLowerCase()] || "#888";

const GRADS = {
  1:["#0d1b3e","#1a3a6e"], 2:["#1e1b4b","#3730a3"], 3:["#042f2e","#065f46"],
  4:["#1c1917","#44403c"], 5:["#0c1445","#1e3a8a"], 6:["#27272a","#3f3f46"],
  7:["#14532d","#166534"], 8:["#450a0a","#7f1d1d"], 9:["#2e1065","#4c1d95"],
  10:["#451a03","#92400e"],
};

const MOCK = [
  { id:1,  name:"Isekai Nonbiri Nouka 2 001 1080p.mp4", size:"1.4 GB",  dur:"23:51", folder:"Anime" },
  { id:2,  name:"Attack on Titan S04E28 4K.mkv",         size:"2.1 GB",  dur:"24:08", folder:"Anime" },
  { id:3,  name:"One Piece 1087 1080p.mp4",              size:"890 MB",  dur:"23:30", folder:"Anime" },
  { id:4,  name:"The Last of Us S02E05.mkv",             size:"3.2 GB",  dur:"58:12", folder:"Series" },
  { id:5,  name:"Dune Part Two 4K HDR.mkv",              size:"18.4 GB", dur:"2:46:21",folder:"Movies" },
  { id:6,  name:"Interstellar Remastered.mp4",           size:"12.1 GB", dur:"2:49:03",folder:"Movies" },
  { id:7,  name:"Naruto Shippuden 350 1080p.avi",        size:"680 MB",  dur:"22:44", folder:"Anime" },
  { id:8,  name:"Breaking Bad S05E16 Final.mkv",         size:"2.8 GB",  dur:"55:00", folder:"Series" },
  { id:9,  name:"Chainsaw Man S02E01 1080p.mkv",         size:"1.1 GB",  dur:"24:02", folder:"Anime" },
  { id:10, name:"House of the Dragon S02E08.mkv",        size:"4.5 GB",  dur:"1:12:44",folder:"Series" },
];

// ── Thumbnail ──────────────────────────────────────────────────────────────
function Thumb({ file, large }) {
  const [g1,g2] = GRADS[file.id]||["#111","#222"];
  const W = large ? "100%" : 88, H = large ? 108 : 56;
  return (
    <div style={{width:W,height:H,borderRadius:10,overflow:"hidden",
      background:`linear-gradient(135deg,${g1},${g2})`,position:"relative",flexShrink:0}}>
      <div style={{position:"absolute",inset:0,backgroundImage:
        "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.02) 2px,rgba(255,255,255,0.02) 4px)"}}/>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",
        justifyContent:"center",opacity:0.1,color:"white"}}>
        <IcoFilm size={large?44:26}/>
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg width={large?40:24} height={large?40:24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.6"/>
          <polygon points="10 8 16 12 10 16 10 8" fill="white"/>
        </svg>
      </div>
      <div style={{position:"absolute",bottom:4,left:4,background:"rgba(0,0,0,0.75)",
        color:"#fff",fontSize:large?11:9,fontFamily:"monospace",padding:"2px 5px",borderRadius:4}}>
        {file.dur}
      </div>
      <div style={{position:"absolute",top:4,right:4,background:ec(file.name),
        color:"#fff",fontSize:large?10:8,fontFamily:"monospace",
        padding:"2px 5px",borderRadius:3,fontWeight:700}}>
        {file.name.split(".").pop().toUpperCase()}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
export default function YoPlayer() {
  const [view,           setView]          = useState("library");
  const [files]                            = useState(MOCK);
  const [folders,        setFolders]       = useState(["Anime","Movies","Series","Downloads"]);
  const [selFolder,      setSelFolder]     = useState(null);
  const [curFile,        setCurFile]       = useState(null);
  const [query,          setQuery]         = useState("");
  const [listMode,       setListMode]      = useState("list");
  const [showNF,         setShowNF]        = useState(false);
  const [showOF,         setShowOF]        = useState(false);
  const [nfName,         setNfName]        = useState("");

  // ── video ref & real state ──
  const videoRef    = useRef(null);
  const contRef     = useRef(null);
  const progRef     = useRef(null);
  const brightRef   = useRef(null);
  const volRef      = useRef(null);
  const timerRef    = useRef(null);

  const [playing,     setPlaying]     = useState(false);
  const [curTime,     setCurTime]     = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(0.8);
  const [brightness,  setBrightness]  = useState(1.0);
  const [speed,       setSpeed]       = useState(1);
  const [locked,      setLocked]      = useState(false);
  const [showCtrl,    setShowCtrl]    = useState(true);
  const [showSpeed,   setShowSpeed]   = useState(false);
  const [seekFlash,   setSeekFlash]   = useState(null);
  const [fullscreen,  setFullscreen]  = useState(false);
  const [hasFile,     setHasFile]     = useState(false);
  const [dragBright,  setDragBright]  = useState(false);
  const [dragVol,     setDragVol]     = useState(false);

  const SPEEDS = [0.25,0.5,0.75,1,1.25,1.5,1.75,2];

  const filtered = files.filter(f =>
    (selFolder ? f.folder === selFolder : true) &&
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  // ── Video events ──────────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime   = () => setCurTime(v.currentTime);
    const onLoaded = () => { setDuration(v.duration); setHasFile(true); };
    const onPlay   = () => setPlaying(true);
    const onPause  = () => setPlaying(false);
    const onEnded  = () => { setPlaying(false); setCurTime(0); v.currentTime = 0; };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play",  onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play",  onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  // sync volume/speed/brightness to video element
  useEffect(() => { if (videoRef.current) videoRef.current.volume = volume; }, [volume]);
  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = speed; }, [speed]);

  // ── Controls auto-hide ────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    setShowCtrl(true);
    if (!locked) timerRef.current = setTimeout(() => setShowCtrl(false), 3500);
  }, [locked]);

  useEffect(() => { if (locked) setShowCtrl(true); }, [locked]);

  // ── Actions ───────────────────────────────────────────────────────────
  const togglePlay = () => {
    if (locked || !videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
  };

  const doSeek = (delta) => {
    if (locked || !videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
    setSeekFlash(delta > 0 ? "fwd" : "bwd");
    setTimeout(() => setSeekFlash(null), 700);
    resetTimer();
  };

  const onProgClick = (e) => {
    if (locked || !progRef.current || !videoRef.current || !duration) return;
    const r = progRef.current.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  const onProgDrag = (e) => {
    if (!e.buttons || locked || !progRef.current || !videoRef.current || !duration) return;
    const r = progRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    videoRef.current.currentTime = ratio * duration;
  };

  const dragSlider = (e, setter, min, max, ref) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const ratio = 1 - Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    setter(min + ratio * (max - min));
  };

  const openFile = (file) => {
    setCurFile(file);
    setView("player");
    setPlaying(false);
    setCurTime(0);
    setHasFile(false);
    setShowCtrl(true);
  };

  const loadLocalFile = (e) => {
    const file = e.target.files[0];
    if (!file || !videoRef.current) return;
    const url = URL.createObjectURL(file);
    videoRef.current.src = url;
    videoRef.current.load();
    setCurFile({ id:99, name: file.name, size:"local", dur:"--:--", folder:"Local" });
  };

  const toggleFullscreen = () => {
    if (!contRef.current) return;
    if (!document.fullscreenElement) {
      contRef.current.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  const pct = duration > 0 ? (curTime / duration) * 100 : 0;
  const VIcon = volume === 0 ? IcoVolMute : volume < 0.5 ? IcoVolMid : IcoVolHigh;

  // ══ PLAYER ══════════════════════════════════════════════════════════════
  if (view === "player") {
    return (
      <div ref={contRef} style={PS.root}
        onMouseMove={resetTimer} onTouchStart={resetTimer}
        onClick={(e) => { if (e.target === e.currentTarget) { togglePlay(); resetTimer(); } }}>

        {/* ── REAL VIDEO ELEMENT ── */}
        <video
          ref={videoRef}
          style={{ ...PS.video, filter:`brightness(${brightness})` }}
          playsInline
          onClick={togglePlay}
        />

        {/* Overlay gradient (always visible for usability) */}
        <div style={PS.gradTop}/>
        <div style={PS.gradBottom}/>

        {/* ── NO FILE placeholder ── */}
        {!hasFile && (
          <div style={PS.placeholder}>
            <div style={{opacity:0.25,color:"white",marginBottom:16}}><IcoFilm size={64}/></div>
            <p style={{color:"rgba(255,255,255,0.4)",fontSize:14,marginBottom:20,textAlign:"center"}}>
              {curFile?.name || "اختر ملف فيديو للتشغيل"}
            </p>
            <label style={PS.openBtn}>
              <input type="file" accept="video/*" style={{display:"none"}} onChange={loadLocalFile}/>
              <IcoFolder size={16}/> فتح ملف فيديو
            </label>
          </div>
        )}

        {/* ── SEEK FLASH ── */}
        {seekFlash && (
          <div style={{...PS.flash, ...(seekFlash==="bwd"?{left:50}:{right:50})}}>
            <div style={PS.flashBox}>
              {seekFlash==="bwd"
                ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="19 20 9 12 19 4"/><line x1="5" y1="19" x2="5" y2="5" stroke="white" strokeWidth="3"/></svg><span>10s</span></>
                : <><span>10s</span><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19" stroke="white" strokeWidth="3"/></svg></>
              }
            </div>
          </div>
        )}

        {/* ══ CONTROLS OVERLAY ══ */}
        <div style={{...PS.overlay, opacity: showCtrl||!playing ? 1 : 0,
          pointerEvents: showCtrl||!playing ? "all" : "none"}}>

          {/* ── TOP BAR ── */}
          <div style={PS.topBar}>
            <button style={PS.circBtn} onClick={() => { setView("library"); videoRef.current?.pause(); }}>
              <IcoBack/>
            </button>
            <span style={PS.title}>{curFile?.name || "Yo Player"}</span>
            <button style={PS.circBtn} onClick={toggleFullscreen}>
              {fullscreen ? <IcoExitFullscreen/> : <IcoFullscreen/>}
            </button>
          </div>

          {/* ── BRIGHTNESS SLIDER (LEFT) ── */}
          <div style={PS.sideLeft}
            ref={brightRef}
            onMouseDown={e=>{setDragBright(true);dragSlider(e,setBrightness,0.2,1.5,brightRef);}}
            onMouseMove={e=>{if(dragBright)dragSlider(e,setBrightness,0.2,1.5,brightRef);}}
            onMouseUp={()=>setDragBright(false)}
            onTouchMove={e=>dragSlider(e.touches[0],setBrightness,0.2,1.5,brightRef)}
          >
            <IcoSun/>
            <div style={PS.vTrack}>
              <div style={{...PS.vFill, height:`${((brightness-0.2)/1.3)*100}%`,
                background:"linear-gradient(0deg,#f59e0b,#fde68a)"}}/>
              <div style={{...PS.vThumb, bottom:`${((brightness-0.2)/1.3)*100}%`}}/>
            </div>
            <span style={PS.sideVal}>{Math.round(brightness*100)}%</span>
          </div>

          {/* ── VOLUME SLIDER (RIGHT) ── */}
          <div style={PS.sideRight}
            ref={volRef}
            onMouseDown={e=>{setDragVol(true);dragSlider(e,setVolume,0,1,volRef);}}
            onMouseMove={e=>{if(dragVol)dragSlider(e,setVolume,0,1,volRef);}}
            onMouseUp={()=>setDragVol(false)}
            onTouchMove={e=>dragSlider(e.touches[0],setVolume,0,1,volRef)}
          >
            <VIcon/>
            <div style={PS.vTrack}>
              <div style={{...PS.vFill, height:`${volume*100}%`,
                background:"linear-gradient(0deg,#6c8bff,#a78bfa)"}}/>
              <div style={{...PS.vThumb, bottom:`${volume*100}%`}}/>
            </div>
            <span style={PS.sideVal}>{Math.round(volume*100)}%</span>
          </div>

          {/* ── CENTER CONTROLS ── */}
          <div style={PS.centerRow}>
            {/* Rewind 10s */}
            <button style={{...PS.seekBtn, opacity:locked?0.3:1}} onClick={()=>doSeek(-10)}>
              <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
                <circle cx="27" cy="27" r="25" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                <path d="M32 19L22 27L32 35" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="19" y1="19" x2="19" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <text x="27" y="48" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">10</text>
              </svg>
            </button>

            {/* Play/Pause */}
            <button style={{...PS.playBtn, opacity:locked?0.4:1}} onClick={togglePlay}>
              {playing ? <IcoPause/> : <IcoPlay/>}
            </button>

            {/* Forward 10s */}
            <button style={{...PS.seekBtn, opacity:locked?0.3:1}} onClick={()=>doSeek(10)}>
              <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
                <circle cx="27" cy="27" r="25" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                <path d="M22 19L32 27L22 35" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="35" y1="19" x2="35" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <text x="27" y="48" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">10</text>
              </svg>
            </button>
          </div>

          {/* ── PROGRESS BAR ── */}
          <div style={PS.progressWrap}>
            <span style={PS.timeLabel}>{fmt(curTime)}</span>
            <div style={PS.progTrack} ref={progRef}
              onClick={onProgClick} onMouseMove={onProgDrag}>
              <div style={{...PS.progBuf, width:`${Math.min(100,pct+10)}%`}}/>
              <div style={{...PS.progFill, width:`${pct}%`}}/>
              <div style={{...PS.progThumb, left:`${pct}%`}}/>
            </div>
            <span style={PS.timeLabel}>{fmt(duration)}</span>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div style={PS.bottomBar}>
            <button style={PS.bottomBtn} onClick={()=>{if(!locked)setShowSpeed(s=>!s)}}>
              <IcoSpeed/>
              <span>Speed ({speed}x)</span>
              {showSpeed && (
                <div style={PS.speedMenu}>
                  {SPEEDS.map(s=>(
                    <button key={s} style={{...PS.speedOpt,...(speed===s?PS.speedActive:{})}}
                      onClick={e=>{e.stopPropagation();setSpeed(s);if(videoRef.current)videoRef.current.playbackRate=s;setShowSpeed(false);}}>
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </button>
            <button style={{...PS.bottomBtn,...(locked?PS.lockedBtn:{})}} onClick={()=>setLocked(l=>!l)}>
              {locked ? <IcoLock/> : <IcoUnlock/>}
              <span>{locked?"Locked":"Lock"}</span>
            </button>
            <button style={PS.bottomBtn} onClick={()=>{if(!locked&&videoRef.current)videoRef.current.currentTime+=85;}}>
              <IcoSkip/>
              <span>+85 s</span>
            </button>
          </div>
        </div>

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap');`}</style>
      </div>
    );
  }

  // ══ LIBRARY ══════════════════════════════════════════════════════════════
  return (
    <div style={LS.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(108,139,255,0.3);border-radius:4px;}
        .fc:hover{background:rgba(108,139,255,0.09)!important;border-color:rgba(108,139,255,0.3)!important;transform:translateX(-2px);}
        .ftab:hover{background:rgba(255,255,255,0.07)!important;}
        .abtn:hover{opacity:.8;}
        input[type=file]{display:none;}
      `}</style>

      {/* HEADER */}
      <div style={LS.header}>
        <div style={LS.logoRow}>
          <div style={LS.logo}>
            <span style={LS.logoYo}>Yo</span>
            <span style={LS.logoP}>Player</span>
            <span style={LS.logoDot}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="abtn" style={LS.abtn} onClick={()=>setListMode(m=>m==="list"?"grid":"list")}>
              {listMode==="list"?<IcoGrid/>:<IcoList/>}
            </button>
            <button className="abtn" style={LS.abtn} onClick={()=>setShowOF(true)}>
              <IcoFolder size={15}/><span>فتح</span>
            </button>
            <button className="abtn" style={{...LS.abtn,...LS.abtnP}} onClick={()=>setShowNF(true)}>
              <IcoFolderPlus/><span>جديد</span>
            </button>
          </div>
        </div>
        <div style={LS.searchBox}>
          <div style={{color:"rgba(255,255,255,0.3)",display:"flex"}}><IcoSearch/></div>
          <input style={LS.searchIn} placeholder="ابحث عن فيديو..."
            value={query} onChange={e=>setQuery(e.target.value)}/>
          {query&&<button style={LS.clearBtn} onClick={()=>setQuery("")}><IcoX/></button>}
        </div>
      </div>

      {/* FOLDER TABS */}
      <div style={LS.tabRow}>
        {[null,...folders].map((f,i)=>(
          <button key={i} className="ftab"
            style={{...LS.tab,...(selFolder===f?LS.tabActive:{})}}
            onClick={()=>setSelFolder(f===selFolder&&f!==null?null:f)}>
            {f?<><IcoFolder size={12}/><span>{f}</span></>:<span>الكل</span>}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div style={LS.stats}>
        <span style={LS.statTxt}>{filtered.length} ملف</span>
        <span style={LS.statDot}>•</span>
        <span style={LS.statTxt}>ADM Downloads</span>
        <div style={{flex:1}}/>
        <label className="abtn" style={{...LS.abtn,...LS.abtnP,cursor:"pointer",fontSize:12}}>
          <input type="file" accept="video/*" onChange={e=>{
            const f=e.target.files[0];
            if(!f)return;
            const fake={id:99,name:f.name,size:(f.size/(1024*1024*1024)).toFixed(2)+" GB",dur:"--:--",folder:"Local"};
            openFile(fake);
            setTimeout(()=>{
              if(videoRef.current){
                videoRef.current.src=URL.createObjectURL(f);
                videoRef.current.load();
              }
            },100);
          }}/>
          <IcoFilm size={13}/><span>فتح ملف</span>
        </label>
      </div>

      {/* FILE LIST / GRID */}
      <div style={{padding:"0 12px 30px"}}>
        {listMode==="grid" ? (
          <div style={LS.grid}>
            {filtered.map(f=>(
              <div key={f.id} className="fc" style={{...LS.gridCard,transition:"all .2s",cursor:"pointer"}}
                onClick={()=>openFile(f)}>
                <Thumb file={f} large/>
                <div style={{padding:"8px 4px 4px"}}>
                  <div style={LS.gridName}>{f.name}</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                    <span style={LS.chip}>{f.size}</span>
                    <span style={{...LS.chip,color:ec(f.name)}}>{f.name.split(".").pop().toUpperCase()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filtered.map(f=>(
              <div key={f.id} className="fc" style={{...LS.row,transition:"all .2s",cursor:"pointer"}}
                onClick={()=>openFile(f)}>
                <Thumb file={f}/>
                <div style={LS.rowInfo}>
                  <div style={LS.rowName}>{f.name}</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end",marginTop:5}}>
                    <span style={LS.chip}>{f.size}</span>
                    <span style={LS.chip}><IcoFolder size={11}/> {f.folder}</span>
                    <span style={{...LS.chip,color:ec(f.name)}}>{f.name.split(".").pop().toUpperCase()}</span>
                  </div>
                </div>
                <IcoChevron/>
              </div>
            ))}
          </div>
        )}
        {filtered.length===0&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 0",gap:12}}>
            <div style={{opacity:.2,color:"white"}}><IcoFilm size={52}/></div>
            <span style={{color:"rgba(255,255,255,.25)",fontSize:15}}>لا توجد ملفات</span>
          </div>
        )}
      </div>

      {/* NEW FOLDER MODAL */}
      {showNF&&(
        <div style={LS.modalBg} onClick={()=>setShowNF(false)}>
          <div style={LS.modal} onClick={e=>e.stopPropagation()}>
            <div style={LS.modalTitle}><IcoFolderPlus/> إنشاء مجلد جديد</div>
            <input style={LS.modalIn} placeholder="اسم المجلد..." value={nfName}
              onChange={e=>setNfName(e.target.value)} autoFocus/>
            <div style={{display:"flex",gap:10}}>
              <button style={LS.btnC} onClick={()=>setShowNF(false)}>إلغاء</button>
              <button style={LS.btnK} onClick={()=>{
                if(nfName.trim())setFolders(f=>[...f,nfName.trim()]);
                setShowNF(false);setNfName("");
              }}>إنشاء</button>
            </div>
          </div>
        </div>
      )}

      {/* OPEN FOLDER MODAL */}
      {showOF&&(
        <div style={LS.modalBg} onClick={()=>setShowOF(false)}>
          <div style={LS.modal} onClick={e=>e.stopPropagation()}>
            <div style={LS.modalTitle}><IcoFolder size={18}/> اختر مجلداً</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
              {folders.map(f=>(
                <button key={f} style={{...LS.fItem,...(selFolder===f?LS.fItemA:{})}}
                  onClick={()=>{setSelFolder(f);setShowOF(false);}}>
                  <IcoFolder size={15}/><span style={{flex:1}}>{f}</span>
                  <span style={LS.fCount}>{files.filter(x=>x.folder===f).length}</span>
                </button>
              ))}
            </div>
            <button style={LS.btnC} onClick={()=>setShowOF(false)}>إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Player styles ──────────────────────────────────────────────────────────
const PS = {
  root:{ width:"100%",height:"100vh",background:"#000",position:"relative",
    overflow:"hidden",fontFamily:"'Cairo',sans-serif",userSelect:"none" },
  video:{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",cursor:"pointer" },
  gradTop:{ position:"absolute",top:0,left:0,right:0,height:120,
    background:"linear-gradient(180deg,rgba(0,0,0,.75) 0%,transparent 100%)",pointerEvents:"none",zIndex:1 },
  gradBottom:{ position:"absolute",bottom:0,left:0,right:0,height:180,
    background:"linear-gradient(0deg,rgba(0,0,0,.85) 0%,transparent 100%)",pointerEvents:"none",zIndex:1 },
  placeholder:{ position:"absolute",inset:0,display:"flex",flexDirection:"column",
    alignItems:"center",justifyContent:"center",zIndex:2 },
  openBtn:{ display:"flex",alignItems:"center",gap:8,background:"rgba(108,139,255,0.2)",
    border:"1px solid rgba(108,139,255,0.4)",color:"#a0b4ff",padding:"10px 20px",
    borderRadius:12,cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:14 },
  flash:{ position:"absolute",top:"50%",transform:"translateY(-50%)",zIndex:20,pointerEvents:"none" },
  flashBox:{ display:"flex",alignItems:"center",gap:6,background:"rgba(0,0,0,0.5)",
    border:"1px solid rgba(255,255,255,0.2)",color:"#fff",padding:"10px 16px",
    borderRadius:12,fontFamily:"monospace",fontSize:14,backdropFilter:"blur(8px)" },
  overlay:{ position:"absolute",inset:0,display:"flex",flexDirection:"column",
    justifyContent:"space-between",zIndex:10,transition:"opacity .3s" },
  topBar:{ display:"flex",alignItems:"center",padding:"16px 16px 8px",gap:12 },
  circBtn:{ width:40,height:40,borderRadius:"50%",background:"rgba(0,0,0,0.45)",
    border:"1px solid rgba(255,255,255,0.15)",color:"#fff",cursor:"pointer",
    display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,backdropFilter:"blur(4px)" },
  title:{ flex:1,color:"#fff",fontSize:13,fontWeight:600,textAlign:"center",
    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",direction:"ltr" },
  sideLeft:{ position:"absolute",top:"50%",left:16,transform:"translateY(-50%)",
    display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",zIndex:15 },
  sideRight:{ position:"absolute",top:"50%",right:16,transform:"translateY(-50%)",
    display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",zIndex:15 },
  sideVal:{ fontSize:10,color:"rgba(255,255,255,.65)",fontFamily:"monospace" },
  vTrack:{ width:4,height:140,background:"rgba(255,255,255,.15)",borderRadius:4,position:"relative" },
  vFill:{ position:"absolute",bottom:0,left:0,width:"100%",borderRadius:4,transition:"height .08s" },
  vThumb:{ position:"absolute",left:"50%",transform:"translate(-50%,50%)",width:14,height:14,
    background:"#fff",borderRadius:"50%",boxShadow:"0 0 8px rgba(108,139,255,.7)",transition:"bottom .08s" },
  centerRow:{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
    display:"flex",alignItems:"center",gap:28,zIndex:15 },
  seekBtn:{ background:"none",border:"none",cursor:"pointer",padding:0,transition:"transform .15s" },
  playBtn:{ width:68,height:68,borderRadius:"50%",background:"rgba(255,255,255,.13)",
    border:"2px solid rgba(255,255,255,.25)",cursor:"pointer",
    display:"flex",alignItems:"center",justifyContent:"center",
    boxShadow:"0 0 40px rgba(108,139,255,.3)",transition:"transform .15s",backdropFilter:"blur(4px)" },
  progressWrap:{ display:"flex",alignItems:"center",padding:"0 16px",gap:10,marginBottom:8 },
  timeLabel:{ fontFamily:"monospace",fontSize:12,color:"rgba(255,255,255,.75)",whiteSpace:"nowrap" },
  progTrack:{ flex:1,height:4,background:"rgba(255,255,255,.2)",borderRadius:4,
    position:"relative",cursor:"pointer" },
  progBuf:{ position:"absolute",left:0,top:0,height:"100%",background:"rgba(255,255,255,.18)",borderRadius:4 },
  progFill:{ position:"absolute",left:0,top:0,height:"100%",
    background:"linear-gradient(90deg,#6c8bff,#a78bfa)",borderRadius:4,transition:"width .1s linear" },
  progThumb:{ position:"absolute",top:"50%",transform:"translate(-50%,-50%)",
    width:14,height:14,background:"#fff",borderRadius:"50%",
    boxShadow:"0 0 10px rgba(108,139,255,.9)",transition:"left .1s linear" },
  bottomBar:{ display:"flex",alignItems:"center",justifyContent:"space-around",padding:"8px 16px 20px" },
  bottomBtn:{ display:"flex",alignItems:"center",gap:7,color:"rgba(255,255,255,.8)",
    fontSize:13,background:"none",border:"none",cursor:"pointer",padding:"8px 12px",
    borderRadius:10,position:"relative",fontFamily:"'Cairo',sans-serif" },
  lockedBtn:{ color:"#ff9f43",background:"rgba(255,159,67,.1)" },
  speedMenu:{ position:"absolute",bottom:"110%",left:"50%",transform:"translateX(-50%)",
    background:"#12121e",border:"1px solid rgba(108,139,255,.3)",borderRadius:12,
    padding:8,display:"flex",flexDirection:"column",gap:4,minWidth:80,
    zIndex:100,boxShadow:"0 -8px 30px rgba(0,0,0,.6)",marginBottom:4 },
  speedOpt:{ background:"none",border:"none",color:"rgba(255,255,255,.7)",
    padding:"7px 12px",borderRadius:8,cursor:"pointer",fontFamily:"monospace",fontSize:13 },
  speedActive:{ background:"rgba(108,139,255,.25)",color:"#a0b4ff",fontWeight:700 },
};

// ── Library styles ─────────────────────────────────────────────────────────
const LS = {
  root:{ minHeight:"100vh",background:"#08080f",color:"#e8e8f0",
    fontFamily:"'Cairo',sans-serif",direction:"rtl" },
  header:{ background:"linear-gradient(180deg,#0e0e1c,#08080f)",
    padding:"20px 16px 12px",borderBottom:"1px solid rgba(108,139,255,.1)" },
  logoRow:{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14 },
  logo:{ display:"flex",alignItems:"baseline",gap:3 },
  logoYo:{ fontFamily:"monospace",fontSize:28,fontWeight:700,
    background:"linear-gradient(135deg,#6c8bff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" },
  logoP:{ fontFamily:"monospace",fontSize:15,color:"#444",letterSpacing:2 },
  logoDot:{ width:6,height:6,borderRadius:"50%",background:"#6c8bff",marginBottom:10,marginRight:4 },
  abtn:{ display:"flex",alignItems:"center",gap:5,background:"rgba(108,139,255,.1)",
    border:"1px solid rgba(108,139,255,.25)",color:"#a0b4ff",padding:"7px 12px",
    borderRadius:10,cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:13,transition:"opacity .2s" },
  abtnP:{ background:"linear-gradient(135deg,rgba(108,139,255,.2),rgba(167,139,250,.2))",
    border:"1px solid rgba(108,139,255,.4)" },
  searchBox:{ display:"flex",alignItems:"center",background:"rgba(255,255,255,.04)",
    border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"10px 14px",gap:10 },
  searchIn:{ flex:1,background:"none",border:"none",outline:"none",color:"#e8e8f0",
    fontFamily:"'Cairo',sans-serif",fontSize:14,direction:"rtl" },
  clearBtn:{ background:"none",border:"none",color:"rgba(255,255,255,.35)",cursor:"pointer",display:"flex" },
  tabRow:{ display:"flex",gap:8,padding:"12px 16px",overflowX:"auto",scrollbarWidth:"none" },
  tab:{ background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",
    color:"rgba(255,255,255,.45)",padding:"7px 14px",borderRadius:20,cursor:"pointer",
    fontFamily:"'Cairo',sans-serif",fontSize:13,whiteSpace:"nowrap",
    display:"flex",alignItems:"center",gap:5,transition:"all .2s" },
  tabActive:{ background:"rgba(108,139,255,.18)",borderColor:"rgba(108,139,255,.45)",color:"#a0b4ff" },
  stats:{ display:"flex",alignItems:"center",gap:8,padding:"4px 16px 10px" },
  statTxt:{ fontSize:12,color:"rgba(255,255,255,.28)" },
  statDot:{ color:"rgba(255,255,255,.15)",fontSize:10 },
  grid:{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:12 },
  gridCard:{ background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,overflow:"hidden" },
  gridName:{ fontSize:11,fontWeight:600,color:"#dde",overflow:"hidden",
    textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",
    direction:"ltr",textAlign:"right",lineHeight:1.4 },
  row:{ background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",
    borderRadius:14,display:"flex",alignItems:"center",gap:12,padding:"10px 12px" },
  rowInfo:{ flex:1,minWidth:0 },
  rowName:{ fontSize:13,fontWeight:600,color:"#e0e0f0",whiteSpace:"nowrap",
    overflow:"hidden",textOverflow:"ellipsis",direction:"ltr",textAlign:"right" },
  chip:{ fontSize:11,color:"rgba(255,255,255,.3)",fontFamily:"monospace",
    display:"flex",alignItems:"center",gap:3 },
  modalBg:{ position:"fixed",inset:0,background:"rgba(0,0,0,.8)",display:"flex",
    alignItems:"center",justifyContent:"center",zIndex:100,backdropFilter:"blur(6px)" },
  modal:{ background:"#12121e",border:"1px solid rgba(108,139,255,.3)",borderRadius:20,
    padding:24,width:310,direction:"rtl",boxShadow:"0 20px 60px rgba(0,0,0,.6)" },
  modalTitle:{ fontSize:15,fontWeight:700,marginBottom:16,color:"#a0b4ff",
    display:"flex",alignItems:"center",gap:8 },
  modalIn:{ width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",
    borderRadius:10,padding:"10px 14px",color:"#e8e8f0",fontFamily:"'Cairo',sans-serif",
    fontSize:14,outline:"none",marginBottom:16,direction:"rtl" },
  btnC:{ flex:1,padding:10,borderRadius:10,border:"none",background:"rgba(255,255,255,.07)",
    color:"rgba(255,255,255,.55)",cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:14,fontWeight:600 },
  btnK:{ flex:1,padding:10,borderRadius:10,border:"none",
    background:"linear-gradient(135deg,#6c8bff,#a78bfa)",color:"#fff",
    cursor:"pointer",fontFamily:"'Cairo',sans-serif",fontSize:14,fontWeight:700 },
  fItem:{ background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",
    borderRadius:10,padding:"10px 14px",cursor:"pointer",color:"#ccc",
    fontFamily:"'Cairo',sans-serif",fontSize:14,display:"flex",alignItems:"center",gap:10 },
  fItemA:{ background:"rgba(108,139,255,.15)",borderColor:"rgba(108,139,255,.4)",color:"#a0b4ff" },
  fCount:{ background:"rgba(108,139,255,.2)",color:"#a0b4ff",padding:"2px 8px",
    borderRadius:20,fontSize:12,fontFamily:"monospace" },
};
