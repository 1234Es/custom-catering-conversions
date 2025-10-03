'use client';

/* --------------------------------------------------------------------------
   Imports
-------------------------------------------------------------------------- */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Menu, Phone, Mail, MapPin, ChevronRight, CheckCircle2, ArrowUpRight,
  Facebook, Instagram, Linkedin, Star, Wrench, Truck, ClipboardList,
  BadgeCheck, ShieldCheck, ChevronLeft, GalleryVerticalEnd, Hammer, X
} from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/* --------------------------------------------------------------------------
   Static assets
-------------------------------------------------------------------------- */
import hero1 from '@/public/hero1.jpg';
import hero2 from '@/public/hero2.jpg';
import hero3 from '@/public/hero3.jpg';
import hero4 from '@/public/hero4.jpg';
import hero5 from '@/public/hero5.jpg';
import logoPng from '@/public/logo.png';

import build1 from '@/public/build1.jpg';
import build2 from '@/public/build2.jpg';
import build3 from '@/public/build3.jpg';
import build4 from '@/public/build4.jpg';
import build5 from '@/public/build5.jpg';
import build6 from '@/public/build6.jpg';
import build7 from '@/public/build7.jpg';
import build8 from '@/public/build8.jpg';

import aboutImg from '@/public/about.png';

/* --------------------------------------------------------------------------
   Theme tokens & small utilities
-------------------------------------------------------------------------- */
const ThemeStyle: React.FC = () => (
  <style>{`
    :root{
      --cc-red:#960013;
      --cc-red-dark:#7d0010;
      --cc-white:#FFFFFF;
      --cc-charcoal:#222426;
      --cc-gray:#F3F4F6;
      --cc-red-tint:#FFE8EC;
      --radius:16px;
      --shadow:0 8px 24px rgba(0,0,0,.08);
    }

    html{scroll-behavior:smooth}

    /* Buttons */
    .btn-primary{
      background:var(--cc-red);
      color:var(--cc-white);
      box-shadow:0 8px 20px rgba(150,0,19,.25);
    }
    .btn-primary:hover{ background:var(--cc-red-dark); }
    .btn-secondary{
      background:var(--cc-white);
      color:var(--cc-red);
      border:1px solid var(--cc-red);
      box-shadow:0 6px 16px rgba(0,0,0,.06);
    }

    .card{ border-radius:var(--radius); box-shadow:var(--shadow); }
    .section{ padding-top:96px; padding-bottom:96px; }
    @media (min-width:1024px){ .section{ padding-top:120px; padding-bottom:120px; } }
    .focus-ring:focus{ outline:3px solid var(--cc-red-tint); outline-offset:2px; }

    /* Navbar border + light shadow */
    .sticky-header{
      border-bottom:1px solid rgba(0,0,0,.06);
      box-shadow: 0 2px 18px rgba(0,0,0,.08);
      overflow: visible;
    }

    .text-glow{
      text-shadow:0 1px 0 rgba(0,0,0,.25), 0 2px 12px rgba(0,0,0,.35);
    }
  `}</style>
);

// REPLACE your current Container with this version
const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...rest
}) => (
  <div
    {...rest}
    className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
  >
    {children}
  </div>
);


const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="
      rounded-full px-3 py-1.5 text-sm font-medium
      text-[var(--cc-red)]
      transition-all duration-200
      hover:bg-[var(--cc-red)] hover:text-white
      focus-ring
    "
  >
    {children}
  </a>
);


const SectionHeading: React.FC<{ eyebrow?: React.ReactNode; title: React.ReactNode; copy?: React.ReactNode }> = ({ eyebrow, title, copy }) => (
  <div className="mx-auto max-w-3xl text-center">
    {eyebrow && (
      <p className="mb-3 inline-block rounded-full bg-[var(--cc-red-tint)] px-3 py-1 text-xs font-medium text-[var(--cc-red)]">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-semibold tracking-tight text-[var(--cc-charcoal)] md:text-4xl">{title}</h2>
    {copy && <p className="mt-4 text-base text-[var(--cc-charcoal)]/80">{copy}</p>}
  </div>
);

/* ------------------- One-time pulsing logo overlay (bigger on mobile) ------------------- */
const LogoPulse: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000); // ~2s splash
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-white/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.05, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 1 }}
      >
        <Image
          src={logoPng}
          alt="Custom Catering Conversions"
          priority
          /* Bigger by default (mobile-first), slightly smaller on larger screens */
          className="w-56 h-auto sm:w-48 md:w-40 lg:w-44 drop-shadow-[0_10px_22px_rgba(0,0,0,.25)]"
        />
      </motion.div>
    </div>
  );
};

