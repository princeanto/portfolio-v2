import type { Metadata } from "next";
import "./platform-evolution.css";
import { Reveal } from "./_lib/reveal";
import { GalleryProvider, type GalleryImageEntry } from "./_lib/gallery-lightbox";
import { SectionEyebrow } from "./_lib/section-heading";
import { GridBackground } from "./_lib/grid-background";
import { HeroChain } from "./_components/hero-chain";
import { ChangeDiagram } from "./_components/change-diagram";
import { ScopingRoom } from "./_components/scoping-room";
import { DecisionList } from "./_components/decision-list";
import { WhereItBroke } from "./_components/where-it-broke";
import { ImpactMetrics } from "./_components/impact-metrics";
import { NumberedEyebrow } from "./_components/numbered-eyebrow";
import { ImagePlaceholder } from "./_components/image-placeholder";
import { RESEARCH_METHODS, RESEARCH_CATEGORIES, WHATS_NEXT } from "./_components/data";

const GALLERY_IMAGES: GalleryImageEntry[] = [
  { src: "/images/platform-evolution/hero-builder-canvas.webp", alt: "Product screenshot", aspect: "1800/1043" },
  { src: "/images/platform-evolution/card-sort.webp", alt: "Card sort", aspect: "1800/1018" },
  { src: "/images/platform-evolution/node-config-panel.png", alt: "Node + config panel", aspect: "1366/768" },
  { src: "/images/platform-evolution/custom-api-node.webp", alt: "Custom API node", aspect: "1800/1018" },
  { src: "/images/platform-evolution/version-history.webp", alt: "Version history", aspect: "1800/1018" },
  { src: "/images/platform-evolution/validation-panel.webp", alt: "Validation panel", aspect: "1800/1018" },
  { src: "/images/platform-evolution/maker-checker.png", alt: "Maker-checker", aspect: "1366/768" },
  { src: "/images/platform-evolution/case-management.png", alt: "Case management", aspect: "1366/768" },
  { src: "/images/platform-evolution/reporting.png", alt: "Reporting", aspect: "1366/768" },
];

export const metadata: Metadata = {
  title: "Platform Evolution — Prince",
  description:
    "One API instead of a hundred: how an identity verification product evolved into an enterprise workflow platform. Connect v1, v2, and v3.",
};

