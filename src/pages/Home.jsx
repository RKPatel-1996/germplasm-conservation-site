import { useEffect, useState } from "react";
import "./Home.css";

const slides = [
  {
    id: "problem",
    label: "The Problem",
  },
  {
    id: "stress-response",
    label: "Test the Crop",
  },
  {
    id: "insight",
    label: "The Question",
  },
  {
    id: "trait-gap",
    label: "The Missing Trait",
  },
  {
    id: "search-space",
    label: "Search Wider",
  },
  {
    id: "oryza-case",
    label: "A Real Rescue",
  },
  {
    id: "germplasm-definition",
    label: "What Is Germplasm?",
  },
  {
    id: "germplasm-forms",
    label: "Forms of Germplasm",
  },
  {
    id: "accession",
    label: "The Accession",
  },
];

const stressScenarios = {
  disease: {
    label: "Disease",
    eyebrow: "A NEW PATHOGEN ARRIVES",
    title: "What if most plants share the same susceptibility?",
    short:
      "If resistance is missing from the cultivated variety, a disease can expose that shared weakness very quickly.",
    narrow:
      "Most plants respond similarly. When that response is susceptible, much of the crop can be affected together.",
    diverse:
      "Broader genetic variation creates more possible biological responses. Some material may contain useful resistance.",
    narrowSurvivors: [6, 15],
    diverseSurvivors: [1, 4, 7, 10, 13, 16, 18],
  },

  drought: {
    label: "Drought",
    eyebrow: "RAINFALL FAILS",
    title: "What if the crop has too few ways to cope with water stress?",
    short:
      "Useful variation may involve rooting, flowering time, water-use behaviour and other drought-response traits.",
    narrow:
      "Similar developmental and physiological responses can leave much of the crop affected together.",
    diverse:
      "Other genetic backgrounds may contain alternative drought responses that breeders can evaluate.",
    narrowSurvivors: [4, 14],
    diverseSurvivors: [2, 5, 8, 11, 14, 17, 19],
  },

  heat: {
    label: "Heat",
    eyebrow: "TEMPERATURE SPIKES",
    title: "What if heat arrives during flowering or seed formation?",
    short:
      "A productive crop can still be vulnerable when unusual heat coincides with a sensitive growth stage.",
    narrow:
      "A shared heat-sensitive response can reduce fertility or yield across a large planted area.",
    diverse:
      "Other genetic material may differ in flowering time, reproductive tolerance or heat response.",
    narrowSurvivors: [3, 16],
    diverseSurvivors: [0, 3, 6, 9, 12, 15, 18],
  },

  salinity: {
    label: "Salinity",
    eyebrow: "SALT ACCUMULATES IN THE ROOT ZONE",
    title: "What if the cultivated variety cannot tolerate the changed soil?",
    short:
      "Salt stress can disrupt water uptake and ion balance. Not all genetic material responds in the same way.",
    narrow:
      "If most plants share salt sensitivity, growth and yield may fall across the affected crop.",
    diverse:
      "Other populations may contain different mechanisms for ion control, osmotic adjustment and salt tolerance.",
    narrowSurvivors: [5, 13],
    diverseSurvivors: [1, 5, 8, 10, 13, 16, 19],
  },
};


const traitSources = {
  landrace: {
    short: "Landrace",
    title: "Traditional farmer-maintained varieties",
    description:
      "Landraces have been maintained and selected over generations in particular farming environments. They can contain locally adapted variation that is absent from modern uniform cultivars.",
    value: "Local adaptation · stress response · quality traits",
  },

  obsolete: {
    short: "Old cultivar",
    title: "Cultivars no longer widely grown",
    description:
      "A cultivar can disappear from commercial production without becoming genetically useless. Older varieties may retain traits that were not priorities during later breeding.",
    value: "Previously selected traits · historical diversity",
  },

  breeding: {
    short: "Breeding line",
    title: "Material already developed by breeders",
    description:
      "Experimental lines and breeding populations contain combinations of traits that may never have become commercial varieties but can still be valuable parents.",
    value: "Pre-selected variation · useful trait combinations",
  },

  wild: {
    short: "Wild relative",
    title: "Crop wild relatives",
    description:
      "Wild species related to crops have evolved outside modern cultivation. They can contain resistance and stress-response traits that are rare or absent in cultivated material.",
    value: "Novel resistance · environmental adaptation",
  },
};