/* ------------------- Header (text brand) ------------------- */
const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky-header fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? 'bg-white' : 'bg-white/95 backdrop-blur'
      }`}
    >
      <Container className="flex items-center justify-between py-2 md:py-3">
        {/* Brand: logo + text */}
        <a
          href="#top"
          aria-label="Custom Catering Conversions"
          className="flex items-center gap-3"
        >
          <Image
            src={logoPng}
            alt="Custom Catering Conversions logo"
            width={140}
            height={40}
            priority
            className="h-12 w-auto md:h-18"
          />
          <span className="font-semibold tracking-tight text-[var(--cc-red)] text-lg sm:text-xl md:text-2xl">
            Custom Catering Conversions
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#process">Process</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#faqs">FAQs</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a
            href="#quote"
            className="btn-primary focus-ring inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition"
          >
            Get a Quote <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          className="focus-ring ml-auto rounded p-2 md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6 text-[var(--cc-red)]" />
        </button>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden
        >
          <div
            className="ml-auto h-full w-[84%] max-w-sm bg-white p-6"
            role="dialog"
            aria-label="Mobile menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={logoPng} alt="Logo" width={120} height={120} className="h-8 w-auto" priority />
                <span className="font-semibold text-[var(--cc-red)]">Custom Catering Conversions</span>
              </div>
              <button
                className="focus-ring rounded p-2 text-[var(--cc-red)]"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {[
                ['#services', 'Services'],
                ['#process', 'Process'],
                ['#portfolio', 'Portfolio'],
                ['#faqs', 'FAQs'],
                ['#about', 'About'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="
                    rounded-full px-3 py-2 text-[var(--cc-red)] font-medium
                    transition-all duration-200
                    hover:bg-[var(--cc-red)] hover:text-white
                  "
                >
                  {label}
                </a>
              ))}

              <a
                href="#quote"
                className="btn-primary mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                Get a Quote <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};






/* --------------------------------------------------------------------------
   HERO — centered copy, global tint, glass card; responsive <Image sizes>
-------------------------------------------------------------------------- */
const Hero: React.FC = () => {
  const IMAGES = [hero1, hero2, hero3, hero4, hero5];
  const len = IMAGES.length;
  const [i, setI] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

useEffect(() => {
  if (prefersReducedMotion) return;

  intervalRef.current = window.setInterval(
    () => setI((n) => (n + 1) % len),
    4000
  );

  return () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
}, [len, prefersReducedMotion]);


  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) setI((n) => (dx < 0 ? (n + 1) % len : (n - 1 + len) % len));
    touchStartX.current = null;
  };

  return (
    <section id="hero" className="relative w-full">
      <div
        className="relative h-[78vh] w-full overflow-hidden md:h-[88vh]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ width: `${len * 100}%`, transform: `translateX(-${i * (100 / len)}%)` }}
        >
          {IMAGES.map((src, idx) => (
            <div key={idx} className="relative h-full w-full flex-shrink-0" style={{ flex: `0 0 ${100 / len}%` }}>
              <Image
                src={src}
                alt={`Hero ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 100vw,
                       100vw"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-black/45" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <div className="max-w-2xl rounded-2xl bg-white/12 p-6 md:p-8 backdrop-blur-md ring-1 ring-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/90">
              Bespoke Mobile Kitchens & Trailers
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--cc-red)]">
              Your Catering Business, Mobile & Ready
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/95">
              From van to vision—custom conversions built for your brand, performance and compliance.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#portfolio"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--cc-red)] shadow-md transition hover:bg-gray-100"
              >
                View Conversions →
              </a>
              <a
                href="#quote"
                className="rounded-full bg-[var(--cc-red)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#7d0010]"
              >
                Get a Quote →
              </a>
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-4 md:flex">
          <button
            aria-label="Previous slide"
            onClick={() => setI((n) => (n - 1 + len) % len)}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={() => setI((n) => (n + 1) % len)}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------------------------------------------
   Counters (unchanged)
-------------------------------------------------------------------------- */
const CounterPill: React.FC<{ label: string; value: number; suffix?: string }> = ({ label, value, suffix = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const target = value;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (
    <div ref={ref as any} className="flex items-center gap-3">
      <BadgeCheck className="h-4 w-4 text-white/90" />
      <p className="text-white/90"><span className="text-white">{count}</span>{suffix} {label}</p>
    </div>
  );
};

/* --------------------------------------------------------------------------
   Highlights / Process / Portfolio / Testimonials / About / FAQs / Spec / Quote
-------------------------------------------------------------------------- */
const WhatWeBuild: React.FC = () => {
  const items = [
    {
      title: 'Renovation',
      copy:
        'If your existing street food truck needs minor or major changes, we can renew it according to your needs.',
      img: build1,
    },
    {
      title: 'Trailers',
      copy:
        'Unlock the potential of trailers and caravans by converting them into fully functional catering units. Our expert team specializes in outfitting trailers and caravans with all the essentials, ready to hit the road!',
      img: build2,
    },
    {
      title: 'Horse boxes',
      copy:
        'Horsebox, one of the indispensable parts of England. It has different sizes suitable for all kinds of sales. coffee shop, burger van, pizza, snack bar, crep,…….',
      img: build3,
    },
    {
      title: 'Classic / Vintage Vans',
      copy:
        'Step back in time and embrace the charm and nostalgia of yesteryear with our exquisite classic / vintage truck conversions. Drawing upon our wealth of experience and expertise, we specialize in transforming a wide range of classic / vintage trucks and cars.',
      img: build4,
    },
    {
      title: 'Professional Paints',
      copy:
        'We turn your converted or restored vehicles into the color you want with our professional team in our professional paint room. Let us complete your van with the perfect finish in the color you want. We can also optionally do just the paint job of your vehicle.',
      img: build5,
    },
    {
      title: 'H-vans',
      copy:
        'You can show the difference of your business with this vehicle, a favorite French classic that not only looks impressive but also stands the test of time.',
      img: build6,
    },
    {
      title: 'Panel / Luton Vans',
      copy:
        'It is among the most preferred models of our modern age. They are preferred by large enterprises because they have a large internal body. It provides a comfortable working environment inside.',
      img: build7,
    },
    {
      title: 'Tuk-tuks',
      copy:
        'It is an indispensable part of our modern world with its small and elegant appearance. It is suitable for small businesses such as coffee shops and snack bars. This innovative design philosophy allows for exceptional adaptability, ensuring we can meet our customers’ desires without compromising on added weight concerns.',
      img: build8,
    },
  ];

return (
  <section id="services" className="section">
    <Container>
      <SectionHeading
        eyebrow="What we build"
        title="Conversions for every service"
        copy="From compact coffee vans to full mobile kitchens, we tailor the build to your business."
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.06 }}
            className="card overflow-hidden bg-white"
          >
            {it.img ? (
              <div className="relative aspect-[16/9] w-full bg-[var(--cc-gray)] grid place-items-center">
                <Image
                  src={it.img}
                  alt={`${it.title} example`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         33vw"
                  priority={i < 2}
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-[var(--cc-gray)] grid place-items-center text-[var(--cc-charcoal)]/50 text-sm">
                Add image
              </div>
            )}

            <div className="p-5">
              <h3 className="text-lg font-semibold text-[var(--cc-charcoal)]">{it.title}</h3>
              <p className="mt-2 text-sm text-[var(--cc-charcoal)]/80">{it.copy}</p>
              <div className="mt-4">
                <a href="#quote" className="inline-flex items-center text-[var(--cc-red)] hover:underline">
                  Start a build <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Container>
  </section>
);
};



