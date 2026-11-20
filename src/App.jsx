import * as React from "react";
import * as Jsx from "react/jsx-runtime";
import confetti from "canvas-confetti";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Credit from "./Credit";

const cx = (...args) =>
  args
    .filter((e, idx, arr) => !!e && e.trim() !== "" && arr.indexOf(e) === idx)
    .join(" ")
    .trim();

const kebabCase = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const camelCase = (e) =>
  e.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, t, n) => (n ? n.toUpperCase() : t.toLowerCase()));
const pascalCase = (e) => {
  const t = camelCase(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const hasAria = (e) => {
  for (const t in e) {
    if (t.startsWith("aria-") || t === "role" || t === "title") return true;
  }
  return false;
};

const createIcon = (name, iconNode) => {
  const Component = React.forwardRef(
    (
      {
        color = "currentColor",
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className = "",
        children,
        ...rest
      },
      ref,
    ) =>
      React.createElement(
        "svg",
        {
          ref,
          ...svgBase,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
          className: cx("lucide", `lucide-${kebabCase(pascalCase(name))}`, `lucide-${name}`, className),
          ...(!children && !hasAria(rest) && { "aria-hidden": "true" }),
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ],
      ),
  );
  Component.displayName = pascalCase(name);
  return Component;
};

const IconCalendarPlus = createIcon("calendar-plus", [
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  [
    "path",
    {
      d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5",
      key: "1glfrc",
    },
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
]);

const IconChevronDown = createIcon("chevron-down", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
const IconChevronLeft = createIcon("chevron-left", [["path", { d: "m15 18-6-6 6-6", key: "148f4l" }]]);
const IconChevronRight = createIcon("chevron-right", [["path", { d: "m9 18 6-6-6-6", key: "484f4r" }]]);

const IconClock = createIcon("clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
]);

const IconHeart = createIcon("heart", [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0",
    },
  ],
]);

const IconMapPin = createIcon("map-pin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
]);

const IconNavigation = createIcon("navigation", [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }],
]);

const IconSparkles = createIcon("sparkles", [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr",
    },
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }],
]);

const IconPhone = createIcon("phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "18ioyo",
    },
  ],
]);

const IconMusic = createIcon("music", [
  ["path", { d: "M9 18V5l12-2v13", key: "148f3p" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fq0q9" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1n0dcf" }],
]);

const IconSun = createIcon("sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "197v0" }],
  ["path", { d: "M12 20v2", key: "11y6e1" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "1e1y1v" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "1t0lcf" }],
  ["path", { d: "M2 12h2", key: "1t1e6d" }],
  ["path", { d: "M20 12h2", key: "1bpw96" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1d5e3s" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "19h7v4" }],
]);

const IconShirt = createIcon("shirt", [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
      key: "3v8t0w",
    },
  ],
]);

