import { useEffect, useState } from "react";
import {
  Award,
  ChevronDown,
  Code2,
  Dice5,
  FileText,
  GraduationCap,
  Gamepad2,
  Lightbulb,
  Megaphone,
  Music,
  Network,
  Newspaper,
  PartyPopper,
  Presentation,
  Rocket,
  ShieldCheck,
  SportShoe,
  Ticket,
  Users,
} from "lucide-react";

const candidate = {
  name: "SREESHNAV TR",
};

const manifestoPoints = [
  {
    id: "01",
    title: "Mini Hackathon",
    icon: Code2,
    image: "/mini%20hackthon.png",
   
  },
  {
    id: "02",
    title: "Web Development Workshop",
    icon: Presentation,
    image: "/web%20dev.png",
   
  },
  {
    id: "03",
    title: " Tech with Teachers",
    icon: Megaphone,
    image: "/tech%20with%20teacher.png",
   
  },
  {
    id: "04",
    title: "Musical Eve",
    icon: Music,
    image: "/musical%20eve.png",
   
  },
  {
    id: "05",
    title: "Football/Cricket Tournament",
    icon: SportShoe,
    image: "/fdball%20tounament.png",
   
  },
  {
    id: "06",
    title: "Inaugural Event",
    icon: Rocket,
    image: "/inguaration.png",
   
  },{
    id: "07",
    title: "Batminton Tournament",
    icon: SportShoe,
    image: "/batminton.png",
   
  },{
    id: "08",
    title: "Connect with Alumni",
    icon: Network,
    image: "/connect%20with%20alumni.png",
   
  },{
    id: "09",
    title: "Tech News",
    icon: Newspaper,
    image: "/tech%20news.png",
  },{
    id: "10",
    title: "Hall Ticket Distribution",
    icon: Ticket,
    image: "/hallticket.png",
   
  },{
    id: "11",
    title: "Online Game Tournament",
    icon: Gamepad2,
    image: "/online%20game.png",
  },
  {
    id: "12",
    title: "Academic Excellence Awards",
    icon: Award,
    image: "/excellance%20awrd.png",
   
  },{
    id: "13",
    title: "Indoor Games Fest",
    icon: Dice5,
    image: "/indoorgame.png",
  },
  {
    id: "14",
    title: "Christmas Celebration and Ethnic Day",
    icon: PartyPopper,
    image: "/xmas.png",
   
  },{
    id: "15",
    title: "Previous Year Question Paper Distribution",
    icon: FileText,
    image: "/pyq%20dirstribution.png",
   
  },
];

function Logo({ light = false }) {
  return (
    <a href="#home" className={`logo ${light ? "logo-light" : ""}`} aria-label="SFI home">
      <img src="/vsfi.png" alt="SFI" />
    </a>
  );
}
function Logo2({ light = false }) {
  return (
    <a href="#home" className={`logo logo2 ${light ? "logo-light" : ""}`} aria-label="SFI home">
      <img src="/gd.png" alt="SFI" />
    </a>
  );
}

function Header({ light = false }) {
  return (
    <header className={`site-header ${light ? "site-header-light" : ""}`}>
      <Logo light={light} />
      <a href="#home" className={`logo ${light ? "logo-light" : ""}`} aria-label="SFI home">
      <img src="/entevote.png" alt="SFI" />
    </a>
    </header>
  );
}