const Process: React.FC = () => {
  const steps = [
    { icon: <ClipboardList className="h-5 w-5" />, title: 'Scope & Quote', copy: 'Tell us your service, menu and vehicle — we scope requirements and budget.' },
    { icon: <Hammer className="h-5 w-5" />, title: 'Build & Fit-out', copy: 'Fabrication, electrics, gas, water, extraction, and finishes — all in-house.' },
    { icon: <ShieldCheck className="h-5 w-5" />, title: 'Compliance', copy: 'Gas and electrical certifications, food-safe surfaces, ventilation and hygiene.' },
    { icon: <BadgeCheck className="h-5 w-5" />, title: 'Handover & Support', copy: 'Testing, training and after-care with warranty.' },
  ];
  return (
    <section id="process" className="section bg-[var(--cc-gray)]">
      <Container>
        <SectionHeading eyebrow="How it works" title="A clear, 4-step conversion process" />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.08 }} className="card relative overflow-hidden bg-white p-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--cc-red-tint)] px-3 py-1 text-[var(--cc-red)]">
                {s.icon}<span className="text-xs font-semibold">Step {i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--cc-charcoal)]">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--cc-charcoal)]/80">{s.copy}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* --------------------------------------------------------------------------
   Portfolio — cards + modal case-study window with drop-in text animation
-------------------------------------------------------------------------- */
const Portfolio: React.FC = () => {
  type Project = {
    id: number;
    title: string;
    vehicle: string;
    client: string;
    cover: string;
    location?: string;
    date?: string;
    services?: string[];
    features?: string[];
    power?: string;
    gas?: string;
    water?: string;
    dimensions?: string;
    certifications?: string[];
    timeline?: string;
    budgetRange?: string;
    gallery: string[];
  };

  const items: Project[] = [
    {
      id: 1,
      title: 'Coffee Van — VW Crafter',
      vehicle: 'Van',
      client: 'Brew & Go',
      cover:
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop',
      location: 'London, UK',
      date: '2024',
      services: ['Full fit-out', 'Branding wrap', 'Electrical'],
      features: [
        '2-group espresso machine',
        'Under-counter fridge',
        'Handwash station',
        'Stainless counters',
      ],
      power: '32A hook-up + inverter',
      gas: 'N/A',
      water: 'Fresh/Grey tanks, pump, heater',
      dimensions: 'LWB high-roof layout',
      certifications: ['Electrical sign-off', 'Food-safe surfaces'],
      timeline: '6 weeks',
      budgetRange: '£20k–£40k',
      gallery: [
        'https://images.unsplash.com/photo-1581091226825-c6a89e7e87df?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523419409543-a5e549c1a8b1?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523419029303-0d464c2d8b83?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
      ],
    },
    {
      id: 2,
      title: 'Pizza Trailer — 3.5m',
      vehicle: 'Trailer',
      client: 'Fired Up Co.',
      cover:
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop',
      location: 'Manchester, UK',
      date: '2023',
      services: ['Fit-out', 'Gas & extraction', 'Branding'],
      features: [
        '900mm canopy',
        'Stone oven',
        'Double-door fridge',
        'Prep counter',
      ],
      power: '32A hook-up',
      gas: 'Bottled LPG (enclosed, certified)',
      water: 'Fresh/Grey tanks, pump',
      dimensions: '3.5m body',
      certifications: ['Gas & electrical sign-off'],
      timeline: '8 weeks',
      budgetRange: '£40k–£60k',
      gallery: [
        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519669417670-68775a50919a?q=80&w=1200&auto=format&fit=crop',
      ],
    },
  ];

  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openProject = (p: Project) => {
    setLightbox(p);
    setImgIndex(0);
  };

  const onClose = () => setLightbox(null);

  // Close modal and smooth-scroll to #quote
  const handleStartYourBuild = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const el = document.querySelector('#quote');
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.location.hash = '#quote';
    }, 150);
  };

  // Esc + ← → navigation
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setImgIndex((i) => (i + 1) % lightbox.gallery.length);
      if (e.key === 'ArrowLeft') setImgIndex((i) => (i - 1 + lightbox.gallery.length) % lightbox.gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox) closeBtnRef.current?.focus();
  }, [lightbox]);

