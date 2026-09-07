import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  HeartHandshake,
  Home as HomeIcon,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

import './index.css';

const navItems = [
  ['About', 'about'],
  ['Admissions', 'admissions'],
  ['Our homes', 'homes'],
  ['Recovery program', 'program'],
  ['Referral partners', 'partners'],
  ['FAQ', 'faq'],
  ['Resources', 'resources'],
];

const faqs = [
  {
    question: 'Who is Purpose Grove for?',
    answer:
      'Purpose Grove is a structured, substance-free home for men who are ready to make long-term sobriety part of everyday life. Residents are typically stepping down from treatment, leaving a sober living environment, or looking for a more accountable next chapter.',
  },
  {
    question: 'How long do residents typically stay?',
    answer:
      'There is no artificial finish line. Most residents stay between six and twelve months, with a plan shaped around their stability, work, relationships, and recovery goals. We celebrate a thoughtful next step—not a rushed exit.',
  },
  {
    question: 'What is included in the monthly fee?',
    answer:
      'The monthly fee includes a private or shared room, utilities, furnishings, household supplies, weekly house meetings, accountability structure, community programming, and support from our resident experience team. We will always explain costs clearly before a commitment is made.',
  },
  {
    question: 'Can family members or professionals make a referral?',
    answer:
      'Yes. Families, clinicians, treatment programs, case managers, and employers are welcome to start a conversation. We protect each person’s privacy while making it easy to understand fit, timing, and next steps.',
  },
  {
    question: 'What substances and behaviors are not permitted?',
    answer:
      'Purpose Grove is fully substance-free. We also maintain clear expectations around safety, respect, overnight guests, and participation in the home. Our admissions conversation makes every standard transparent before move-in.',
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo() {
  return (
    <a href="#home" className="focus-ring flex items-center gap-3" aria-label="Purpose Grove home" data-testid="link-logo">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f4d3a] text-[#f6f2ea]">
        <Leaf size={19} strokeWidth={1.7} />
      </span>
      <span className="leading-none">
        <span className="block text-[11px] font-bold uppercase tracking-[.18em] text-[#1f4d3a]">Purpose Grove</span>
        <span className="mt-1 block text-[10px] tracking-[.11em] text-[#6e876d]">Sober Living</span>
      </span>
    </a>
  );
}

function ButtonLink({ children, href, dark = false, onClick }: { children: ReactNode; href: string; dark?: boolean; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`focus-ring group inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 text-[13px] font-bold transition-transform hover:-translate-y-0.5 ${
        dark ? 'bg-[#1f4d3a] text-[#f6f2ea] hover:bg-[#286148]' : 'bg-[#d7e1d3] text-[#1f4d3a] hover:bg-[#c9d7c5]'
      }`}
      data-testid={`link-${href.replace('#', '')}`}
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function FormNotice({ submitted }: { submitted: boolean }) {
  if (!submitted) return null;
  return (
    <div role="status" className="mt-5 flex items-start gap-3 rounded-2xl bg-[#e1eadc] p-4 text-sm text-[#1f4d3a]" data-testid="status-form-success">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1f4d3a] text-[#f6f2ea]"><Check size={13} /></span>
      <span>Thank you. Your note is safely with our team. We will be in touch within one business day.</span>
    </div>
  );
}

function Field({ label, name, type = 'text', placeholder, required = true }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-bold tracking-[.04em] text-[#345641]">{label}{required && <span aria-hidden="true"> *</span>}</span>
      <input
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
        className="focus-ring w-full rounded-xl border border-[#d8dfd3] bg-[#fbfaf6] px-4 py-3 text-[14px] text-[#1f4d3a] placeholder:text-[#92a194] transition-colors focus:border-[#1f4d3a]"
        data-testid={`input-${name}`}
      />
    </label>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [admissionSubmitted, setAdmissionSubmitted] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Purpose Grove Sober Living | North Texas';
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', 'Purpose Grove offers steady, structured sober living in North Texas for men committed to long-term sobriety.');
    document.head.appendChild(description);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const submitForm = (event: FormEvent<HTMLFormElement>, setter: (value: boolean) => void) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setter(true);
    form.reset();
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: 'Purpose Grove Sober Living',
    description: 'Structured sober living in North Texas for men committed to long-term sobriety.',
    telephone: '+1-214-555-0148',
    email: 'hello@purposegrove.com',
    areaServed: 'North Texas',
    address: { '@type': 'PostalAddress', addressLocality: 'North Texas', addressRegion: 'TX', addressCountry: 'US' },
  };

  return (
    <div className="site-shell grain bg-[#f6f2ea] text-[#1f4d3a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#d7dfd3]/75 bg-[#f6f2ea]/92 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="focus-ring link-underline text-[12px] font-semibold capitalize text-[#476452] transition-colors hover:text-[#1f4d3a]" data-testid={`link-nav-${id}`}>{label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <a href="tel:+12145550148" className="focus-ring flex items-center gap-2 text-[12px] font-semibold text-[#476452]" data-testid="link-phone"><Phone size={14} /> (214) 555-0148</a>
            <ButtonLink href="#contact" dark>Start a conversation</ButtonLink>
          </div>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="focus-ring rounded-full p-2 lg:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#d7dfd3] bg-[#f6f2ea] px-5 pb-6 pt-3 lg:hidden" aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={closeMenu} className="focus-ring flex border-b border-[#dde4da] py-3 text-sm font-semibold capitalize text-[#345641]" data-testid={`link-mobile-${id}`}>{label}</a>
            ))}
            <a href="#contact" onClick={closeMenu} className="mt-4 flex items-center justify-center rounded-full bg-[#1f4d3a] px-5 py-3 text-sm font-bold text-[#f6f2ea]" data-testid="link-mobile-contact">Start a conversation</a>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[730px] items-end overflow-hidden pt-[74px] lg:min-h-[810px]">
          <img src="/hero-grove.jpg" alt="A well-kept recovery home among tall pines at first light" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102e22]/95 via-[#183e2d]/70 to-[#183e2d]/10" />
          <div className="absolute right-[10%] top-[23%] h-36 w-36 rounded-full border border-[#dbe6d6]/30 hero-orb" />
          <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-16 lg:px-8 lg:pb-24">
            <div className="max-w-[690px] reveal visible">
               <p className="eyebrow !text-[#c7d8c1]">Purpose Grove Sober Living</p>
              <h1 className="mt-5 text-balance font-display text-[clamp(3.4rem,8vw,7rem)] leading-[.97] tracking-[-.045em] text-[#f8f6ef]">A safe place<br /><em className="text-[#bfd0b8]">to heal.</em></h1>
              <p className="mt-7 max-w-[500px] text-[17px] leading-7 text-[#e1e9dd]">A life with purpose starts with a place that makes room for it. Thoughtful homes and steady accountability for men choosing long-term sobriety.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink href="#admissions">Explore admissions</ButtonLink>
                <a href="#about" className="focus-ring group flex items-center gap-2 px-3 py-3 text-sm font-bold text-[#f4f0e6]" data-testid="link-hero-about">How it works <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a>
              </div>
            </div>
            <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#cbdcca]/30 pt-5 text-[11px] font-bold uppercase tracking-[.16em] text-[#d6e4d0] reveal delay-2">
              <span className="flex items-center gap-2"><ShieldCheck size={15} /> Substance-free homes</span>
              <span className="flex items-center gap-2"><Users size={15} /> Individualized support</span>
               <span className="flex items-center gap-2"><MapPin size={15} /> North Texas</span>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div className="reveal">
              <p className="eyebrow">A different kind of next step</p>
              <h2 className="mt-5 max-w-[510px] font-display text-[clamp(2.6rem,5vw,4.7rem)] leading-[1.02] tracking-[-.04em] text-[#1f4d3a]">Stability is not the destination. <em>It is the ground beneath you.</em></h2>
            </div>
            <div className="reveal delay-1 lg:pl-16">
              <p className="max-w-[560px] text-[19px] leading-8 text-[#476452]">Purpose Grove was built for the stretch of life that comes after the crisis—and before everything feels easy. Our homes offer the structure to practice a new way of living, with enough warmth to feel human.</p>
              <div className="mt-10 grid gap-7 border-t border-[#d5dfd1] pt-7 sm:grid-cols-3">
                <div><p className="font-display text-3xl text-[#c18f5f]">01</p><p className="mt-2 text-sm font-semibold leading-5">Live somewhere that feels like home.</p></div>
                <div><p className="font-display text-3xl text-[#c18f5f]">02</p><p className="mt-2 text-sm font-semibold leading-5">Build rhythms that hold up in real life.</p></div>
                <div><p className="font-display text-3xl text-[#c18f5f]">03</p><p className="mt-2 text-sm font-semibold leading-5">Leave with a life you want to keep.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="homes" className="bg-[#e5ecdf] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end reveal">
              <div><p className="eyebrow">Our homes</p><h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-none tracking-[-.04em]">Room to become.</h2></div>
              <p className="max-w-[350px] text-[15px] leading-6 text-[#476452]">Calm, well-kept spaces in neighborhoods that make an ordinary day feel possible again.</p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.36fr_.64fr]">
              <article className="group relative min-h-[480px] overflow-hidden rounded-[2rem] reveal">
                <img src="/hero-grove.jpg" alt="Purpose Grove house surrounded by pines and a quiet gravel path" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112d22]/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-[#f8f6ef] lg:p-9">
                   <div className="flex items-end justify-between gap-5"><div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#c7d8c1]">North Texas</p><h3 className="mt-2 font-display text-4xl">The Grove House</h3></div><span className="mb-1 rounded-full border border-[#dbe6d6]/50 px-3 py-1 text-[11px]">8 residents</span></div>
                  <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#e1e9dd]">A light-filled home with a shared kitchen, quiet reading room, and a back garden made for slow evenings.</p>
                </div>
              </article>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <article className="group relative min-h-[230px] overflow-hidden rounded-[2rem] reveal delay-1">
                  <img src="/community-room.jpg" alt="Sunlit communal dining room ready for a shared meal" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112d22]/90 via-[#112d22]/20 to-transparent" />
                  <div className="relative flex h-full min-h-[230px] flex-col justify-between p-7 text-[#f6f2ea]"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe6d6]/50"><HomeIcon size={20} strokeWidth={1.5} /></span>
                  <div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#c7d8c1]">Everyday details</p><p className="mt-2 font-display text-3xl leading-tight">A house that helps you keep your word.</p></div></div>
                </article>
                <article className="relative min-h-[230px] overflow-hidden rounded-[2rem] bg-[#c5d4bf] p-7 text-[#1f4d3a] reveal delay-2">
                  <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full border border-[#1f4d3a]/20" /><div className="absolute -right-2 top-1 h-28 w-28 rounded-full border border-[#1f4d3a]/20" />
                  <div className="relative flex h-full flex-col justify-between"><Compass size={25} strokeWidth={1.4} /><div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#52705b]">The neighborhood</p><p className="mt-2 max-w-[260px] font-display text-3xl leading-tight">Close to work, community, and the wider world.</p></div></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div className="reveal"><p className="eyebrow">Recovery program</p><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.98] tracking-[-.04em]">The quiet work<br /><em>of a new life.</em></h2><p className="mt-7 max-w-[340px] text-[15px] leading-6 text-[#476452]">No one is expected to figure it out alone. Our structure gives good intentions somewhere to land.</p></div>
            <div className="divide-y divide-[#d8dfd3] border-y border-[#d8dfd3]">
              {[
                ['01', 'Daily structure', 'Morning check-ins, house responsibilities, and a rhythm that makes room for work, rest, and recovery.'],
                ['02', 'Honest accountability', 'Weekly house meetings and clear standards create the kind of support that is direct, respectful, and earned.'],
                ['03', 'Community with depth', 'Shared meals, local meetings, service, and the simple practice of being known by the people around you.'],
                ['04', 'A plan for what is next', 'We help residents map the next season—work, relationships, wellness, and a home beyond Purpose Grove.'],
              ].map(([number, title, copy], index) => (
                <div key={number} className={`grid gap-5 py-7 sm:grid-cols-[60px_200px_1fr] sm:items-start reveal delay-${index % 3 + 1}`}>
                  <span className="font-display text-2xl text-[#c18f5f]">{number}</span><h3 className="text-lg font-bold">{title}</h3><p className="max-w-[390px] text-sm leading-6 text-[#617766]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="admissions" className="bg-[#1f4d3a] px-5 py-24 text-[#f6f2ea] lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
             <div className="reveal lg:sticky lg:top-28"><p className="eyebrow !text-[#b9ceb3]">Admissions</p><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.97] tracking-[-.04em]">Start with a<br /><em>conversation.</em></h2><p className="mt-7 max-w-[380px] text-[15px] leading-6 text-[#d2dfcc]">You do not have to have every answer before you reach out. Tell us a little about where you are, and we will help you understand the next step.</p><div className="mt-9 flex flex-col gap-3 text-sm text-[#d2dfcc]"><a href="tel:+12145550148" className="focus-ring flex w-fit items-center gap-3 hover:text-white" data-testid="link-admissions-phone"><Phone size={16} /> (214) 555-0148</a><a href="mailto:admissions@purposegrove.com" className="focus-ring flex w-fit items-center gap-3 hover:text-white" data-testid="link-admissions-email"><Mail size={16} /> admissions@purposegrove.com</a></div></div>
            <form className="rounded-[2rem] bg-[#f6f2ea] p-6 text-[#1f4d3a] sm:p-9 reveal delay-1" onSubmit={(event) => submitForm(event, setAdmissionSubmitted)} noValidate={false}>
              <div className="mb-8 flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#6e876d]">Private inquiry</p><h3 className="mt-2 font-display text-3xl">Find the right fit.</h3></div><HeartHandshake className="text-[#c18f5f]" size={28} strokeWidth={1.4} /></div>
               <div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" name="name" placeholder="Full name" /><Field label="Email address" name="email" type="email" placeholder="you@example.com" /><Field label="Phone number" name="phone" type="tel" placeholder="(214) 000-0000" /><Field label="Who are you reaching out for?" name="relationship" placeholder="Myself, son, client..." /></div>
              <label className="mt-5 block"><span className="mb-2 block text-[12px] font-bold tracking-[.04em] text-[#345641]">A little about your situation <span aria-hidden="true">*</span></span><textarea required name="message" rows={4} placeholder="Share only what feels comfortable..." className="focus-ring w-full resize-none rounded-xl border border-[#d8dfd3] bg-[#fbfaf6] px-4 py-3 text-[14px] text-[#1f4d3a] placeholder:text-[#92a194] focus:border-[#1f4d3a]" data-testid="input-admission-message" /></label>
              <button type="submit" className="focus-ring mt-6 inline-flex items-center gap-3 rounded-full bg-[#1f4d3a] px-6 py-3 text-[13px] font-bold text-[#f6f2ea] transition-transform hover:-translate-y-0.5" data-testid="button-submit-admission">Send inquiry <ArrowRight size={15} /></button>
              <FormNotice submitted={admissionSubmitted} />
              <p className="mt-4 text-[11px] leading-5 text-[#7b8d7a]">Your information is treated with care and never sold or shared for marketing.</p>
            </form>
          </div>
        </section>

        <section id="partners" className="bg-[#d7e1d3] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div className="reveal"><p className="eyebrow">For referral partners</p><h2 className="mt-5 max-w-[620px] font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.98] tracking-[-.04em]">A trusted handoff<br /><em>matters.</em></h2><p className="mt-7 max-w-[530px] text-[17px] leading-7 text-[#476452]">When you refer someone, your reputation travels with them. We make the process clear, responsive, and collaborative—from the first call through move-in and beyond.</p><div className="mt-9 grid max-w-[560px] gap-6 sm:grid-cols-2"><div className="border-l border-[#95af91] pl-4"><p className="font-bold">Fast, thoughtful response</p><p className="mt-1 text-sm leading-5 text-[#617766]">We respond to referral inquiries within one business day.</p></div><div className="border-l border-[#95af91] pl-4"><p className="font-bold">Clear communication</p><p className="mt-1 text-sm leading-5 text-[#617766]">You will know where things stand, with the resident’s consent.</p></div></div></div>
            <form className="rounded-[2rem] bg-[#f6f2ea] p-6 sm:p-9 reveal delay-1" onSubmit={(event) => submitForm(event, setPartnerSubmitted)}>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#6e876d]">Professional referral</p><h3 className="mt-2 font-display text-3xl text-[#1f4d3a]">Let’s connect.</h3><div className="mt-7 grid gap-5"><Field label="Your name" name="partner-name" placeholder="Full name" /><Field label="Organization" name="organization" placeholder="Practice or program name" /><Field label="Work email" name="partner-email" type="email" placeholder="you@organization.com" /><label><span className="mb-2 block text-[12px] font-bold tracking-[.04em] text-[#345641]">How can we help? <span aria-hidden="true">*</span></span><textarea required name="partner-message" rows={3} placeholder="Tell us about the person or partnership..." className="focus-ring w-full resize-none rounded-xl border border-[#d8dfd3] bg-[#fbfaf6] px-4 py-3 text-sm text-[#1f4d3a] placeholder:text-[#92a194]" data-testid="input-partner-message" /></label></div><button type="submit" className="focus-ring mt-6 inline-flex items-center gap-3 rounded-full bg-[#1f4d3a] px-6 py-3 text-[13px] font-bold text-[#f6f2ea] transition-transform hover:-translate-y-0.5" data-testid="button-submit-partner">Connect with us <ArrowRight size={15} /></button><FormNotice submitted={partnerSubmitted} /></form>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-[1000px] px-5 py-24 lg:px-8 lg:py-36">
          <div className="text-center reveal"><p className="eyebrow">Questions, answered</p><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-none tracking-[-.04em]">A little more clarity.</h2></div>
          <div className="mt-14 divide-y divide-[#d8dfd3] border-y border-[#d8dfd3]">
            {faqs.map((faq, index) => {
              const open = activeFaq === index;
              return <div key={faq.question} className="reveal"><button type="button" className="focus-ring flex w-full items-center justify-between gap-5 py-6 text-left" onClick={() => setActiveFaq(open ? -1 : index)} aria-expanded={open} data-testid={`button-faq-${index}`}><span className="text-[16px] font-bold text-[#1f4d3a]">{faq.question}</span><ChevronDown size={20} className={`shrink-0 text-[#6e876d] transition-transform ${open ? 'rotate-180' : ''}`} /></button>{open && <div className="max-w-[700px] pb-6 pr-10 text-[15px] leading-7 text-[#617766]" data-testid={`text-faq-answer-${index}`}>{faq.answer}</div>}</div>;
            })}
          </div>
        </section>

        <section id="resources" className="border-t border-[#d8dfd3] px-5 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end reveal"><div><p className="eyebrow">Resources</p><h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,4.7rem)] leading-none tracking-[-.04em]">For the road ahead.</h2></div><p className="max-w-[340px] text-sm leading-6 text-[#617766]">A few grounded places to begin, whether you are exploring recovery for yourself or supporting someone you love.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3"><a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noreferrer" className="focus-ring group rounded-[1.5rem] bg-[#e5ecdf] p-6 transition-transform hover:-translate-y-1 reveal" data-testid="link-resource-samhsa"><Sparkles size={21} className="text-[#c18f5f]" strokeWidth={1.5} /><h3 className="mt-10 text-lg font-bold">SAMHSA National Helpline</h3><p className="mt-2 text-sm leading-6 text-[#617766]">Free, confidential support and treatment referral information, available 24/7.</p><span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">Visit resource <ArrowRight size={14} /></span></a><a href="https://al-anon.org/" target="_blank" rel="noreferrer" className="focus-ring group rounded-[1.5rem] bg-[#f0e9dc] p-6 transition-transform hover:-translate-y-1 reveal delay-1" data-testid="link-resource-alanon"><Users size={21} className="text-[#c18f5f]" strokeWidth={1.5} /><h3 className="mt-10 text-lg font-bold">Support for families</h3><p className="mt-2 text-sm leading-6 text-[#617766]">Al-Anon offers meetings and community for people affected by someone else’s drinking.</p><span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">Find support <ArrowRight size={14} /></span></a><a href="https://www.aa.org/" target="_blank" rel="noreferrer" className="focus-ring group rounded-[1.5rem] bg-[#1f4d3a] p-6 text-[#f6f2ea] transition-transform hover:-translate-y-1 reveal delay-2" data-testid="link-resource-aa"><Clock3 size={21} className="text-[#c7d8c1]" strokeWidth={1.5} /><h3 className="mt-10 text-lg font-bold">Meetings near you</h3><p className="mt-2 text-sm leading-6 text-[#d2dfcc]">Find local recovery meetings and a community that understands the work.</p><span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">Explore meetings <ArrowRight size={14} /></span></a></div></div>
        </section>

        <section id="contact" className="bg-[#f0e9dc] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.9fr_1.1fr]">
             <div className="reveal"><p className="eyebrow">Contact</p><h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] leading-[.94] tracking-[-.05em]">There is room<br />for a <em>next step.</em></h2><p className="mt-7 max-w-[390px] text-[16px] leading-7 text-[#476452]">Whether you are ready to move in or simply trying to understand your options, we are here for the first conversation.</p><div className="mt-10 space-y-4 text-sm"><a href="tel:+12145550148" className="focus-ring flex w-fit items-center gap-3 font-bold hover:text-[#c18f5f]" data-testid="link-contact-phone"><Phone size={17} /> (214) 555-0148</a><a href="mailto:hello@purposegrove.com" className="focus-ring flex w-fit items-center gap-3 font-bold hover:text-[#c18f5f]" data-testid="link-contact-email"><Mail size={17} /> hello@purposegrove.com</a><span className="flex items-center gap-3 text-[#617766]"><MapPin size={17} /> North Texas</span></div></div>
            <form className="rounded-[2rem] bg-[#f6f2ea] p-6 sm:p-9 reveal delay-1" onSubmit={(event) => submitForm(event, setContactSubmitted)}><div className="grid gap-5 sm:grid-cols-2"><Field label="Name" name="contact-name" placeholder="Full name" /><Field label="Email" name="contact-email" type="email" placeholder="you@example.com" /></div><label className="mt-5 block"><span className="mb-2 block text-[12px] font-bold tracking-[.04em] text-[#345641]">What would you like to talk about? <span aria-hidden="true">*</span></span><select required name="topic" defaultValue="" className="focus-ring w-full appearance-none rounded-xl border border-[#d8dfd3] bg-[#fbfaf6] px-4 py-3 text-sm text-[#1f4d3a]" data-testid="select-contact-topic"><option value="" disabled>Select a topic</option><option>Admissions and availability</option><option>Professional referral</option><option>Family questions</option><option>Something else</option></select></label><label className="mt-5 block"><span className="mb-2 block text-[12px] font-bold tracking-[.04em] text-[#345641]">Your message <span aria-hidden="true">*</span></span><textarea required name="contact-message" rows={5} placeholder="How can we be helpful?" className="focus-ring w-full resize-none rounded-xl border border-[#d8dfd3] bg-[#fbfaf6] px-4 py-3 text-sm text-[#1f4d3a] placeholder:text-[#92a194]" data-testid="input-contact-message" /></label><button type="submit" className="focus-ring mt-6 inline-flex items-center gap-3 rounded-full bg-[#1f4d3a] px-6 py-3 text-[13px] font-bold text-[#f6f2ea] transition-transform hover:-translate-y-0.5" data-testid="button-submit-contact">Send message <ArrowRight size={15} /></button><FormNotice submitted={contactSubmitted} /></form>
          </div>
        </section>
      </main>

      <footer className="bg-[#1f4d3a] px-5 py-10 text-[#d2dfcc] lg:px-8">
         <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="flex items-center gap-3 text-[#f6f2ea]"><Leaf size={19} /><span className="text-[11px] font-bold uppercase tracking-[.18em]">Purpose Grove Sober Living</span></div><p className="mt-4 max-w-[270px] text-sm leading-6 text-[#a9c0a4]">A safe place to heal. A life with purpose.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold"><a href="#about" className="focus-ring hover:text-white" data-testid="link-footer-about">About</a><a href="#admissions" className="focus-ring hover:text-white" data-testid="link-footer-admissions">Admissions</a><a href="#faq" className="focus-ring hover:text-white" data-testid="link-footer-faq">FAQ</a><a href="#contact" className="focus-ring hover:text-white" data-testid="link-footer-contact">Contact</a></div><p className="text-[11px] text-[#8fab89]">© 2026 Purpose Grove Sober Living</p></div>
      </footer>
    </div>
  );
}

export default App;