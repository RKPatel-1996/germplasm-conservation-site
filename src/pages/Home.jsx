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

  const scenario = stressScenarios[activeStress];

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
            <span>Chapter 01 · Why diversity matters</span>
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
      </main>

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