/* -------- drop-in text variants -------- */
const dropParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};
// AFTER
const dropItem = {
  hidden: { y: -12, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35 }, // remove `ease`
  },
};



  return (
    <section id="portfolio" className="section">
      <Container>
        <SectionHeading eyebrow="Recent work" title="Featured conversions" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.article
              key={it.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.05 }}
              className="card group overflow-hidden bg-white"
            >
              <button
                onClick={() => openProject(it)}
                className="relative block aspect-video w-full overflow-hidden focus-ring"
              >
                <Image
                  src={it.cover}
                  alt={`${it.title} cover`}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         33vw"
                />
              </button>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[var(--cc-charcoal)]">{it.title}</h3>
                <p className="mt-1 text-sm text-[var(--cc-charcoal)]/70">{it.vehicle} • {it.client}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => openProject(it)}
                    className="inline-flex items-center text-[var(--cc-red)] hover:underline"
                  >
                    View case study <ArrowUpRight className="ml-1 h-4 w-4" />
                  </button>
                  <div className="text-xs text-[var(--cc-charcoal)]/60">{it.location || ''}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>

      {/* -------- Case Study Modal -------- */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 p-4 md:p-8 overflow-y-auto"
          onClick={onClose}
          aria-modal
          role="dialog"
          aria-labelledby="case-study-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18 }}
            className="mx-auto max-w-6xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header (drop-in) */}
            <motion.div
              variants={dropParent}
              initial="hidden"
              animate="show"
              className="flex items-start justify-between gap-4 border-b border-black/10 p-4 md:p-6"
            >
              <div>
                <motion.h3
                  id="case-study-title"
                  variants={dropItem}
                  className="text-xl md:text-2xl font-semibold text-[var(--cc-charcoal)]"
                >
                  {lightbox.title}
                </motion.h3>
                <motion.p
                  variants={dropItem}
                  className="text-sm text-[var(--cc-charcoal)]/70"
                >
                  {lightbox.client} • {lightbox.vehicle}
                  {lightbox.location ? ` • ${lightbox.location}` : ''}{' '}
                  {lightbox.date ? ` • ${lightbox.date}` : ''}
                </motion.p>
              </div>
              <motion.button
                variants={dropItem}
                ref={closeBtnRef}
                onClick={onClose}
                className="focus-ring rounded p-2 text-[var(--cc-red)]"
                aria-label="Close case study"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </motion.div>

            {/* Body */}
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-5 md:p-6">
              {/* Gallery (static entry; images change via arrows/thumbs) */}
              <div className="md:col-span-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[var(--cc-gray)]">
                  <Image
                    src={lightbox.gallery[imgIndex]}
                    alt={`${lightbox.title} image ${imgIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 60vw,
                           60vw"
                    priority
                  />
                  {/* Prev / Next */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
                    <button
                      aria-label="Previous image"
                      className="pointer-events-auto grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
                      onClick={() =>
                        setImgIndex((n) => (n - 1 + lightbox.gallery.length) % lightbox.gallery.length)
                      }
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Next image"
                      className="pointer-events-auto grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
                      onClick={() => setImgIndex((n) => (n + 1) % lightbox.gallery.length)}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbs */}
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {lightbox.gallery.map((src, idx) => (
                    <button
                      key={idx}
                      className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md ring-1 ${
                        idx === imgIndex ? 'ring-[var(--cc-red)]' : 'ring-black/10'
                      }`}
                      onClick={() => setImgIndex(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details (drop-in cascade) */}
              <motion.div
                variants={dropParent}
                initial="hidden"
                animate="show"
                className="md:col-span-2"
              >
                <motion.h4
                  variants={dropItem}
                  className="text-base font-semibold text-[var(--cc-charcoal)]"
                >
                  Client specification
                </motion.h4>
                <motion.ul
                  variants={dropParent}
                  className="mt-2 list-disc pl-5 text-sm text-[var(--cc-charcoal)]/80"
                >
                  {(lightbox.services || []).map((s, i) => (
                    <motion.li key={i} variants={dropItem}>
                      {s}
                    </motion.li>
                  ))}
                </motion.ul>

                {lightbox.features?.length ? (
                  <>
                    <motion.h4
                      variants={dropItem}
                      className="mt-5 text-base font-semibold text-[var(--cc-charcoal)]"
                    >
                      Key features
                    </motion.h4>
                    <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-[var(--cc-charcoal)]/80">
                      {lightbox.features.map((f, i) => (
                        <motion.div
                          key={i}
                          variants={dropItem}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--cc-red)]" />
                          <span>{f}</span>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : null}

                <div className="mt-5 grid grid-cols-1 gap-2 text-sm text-[var(--cc-charcoal)]/80">
                  {lightbox.dimensions && (
                    <motion.p variants={dropItem}>
                      <span className="font-medium text-[var(--cc-charcoal)]">Layout:</span> {lightbox.dimensions}
                    </motion.p>
                  )}
                  {lightbox.power && (
                    <motion.p variants={dropItem}>
                      <span className="font-medium text-[var(--cc-charcoal)]">Power:</span> {lightbox.power}
                    </motion.p>
                  )}
                  {lightbox.gas && (
                    <motion.p variants={dropItem}>
                      <span className="font-medium text-[var(--cc-charcoal)]">Gas:</span> {lightbox.gas}
                    </motion.p>
                  )}
                  {lightbox.water && (
                    <motion.p variants={dropItem}>
                      <span className="font-medium text-[var(--cc-charcoal)]">Water:</span> {lightbox.water}
                    </motion.p>
                  )}
                  {lightbox.certifications?.length ? (
                    <motion.p variants={dropItem}>
                      <span className="font-medium text-[var(--cc-charcoal)]">Certifications:</span>{' '}
                      {lightbox.certifications.join(', ')}
                    </motion.p>
                  ) : null}
                  {lightbox.timeline && (
                    <motion.p variants={dropItem}>
                      <span className="font-medium text-[var(--cc-charcoal)]">Timeline:</span> {lightbox.timeline}
                    </motion.p>
                  )}
                  {lightbox.budgetRange && (
                    <motion.p variants={dropItem}>
                      <span className="font-medium text-[var(--cc-charcoal)]">Budget:</span> {lightbox.budgetRange}
                    </motion.p>
                  )}
                </div>

                <motion.div variants={dropItem} className="mt-6">
                  <a
                    href="#quote"
                    onClick={handleStartYourBuild}
                    className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                    role="link"
                  >
                    Start your build <ArrowUpRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};




const Testimonials: React.FC = () => {
  const quotes = [
    {
      name: 'Client Name 1',
      project: 'VW Crafter Coffee Van',
      quote:
        'Brilliant finish and attention to detail. The team took our concept sketches and transformed them into a fully functional coffee van. Everything from the plumbing to the stainless steel worktops was done to a very high standard. The van passed all inspections first time, and customers are constantly commenting on how professional it looks.',
    },
    {
      name: 'Client Name 2',
      project: 'Pizza Trailer',
      quote:
        'On time, on budget, and the layout just works for our rushes. We wanted a compact trailer that could still house a large stone oven and prep space. CCC made clever use of every inch. The extraction system keeps the working environment comfortable, and the branding finish has really helped us stand out at events.',
    },
    {
      name: 'Client Name 3',
      project: 'Ice Cream Van',
      quote:
        'After-sales support was superb. When we had a question about electrical hook-ups during an event, they responded immediately and guided us through. The van itself is a real showstopper — bright, functional, and compliant with all the regulations. Highly recommend them for anyone looking to start or upgrade their catering business.',
    },
    {
      name: 'Client Name 4',
      project: 'Horsebox Coffee Bar',
      quote:
        'We approached CCC with an old horsebox that needed a full conversion. They managed to keep the vintage charm while installing everything needed for a modern coffee bar. The craftsmanship is exceptional — every weld and joint feels solid, and the finishes are durable yet stylish. Customers love the rustic feel combined with professional functionality.',
    },
  ];

  const [i, setI] = useState(0);

  return (
    <section className="section bg-[var(--cc-gray)]">
      <Container>
        <SectionHeading eyebrow="What clients say" title="Testimonials" />
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="card bg-white p-6">
            <p className="text-[var(--cc-charcoal)]/80 leading-relaxed">“{quotes[i].quote}”</p>
            <p className="mt-4 text-sm font-medium text-[var(--cc-charcoal)]">
              {quotes[i].name} — {quotes[i].project}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <button
                className="btn-secondary rounded-full px-4 py-2 text-sm"
                onClick={() => setI((i - 1 + quotes.length) % quotes.length)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1">
                {quotes.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 w-2 rounded-full ${
                      idx === i ? 'bg-[var(--cc-red)]' : 'bg-black/10'
                    }`}
                  />
                ))}
              </div>
              <button
                className="btn-secondary rounded-full px-4 py-2 text-sm"
                onClick={() => setI((i + 1) % quotes.length)}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};




/* ------------------- About (condensed + scannable) ------------------- */
const About: React.FC = () => (
  <section id="about" className="section">
    <Container>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image / media */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="order-1 overflow-hidden rounded-2xl"
        >
          <Image
            src={aboutImg}
            alt="About Custom Catering Conversions"
            className="h-full w-full object-cover rounded-2xl"
            priority
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="order-2"
        >
          <p className="mb-3 inline-block rounded-full bg-[var(--cc-red-tint)] px-3 py-1 text-xs font-semibold text-[var(--cc-red)]">
            About Us
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--cc-charcoal)] md:text-4xl">
            Bespoke catering conversions, built for your business
          </h2>

          <p className="mt-4 text-[var(--cc-charcoal)]/80">
            We’re an established team in St. Neots building custom catering trucks and trailers.
            Bring your own vehicle or let us help you choose the right one. Every build is finished
            to certified gas and electrical standards for safety, reliability, and compliance.
          </p>
          <p className="mt-3 text-[var(--cc-charcoal)]/80">
            Our work spans the UK, France, Italy, Sweden, Spain, New Zealand, and Australia —
            from minibuses and H-vans to horseboxes, caravans, tuk-tuks, panel vans, and trailers.
          </p>

          {/* Mission / Vision */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-black/10 bg-white p-4">
              <h3 className="text-sm font-semibold text-[var(--cc-charcoal)]">Our Mission</h3>
              <p className="mt-1 text-sm text-[var(--cc-charcoal)]/75">
                Transform your ideas into high-quality, tailored catering vehicles.
              </p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-4">
              <h3 className="text-sm font-semibold text-[var(--cc-charcoal)]">Our Vision</h3>
              <p className="mt-1 text-sm text-[var(--cc-charcoal)]/75">
                Lead globally in custom conversions known for innovation and quality.
              </p>
            </div>
          </div>

          {/* Why choose us */}
          <div className="mt-6 rounded-xl border border-black/10 bg-white p-4">
            <h3 className="text-sm font-semibold text-[var(--cc-charcoal)]">Why Choose Us</h3>
            <ul className="mt-2 space-y-2 text-sm text-[var(--cc-charcoal)]/80">
              {[
                'Experienced, skilled team',
                'Customer-first approach',
                'Quality craftsmanship & compliance',
                'Proven international reach',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--cc-red)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sub-blurb */}
          <div className="mt-6 text-sm text-[var(--cc-charcoal)]/80">
            We understand what it takes to succeed as a mobile caterer. Leverage our expertise to
            find the right vehicle or trailer and set up your business for real results.
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              href="#quote"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
            >
              Start Your Build
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);




/* ------------------- FAQs (first 4 + "View more") ------------------- */
const FAQs: React.FC = () => {
  const faqs = [
    { q: 'How long does a conversion take?', a: 'Most builds take 3–8 weeks depending on vehicle type, layout complexity, equipment lead times, and custom fabrication. After spec sign-off and deposit, we’ll confirm your target handover date.' },
    { q: 'Can you help me source a vehicle?', a: 'Yes. You can bring your own, or we can guide you to the best base (panel van, horsebox, trailer, H-van, etc.) based on menu, budget, and payload requirements.' },
    { q: 'What certifications do you provide?', a: 'Gas and electrical sign-off (where applicable), plus ventilation/extraction compliance, food-safe finishes, and documentation packs to support inspections and hygiene ratings.' },
    { q: 'Do I need planning permission?', a: 'Typically no for a mobile vehicle, but local trading permissions, street trading licenses, and event/vendor permits may apply. We’ll point you to the right local authority resources.' },
    { q: 'How much does a typical build cost?', a: 'Budgets vary widely: small coffee setups can start lower, while full hot-food kitchens with extraction and multiple appliances are higher. We provide a detailed quote after scoping equipment, utilities, and finishes.' },
    { q: 'What power options can I choose?', a: 'We commonly fit 230V hook-up, inverter/charger systems with batteries, and generator integration. We’ll size electrics for your actual appliance load profile and venue mix.' },
    { q: 'How are water and waste handled?', a: 'Fresh/grey tanks with pump, optional heater for hot water, food-safe plumbing, and quick-connect draining. Tank sizing is matched to your menu and trading hours.' },
    { q: 'Can you brand/wrap the vehicle?', a: 'Absolutely. We can coordinate paint, vinyl wraps, and signage. Provide brand files, and we’ll prepare print-ready artwork and proofs.' },
    { q: 'What about weight and payload?', a: 'We engineer the layout for safe axle loading and legal GVW/MAM. During design we’ll estimate curb weight and payload to keep you compliant once stocked with water, fuel, and inventory.' },
    { q: 'Do you ship internationally?', a: 'Yes. We’ve delivered to clients across Europe, Oceania, and beyond. We can support crating, transport, and documentation; registration rules vary by country.' },
    { q: 'Is there a warranty or aftercare?', a: 'Yes—our workmanship warranty covers the build, and equipment is backed by manufacturer warranties. We also provide aftercare support and can help with maintenance or upgrades.' },
    { q: 'How do I get started?', a: 'Click “Get a Quote,” share your menu and must-have equipment, and we’ll scope the spec, timeline, and budget. A deposit secures your build slot.' },
  ];

  // index for the full list (0..n-1), so it works for both halves
  const [open, setOpen] = useState<number | null>(0);
  const [showMore, setShowMore] = useState(false);

  // If user collapses and an expanded item is in the hidden half, close it.
  useEffect(() => {
    if (!showMore && open != null && open >= 4) setOpen(null);
  }, [showMore, open]);

  const FirstFour = faqs.slice(0, 4);
  const Rest = faqs.slice(4);

  const Item = ({
    item,
    globalIdx,
    appearDelay = 0,
  }: {
    item: { q: string; a: string };
    globalIdx: number;
    appearDelay?: number;
  }) => {
    const isOpen = open === globalIdx;
    return (
      <motion.div
        key={item.q}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.2, delay: appearDelay }}
        className="border-b border-black/10 last:border-0"
      >
        <button
          onClick={() => setOpen(isOpen ? null : globalIdx)}
          className="group flex w-full items-center justify-between px-5 py-4 text-left"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${globalIdx}`}
        >
          <span className="font-medium text-[var(--cc-charcoal)]">{item.q}</span>
          <svg
            className={`h-5 w-5 shrink-0 text-[var(--cc-charcoal)]/70 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <motion.div
          id={`faq-panel-${globalIdx}`}
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 text-[var(--cc-charcoal)]/80">{item.a}</div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="faqs" className="section bg-[var(--cc-gray)]">
      <Container>
        <SectionHeading
          eyebrow="FAQs"
          title="Common questions"
          copy="If you don’t see your question here, just reach out — we’re happy to help."
        />

        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl bg-white">
          {/* Always show the first four */}
          {FirstFour.map((item, i) => (
            <Item key={item.q} item={item} globalIdx={i} appearDelay={i * 0.02} />
          ))}

          {/* Collapsible remainder */}
          <motion.div
            initial={false}
            animate={{ height: showMore ? 'auto' : 0, opacity: showMore ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
            aria-hidden={!showMore}
          >
            {Rest.map((item, i) => {
              const globalIdx = 4 + i;
              return (
                <Item
                  key={item.q}
                  item={item}
                  globalIdx={globalIdx}
                  appearDelay={0.04 + i * 0.02}
                />
              );
            })}
          </motion.div>

          {/* Toggle button */}
          <div className="flex items-center justify-center px-5 py-4">
            <button
              type="button"
              onClick={() => setShowMore((s) => !s)}
              className="btn-secondary rounded-full px-4 py-2 text-sm font-semibold"
              aria-expanded={showMore}
              aria-controls="faq-more"
            >
              {showMore ? 'Show fewer' : 'View more answers'}
            </button>
          </div>
        </div>

        {/* SEO: include ALL FAQs in JSON-LD even if some are collapsed */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      </Container>
    </section>
  );
};




/* --------------------------------------------------------------------------
   Small label wrapper
-------------------------------------------------------------------------- */
const Field: React.FC<{ id: string; label: string; children: React.ReactNode }> = ({
  id,
  label,
  children,
}) => (
  <label htmlFor={id} className="block text-sm">
    <span className="mb-1 block font-medium text-[var(--cc-charcoal)]">{label}</span>
    {children}
  </label>
);

/* --------------------------------------------------------------------------
   Quote (friendlier 4-step form)
-------------------------------------------------------------------------- */
const QuoteForm: React.FC = () => {
  // Select options (kept as plain arrays so no TS union errors)
  const VEHICLES = [
    "I’m not sure yet",
    "Panel Van",
    "Luton Van",
    "Trailer",
    "Horsebox",
    "Classic / Vintage",
    "H-van",
    "Tuk-tuk",
    "Other",
  ];

  const USES = [
    "I’m not sure yet",
    "Coffee",
    "Pizza",
    "Burgers / Grill",
    "Ice Cream",
    "Snack Bar",
    "Other",
  ];

  const BUDGETS = ["I’m not sure yet", "Under £20k", "£20k–£40k", "£40k–£60k", "£60k+"];

  const TIMELINES = ["I’m not sure yet", "ASAP", "1–3 months", "3–6 months", "6+ months"];

  // Form state
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    // Step 1 – Vehicle
    vehicle: "I’m not sure yet",
    use: "I’m not sure yet",
    overview: "",

    // Step 2 – Budget & Timing
    budget: "I’m not sure yet",
    timeline: "I’m not sure yet",

    // Step 3 – Equipment (optional)
    equipment: "",

    // Step 4 – Contact
    name: "",
    email: "",
    phone: "",
    consent: false,
  });

  const steps = ["Vehicle & Use", "Budget & Timing", "Equipment", "Contact"] as const;

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Super light validation: only require name, email, consent
    if (!form.name.trim()) return alert("Please add your name.");
    if (!form.email.trim()) return alert("Please add your email.");
    if (!form.consent) return alert("Please confirm you’re happy to be contacted.");
    alert("Thanks! Your quote request has been submitted.");
  };

  return (
    <section id="quote" className="section">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="mb-3 inline-block rounded-full bg-[var(--cc-red-tint)] px-3 py-1 text-xs font-medium text-[var(--cc-red)]">
              Get a quote
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--cc-charcoal)] md:text-4xl">
              Tell us about your conversion
            </h2>
            <p className="mt-3 text-[var(--cc-charcoal)]/80">
              Not sure on details yet? No problem — pick <em>“I’m not sure yet”</em> where needed, or just
              write a quick note. We’ll guide you.
            </p>
          </div>

          {/* Progress dots (lightweight, not intrusive) */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={`h-2 w-2 rounded-full transition ${
                  i <= step ? "bg-[var(--cc-red)]" : "bg-black/10"
                }`}
              />
            ))}
          </div>

          <form onSubmit={submit} className="card bg-white p-6 mt-6">
            {/* Step 1 */}
            {step === 0 && (
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field id="vehicle" label="Vehicle type">
                    <select
                      id="vehicle"
                      value={form.vehicle}
                      onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                      className="w-full rounded-md border border-black/10 p-2 focus-ring"
                    >
                      {VEHICLES.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="use" label="Primary use">
                    <select
                      id="use"
                      value={form.use}
                      onChange={(e) => setForm({ ...form, use: e.target.value })}
                      className="w-full rounded-md border border-black/10 p-2 focus-ring"
                    >
                      {USES.map((u) => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field id="overview" label="Tell us a bit about your idea (optional)">
                  <Textarea
                    id="overview"
                    value={form.overview}
                    onChange={(e) => setForm({ ...form, overview: (e.target as HTMLTextAreaElement).value })}
                    placeholder="E.g. coffee bar for events, simple menu, compact layout…"
                  />
                </Field>
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field id="budget" label="Budget">
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full rounded-md border border-black/10 p-2 focus-ring"
                  >
                    {BUDGETS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <Field id="timeline" label="Timeline">
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="w-full rounded-md border border-black/10 p-2 focus-ring"
                  >
                    {TIMELINES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <Field id="equipment" label="Equipment (optional)">
                <Textarea
                  id="equipment"
                  value={form.equipment}
                  onChange={(e) => setForm({ ...form, equipment: (e.target as HTMLTextAreaElement).value })}
                  placeholder="E.g. 2-group espresso machine, under-counter fridge, 90cm canopy…"
                />
                <p className="mt-2 text-xs text-[var(--cc-charcoal)]/60">
                  Not sure yet? Leave this blank — we can recommend a spec.
                </p>
              </Field>
            )}

            {/* Step 4 */}
            {step === 3 && (
              <div className="grid gap-4">
                <Field id="name" label="Your name">
                  <Input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field id="email" label="Email">
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field id="phone" label="Phone (optional)">
                    <Input
                      id="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+44…"
                    />
                  </Field>
                </div>
                <label className="text-sm text-[var(--cc-charcoal)]/80">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: (e.target as HTMLInputElement).checked })}
                    className="mr-3 align-top"
                  />
                  I agree to be contacted about my quote and accept the{" "}
                  <a href="#privacy" className="text-[var(--cc-red)] underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            )}

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={step === 0}
                className={`btn-secondary rounded-full px-5 py-2 text-sm ${step === 0 ? "opacity-50" : ""}`}
              >
                Back
              </button>

              {step < steps.length - 1 ? (
                <div className="flex items-center gap-3">
                  {/* Optional: quick jump to simple contact */}
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="rounded-full px-4 py-2 text-sm text-[var(--cc-red)] underline"
                    >
                      Skip to contact
                    </button>
                  )}
                  <button type="button" onClick={next} className="btn-primary rounded-full px-5 py-2 text-sm">
                    Next
                  </button>
                </div>
              ) : (
                <button type="submit" className="btn-primary rounded-full px-5 py-2 text-sm">
                  Submit
                </button>
              )}
            </div>

            {/* Friendly footer hint */}
            <p className="mt-4 text-center text-xs text-[var(--cc-charcoal)]/60">
              Prefer email? Write to{" "}
              <a href="mailto:info@customcateringconversions.co.uk" className="text-[var(--cc-red)] underline">
                info@customcateringconversions.co.uk
              </a>{" "}
              with your idea.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
};








/* --------------------------------------------------------------------------
   Footer
-------------------------------------------------------------------------- */
const Footer: React.FC = () => (
    <footer id="contact" className="border-t border-black/10 bg-white">
    <Container className="section">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <Image src={logoPng} alt="Custom Catering Conversions" width={360} height={112} priority style={{ width: 'auto', height: 'auto' }} className="h-14 w-auto" />
          <p className="mt-3 text-sm text-[var(--cc-charcoal)]/70">Custom vehicle & trailer conversions for catering across the UK.</p>
          <div className="mt-4 flex gap-3 text-[var(--cc-charcoal)]/70">
            <a href="#" aria-label="Facebook" className="hover:text-[var(--cc-red)]"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-[var(--cc-red)]"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[var(--cc-red)]"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-[var(--cc-charcoal)]">Sitemap</h4>
          <ul className="space-y-2 text-sm text-[var(--cc-charcoal)]/80">
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#portfolio" className="hover:underline">Conversions</a></li>
            <li><a href="#process" className="hover:underline">Process</a></li>
            <li><a href="#faqs" className="hover:underline">FAQs</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-[var(--cc-charcoal)]">Legal</h4>
          <ul className="space-y-2 text-sm text-[var(--cc-charcoal)]/80">
            <li><a id="privacy" href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-[var(--cc-charcoal)]">Contact</h4>
          <ul className="space-y-2 text-sm text-[var(--cc-charcoal)]/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href="tel:+447301219640" className="hover:underline">+447301219640</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href="mailto:info@customcateringconversions.co.uk" className="hover:underline">info@customcateringconversions.co.uk</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> <span>Unit 6 - Beacon Farm, Moor Road, Great Straughton, St. Neots, CB, United Kingdom PE19 5BW</span></li>
          </ul>
          <a href="#quote" className="btn-primary mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold">Get a Quote <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </div>
      <p className="mt-10 text-xs text-[var(--cc-charcoal)]/60">© {new Date().getFullYear()} Custom Catering Conversions. All rights reserved.</p>
    </Container>
  </footer>
);

/* --------------------------------------------------------------------------
   SEO head tags (basic)
-------------------------------------------------------------------------- */
const SEO: React.FC = () => (
  <>
    <title>Custom Catering Conversions — Vans & Trailers | Get a Quote</title>
    <meta name="description" content="Bespoke catering vehicle and trailer conversions. Food safety compliant, durable and tailored to your service. Get a quote." />
    <meta name="theme-color" content="#960013" />
    <meta property="og:title" content="Custom Catering Conversions" />
    <meta property="og:description" content="Bespoke catering vehicle and trailer conversions across the UK." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <ThemeStyle />
  </>
);

/* --------------------------------------------------------------------------
   Page
-------------------------------------------------------------------------- */
export default function CCCSite() {
  return (
    <main id="top" className="bg-white text-[var(--cc-charcoal)]">
      <SEO />
      <LogoPulse />
      <Header />
      <Hero />
      <WhatWeBuild />
      <Process />
      <Portfolio />
      <section className="section">
      </section>
      <Testimonials />
      <About />
      <FAQs />
      <QuoteForm />
      <Footer />
    </main>
  );
}