const germplasmForms = {
  seed: {
    label: "Seed",
    title: "Seeds",
    description:
      "For many crops, seeds preserve living hereditary material and can regenerate whole plants.",
    examples: "Wheat · rice · maize · pulses",
    conservation: "Conventional seed banking when seed biology permits",
  },

  vegetative: {
    label: "Shoot / bud",
    title: "Vegetative material",
    description:
      "Clonally propagated crops may be conserved as shoot tips, buds, tubers or other vegetative tissues because seed would not preserve the exact cultivar.",
    examples: "Potato · banana · cassava · yam",
    conservation: "Field collections · in-vitro banks · cryopreservation",
  },

  pollen: {
    label: "Pollen",
    title: "Pollen",
    description:
      "Pollen carries paternal hereditary material and can support breeding when flowering times or locations do not coincide.",
    examples: "Controlled crossing and breeding programmes",
    conservation: "Storage conditions depend strongly on species",
  },

  embryo: {
    label: "Embryo",
    title: "Embryos and embryonic axes",
    description:
      "Embryos or embryonic axes can be conserved when whole seeds cannot tolerate conventional drying and low-temperature storage.",
    examples: "Important for some recalcitrant-seeded species",
    conservation: "Specialised in-vitro and cryogenic methods",
  },

  culture: {
    label: "In-vitro",
    title: "Tissues and cell cultures",
    description:
      "Shoot tips, meristems and other living tissues can be maintained under sterile laboratory conditions.",
    examples: "Especially useful for clonally propagated crops",
    conservation: "Slow-growth culture · cryopreservation",
  },

  living: {
    label: "Living plant",
    title: "Whole living collections",
    description:
      "Some genetic resources are maintained as complete plants when seed storage is unsuitable or when a particular clone must be preserved.",
    examples: "Fruit trees · perennial crops · clonal accessions",
    conservation: "Field genebanks · orchards · living collections",
  },
};
const totalPlants = 20;

function MiniCropField({ survivors }) {
  return (
    <div className="mini-field" aria-hidden="true">
      {Array.from({ length: totalPlants }, (_, index) => {
        const survives = survivors.includes(index);

        return (
          <span
            key={index}
            className={`plant ${survives ? "plant--healthy" : "plant--stressed"}`}
          >
            <span className="plant__stem" />
            <span className="plant__leaf plant__leaf--left" />
            <span className="plant__leaf plant__leaf--right" />
            <span className="plant__head" />
          </span>
        );
      })}
    </div>
  );
}

function SlideFrame({ active, children }) {
  return (
    <section
      className={`deck-slide ${active ? "deck-slide--active" : ""}`}
      aria-hidden={!active}
    >
      <div className="deck-slide__content">{children}</div>
    </section>
  );
}

