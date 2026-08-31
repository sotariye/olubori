import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Toaster, toast } from "sonner";
import { 
  Copy, 
  Check, 
  ExternalLink,
  Menu, 
  X,
  ChevronDown
} from "lucide-react";

import baby1 from "../imports/photos/baby1.jpg";
import baby2 from "../imports/photos/baby2.jpg";
import baby3 from "../imports/photos/baby3.jpg";
import baby4 from "../imports/photos/baby4.jpg";
import paypalQr from "../imports/photos/paypal-qr.png";

const photos = [baby3, baby1, baby2, baby4];

const GOLD = "#C5A85A";
const COFFEE = "#3E2723";

// Copy Helper
const copyText = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`${label} copied to clipboard`, {
    style: {
      background: "#FAF5EE",
      color: "#3E2723",
      border: `1px solid ${GOLD}`,
      fontFamily: "'Playfair Display', serif",
      fontSize: "12px",
      borderRadius: "0px"
    }
  });
};

function Nav({ playing, togglePlay }: { playing: boolean; togglePlay: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(250, 245, 238, 0.95)" : "transparent",
          borderBottom: scrolled ? `1px solid rgba(62, 39, 37, 0.05)` : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-serif italic text-xl tracking-wide cursor-pointer select-none"
            style={{ color: COFFEE, fontFamily: "'Playfair Display', serif" }}
          >
            N &amp; E
          </span>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-serif">
            {[
              { label: "Welcome", id: "welcome" },
              { label: "Celebrations", id: "celebrations" },
              { label: "Dress Code", id: "details" },
              { label: "Your Well Wishes", id: "registry" },
              { label: "RSVP", id: "rsvp" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scroll(id)}
                className="text-xs tracking-wider transition-colors duration-300 text-coffee/70 hover:text-coffee cursor-pointer"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {label}
              </button>
            ))}

            {/* Integrated Understated Music Toggle */}
            <span className="text-coffee/30">|</span>
            <button
              onClick={togglePlay}
              className="text-[11px] tracking-widest font-mono text-coffee/60 hover:text-coffee transition-colors duration-300 cursor-pointer"
            >
              {playing ? "[ sound: on ]" : "[ sound: off ]"}
            </button>
          </div>

          {/* Mobile Menu Button + Sound Toggle combo */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={togglePlay}
              className="text-[10px] tracking-wider font-mono text-coffee/60 cursor-pointer"
            >
              {playing ? "[ sound: on ]" : "[ sound: off ]"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-coffee cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-45 bg-[#FAF5EE] flex flex-col justify-center items-center gap-8 md:hidden font-serif"
        >
          {[
            { label: "Welcome", id: "welcome" },
            { label: "The Celebrations", id: "celebrations" },
            { label: "Dress Code & Colours", id: "details" },
            { label: "Your Well Wishes", id: "registry" },
            { label: "RSVP Contacts", id: "rsvp" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scroll(id)}
              className="text-xl tracking-wider text-coffee"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 text-xs uppercase tracking-widest text-coffee/50 cursor-pointer"
          >
            [ close ]
          </button>
        </div>
      )}
    </>
  );
}

function Countdown() {
  const targetDate = new Date("2026-12-26T12:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isOver) return null;

  return (
    <div className="flex flex-col items-center mt-12 font-serif">
      <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80 mb-3">the countdown</span>
      <div className="flex gap-6 text-center">
        {[
          { label: "days", value: timeLeft.days },
          { label: "hours", value: timeLeft.hours },
          { label: "minutes", value: timeLeft.minutes }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-2xl font-light text-coffee">{String(item.value).padStart(2, '0')}</span>
            <span className="text-[9px] tracking-wider text-coffee/40 mt-0.5">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="welcome" className="min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-16 text-center select-none">
      <div className="max-w-3xl w-full">
        
        {/* Soft, minimal top line divider */}
        <div className="w-16 h-[1px] bg-coffee/10 mx-auto mb-10" />

        <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-6 font-semibold">
          THE WEDDING CELEBRATION OF
        </p>

        <h1
          className="text-5xl md:text-7xl font-normal tracking-wide text-coffee leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Nina Sotariye
        </h1>
        <p
          className="text-3xl md:text-4xl my-3 text-gold"
          style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
        >
          &amp;
        </p>
        <h1
          className="text-5xl md:text-7xl font-normal tracking-wide text-coffee leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ebenezer Olubori
        </h1>

        <div className="w-8 h-[1px] bg-gold/30 mx-auto my-8" />

        <div className="max-w-lg mx-auto text-xs md:text-sm text-coffee/75 leading-relaxed font-serif space-y-4">
          <p>
            The families of <strong>Pastor Songo &amp; Pastor Mrs. Esther Ambie-Barango</strong>
            <br />
            and <strong>Apostle Joshua Oluseyi &amp; Deaconess Veronica Tinuade Adejumo</strong>
            <br />
            invite you to share in the joy of their children's wedding.
          </p>
        </div>

        <div className="mt-10 space-y-1 font-serif text-xs text-coffee/60 italic">
          <p>December 26 &amp; 27, 2026</p>
          <p>Port Harcourt, Nigeria</p>
        </div>

        <div className="mt-12 flex justify-center gap-6 text-[10px] tracking-[0.2em] uppercase font-bold font-serif">
          <button
            onClick={() => document.getElementById("celebrations")?.scrollIntoView({ behavior: "smooth" })}
            className="text-coffee border-b border-coffee/20 hover:border-gold hover:text-gold transition-colors pb-1 cursor-pointer"
          >
            the program
          </button>
          <span className="text-coffee/20">•</span>
          <button
            onClick={() => document.getElementById("registry")?.scrollIntoView({ behavior: "smooth" })}
            className="text-coffee border-b border-coffee/20 hover:border-gold hover:text-gold transition-colors pb-1 cursor-pointer"
          >
            well wishes
          </button>
        </div>

        <Countdown />
      </div>
    </section>
  );
}

function Celebrations() {
  const events = [
    {
      title: "Traditional Wedding",
      date: "Saturday, December 26, 2026",
      time: "12:00 PM",
      venue: "Pavillion Event Centre",
      address: "13 Evo Road, Elechi, Port Harcourt",
      notes: "Traditional marriage rites in accordance with family heritage.",
      colours: "Coffee Brown & Gold",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Pavillion+Event+Centre+13+Evo+Road+Elechi+Port+Harcourt"
    },
    {
      title: "Church Ceremony",
      date: "Sunday, December 27, 2026",
      time: "10:00 AM",
      venue: "RCCG Jesus House",
      address: "2b Degema Cl, Obia, Port Harcourt",
      notes: "Solemnization of Holy Matrimony followed by a reception.",
      colours: "Black Tie",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=RCCG+Jesus+House+2b+Degema+Cl+Obia+Port+Harcourt"
    }
  ];

  return (
    <section id="celebrations" className="py-24 px-6 md:px-12 bg-[#F6EFE4]/30 border-y border-coffee/5">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-3 font-semibold">THE CELEBRATIONS</p>
          <h2 
            className="text-3xl md:text-4xl font-normal text-coffee"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            When &amp; Where
          </h2>
          <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 relative">
          
          {/* Vertical divider line on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-coffee/10 -translate-x-1/2" />

          {events.map((ev, idx) => (
            <div key={idx} className="space-y-6 text-center md:text-left">
              <span className="text-[10px] tracking-wider text-gold uppercase font-serif italic">
                {idx === 0 ? "day one" : "day two"}
              </span>
              
              <h3 
                className="text-2xl font-normal text-coffee"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {ev.title}
              </h3>

              <div className="space-y-2 font-serif text-sm text-coffee/80">
                <p>
                  <span className="text-coffee/40 text-xs block uppercase tracking-wider mb-0.5">Date &amp; Time</span>
                  <strong>{ev.date}</strong> at {ev.time}
                </p>
                <p className="pt-2">
                  <span className="text-coffee/40 text-xs block uppercase tracking-wider mb-0.5">Location</span>
                  <strong>{ev.venue}</strong>
                  <br />
                  <span className="text-xs opacity-80">{ev.address}</span>
                </p>
              </div>

              <p className="text-xs text-coffee/60 italic font-serif leading-relaxed max-w-sm mx-auto md:mx-0">
                {ev.notes}
              </p>

              <div className="pt-4">
                <a
                  href={ev.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold text-coffee/70 hover:text-gold transition-colors border-b border-coffee/20 hover:border-gold pb-0.5"
                >
                  view directions
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden bg-[#FAF5EE] border border-gold/20 shadow-sm group">
      {/* Images with crossfade transition */}
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Wedding Portrait ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === i ? 0.9 : 0,
            filter: "sepia(0.15) contrast(1.02)",
            pointerEvents: index === i ? "auto" : "none"
          }}
        />
      ))}

      {/* Carousel controls - visible on hover */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + photos.length) % photos.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#FAF5EE]/60 bg-coffee/20 text-[#FAF5EE] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-coffee/40 cursor-pointer"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={() => setIndex((prev) => (prev + 1) % photos.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#FAF5EE]/60 bg-coffee/20 text-[#FAF5EE] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-coffee/40 cursor-pointer"
        aria-label="Next image"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: index === i ? GOLD : "rgba(250, 245, 238, 0.4)",
              transform: index === i ? "scale(1.2)" : "scale(1)"
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function BabiesAndRegistry() {
  const [activeTab, setActiveTab] = useState<"interac" | "paypal" | "nigeria">("interac");

  const nigeriaAccounts = [
    {
      bank: "Lemmy MFB",
      accountNumber: "6447539926",
      accountName: "Nina Ambie-Barango",
      holder: "Bride"
    },
    {
      bank: "GTBank",
      accountNumber: "0049596521",
      accountName: "Ebenezer O. Adejumo",
      holder: "Groom"
    }
  ];

  return (
    <section id="registry" className="py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-3 font-semibold font-sans">registry</p>
          <h2 
            className="text-3xl md:text-4xl font-normal text-coffee"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Presence is Enough
          </h2>
          <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Carousel */}
          <div className="flex justify-center w-full">
            <ImageCarousel />
          </div>

          {/* Right Column: Wishing Well Content */}
          <div className="space-y-8 font-serif text-coffee/85 md:pt-4">
            <p className="text-sm leading-relaxed text-coffee/70 italic">
              You've watched us grow from toddlers into partners. As we start this next chapter of our lives, your presence completes our day. If you wish to bless us on our new journey with a token of support, cash gifts are greatly appreciated.
            </p>

            <div className="border-t border-coffee/10 pt-6">
              {/* Minimalist Switcher Link Tabs */}
              <div className="flex justify-start gap-4 text-xs tracking-wider mb-6">
                {[
                  { id: "interac", label: "Interac" },
                  { id: "paypal", label: "PayPal" },
                  { id: "nigeria", label: "Bank Transfer" }
                ].map((tab, idx) => (
                  <div key={tab.id} className="flex items-center">
                    {idx > 0 && <span className="text-coffee/20 mr-4 font-sans font-light">|</span>}
                    <button
                      onClick={() => setActiveTab(tab.id as any)}
                      className="transition-colors duration-300 font-medium cursor-pointer pb-0.5"
                      style={{
                        color: activeTab === tab.id ? COFFEE : "rgba(62, 39, 35, 0.4)",
                        borderBottom: activeTab === tab.id ? `1px solid ${GOLD}` : "1px solid transparent"
                      }}
                    >
                      {tab.label}
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic tab content */}
              <div className="py-2">
                {activeTab === "interac" && (
                  <div className="space-y-4">
                    <p className="text-sm text-coffee/80 leading-relaxed">
                      Contributions within Canada can be sent via Interac E-Transfer. Auto-deposit is configured for this account.
                    </p>
                    
                    <div className="inline-flex items-center gap-4 border-b border-coffee/20 py-2">
                      <span className="font-mono text-sm text-coffee font-semibold select-all">nina.ebenezer@outlook.com</span>
                      <button
                        onClick={() => copyText("nina.ebenezer@outlook.com", "E-Transfer Email")}
                        className="text-[10px] tracking-widest text-gold hover:text-coffee transition-colors uppercase font-bold cursor-pointer"
                      >
                        [ copy ]
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "paypal" && (
                  <div className="space-y-6">
                    <p className="text-sm text-coffee/80 leading-relaxed font-serif">
                      International guests who prefer to send secure web contributions can scan the QR code below to contribute via PayPal.
                    </p>
                    
                    <div className="flex flex-col items-center text-center gap-6 bg-[#FAF5EE]/40 p-6 border border-gold/10 rounded-sm">
                      <div className="w-40 h-40 bg-white p-3 border border-gold/20 shadow-sm flex items-center justify-center rounded-sm shrink-0">
                        <img 
                          src={paypalQr} 
                          alt="PayPal QR Code" 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div className="space-y-3 w-full">
                        <p className="text-[10px] text-gold uppercase tracking-widest font-sans font-bold">PayPal Gift</p>
                        <p className="text-xs text-coffee/70 leading-relaxed font-serif max-w-sm mx-auto">
                          Scan the QR code to send any amount. Especially convenient for international guests wishing to use major cards.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "nigeria" && (
                  <div className="space-y-6">
                    <p className="text-sm text-coffee/80 leading-relaxed mb-4">
                      Contributions from Nigeria can be transferred directly to either of the bank accounts listed below:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {nigeriaAccounts.map((acc, index) => (
                        <div key={index} className="space-y-2 border-l border-gold/40 pl-4 py-1">
                          <span className="text-[9px] uppercase tracking-wider text-coffee/40 block">
                            {acc.holder} Account
                          </span>
                          <p className="text-xs text-coffee/50">{acc.bank}</p>
                          <p className="text-sm font-semibold text-coffee leading-tight">{acc.accountName}</p>
                          
                          <div className="flex items-center justify-between pt-1">
                            <span className="font-mono text-sm font-bold text-coffee tracking-wide select-all">{acc.accountNumber}</span>
                            <button
                              onClick={() => copyText(acc.accountNumber, `${acc.holder} account number`)}
                              className="text-[9px] tracking-widest text-gold hover:text-coffee transition-colors uppercase font-bold cursor-pointer"
                            >
                              [ copy ]
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DressCodeAndPalette() {
  return (
    <section id="details" className="py-24 px-6 md:px-12 bg-[#F6EFE4]/30 border-y border-coffee/5 font-serif">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-3 font-semibold font-sans">DETAILS</p>
          <h2 
            className="text-3xl md:text-4xl font-normal text-coffee mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dress Code &amp; Palette
          </h2>
          <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-6" />
        </div>

        <div className="space-y-12 max-w-xl mx-auto">
          {/* Traditional Saturday */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-normal text-coffee font-serif italic">Traditional Wedding Palette</h3>
            <p className="text-sm text-coffee/85 leading-relaxed max-w-md mx-auto">
              For our Traditional Wedding on Saturday, guests are warmly invited to wear ensembles that incorporate our wedding colors:
            </p>
            
            {/* Large, beautiful premium color swatches */}
            <div className="flex justify-center gap-12 mt-6">
              <div className="flex flex-col items-center">
                <div 
                  className="w-18 h-18 md:w-24 md:h-24 rounded-full shadow-md border-2 border-white mb-2 transition-transform duration-300 hover:scale-105" 
                  style={{ background: "#4A3525" }} 
                />
                <span className="text-xs font-semibold text-coffee tracking-wider">Coffee Brown</span>
                <span className="text-[9px] font-mono text-coffee/40">#4A3525</span>
              </div>
              <div className="flex flex-col items-center">
                <div 
                  className="w-18 h-18 md:w-24 md:h-24 rounded-full shadow-md border-2 border-white mb-2 transition-transform duration-300 hover:scale-105" 
                  style={{ background: "#C5A85A" }} 
                />
                <span className="text-xs font-semibold text-coffee tracking-wider">Vintage Gold</span>
                <span className="text-[9px] font-mono text-coffee/40">#C5A85A</span>
              </div>
            </div>
          </div>

          {/* Black Tie Sunday */}
          <div className="border-t border-coffee/10 pt-8 text-center space-y-4">
            <h3 className="text-xl font-normal text-coffee font-serif italic">Black Tie Ceremony</h3>
            <p className="text-sm text-coffee/85 leading-relaxed max-w-md mx-auto">
              Our Church Ceremony on Sunday will be a formal <strong>Black Tie</strong> affair. We request that gentlemen wear formal tuxedos or dark suits with bow ties, and ladies wear elegant floor-length evening attire.
            </p>
          </div>

          {/* Footer note */}
          <div className="border-t border-coffee/10 pt-6 text-center">
            <p className="text-xs italic text-coffee/50 max-w-md mx-auto">
              Should you require assistance coordinating traditional fabrics or Aso-Ebi materials, please contact the family coordinators listed in the RSVP section below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVPAndWellWishes() {
  const [wishesName, setWishesName] = useState("");
  const [wishesMessage, setWishesMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleWishesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishesName.trim() || !wishesMessage.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xkjnoleb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: wishesName,
          message: wishesMessage
        })
      });

      if (response.ok) {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.85 }
        });
        setSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.error || "Failed to send blessing. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-6 md:px-12 bg-transparent font-serif">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-3 font-semibold font-sans">RESPOND</p>
          <h2 
            className="text-3xl md:text-4xl font-normal text-coffee"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            RSVP &amp; Well Wishes
          </h2>
          <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Card RSVP Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-normal text-coffee font-serif">
              RSVP Contact Details
            </h3>
            
            <p className="text-xs tracking-wider uppercase text-gold font-semibold font-sans">
              Kindly respond by September 30, 2026
            </p>
            
            <p className="text-sm text-coffee/85 leading-relaxed">
              As we are not tracking online form submissions, please contact the families directly to confirm your attendance, coordinate colors, or clarify event inquiries.
            </p>

            <div className="space-y-6 border-t border-coffee/10 pt-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-coffee/40 block mb-1">Ambie-Barango Family Coordinator</span>
                <p className="text-sm font-semibold text-coffee">Pastor Mrs. Esther Ambie-Barango</p>
                <a 
                  href="tel:+2349063585083" 
                  className="text-xs text-gold hover:text-coffee transition-colors font-mono font-bold mt-0.5 inline-block"
                >
                  +234 906 358 5083
                </a>
              </div>

              <div className="border-t border-coffee/5 pt-4">
                <span className="text-[10px] uppercase tracking-wider text-coffee/40 block mb-1">Adejumo Family Coordinator</span>
                <p className="text-sm font-semibold text-coffee">Mr. Isaiah Adejumo</p>
                <a 
                  href="tel:+2348030739956" 
                  className="text-xs text-gold hover:text-coffee transition-colors font-mono font-bold mt-0.5 inline-block"
                >
                  +234 803 073 9956
                </a>
              </div>
            </div>
          </div>

          {/* Guest Wishes Guestbook (Letter/Postcard style) */}
          <div className="border border-gold/30 p-8 bg-[#FAF5EE] rounded relative">
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-gold/10 pointer-events-none" />
            
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <p className="font-serif italic text-3xl text-gold" style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}>
                  Thank you
                </p>
                <p className="text-sm text-coffee font-semibold">Your blessing has been shared.</p>
                <p className="text-xs text-coffee/60 leading-relaxed max-w-xs mx-auto">
                  We appreciate your warm wishes as we begin our marriage. You can also send this message to us directly.
                </p>
                
                <div className="pt-4 flex flex-col gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Dear Nina & Ebenezer, ${wishesMessage} - From ${wishesName}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-[10px] tracking-widest uppercase font-bold text-coffee border border-coffee/60 px-4 py-2 hover:border-gold hover:text-gold transition-colors mx-auto"
                  >
                    Send to WhatsApp
                    <ExternalLink size={9} className="ml-1 mt-0.5" />
                  </a>
                  <button
                    onClick={() => {
                      setWishesName("");
                      setWishesMessage("");
                      setSubmitted(false);
                    }}
                    className="text-[10px] tracking-widest uppercase text-coffee/40 hover:text-coffee/70 transition-colors cursor-pointer"
                  >
                    [ write another ]
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWishesSubmit} className="space-y-6">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold/80 font-sans block">
                  LEAVE A BLESSING
                </span>
                
                <p className="text-xs text-coffee/65 leading-relaxed">
                  We would love for you to leave a prayer, note, or blessing in our digital guestbook.
                </p>

                {/* Underline Inputs (replaces boxed fields) */}
                <div className="flex flex-col border-b border-coffee/20 pb-1">
                  <label className="text-[9px] uppercase tracking-wider text-coffee/40 mb-0.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={wishesName}
                    onChange={(e) => setWishesName(e.target.value)}
                    placeholder="e.g., Pastor &amp; Mrs. Smith"
                    className="w-full text-sm bg-transparent outline-none py-1 font-serif text-coffee"
                  />
                </div>

                <div className="flex flex-col border-b border-coffee/20 pb-1">
                  <label className="text-[9px] uppercase tracking-wider text-coffee/40 mb-0.5">Your Message</label>
                  <textarea
                    required
                    rows={3}
                    value={wishesMessage}
                    onChange={(e) => setWishesMessage(e.target.value)}
                    placeholder="Wishing you a lifetime of love and abundant peace..."
                    className="w-full text-sm bg-transparent outline-none py-1 resize-none font-serif text-coffee"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 border border-coffee text-[10px] tracking-widest uppercase font-bold text-coffee hover:bg-coffee hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-16 px-6 text-center border-t relative overflow-hidden"
      style={{ 
        borderColor: `rgba(62, 39, 37, 0.05)`, 
        background: "rgba(246, 239, 228, 0.15)" 
      }}
    >
      <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-6" />
      <p
        className="text-2xl mb-2 text-coffee"
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
      >
        Nina &amp; Ebenezer
      </p>
      <p className="text-[9px] tracking-[0.2em] uppercase text-coffee/50">
        DECEMBER 2026 • PORT HARCOURT, NIGERIA
      </p>
    </footer>
  );
}

export default function App() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Soft classical piano loop stream
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.warn("Audio autoplay blocked by browser:", err);
      });
    }
    setPlaying(!playing);
  };

  return (
    <div 
      className="min-h-screen relative selection:bg-gold/25"
      style={{ background: "#FAF5EE", color: "#3E2723", fontFamily: "'Lato', sans-serif" }}
    >
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      <Nav playing={playing} togglePlay={togglePlay} />
      <Hero />
      <Celebrations />
      <BabiesAndRegistry />
      <DressCodeAndPalette />
      <RSVPAndWellWishes />
      <Footer />
    </div>
  );
}