export default function PlatformEvolutionPage() {
  return (
    <div className="pe-root relative">
      <GalleryProvider images={GALLERY_IMAGES}>
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-border bg-background">
          <GridBackground />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
            <SectionEyebrow>Enterprise Fintech Platform · 2021–2026</SectionEyebrow>
            <Reveal delay={0.05}>
              <h1 className="text-balance text-[2.75rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]">
                One API instead of a hundred identity checks.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We had built 100+ APIs for identity verification — things like
                PAN and Aadhaar checks — used to onboard new customers. Every
                bank wanted a different combination, in a different order, so
                every bank ended up with its own custom build, done by them or
                by us. I designed the platform that turned that into something
                one person composes on a canvas — and returns through a single
                API call.
              </p>
            </Reveal>

            <HeroChain />

            <Reveal delay={0.24}>
              <a
                href="#impact"
                className="group mt-10 inline-flex items-center gap-2 text-[14px] font-medium text-foreground transition-colors duration-300 hover:text-muted-foreground"
              >
                See the impact
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M12 4v16m0 0-6-6m6 6 6-6" />
                </svg>
              </a>
            </Reveal>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32">
            <ImagePlaceholder
              aspect="1800/1043"
              label="Product screenshot"
              note="The composition layer — services on the left, flow on the canvas, configuration on the right."
              delay={0.28}
              src="/images/platform-evolution/hero-builder-canvas.webp"
            />
          </div>
        </section>

        {/* 01 — My Role */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="01">My Role</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                Senior Lead Product Designer across Connect v1, then v2, then
                v3.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  What I owned —{" "}
                </span>
                I owned this end to end — from the first workshop to what
                shipped. That meant talking to the people who&apos;d use it,
                mapping out how the whole thing should work, designing every
                screen, and building the design system behind it. When
                Connect v1 became v2, and then v3, I stayed on all the way
                through.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8 rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Collaboration
                </span>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                  Cross-functional collaboration with Leadership, Product
                  Managers, Solution Engineering, QA and Sales Operations.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 02 — The Problem */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="02">The Problem</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                Every customer needed a custom-built verification flow.
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              <Reveal delay={0.1}>
                <p className="text-pretty text-lg leading-relaxed text-foreground/80">
                  Those 100+ services covered everything from OTP checks to
                  face match and bank verification. Banks and NBFCs —
                  non-bank lenders — used them to confirm a new customer&apos;s
                  identity before onboarding them.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  The catch was that no two customers wanted the same ones, in
                  the same order. Vertex Bank might want a phone OTP, then a
                  PAN check, then a penny-drop check to confirm the bank
                  account. The next bank would want a completely different
                  combination, sequenced differently.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  So every customer became its own project: assign a team,
                  integrate one API call per service, ship it, then start
                  over for the next one.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  That worked while the customers were large. It stopped
                  working as they got smaller — the cost of serving a client
                  barely moved, but the contract shrank.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.26}>
              <p className="mt-8 border-l-2 border-[var(--accent-a)] py-1 pl-6 text-xl font-medium leading-snug text-foreground sm:text-2xl">
                Capacity, not demand, was setting how far down-market the
                business could go.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 03 — Research */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="03">Research</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                Structuring 100+ services around how people think, not how
                they&apos;re built.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {RESEARCH_METHODS.map((method) => (
                  <div key={method.label}>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      {method.label}
                    </dt>
                    <dd className="mt-1.5 text-[15px] font-medium text-foreground">
                      {method.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground">
                A hundred services on one page is a list, not a system. Search
                only helps people who already know what the platform calls the
                thing they need — which excludes every new user. So I grouped
                services by the job they do, then ran a card sort to test
                whether that grouping matched how people actually think.
              </p>
            </Reveal>

            <div className="mt-6 flex flex-wrap gap-2">
              {RESEARCH_CATEGORIES.map((cat, i) => (
                <Reveal key={cat} delay={0.2 + i * 0.02}>
                  <span className="inline-flex rounded-full border border-border-strong px-3.5 py-1.5 text-[13px] text-foreground/85 transition-colors duration-300 hover:border-[var(--accent-a)] hover:text-[var(--accent-a)]">
                    {cat}
                  </span>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ImagePlaceholder
                aspect="1800/1018"
                label="Card sort"
                note="Sort board or clustered results."
                delay={0.3}
                src="/images/platform-evolution/card-sort.webp"
              />
              <ImagePlaceholder
                aspect="1366/768"
                label="Node + config panel"
                note="A node selected with the right-side panel open."
                delay={0.34}
                src="/images/platform-evolution/node-config-panel.png"
              />
            </div>
          </div>
        </section>

        {/* 04 — Insights & Design */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="04">Insights &amp; Design</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                Three decisions that shaped the builder.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                Nobody disputed the grouping afterwards. In a company where
                every service has an owner with a view on where it belongs,
                that silence was the research paying for itself. These are the
                three decisions that followed.
              </p>
            </Reveal>

            <DecisionList />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ImagePlaceholder
                aspect="1800/1018"
                label="Custom API node"
                note="Code editor, frontend/backend toggle, variables."
                delay={0.06}
                src="/images/platform-evolution/custom-api-node.webp"
              />
              <ImagePlaceholder
                aspect="1800/1018"
                label="Version history"
                note="Published and draft tracks, with author and timestamp on every version."
                delay={0.1}
                src="/images/platform-evolution/version-history.webp"
              />
            </div>
          </div>
        </section>

        {/* Evolution intro */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
            <Reveal delay={0.05}>
              <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                The Evolution
              </span>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                How Connect v1 became v2, then v3 — why it started,
                what changed, how it worked, and what happened next.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 05 — Evolution — Why */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="05">Evolution — Why</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                Scoped by a working group, not handed down as a spec.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                My regional CEO turned it into a product question: what if the
                flow could be composed in a portal instead of assembled by a
                team? Scope wasn&apos;t handed down from there. It was set by a
                recurring cross-functional group, plus a full-day workshop to
                decide what was actually worth building.
              </p>
            </Reveal>

            <ScopingRoom />

            <Reveal delay={0.2}>
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
                My job in that room wasn&apos;t to take requirements. It was to
                hear what each expert described and push it further than
                they&apos;d framed it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 06 — Evolution — What */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="06">Evolution — What</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                From self-service for banks to an internal tool for the company.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                The original idea was to let banks build their own
                verification flows themselves. That idea didn&apos;t survive
                first contact with the problem. Composing a flow correctly
                means knowing dozens of small rules — like when a dedupe check
                (catching duplicate applicants) is needed, or what to do when
                a face match comes back uncertain. That&apos;s knowledge the
                company had. The banks didn&apos;t.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                So the product changed shape: not no-code for customers, but{" "}
                <span className="font-medium text-foreground">
                  low-code for our own implementation team.
                </span>{" "}
                Same architecture, honest about who could actually use it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 07 — Evolution — How */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="07">Evolution — How</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                100+ services collapsed into a single API call.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                Drag services onto a canvas. Connect them into a flow.
                Publish. The change that mattered most sits underneath: the
                composed flow returns through one API call.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Before, integrating a client meant hitting each service
                separately and stitching the results. After, the whole
                verification journey happens through one API call. That&apos;s
                what collapsed the work — and it made the product simpler on
                the client&apos;s side too, which was never the stated goal
                but turned out to matter in sales conversations.
              </p>
            </Reveal>

            <ChangeDiagram />
          </div>
        </section>

        {/* 08 — Evolution — When */}
        <section id="evolution-when" className="border-b border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="08">Evolution — When</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                Internal rollout exposed two gaps in Connect v1.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                Connect v1 shipped. We showed it to leadership and it landed well.
                Then we gave it to our own implementation team and put them on
                real work with smaller clients. They hit two walls.
              </p>
            </Reveal>

            <WhereItBroke />

            <div className="mt-10">
              <ImagePlaceholder
                aspect="1800/1018"
                label="Validation panel"
                note="Error taxonomy, plain-English codes, failing node highlighted, re-validate."
                delay={0.2}
                src="/images/platform-evolution/validation-panel.webp"
              />
            </div>

            <div className="mt-16 border-t border-border pt-16">
              <Reveal delay={0.05}>
                <h3 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                  Connect v2 and v3 extended the fix company-wide.
                </h3>
              </Reveal>
              <div className="mt-6 space-y-4">
                <Reveal delay={0.1}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Flows now ran, but they produced data with nowhere to look at
                    it. So we started doing the familiar thing: assign a team
                    per customer, build them a back-end portal. The exact pattern
                    the platform had just removed, returning at the next layer.
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    The next version took the same engine and made it work for
                    more than just identity checks — any team at the company
                    could now use it. It also added what a company-wide tool
                    needs: maker-checker approval, so the person who builds a
                    flow isn&apos;t the person who approves it, plus task
                    assignment, version history, and logs. It also absorbed a
                    similar low-code tool from Finflux, a lending startup the
                    company had acquired, which had built something almost
                    identical for approving loans.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    This final version closed the last gap. Every time a
                    customer goes through a flow, our product gives it its own
                    ID and turns that into a report a bank&apos;s own staff can
                    log in and read. When a customer completes onboarding at
                    Vertex Bank, someone at Vertex Bank can open it and see the
                    report — without anyone at the company building them a
                    portal.
                  </p>
                </Reveal>
                <Reveal delay={0.22}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Each version contains the one before it. Connect v3 has
                    everything v1 and v2 could do, plus case management on top.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.28}>
                <p className="mt-8 border-l-2 border-[var(--accent-a)] py-1 pl-6 text-xl font-medium leading-snug text-foreground sm:text-2xl">
                  The same reflex — assign a team, build it custom, per customer
                  — kept reappearing at each layer. Each product removed one more
                  instance of it.
                </p>
              </Reveal>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ImagePlaceholder
                  aspect="1366/768"
                  label="Maker-checker"
                  note="Approve or reject with a stated reason."
                  delay={0.32}
                  src="/images/platform-evolution/maker-checker.png"
                />
                <ImagePlaceholder
                  aspect="1366/768"
                  label="Case management"
                  note="Applicant data against OCR, with match confidence."
                  delay={0.36}
                  src="/images/platform-evolution/case-management.png"
                />
                <ImagePlaceholder
                  aspect="1366/768"
                  label="Reporting"
                  note="The report a bank's own staff reads."
                  delay={0.4}
                  src="/images/platform-evolution/reporting.png"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 09 — Business Impact */}
        <section id="impact" className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="09">Business Impact</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                What actually changed, not just what shipped.
              </h2>
            </Reveal>
            <ImpactMetrics />
            <Reveal delay={0.3}>
              <p className="mt-10 text-[15px] leading-relaxed text-muted-foreground">
                Setting up a new customer used to take a whole team, over
                weeks. Now one person can own the whole flow. For design, that
                means the hard part — the structure — is already decided. All
                that&apos;s left is picking type and colour for each client.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-6 border-l-2 border-[var(--accent-a)] py-1 pl-6 text-xl font-medium leading-snug text-foreground sm:text-2xl">
                New products get adopted because they&apos;re new. Teams only
                migrate flows that already work when the new thing is
                genuinely better.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 10 — Lessons Learned */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="10">Insights From the Build</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                What building it revealed.
              </h2>
            </Reveal>

            <div className="mt-8 divide-y divide-border">
              <Reveal delay={0.1}>
                <div className="py-6 first:pt-0">
                  <h3 className="text-[17px] font-medium text-foreground">
                    The failure state should ship with the happy path
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    We found the debugging problem by watching our own team
                    struggle with real client work — that&apos;s the right way
                    to find it. But next time, I&apos;d design what happens
                    when something goes wrong at the same time as what happens
                    when it goes right, not after.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="py-6">
                  <h3 className="text-[17px] font-medium text-foreground">
                    I&apos;d start where Connect v3 ended
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    The idea of letting other people build on top of the
                    platform, and letting customers bring their own tools —
                    that idea was possible from day one, I just didn&apos;t
                    reach for it until v3. If I&apos;d started there, v1
                    probably would have been built differently from
                    the very first day.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="py-6 last:pb-0">
                  <h3 className="text-[17px] font-medium text-foreground">
                    Backing the team&apos;s model over mine
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    I designed version history to work the way Figma&apos;s
                    does. Engineering built it differently, in a way that was
                    easier for them to maintain — so I went with their version
                    instead. It wasn&apos;t worth fighting for mine when
                    theirs worked just as well.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 11 — What's Next */}
        <section className="bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
            <NumberedEyebrow number="11">What&apos;s Next</NumberedEyebrow>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                Where the platform goes from here.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                Connect v3 was built to keep growing. These are the natural next
                steps — not things we&apos;ve already shipped:
              </p>
            </Reveal>
            <div className="mt-8 divide-y divide-border">
              {WHATS_NEXT.map((item, i) => (
                <Reveal key={item.title} delay={0.14 + i * 0.05}>
                  <div className="py-6 first:pt-0">
                    <h3 className="text-[17px] font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </GalleryProvider>
    </div>
  );
}