function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`${className} fallback-portrait`} aria-label={alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

function ManifestoCard({ item, index }) {
  const Icon = item.icon;

  return (
    <article
      className="paper-card manifesto-card card-reveal"
      style={{
        "--delay": `${(index % 4) * 90}ms`,
        "--card-image": `url("${item.image}")`,
      }}
    >
      <div className="section-number">{item.id}</div>
      <h3>{item.title}</h3>
      <span className="brush-line" />
      <Icon size={24} strokeWidth={2.7} />
      {/* <ul>
        {item.points.map((point) => (
          <li key={point}>
            
            <span>{point}</span>
          </li>
        ))}
      </ul> */}
    </article>
  );
}

export default function App() {
  useEffect(() => {
    let locked = false;
    const snapTargets = ["home", "manifesto", "promises", "vote"];
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll(".card-reveal").forEach((card) => {
      cardObserver.observe(card);
    });

    const manifestoSection = document.getElementById("manifesto");
    const manifestoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          manifestoObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );

    if (manifestoSection) {
      manifestoObserver.observe(manifestoSection);
    }

    const getCurrentIndex = () => {
      const middle = window.scrollY + window.innerHeight / 2;
      return snapTargets.findIndex((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        return middle >= section.offsetTop && middle < section.offsetTop + section.offsetHeight;
      });
    };

    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (!section) return;
      locked = true;
      if (id === "manifesto") {
        const top = section.offsetTop + section.offsetHeight - window.innerHeight;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      } else {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.setTimeout(() => {
        locked = false;
      }, 780);
    };

    const onWheel = (event) => {
      if (locked || Math.abs(event.deltaY) < 18) return;

      const currentIndex = getCurrentIndex();
      const currentId = snapTargets[currentIndex];
      const isDown = event.deltaY > 0;

      if (currentId === "promises") {
        const promises = document.getElementById("promises");
        const top = promises.offsetTop;
        const bottom = top + promises.offsetHeight - window.innerHeight;
        const atTop = window.scrollY <= top + 6;
        const atBottom = window.scrollY >= bottom - 6;

        if (isDown && atBottom) {
          event.preventDefault();
          scrollToSection("vote");
        } else if (!isDown && atTop) {
          event.preventDefault();
          scrollToSection("manifesto");
        }
        return;
      }

      const nextIndex = currentIndex + (isDown ? 1 : -1);
      if (nextIndex >= 0 && nextIndex < snapTargets.length) {
        event.preventDefault();
        scrollToSection(snapTargets[nextIndex]);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      cardObserver.disconnect();
      manifestoObserver.disconnect();
    };
  }, []);

  return (
    <main className="manifesto-site">
      <section id="home" className="poster hero-poster dark-poster">
        
        <ImageWithFallback
          src="/str1.jpg"
          alt={candidate.name}
          className="poster-image candidate-image"
        />
        <div className="poster-scrim" />
        <Header light />

        <div className="hero-copy">
          <p className="kicker intro-pop">Computer Science Association</p>
          <h1 className="text-black">
          <span className="intro-word text-black">Association</span>
          <span className="intro-word intro-word-late">Secretary</span>
          </h1>
          <span className="slash" />
          <p className="hero-name intro-pop">{candidate.name}</p>
          {/* <p className="hero-subtitle intro-pop"></p> */}
          <a
            className="scroll-cue intro-pop"
            href="#manifesto"
            onClick={(event) => {
              const section = document.getElementById("manifesto");
              if (!section) return;
              event.preventDefault();
              const top = section.offsetTop + section.offsetHeight - window.innerHeight;
              window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
            }}
          >
             <ChevronDown size={19} />
          </a>
        </div>
      </section>

      <section id="manifesto" className="split-intro manifesto-page dark-poster">
        <div className="red-stage" />
        
        <div className="poster-scrim" />
        <div className="split-copy manifesto-copy">
          <h2>Manifesto</h2>
          <p>Ideas <span>to</span> Action <span>to</span> Change</p>
          <ChevronDown className="bounce" size={28} />
        </div>
      </section>

      <section id="promises" className="paper-section points-section">
        <div className="manifesto-grid">
          {manifestoPoints.map((item, index) => (
            <ManifestoCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      <section id="vote" className="poster vote-poster dark-poster">
        <div className="red-stage finale-stage" />
        <div className="poster-scrim finale-scrim" />
        <Header light />
        <div className="finale-copy reveal">
          <img className="finale-main-logo" src="/gd.png" alt="SFI" />
          <h2 class="margin-top=30px">SFI NEHRU</h2>
        </div>
      </section>
    </main>
  );
}