function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeStress, setActiveStress] = useState("disease");
  const [activeSource, setActiveSource] = useState("wild");
  const [activeForm, setActiveForm] = useState("seed");

  const scenario = stressScenarios[activeStress];
  const source = traitSources[activeSource];
  const form = germplasmForms[activeForm];

  const currentChapter =
    slideIndex < 3
      ? "Chapter 01 · Why diversity matters"
      : slideIndex < 6
        ? "Chapter 02 · Where useful variation comes from"
        : "Chapter 03 · What is germplasm?";

  const previousSlide = () => {
    setSlideIndex((current) => Math.max(0, current - 1));
  };

  const nextSlide = () => {
    setSlideIndex((current) => Math.min(slides.length - 1, current + 1));
  };

  const goToSlide = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        setSlideIndex((current) =>
          Math.min(slides.length - 1, current + 1),
        );
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setSlideIndex((current) => Math.max(0, current - 1));
      }

      if (event.key === "Home") {
        event.preventDefault();
        setSlideIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setSlideIndex(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="presentation-deck">
      <header className="deck-header">
        <div className="deck-brand">
          <span className="deck-brand__mark">GC</span>

          <div>
            <strong>Germplasm Conservation</strong>
            <span>{currentChapter}</span>
          </div>
        </div>

        <div className="deck-counter" aria-label="Current slide">
          <strong>{String(slideIndex + 1).padStart(2, "0")}</strong>
          <span>/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </header>

      <main className="deck-stage">

        {/* ------------------------------------------------------- */}
        {/* SLIDE 1 — THE PROBLEM                                   */}
        {/* ------------------------------------------------------- */}

        <SlideFrame active={slideIndex === 0}>
          <div className="slide-one">
            <span className="slide-eyebrow">01 · THE PROBLEM</span>

            <h1>
              A productive crop can still be
              <em> vulnerable.</em>
            </h1>

            <p className="slide-lead">
              Modern agriculture can produce remarkably uniform,
              high-performing crops. But when large areas depend on a narrow
              range of genetic responses, changing conditions can expose a
              shared weakness.
            </p>

            <div className="cause-chain">
              <article>
                <small>1</small>
                <strong>Reliable crop</strong>
              </article>

              <span>→</span>

              <article>
                <small>2</small>
                <strong>Shared susceptibility</strong>
              </article>

              <span>→</span>

              <article>
                <small>3</small>
                <strong>New stress</strong>
              </article>

              <span>→</span>

              <article className="cause-chain__risk">
                <small>4</small>
                <strong>Few options</strong>
              </article>
            </div>

            <p className="slide-caveat">
              Modern cultivars are not inherently unsafe. The vulnerability
              appears when too much production depends on too narrow a range
              of responses to changing conditions.
            </p>
          </div>
        </SlideFrame>

        {/* ------------------------------------------------------- */}
        {/* SLIDE 2 — STRESS + RESPONSE TOGETHER                    */}
        {/* ------------------------------------------------------- */}

        <SlideFrame active={slideIndex === 1}>
          <div className="experiment-slide">

            <div className="experiment-top">
              <div className="slide-heading slide-heading--experiment">
                <span className="slide-eyebrow">
                  02 · TEST THE CROP
                </span>

                <h2>
                  Same stress.
                  <br />
                  Different possible outcomes.
                </h2>
              </div>

              <div
                className="stress-grid stress-grid--compact"
                role="group"
                aria-label="Choose a crop stress"
              >
                {Object.entries(stressScenarios).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={activeStress === key ? "active" : ""}
                    aria-pressed={activeStress === key}
                    onClick={() => setActiveStress(key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="scenario-strip">
              <div>
                <span>{scenario.eyebrow}</span>
                <strong>{scenario.title}</strong>
              </div>

              <p>{scenario.short}</p>
            </div>

            <div className="population-comparison population-comparison--merged">

              <article className="population-card population-card--narrow">
                <div className="population-card__title">
                  <span>A</span>

                  <div>
                    <strong>Narrow response range</strong>
                    <small>
                      many plants share a similar genetic response
                    </small>
                  </div>
                </div>

                <MiniCropField survivors={scenario.narrowSurvivors} />

                <p>{scenario.narrow}</p>
              </article>

              <div className="population-vs">
                SAME
                <br />
                STRESS
              </div>

              <article className="population-card population-card--diverse">
                <div className="population-card__title">
                  <span>B</span>

                  <div>
                    <strong>Broader response range</strong>
                    <small>
                      more genetic variation is represented
                    </small>
                  </div>
                </div>

                <MiniCropField survivors={scenario.diverseSurvivors} />

                <p>{scenario.diverse}</p>
              </article>
            </div>

            <div className="experiment-takeaway">
              <strong>Key idea</strong>

              <span>
                Genetic diversity does not guarantee survival. It increases
                the range of biological responses available when conditions
                change.
              </span>
            </div>
          </div>
        </SlideFrame>

        {/* ------------------------------------------------------- */}
        {/* SLIDE 3 — INSIGHT / BRIDGE                              */}
        {/* ------------------------------------------------------- */}

        <SlideFrame active={slideIndex === 2}>
          <div className="insight-slide">
            <span className="slide-eyebrow">03 · THE KEY INSIGHT</span>

            <h2>
              When the current crop cannot solve the problem,
              <em> breeders need somewhere else to look.</em>
            </h2>

            <div className="trait-cloud">
              <span>Disease resistance</span>
              <span>Drought response</span>
              <span>Heat tolerance</span>
              <span>Salt tolerance</span>
              <span>Quality traits</span>
              <span>Local adaptation</span>
            </div>

            <div className="chapter-question">
              <small>NEXT QUESTION</small>

              <strong>
                Where do those missing traits come from?
              </strong>

              <p>
                Traditional varieties, old cultivars, breeding material and
                wild relatives may contain useful variation that is absent
                from the crop currently in production.
              </p>
            </div>

            <div className="chapter-next">
              <span>Chapter 02</span>
              <strong>
                Where useful variation comes from →
              </strong>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 3}>
          <div className="trait-gap-slide">
            <div className="slide-heading">
              <span className="slide-eyebrow">04 · THE TRAIT IS MISSING</span>
              <h2>
                What if the crop we grow
                <em> does not contain the trait we need?</em>
              </h2>
            </div>

            <div className="trait-gap-layout">
              <article className="cultivar-profile">
                <div className="cultivar-profile__header">
                  <span>CURRENT CULTIVAR</span>
                  <strong>High-performing rice variety</strong>
                </div>

                <div className="trait-list">
                  <div><span>High yield</span><strong className="trait-good">✓</strong></div>
                  <div><span>Uniform maturity</span><strong className="trait-good">✓</strong></div>
                  <div><span>Desired grain quality</span><strong className="trait-good">✓</strong></div>
                  <div className="trait-list__missing">
                    <span>Resistance to a new disease</span>
                    <strong>?</strong>
                  </div>
                </div>
              </article>

              <div className="trait-gap-arrow">→</div>

              <article className="breeder-problem">
                <span>BREEDER'S PROBLEM</span>

                <strong>
                  Selection can only use variation that is present in the
                  material being searched.
                </strong>

                <p>
                  If the required response is absent, repeatedly selecting
                  within the same narrow material may not solve the problem.
                </p>

                <div className="search-wider-callout">
                  Search a wider genetic resource →
                </div>
              </article>
            </div>

            <p className="trait-gap-footer">
              The cultivar in today's field represents only a fraction of the
              genetic variation that may exist within the crop and its relatives.
            </p>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 4}>
          <div className="search-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">05 · WIDEN THE SEARCH</span>

              <h2>
                The crop in the field is only
                <em> one place to look.</em>
              </h2>
            </div>

            <div className="search-explorer">
              <div className="search-map">

                <button
                  type="button"
                  className={activeSource === "wild" ? "active" : ""}
                  onClick={() => setActiveSource("wild")}
                >
                  <span>Crop wild relative</span>
                  <small>outside cultivation</small>
                </button>

                <button
                  type="button"
                  className={activeSource === "obsolete" ? "active" : ""}
                  onClick={() => setActiveSource("obsolete")}
                >
                  <span>Old cultivar</span>
                  <small>previously grown</small>
                </button>

                <div className="current-crop-node">
                  <small>CURRENT</small>
                  <strong>CROP</strong>
                  <span>today's cultivated material</span>
                </div>

                <button
                  type="button"
                  className={activeSource === "landrace" ? "active" : ""}
                  onClick={() => setActiveSource("landrace")}
                >
                  <span>Landrace</span>
                  <small>farmer-maintained</small>
                </button>

                <button
                  type="button"
                  className={activeSource === "breeding" ? "active" : ""}
                  onClick={() => setActiveSource("breeding")}
                >
                  <span>Breeding line</span>
                  <small>experimental material</small>
                </button>
              </div>

              <article className="source-detail">
                <span className="source-detail__label">{source.short}</span>
                <h3>{source.title}</h3>
                <p>{source.description}</p>

                <div className="source-value">
                  <small>POTENTIAL VALUE</small>
                  <strong>{source.value}</strong>
                </div>
              </article>
            </div>

            <div className="search-slide__takeaway">
              <strong>Core idea:</strong>
              <span>
                breeders preserve access to variation because tomorrow's useful
                trait may not be present in today's successful cultivar.
              </span>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 5}>
          <div className="case-slide">
            <div className="case-slide__heading">
              <span className="slide-eyebrow">06 · A REAL RESCUE</span>

              <h2>
                A wild rice relative supplied resistance
                <em> cultivated rice needed.</em>
              </h2>

              <p>
                Rice grassy stunt disease provides a classic example of why
                conserving genetic diversity matters before a crisis occurs.
              </p>
            </div>

            <div className="case-timeline">
              <article>
                <span>01</span>
                <strong>Problem</strong>
                <p>Grassy stunt disease became a serious threat to Asian rice.</p>
              </article>

              <div className="case-arrow">→</div>

              <article>
                <span>02</span>
                <strong>Search</strong>
                <p>Researchers screened thousands of rice lines for resistance.</p>
              </article>

              <div className="case-arrow">→</div>

              <article className="case-highlight">
                <span>03</span>
                <strong>Wild relative</strong>
                <p>
                  Resistance was identified in
                  <em> Oryza nivara</em>, a wild rice relative collected in India.
                </p>
              </article>

              <div className="case-arrow">→</div>

              <article>
                <span>04</span>
                <strong>Breeding</strong>
                <p>
                  The resistance was incorporated into cultivated rice breeding
                  material.
                </p>
              </article>
            </div>

            <div className="case-conclusion">
              <div>
                <small>WHY CONSERVATION MATTERED</small>
                <strong>
                  Breeders could use the trait because the biological material
                  had already been collected and made available for research.
                </strong>
              </div>

              <div className="case-question">
                <small>NEXT QUESTION</small>
                <strong>
                  What do we call these conserved biological resources?
                </strong>
                <span>Chapter 03 · Germplasm →</span>
              </div>
            </div>

            <div className="case-resources">
              <span>Primary resources:</span>

              <a
                href="https://books.irri.org/9789712202421_content.pdf"
                target="_blank"
                rel="noreferrer"
              >
                IRRI historical account ↗
              </a>

              <a
                href="https://ricetoday.irri.org/feral-play-blank/"
                target="_blank"
                rel="noreferrer"
              >
                IRRI Rice Today retrospective ↗
              </a>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 6}>
          <div className="germplasm-definition-slide">
            <span className="slide-eyebrow">07 · WHAT IS GERMPLASM?</span>

            <h2>
              Germplasm is
              <em> biological material carrying hereditary information.</em>
            </h2>

            <p className="germplasm-definition-lead">
              We conserve it because the material may contain genetic variation
              useful for breeding, research, restoration or future crop improvement.
            </p>

            <div className="definition-equation">
              <article>
                <span>BIOLOGICAL MATERIAL</span>
                <strong>Seed · tissue · pollen · embryo · living plant</strong>
              </article>

              <b>+</b>

              <article>
                <span>HEREDITARY INFORMATION</span>
                <strong>Genetic variation that can be inherited</strong>
              </article>

              <b>=</b>

              <article className="definition-result">
                <span>GERMPLASM</span>
                <strong>A plant genetic resource that can be conserved and used</strong>
              </article>
            </div>

            <div className="definition-distinction">
              <strong>Important distinction:</strong>
              <span>
                A digital DNA sequence describes genetic information.
                Germplasm conservation preserves physical biological material.
              </span>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 7}>
          <div className="germplasm-forms-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">08 · WHAT CAN BE CONSERVED?</span>

              <h2>
                Germplasm is
                <em> not just seed.</em>
              </h2>
            </div>

            <div className="form-explorer">
              <div className="form-buttons">
                {Object.entries(germplasmForms).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={activeForm === key ? "active" : ""}
                    onClick={() => setActiveForm(key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <article className="form-detail">
                <span>{form.label}</span>
                <h3>{form.title}</h3>
                <p>{form.description}</p>

                <div className="form-detail-meta">
                  <div>
                    <small>EXAMPLES</small>
                    <strong>{form.examples}</strong>
                  </div>

                  <div>
                    <small>CONSERVATION</small>
                    <strong>{form.conservation}</strong>
                  </div>
                </div>
              </article>
            </div>

            <div className="form-note">
              The biology of the material determines how it can be conserved.
              One storage method cannot work for every crop.
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 8}>
          <div className="accession-slide">
            <span className="slide-eyebrow">
              09 · HOW A GENEBANK KNOWS WHAT IT HAS
            </span>

            <h2>
              A stored sample needs
              <em> an identity.</em>
            </h2>

            <div className="accession-layout">
              <article className="accession-object">
                <span className="accession-label">ACCESSION</span>

                <div className="seed-sample">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <strong>
                  A distinct, uniquely identifiable germplasm sample
                </strong>

                <p>
                  It may represent a cultivar, breeding line or population
                  maintained for conservation and use.
                </p>
              </article>

              <div className="accession-plus">+</div>

              <article className="passport-record">
                <span>PASSPORT DATA</span>

                <div>
                  <strong>Accession number</strong>
                  <small>unique genebank identifier</small>
                </div>

                <div>
                  <strong>Scientific name</strong>
                  <small>what material is it?</small>
                </div>

                <div>
                  <strong>Origin</strong>
                  <small>where did it come from?</small>
                </div>

                <div>
                  <strong>Collection information</strong>
                  <small>where and when was it collected?</small>
                </div>

                <div>
                  <strong>Biological status</strong>
                  <small>landrace, wild, breeding material, cultivar...</small>
                </div>
              </article>
            </div>

            <div className="accession-bottom">
              <div>
                <strong>Material + identity + documentation</strong>
                <span>
                  turns a stored sample into a traceable scientific resource.
                </span>
              </div>

              <div className="accession-links">
                <a
                  href="https://www.fao.org/wiews/glossary/en/"
                  target="_blank"
                  rel="noreferrer"
                >
                  FAO glossary &nearr;
                </a>

                <a
                  href="https://www.genesys-pgr.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore real accession records &nearr;
                </a>
              </div>
            </div>

            <div className="chapter-next chapter-next--chapter3">
              <span>Chapter 04</span>
              <strong>
                How do we conserve different kinds of germplasm? &rarr;
              </strong>
            </div>
          </div>
        </SlideFrame>      </main>



      <footer className="deck-controls">
        <button
          type="button"
          className="deck-nav-button"
          onClick={previousSlide}
          disabled={slideIndex === 0}
        >
          <span>←</span>
          Previous
        </button>

        <div className="deck-progress" aria-label="Slide navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === slideIndex ? "active" : ""}
              aria-label={`Go to slide ${index + 1}: ${slide.label}`}
              aria-current={index === slideIndex ? "step" : undefined}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="deck-nav-button deck-nav-button--next"
          onClick={nextSlide}
          disabled={slideIndex === slides.length - 1}
        >
          Next
          <span>→</span>
        </button>
      </footer>
    </div>
  );
}

export default Home;