function AuroraBackground({ className = "", intensity = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div
        className="absolute -top-1/3 left-[-20%] h-[80%] w-[90%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.55 0.13 160 / 0.55), transparent 65%)",
          animation: "aurora-drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[10%] right-[-25%] h-[75%] w-[85%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.8 0.12 85 / 0.5), transparent 65%)",
          animation: "aurora-drift 24s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[10%] h-[70%] w-[80%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.52 0.16 18 / 0.4), transparent 65%)",
          animation: "aurora-drift 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundImage: "radial-gradient(oklch(0.98 0.02 92 / 0.35) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}

function FloatingPetals({ count = 14, burst = false }) {
  const petals = React.useMemo(
    () =>
      Array.from({ length: count }, (_, n) => ({
        id: n,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        delay: burst ? Math.random() * 0.4 : Math.random() * 12,
        duration: (burst ? 3.2 : 11) + Math.random() * 6,
        drift: (Math.random() - 0.5) * 140,
        spin: 180 + Math.random() * 540,
        hue: Math.random() > 0.5 ? "oklch(0.78 0.115 85)" : "oklch(0.62 0.13 18)",
        opacity: 0.35 + Math.random() * 0.45,
      })),
    [count, burst],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute top-[-8%]"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.62,
            borderRadius: "60% 10% 60% 10%",
            background: petal.hue,
            opacity: petal.opacity,
          }}
          initial={{ y: "-10vh", x: 0, rotate: 0 }}
          animate={{ y: "115vh", x: petal.drift, rotate: petal.spin }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: burst ? 0 : Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

const WEDDING_DATA = {
  bride: {
    name: "Mausumi",
    fullName: "Mausumi Beperi",
    parents: {
      father: "Nripendra Narayan Beperi",
      mother: "Mamoni Beperi",
    },
    line: "Daughter of Mr. Nripendra Narayan Beperi & Mrs. Mamoni Beperi",
    image: "/gallery/DSC_4786.jpg",
  },
  groom: {
    name: "Rajib",
    fullName: "Rajib Roy",
    parents: {
      father: "Sushil Roy",
      mother: "Aloka Roy",
    },
    line: "Son of Mr. Sushil Roy & Mrs. Aloka Roy",
    image: "/gallery/DSC_4769.jpg",
  },
  dateISO: "2026-11-25T22:00:00+05:30",
  endISO: "2026-11-26T03:00:00+05:30",
  dateLabel: "Wednesday, 25 November 2026",
  timeLabel: "10:00 PM onwards",
  muhurthamLabel: "Wedding · 10:00 PM",
  venue: {
    name: "Baromera",
    address: "Baromera",
    mapUrl: "https://goo.gl/maps/6kYq2x1wtKtLDLDd6?g_st=ac",
  },
  functions: [
    {
      id: "haldi-mehendi",
      name: "Haldi & Mehendi",
      subtitle: "Auspicious Celebrations",
      icon: IconSun,
      date: "25th Nov 2026",
      day: "Wednesday",
      time: "10:00 PM onwards",
      venue: "Baromera",
      mapUrl: "https://goo.gl/maps/6kYq2x1wtKtLDLDd6?g_st=ac",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      subtitle: "The Sacred Muhurtham",
      icon: IconHeart,
      date: "25th Nov 2026",
      day: "Wednesday",
      time: "10:00 PM onwards",
      venue: "Baromera",
      mapUrl: "https://goo.gl/maps/6kYq2x1wtKtLDLDd6?g_st=ac",
      highlight: true,
    },
    {
      id: "reception",
      name: "Reception Ceremony",
      subtitle: "Celebration & Blessings",
      icon: IconSparkles,
      date: "27th Nov 2026",
      day: "Friday",
      time: "4:00 PM onwards",
      venue: "Kaldoba (Kaldoba Pt II)",
      mapUrl: "https://maps.google.com/?q=26.215859,89.775972",
    },
  ],
  gallery: [
    "/gallery/DSC_4739.jpg",
    "/gallery/DSC_4742.jpg",
    "/gallery/DSC_4743.jpg",
    "/gallery/DSC_4747.jpg",
    "/gallery/DSC_4754.jpg",
    "/gallery/DSC_4760.jpg",
    "/gallery/DSC_4769.jpg",
    "/gallery/DSC_4776.jpg",
    "/gallery/DSC_4786.jpg",
    "/gallery/DSC_4807.jpg",
    "/gallery/DSC_4879.jpg",
    "/gallery/DSC_4880.jpg",
    "/gallery/DSC_4886.jpg",
    "/gallery/DSC_4894.jpg",
    "/gallery/DSC_4896.jpg",
  ],
  contacts: ["9365717051"],
};

function HeroSection() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });
  const bgShift = useTransform(smoothProgress, [0, 1], ["0%", "22%"]);
  const garlandShift = useTransform(smoothProgress, [0, 1], ["0%", "38%"]);
  const textShift = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="bg-emerald-deep relative flex h-[100svh] min-h-[640px] w-full flex-col items-center justify-center overflow-hidden"
    >
      <AuroraBackground intensity={1} />
      <div className="from-emerald-ink/50 via-emerald-deep/20 to-emerald-ink/90 absolute inset-0 bg-gradient-to-b" />
      <motion.div
        aria-hidden="true"
        style={{
          y: bgShift,
          background: "radial-gradient(ellipse at 50% 50%, oklch(0.93 0.05 92 / 0.45), transparent 65%)",
        }}
        className="absolute inset-0 m-auto h-[70%] w-[120%] rounded-full blur-3xl"
      />
      <FloatingPetals count={14} />
      <motion.img
        src="/images/garland.png"
        alt=""
        aria-hidden="true"
        style={{ y: garlandShift }}
        className="pointer-events-none absolute -top-2 left-1/2 w-[135%] max-w-none -translate-x-1/2 opacity-90"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 pt-10 pb-16 text-center my-auto">
        <motion.div style={{ y: textShift, opacity: textOpacity }} className="flex flex-col items-center justify-center w-full">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-gold-soft/90 text-xs tracking-[0.45em] uppercase font-light mb-16 sm:mb-20 -mt-6 sm:-mt-8"
          >
            Together with their families
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.4,
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 mb-6 flex flex-col items-center select-none"
          >
            <span
              className="text-gold-foil font-normal text-center"
              style={{
                fontFamily: "'Alex Brush', 'Pinyon Script', 'Great Vibes', cursive",
                fontSize: "clamp(4rem, 15vw, 6rem)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                textShadow: "0 4px 28px rgba(212, 175, 55, 0.45)",
              }}
            >
              {WEDDING_DATA.bride.name}
            </span>
            <span
              className="text-gold my-1 font-normal"
              style={{
                fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                fontSize: "clamp(2.6rem, 8.5vw, 3.6rem)",
                lineHeight: 0.85,
                filter: "drop-shadow(0 2px 12px rgba(212, 175, 55, 0.4))",
              }}
            >
              &amp;
            </span>
            <span
              className="text-gold-foil font-normal text-center"
              style={{
                fontFamily: "'Alex Brush', 'Pinyon Script', 'Great Vibes', cursive",
                fontSize: "clamp(4rem, 15vw, 6rem)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                textShadow: "0 4px 28px rgba(212, 175, 55, 0.45)",
              }}
            >
              {WEDDING_DATA.groom.name}
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="rule-gold mt-8 w-44"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="text-ivory mt-6 text-base tracking-[0.4em] uppercase font-medium"
          >
            25 · 11 · 2026
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="text-ivory/70 mt-2 text-xs tracking-[0.28em] uppercase"
          >
            Wednesday · Baromera
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: textOpacity }}
        className="text-gold/70 absolute bottom-4 z-20 flex flex-col items-center"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <IconChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function ParallaxWrap({ children, speed = 40, scaleRange, className = "" }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const yVal = useTransform(smooth, [0, 1], [speed, -speed]);
  const scaleVal = useTransform(smooth, [0, 0.5, 1], [scaleRange?.[0] ?? 1, scaleRange?.[1] ?? 1, scaleRange?.[0] ?? 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: yVal, scale: scaleVal }}>{children}</motion.div>
    </div>
  );
}

const revealVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="rule-gold w-16" />
      {label ? (
        <span className="font-sans text-[0.65rem] tracking-[0.42em] text-gold uppercase font-medium">
          {label}
        </span>
      ) : (
        <span className="text-gold text-sm">✦</span>
      )}
      <span className="rule-gold w-16" />
    </div>
  );
}

function PersonCard({ person, role }) {
  return (
    <FadeIn className="relative">
      <div className="bg-[#FAF7F0] border border-gold/45 shadow-luxe relative overflow-hidden rounded-[2.25rem] px-6 sm:px-8 py-8 min-h-[250px] flex flex-col justify-center">
        {/* Subtle decorative inner border */}
        <div className="pointer-events-none absolute inset-2.5 rounded-[1.75rem] border border-gold/20" />

        <div className="relative z-10 flex flex-col items-center text-center w-full">
          {/* Couple portrait from new images */}
          {person.image && (
            <div className="relative mb-5">
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-2 border-gold/60 shadow-gold p-1 bg-gradient-to-tr from-gold/40 via-gold/10 to-gold/40">
                <img
                  src={person.image}
                  alt={person.fullName}
                  loading="lazy"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-secondary text-gold px-3 py-0.5 rounded-full border border-gold/40 text-[0.62rem] tracking-[0.2em] uppercase font-semibold">
                ✦
              </span>
            </div>
          )}

          {/* Role header with gold wings */}
          <div className="inline-flex items-center justify-center gap-2.5">
            <span className="rule-gold w-8 opacity-70" />
            <span className="text-gold text-[0.72rem] tracking-[0.45em] uppercase font-semibold">
              {role}
            </span>
            <span className="rule-gold w-8 opacity-70" />
          </div>

          {/* Full Name */}
          <h3 className="text-primary font-display mt-4 text-3xl sm:text-[2.6rem] font-normal leading-tight tracking-wide">
            {person.fullName}
          </h3>

          {/* Ornate Divider */}
          <div className="my-5 flex items-center justify-center gap-2.5 w-full">
            <span className="rule-gold w-20 opacity-80" />
            <span className="text-gold text-sm leading-none">✦</span>
            <span className="rule-gold w-20 opacity-80" />
          </div>

          {/* Parents info box with clean 2-column key/value alignment */}
          <div className="w-full max-w-[340px] bg-secondary/60 border border-gold/25 rounded-2xl py-4 px-5 shadow-xs">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-center gap-2 text-left">
                <span className="text-muted-foreground uppercase tracking-wider text-[0.68rem] font-bold shrink-0 min-w-[55px] text-right">
                  Father:
                </span>
                <span className="text-foreground font-semibold text-sm">
                  {person.parents.father}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-left">
                <span className="text-muted-foreground uppercase tracking-wider text-[0.68rem] font-bold shrink-0 min-w-[55px] text-right">
                  Mother:
                </span>
                <span className="text-foreground font-semibold text-sm">
                  {person.parents.mother}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function CoupleSection() {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -top-6 -left-10 w-44 opacity-40"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -right-10 -bottom-6 w-44 rotate-180 opacity-40"
      />
      <div className="relative mx-auto max-w-md">
        <FadeIn className="text-center">
          <SectionDivider label="The Couple" />
          <h2 className="text-primary mt-5 text-4xl font-light">Two Hearts, One Journey</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-sm leading-relaxed">
            With the blessings of our beloved parents and families, we take the sacred vows of love, trust, and companionship.
          </p>
        </FadeIn>
        <div className="mt-10 space-y-8">
          <ParallaxWrap speed={26}>
            <PersonCard person={WEDDING_DATA.bride} role="The Bride" />
          </ParallaxWrap>
          <div className="flex justify-center">
            <span className="font-script text-gold animate-float-soft text-5xl">&</span>
          </div>
          <ParallaxWrap speed={-26}>
            <PersonCard person={WEDDING_DATA.groom} role="The Groom" />
          </ParallaxWrap>
        </div>
      </div>
    </section>
  );
}

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
    <section style={{ position:"relative", overflow:"hidden", padding:"64px 0", background:"var(--background)", borderTop:"1px solid rgba(212,175,55,0.2)", borderBottom:"1px solid rgba(212,175,55,0.2)" }}>
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
                � {photoTitles[idx % photoTitles.length]}
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

const weddingTimestamp = new Date(WEDDING_DATA.dateISO).getTime();

function calculateTimeLeft() {
  const diff = Math.max(0, weddingTimestamp - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownBox({ value, label }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <div className="border-gold/25 bg-emerald-ink/40 relative flex flex-col items-center overflow-hidden rounded-2xl border px-2 py-4 backdrop-blur-sm">
      <div className="relative h-11 w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold-foil font-display absolute inset-0 flex items-center justify-center text-4xl font-light tabular-nums"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-ivory/55 mt-2 text-[0.55rem] tracking-[0.3em] uppercase">
        {label}
      </span>
    </div>
  );
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft);

  React.useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-emerald-ink relative overflow-hidden px-5 py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/mandala-texture.jpg')",
          backgroundSize: "140%",
          backgroundPosition: "center",
        }}
      />
      <div className="from-emerald-ink via-emerald-ink/60 to-emerald-ink absolute inset-0 bg-gradient-to-b" />
      <div className="relative mx-auto max-w-md text-center">
        <FadeIn>
          <SectionDivider label="Counting down" />
          <h2 className="text-ivory mt-5 text-4xl font-light">
            Until we say{" "}
            <span className="font-script text-gold-foil">forever</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-9 grid grid-cols-4 gap-2.5">
            <CountdownBox value={timeLeft.days} label="Days" />
            <CountdownBox value={timeLeft.hours} label="Hours" />
            <CountdownBox value={timeLeft.minutes} label="Mins" />
            <CountdownBox value={timeLeft.seconds} label="Secs" />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-ivory/65 mt-6 text-xs tracking-[0.25em] uppercase font-light">
            {WEDDING_DATA.dateLabel} · 10:00 PM
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function formatIcsDate(isoString) {
  return new Date(isoString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadIcsCalendar() {
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rajib & Mausumi Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${formatIcsDate(WEDDING_DATA.dateISO)}`,
    `DTEND:${formatIcsDate(WEDDING_DATA.endISO)}`,
    `SUMMARY:${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name} Wedding`,
    `LOCATION:${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`,
    `DESCRIPTION:Together with their families, ${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name} invite you to celebrate their wedding ceremony at ${WEDDING_DATA.venue.name}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `rajib-mausumi-wedding.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

function triggerWeddingPopperBlast() {
  const goldAndRoseColors = ["#E6CA65", "#D4AF37", "#FFFFFF", "#F9E8B2", "#C5A059", "#2E5A44"];

  // Burst from left side
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 65,
    origin: { x: 0.15, y: 0.65 },
    colors: goldAndRoseColors,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.1,
    shapes: ["circle", "square"],
    disableForReducedMotion: true,
  });

  // Burst from right side
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 65,
    origin: { x: 0.85, y: 0.65 },
    colors: goldAndRoseColors,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.1,
    shapes: ["circle", "square"],
    disableForReducedMotion: true,
  });

  // Center celebratory starburst
  confetti({
    particleCount: 40,
    spread: 100,
    origin: { x: 0.5, y: 0.6 },
    colors: ["#E6CA65", "#FFFFFF", "#E8A87C"],
    ticks: 220,
    gravity: 0.9,
    scalar: 1.25,
    disableForReducedMotion: true,
  });
}

function FunctionsSection() {
  const blastTriggered = React.useRef(false);

  return (
    <section className="relative px-4 sm:px-6 py-20 bg-background/50">
      <div className="mx-auto max-w-lg">
        <FadeIn className="text-center">
          <SectionDivider label="Wedding Itinerary" />
          <h2 className="text-primary mt-5 text-4xl font-light">
            Functions & Events
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
            Join us in the celebrations and rituals leading to our big day.
          </p>
        </FadeIn>

        <div className="mt-10 space-y-16 sm:space-y-20">
          {WEDDING_DATA.functions.map((fn, idx) => {
            const Icon = fn.icon;
            const isWedding = fn.highlight;
            return (
              <motion.div
                key={fn.id}
                variants={revealVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
                transition={{ delay: idx * 0.08 }}
                className="mb-6 sm:mb-8"
                onViewportEnter={() => {
                  if (isWedding && !blastTriggered.current) {
                    blastTriggered.current = true;
                    // Trigger festive popper blast when wedding card enters viewport
                    triggerWeddingPopperBlast();
                  }
                }}
              >
                <div
                  className={`bg-[#FAF7F0] shadow-luxe overflow-hidden rounded-[2rem] border transition-all duration-300 ${isWedding
                    ? "border-gold/70 ring-2 ring-gold/40 shadow-gold"
                    : "border-gold/35 hover:border-gold/55"
                    }`}
                >
                  {/* Top Bar with Title, Date and Time Badge */}
                  <div
                    style={{
                      padding: "18px 20px",
                      borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
                      background: isWedding
                        ? "linear-gradient(135deg, oklch(33% 0.072 158), oklch(21.5% 0.05 160))"
                        : "rgba(235, 230, 218, 0.45)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", minWidth: 0, flex: 1 }}>
                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "50%",
                            border: isWedding ? "1px solid rgba(212, 175, 55, 0.4)" : "1px solid rgba(212, 175, 55, 0.3)",
                            backgroundColor: isWedding ? "rgba(212, 175, 55, 0.2)" : "rgba(33, 50, 40, 0.08)",
                            color: isWedding ? "var(--gold-soft)" : "var(--primary)",
                            marginTop: "2px",
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <h3
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: "1.35rem",
                              fontWeight: 600,
                              lineHeight: 1.2,
                              color: isWedding ? "#FAF7F0" : "var(--primary)",
                              margin: 0,
                            }}
                          >
                            {fn.name}
                          </h3>
                          {fn.subtitle && (
                            <p
                              style={{
                                fontFamily: "'Alex Brush', cursive",
                                fontSize: "1.15rem",
                                color: isWedding ? "var(--gold-soft)" : "var(--gold)",
                                margin: "2px 0 0 0",
                                lineHeight: 1.1,
                                whiteSpace: "nowrap",
                              }}
                            >
                              ({fn.subtitle})
                            </p>
                          )}
                          <p
                            style={{
                              fontSize: "0.68rem",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              fontWeight: 500,
                              color: isWedding ? "rgba(250, 247, 240, 0.8)" : "var(--muted-foreground)",
                              marginTop: "4px",
                              marginBottom: 0,
                            }}
                          >
                            {fn.day} · {fn.date}
                          </p>
                        </div>
                      </div>

                      <div style={{ flexShrink: 0, marginTop: "2px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "5px 12px",
                            borderRadius: "9999px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.03em",
                            whiteSpace: "nowrap",
                            lineHeight: 1.2,
                            backgroundColor: isWedding ? "var(--gold)" : "#FAF7F0",
                            color: isWedding ? "var(--emerald-ink)" : "var(--primary)",
                            border: isWedding ? "none" : "1px solid rgba(212, 175, 55, 0.35)",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                          }}
                        >
                          {fn.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5">
                    {/* Venue Card */}
                    <div className="bg-white/80 border border-gold/20 rounded-2xl p-4 shadow-xs">
                      <div className="flex items-start gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-gold border border-gold/25 mt-0.5">
                          <IconMapPin className="h-4 w-4" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[0.65rem] font-bold tracking-[0.25em] text-gold uppercase block">
                            Venue
                          </span>
                          <p className="text-foreground text-sm font-medium mt-1 leading-relaxed">
                            {fn.venue}
                          </p>
                          {fn.mapUrl && (
                            <a
                              href={fn.mapUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 hover:underline mt-2.5 font-semibold tracking-wide"
                            >
                              <IconNavigation className="h-3.5 w-3.5" /> View on Google Maps
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dress Theme Card */}
                    {fn.dressTheme && (
                      <div className="bg-secondary/40 border border-gold/20 rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center gap-2.5 mb-2.5 pb-2 border-b border-gold/15">
                          <IconShirt className="h-4 w-4 text-gold shrink-0" />
                          <span className="text-[0.68rem] font-bold tracking-[0.25em] text-gold uppercase">
                            Dress Code Theme
                          </span>
                        </div>
                        <div className="space-y-2 text-xs pl-1">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                            <span className="text-foreground font-semibold shrink-0 min-w-[105px]">
                              Bride & Groom:
                            </span>
                            <span className="text-foreground/85 leading-relaxed">
                              {fn.dressTheme.couple}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                            <span className="text-foreground font-semibold shrink-0 min-w-[105px]">
                              Guests:
                            </span>
                            <span className="text-foreground/85 leading-relaxed">
                              {fn.dressTheme.guests}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const weddingOverviewItems = [
  { icon: IconSparkles, label: "The Ceremony", value: WEDDING_DATA.muhurthamLabel },
  { icon: IconClock, label: "Day & Date", value: `${WEDDING_DATA.dateLabel}` },
  { icon: IconMapPin, label: "Venue", value: WEDDING_DATA.venue.name },
];

function CelebrationSection() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <FadeIn className="text-center">
          <SectionDivider label="Main Wedding" />
          <h2 className="text-primary mt-5 text-4xl font-light">
            The Celebration
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-gold/30 bg-card shadow-luxe mt-8 overflow-hidden rounded-[2rem] border">
            <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-7 text-center">
              <p className="text-gold/80 text-[0.6rem] tracking-[0.45em] uppercase">
                Save the date
              </p>
              <p className="text-ivory font-display mt-2 text-5xl font-light">
                25
              </p>
              <p className="text-ivory/85 text-sm tracking-[0.35em] uppercase">
                November 2026
              </p>
              <p className="text-gold/90 text-xs tracking-[0.25em] uppercase mt-1 font-light">
                Wednesday · 10:00 PM
              </p>
            </div>
            <div className="divide-gold/15 divide-y">
              {weddingOverviewItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 px-6 py-4">
                  <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                      {label}
                    </p>
                    <p className="text-foreground truncate text-sm font-medium">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pt-2 pb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={downloadIcsCalendar}
                className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-4 text-xs tracking-[0.3em] uppercase font-medium cursor-pointer"
              >
                <IconCalendarPlus className="h-4 w-4" />
                Add to calendar
              </motion.button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="border-gold/30 bg-card shadow-luxe mt-6 overflow-hidden rounded-[2rem] border">
            <div className="relative">
              <img
                src="/images/map-preview.jpg"
                alt={`Map to ${WEDDING_DATA.venue.name}`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-48 w-full object-cover"
              />
              <div className="from-card absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>
            <div className="px-6 pt-2 pb-6 text-center">
              <p className="text-primary text-xl font-medium">
                {WEDDING_DATA.venue.name}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed max-w-xs mx-auto">
                {WEDDING_DATA.venue.address}
              </p>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={WEDDING_DATA.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <IconNavigation className="h-4 w-4" />
                Get directions
              </motion.a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div className="border-gold/30 bg-card/80 shadow-luxe mt-6 overflow-hidden rounded-[2rem] border p-6 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-gold mb-2">
              <IconPhone className="h-4 w-4" />
              <span className="text-[0.65rem] tracking-[0.35em] uppercase font-semibold">
                Contact & RSVP
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              For any assistance, travel guidance or queries, please reach out to:
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {WEDDING_DATA.contacts.map((num) => (
                <a
                  key={num}
                  href={`tel:${num}`}
                  className="bg-secondary/60 hover:bg-secondary border border-gold/30 text-foreground px-4 py-2 rounded-full text-xs font-medium tracking-wider inline-flex items-center gap-2 transition-colors"
                >
                  <IconPhone className="h-3 w-3 text-gold" />
                  +91 {num}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-emerald-ink relative overflow-hidden px-5 pt-20 pb-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url('/images/mandala-texture.jpg')",
          backgroundSize: "120%",
          backgroundPosition: "top center",
        }}
      />
      <AuroraBackground intensity={0.5} />
      <div className="from-emerald-ink/70 via-emerald-ink/85 to-emerald-ink absolute inset-0 bg-gradient-to-b" />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -top-4 -left-8 w-36 opacity-30"
      />
      <img
        src="/images/floral-corner.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -top-4 -right-8 w-36 -scale-x-100 opacity-30"
      />
      <div className="relative mx-auto max-w-md text-center">
        <FadeIn>
          <SectionDivider label="With love" />
          <p className="font-script text-gold-foil mt-6 text-4xl leading-snug">
            Come bless our beginning
          </p>
          <p className="text-ivory/70 mx-auto mt-5 max-w-sm text-sm leading-relaxed">
            Your presence and blessings are our greatest gifts as we embark on this sacred journey of love and togetherness.
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-9 flex flex-col items-center">
            <span className="rule-gold w-28" />
            <p
              className="text-ivory mt-6 text-3xl sm:text-4xl font-normal flex items-center justify-center flex-nowrap whitespace-nowrap"
              style={{
                fontFamily: "'Alex Brush', 'Pinyon Script', 'Great Vibes', cursive",
                fontSize: "clamp(2rem, 7vw, 3rem)",
                letterSpacing: "0.02em",
              }}
            >
              <span className="flex-1 text-right">{WEDDING_DATA.bride.name}</span>
              <span
                className="text-gold font-normal text-2xl sm:text-3xl px-3 sm:px-4 shrink-0 relative"
                style={{
                  fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                  top: "-0.04em",
                }}
              >
                &amp;
              </span>
              <span className="flex-1 text-left">{WEDDING_DATA.groom.name}</span>
            </p>
            <p className="text-ivory/50 mt-2 text-[0.6rem] tracking-[0.4em] uppercase">
              25 · 11 · 2026 · Baromera
            </p>
          </div>
        </FadeIn>
        <p className="text-ivory/35 mt-12 flex items-center justify-center gap-1.5 text-[0.6rem] tracking-[0.3em] uppercase">
          Made with <IconHeart className="text-gold h-3 w-3 fill-current" /> for our families & friends
        </p>
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.35em] opacity-70">
        <Credit />
      </div>
    </footer>
  );
}

function EnvelopeOpener({ onOpen }) {
  const [opening, setOpening] = React.useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {[-1, 1].map((direction) => (
        <motion.div
          key={direction}
          className="bg-emerald-ink absolute inset-y-0 w-[51%] overflow-hidden z-10"
          style={{ [direction === -1 ? "left" : "right"]: 0 }}
          animate={opening ? { x: `${direction * 105}%` } : { x: 0 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <AuroraBackground intensity={0.55} />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/images/mandala-texture.jpg')",
              backgroundSize: "cover",
              backgroundPosition: direction === -1 ? "right center" : "left center",
            }}
          />
          <div
            className="absolute inset-y-0 w-[2px]"
            style={{
              [direction === -1 ? "right" : "left"]: 0,
              background: "var(--gradient-gold)",
            }}
          />
        </motion.div>
      ))}
      <FloatingPetals count={10} />
      <AnimatePresence>
        {!opening && (
          <motion.div
            className="relative z-20 flex flex-col items-center px-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold/80 text-[0.55rem] tracking-[0.5em] uppercase">
              A wedding invitation
            </span>
            <h1
              className="text-gold-foil mt-5 text-4xl sm:text-5xl leading-tight font-normal flex items-center justify-center flex-nowrap whitespace-nowrap"
              style={{
                fontFamily: "'Alex Brush', 'Pinyon Script', 'Great Vibes', cursive",
                fontSize: "clamp(2.4rem, 9vw, 3.8rem)",
                letterSpacing: "0.02em",
                textShadow: "0 4px 26px rgba(212, 175, 55, 0.45)",
              }}
            >
              <span className="flex-1 text-right">{WEDDING_DATA.bride.name}</span>
              <span
                className="text-gold px-2.5 sm:px-3 text-2xl sm:text-3xl font-normal shrink-0 relative"
                style={{
                  fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                  filter: "drop-shadow(0 2px 10px rgba(212, 175, 55, 0.35))",
                  top: "-0.04em",
                }}
              >
                &amp;
              </span>
              <span className="flex-1 text-left">{WEDDING_DATA.groom.name}</span>
            </h1>
            <span className="rule-gold mt-6 w-32" />
            <motion.button
              onClick={() => {
                if (!opening) {
                  setOpening(true);
                  onOpen();
                }
              }}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className="group relative mt-12 grid h-28 w-28 place-items-center cursor-pointer select-none"
              aria-label="Open the invitation"
            >
              <motion.span
                className="border-gold/40 absolute inset-0 rounded-full border pointer-events-none"
                animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6,
                  ease: "easeOut",
                }}
              />
              <motion.span
                className="shadow-gold grid h-20 w-20 place-items-center rounded-full pointer-events-none"
                style={{ backgroundImage: "var(--gradient-gold)" }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.4,
                  ease: "easeInOut",
                }}
              >
                <span className="font-medium text-emerald-ink text-2xl tracking-normal flex items-center justify-center" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
                  <span>{WEDDING_DATA.bride.name[0]}</span>
                  <span className="text-base mx-0.5 opacity-75" style={{ fontFamily: "'Alex Brush', cursive" }}>&</span>
                  <span>{WEDDING_DATA.groom.name[0]}</span>
                </span>
              </motion.span>
            </motion.button>
            <motion.p
              className="text-ivory/60 mt-8 text-[0.6rem] tracking-[0.4em] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              Tap the seal to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-40 h-[3px] origin-left"
      style={{ scaleX: scale, backgroundImage: "var(--gradient-gold)" }}
    />
  );
}

export default function WeddingApp() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showOpener, setShowOpener] = React.useState(true);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    // Remove opener from DOM after the sliding doors finish parting
    window.setTimeout(() => setShowOpener(false), 1200);
  };

  return (
    <Jsx.Fragment>
      <AnimatePresence>
        {showOpener && <EnvelopeOpener key="opener" onOpen={handleOpen} />}
      </AnimatePresence>
      {isOpen && <ScrollProgress />}
      <main className="bg-background mx-auto w-full max-w-[520px] overflow-hidden">
        <HeroSection />
        <CoupleSection />
        <CountdownSection />
        <FunctionsSection />
        <CelebrationSection />
        <GallerySection />
        <FooterSection />
      </main>
    </Jsx.Fragment>
  );
}