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
  {
    id: "conservation-choice",
    label: "Choose the Method",
  },
  {
    id: "seed-behaviour",
    label: "Seed Behaviour",
  },
  {
    id: "method-map",
    label: "Conservation Methods",
  },
  {
    id: "genebank-pipeline",
    label: "Inside a Genebank",
  },
  {
    id: "accession-lifecycle",
    label: "Accession Lifecycle",
  },
  {
    id: "regenerate-use",
    label: "Keep It Usable",
  },
  {
    id: "global-network",
    label: "Global Network",
  },
  {
    id: "cgiar-genesys",
    label: "CGIAR and Genesys",
  },
  {
    id: "svalbard",
    label: "Svalbard Backup",
  },
  {
    id: "india-system",
    label: "India's PGR System",
  },
  {
    id: "india-genebank",
    label: "National Gene Bank",
  },
  {
    id: "india-safety",
    label: "Safety for the Future",
  },
  {
    id: "seedbank-limit",
    label: "When Seed Banking Fails",
  },
  {
    id: "in-vitro",
    label: "In-vitro Conservation",
  },
  {
    id: "cryopreservation",
    label: "Cryopreservation",
  },
  {
    id: "return-to-use",
    label: "Return to Use",
  },
  {
    id: "find-useful-trait",
    label: "Find Useful Traits",
  },
  {
    id: "bank-to-field",
    label: "From Bank to Field",
  },
  {
    id: "resource-map",
    label: "Explore Resources",
  },
  {
    id: "read-accession",
    label: "Read an Accession",
  },
  {
    id: "explore-challenge",
    label: "Explore It Yourself",
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
const seedBehaviours = {
  orthodox: {
    label: "Orthodox",
    headline: "Can usually be dried and stored cold",
    description:
      "Orthodox seeds tolerate substantial drying and low-temperature storage. This makes conventional seed banking effective for many crop species.",
    examples: "Wheat · rice · maize · many pulses",
    route: "Dry → package → cold seed-bank storage",
  },

  intermediate: {
    label: "Intermediate",
    headline: "Some drying tolerance, but clear limits",
    description:
      "Intermediate seeds tolerate some drying, but excessive drying or very low storage temperatures can damage them. Safe conditions are species-specific.",
    examples: "Storage behaviour varies among species",
    route: "Determine safe moisture and temperature experimentally",
  },

  recalcitrant: {
    label: "Recalcitrant",
    headline: "Sensitive to conventional drying",
    description:
      "Recalcitrant seeds lose viability when dried to levels used for orthodox seed banking. Many also cannot tolerate conventional freezer storage.",
    examples: "Common among many tropical tree species",
    route: "Living collections · in-vitro methods · cryopreservation",
  },
};
const genebankStages = {
  acquire: {
    number: "01",
    label: "Acquire",
    title: "Acquire and register",
    description:
      "Material enters the collection with a unique accession identity and documentation describing what it is and where it came from.",
    output: "Traceable accession + passport data",
  },

  prepare: {
    number: "02",
    label: "Prepare",
    title: "Prepare the material",
    description:
      "The material is handled according to its biology. Orthodox seed may be cleaned and dried, while vegetative or sensitive material requires different protocols.",
    output: "Material prepared for its conservation method",
  },

  test: {
    number: "03",
    label: "Test",
    title: "Check quality and viability",
    description:
      "Genebanks assess whether material is viable and suitable for conservation. Health, identity and other quality checks may also be required.",
    output: "Baseline condition documented",
  },

  store: {
    number: "04",
    label: "Store",
    title: "Place it under controlled conservation",
    description:
      "The accession is stored using the method appropriate to its biology: seed storage, field conservation, in-vitro culture or cryopreservation.",
    output: "Protected genetic resource",
  },

  monitor: {
    number: "05",
    label: "Monitor",
    title: "Monitor through time",
    description:
      "Storage does not end management. Collections are checked so declining viability, quantity or integrity can be detected before material is lost.",
    output: "Evidence that the accession remains usable",
  },

  regenerate: {
    number: "06",
    label: "Regenerate",
    title: "Regenerate when necessary",
    description:
      "When viability or available quantity becomes too low, material may be grown or propagated again while trying to preserve its original genetic composition.",
    output: "Renewed material for continued conservation",
  },
};
const breedingTraitExamples = {
  disease: {
    label: "Disease resistance",
    question: "Does an accession survive or restrict a pathogen?",
    evidence:
      "Researchers expose candidate material to the disease under controlled or field conditions and compare responses.",
    next:
      "Promising donors can enter crossing or pre-breeding programmes.",
  },

  drought: {
    label: "Drought response",
    question: "Does the material perform differently under water stress?",
    evidence:
      "Traits may involve rooting, flowering time, water use, recovery or yield under defined stress conditions.",
    next:
      "Useful responses must be confirmed across appropriate environments.",
  },

  quality: {
    label: "Quality trait",
    question: "Does the accession contain a useful nutritional or processing trait?",
    evidence:
      "Researchers characterize grain, fruit, biochemical or other quality properties and identify useful variation.",
    next:
      "The trait can be combined with agronomic performance through breeding.",
  },

  wild: {
    label: "Wild-relative trait",
    question: "Does a crop wild relative contain variation missing from cultivated material?",
    evidence:
      "Wild accessions can provide novel resistance or adaptation, but they may also carry undesirable linked traits.",
    next:
      "Pre-breeding helps transfer useful variation into material breeders can use more readily.",
  },
};
const stressCaseStudies = {
  disease: {
    kicker: "REAL CASE · GENETIC UNIFORMITY + DISEASE",
    title: "1970 · Southern corn leaf blight",
    context:
      "A new race of the pathogen encountered a crop in which most commercial hybrids shared the same vulnerable cytoplasmic background.",
    stats: [
      {
        value: "15%",
        label: "of the North American corn crop destroyed",
      },
      {
        value: ">85%",
        label: "of hybrids shared the cms-T genetic background",
      },
    ],
    lesson:
      "When a large crop shares the same susceptibility, a pathogen can turn genetic uniformity into system-wide vulnerability.",
    sources: [
      {
        label: "USDA ARS · full case",
        href: "https://www.ars.usda.gov/research/publications/publication/?seqNo115=336830",
      },
    ],
  },

  drought: {
    kicker: "REAL CASE · DROUGHT + BREEDING RESPONSE",
    title: "Zimbabwe · drought-tolerant maize",
    context:
      "Drought repeatedly reduces maize production in southern Africa. Breeding programmes developed maize with alternative genetic responses to water stress.",
    stats: [
      {
        value: "617 kg/ha",
        label: "more maize harvested by households using drought-tolerant varieties",
      },
      {
        value: "~9 months",
        label: "additional food-security equivalent reported in the study",
      },
    ],
    lesson:
      "The same drought does not have to produce the same outcome when varieties differ genetically in their stress response.",
    sources: [
      {
        label: "CIMMYT · full case",
        href: "https://www.cimmyt.org/news/drought-tolerant-maize-provides-extra-9-months-of-food-for-farming-families/",
      },
      {
        label: "DT maize programme",
        href: "https://www.cimmyt.org/projects/drought-tolerant-maize-for-africa-dtma/",
      },
    ],
  },

  heat: {
    kicker: "REAL CASE · HEATWAVE + VARIETAL RESPONSE",
    title: "India · 2022 wheat heatwave",
    context:
      "Extreme heat struck major wheat-growing areas during a sensitive late stage of the crop and reduced production.",
    stats: [
      {
        value: "4.5%",
        label: "estimated national production reduction versus normal-year weather",
      },
      {
        value: "up to 15%",
        label: "estimated yield losses in some regions",
      },
      {
        value: "3.6–5.4%",
        label: "yield advantage reported for heat-tolerant DBW187 / DBW222 versus HD-3086",
      },
    ],
    lesson:
      "Heat exposure was widespread, but varietal response differed — exactly the kind of variation breeders need to preserve and use.",
    sources: [
      {
        label: "Full heatwave study",
        href: "https://doi.org/10.1088/1748-9326/acf871",
      },
      {
        label: "Government of India · heat-tolerant wheat",
        href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1882246&lang=2&reg=48",
      },
    ],
  },

  salinity: {
    kicker: "REAL CASE · SALINITY + TOLERANT VARIETIES",
    title: "Bangladesh · fields salinized after Cyclone Aila",
    context:
      "After Cyclone Aila in 2009, severe salinity left affected coastal farmers unable to obtain reasonable dry-season rice harvests.",
    stats: [
      {
        value: "2009",
        label: "Cyclone Aila intensified the salinity problem in the case village",
      },
      {
        value: "~4 t/ha",
        label: "average yield in salt-tolerant rice demonstration trials",
      },
      {
        value: "10 dS/m",
        label: "reported salinity tolerance of the demonstrated varieties",
      },
    ],
    lesson:
      "Salt-tolerant genetic material allowed rice production to return where ordinary varieties struggled under the changed soil conditions.",
    sources: [
      {
        label: "IRRI Rice Today · full case",
        href: "https://ricetoday.irri.org/a-successful-salt-tolerant-rice-variety-in-sreefalkathi-village/",
      },
      {
        label: "Current IRRI salinity breeding",
        href: "https://news.irri.org/2024/11/advancing-resilience-2024-irri-nares.html",
      },
    ],
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

function PrintSlideReplica({ variantLabel, children }) {
  return (
    <div
      className="print-slide-replica"
      data-print-variant={variantLabel}
    >
      <div className="deck-slide__content">{children}</div>
    </div>
  );
}

function PrintStressSlides() {
  return (
    <>
      {Object.entries(stressScenarios).map(([activeKey, scenarioItem]) => {
        const caseItem = stressCaseStudies[activeKey];

        return (
          <PrintSlideReplica
            key={`print-stress-${activeKey}`}
            variantLabel={`Slide 02 · ${scenarioItem.label}`}
          >
            <div className="case-driven-stress-slide">
              <div className="case-driven-heading">
                <div>
                  <span className="slide-eyebrow">02 · TEST THE CROP</span>

                  <h2>
                    Same stress.
                    <em> Different possible outcomes.</em>
                  </h2>
                </div>

                <div className="case-driven-buttons">
                  {Object.entries(stressScenarios).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      tabIndex={-1}
                      className={activeKey === key ? "active" : ""}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="case-driven-scenario">
                <div>
                  <span>{scenarioItem.eyebrow}</span>
                  <strong>{scenarioItem.title}</strong>
                </div>

                <p>{scenarioItem.short}</p>
              </div>

              <div className="case-driven-body">
                <article className="compact-response-panel">
                  <div className="compact-response-title">
                    <span>CONCEPT</span>
                    <strong>
                      Same stress - different genetic responses
                    </strong>
                  </div>

                  <div className="compact-response-fields">
                    <div className="compact-field compact-field--narrow">
                      <div>
                        <strong>Narrow</strong>
                        <small>similar response</small>
                      </div>

                      <div className="compact-mini-field">
                        <MiniCropField
                          survivors={scenarioItem.narrowSurvivors}
                        />
                      </div>
                    </div>

                    <div className="compact-vs">VS</div>

                    <div className="compact-field compact-field--broad">
                      <div>
                        <strong>Broader</strong>
                        <small>more possible responses</small>
                      </div>

                      <div className="compact-mini-field">
                        <MiniCropField
                          survivors={scenarioItem.diverseSurvivors}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="compact-response-caption">
                    Genetic diversity does not guarantee survival. It increases
                    the range of biological responses available for selection.
                  </p>
                </article>

                <article className="dynamic-real-case">
                  <div className="dynamic-case-heading">
                    <span>{caseItem.kicker}</span>
                    <h3>{caseItem.title}</h3>
                    <p>{caseItem.context}</p>
                  </div>

                  <div className="dynamic-case-stats">
                    {caseItem.stats.map((stat) => (
                      <div key={`${stat.value}-${stat.label}`}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="dynamic-case-lesson">
                    <strong>Why this matters</strong>
                    <span>{caseItem.lesson}</span>
                  </div>

                  <div className="dynamic-case-links">
                    {caseItem.sources.map((sourceItem) => (
                      <a
                        key={sourceItem.href}
                        href={sourceItem.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {sourceItem.label} &nearr;
                      </a>
                    ))}
                  </div>
                </article>
              </div>

              <div className="case-driven-bottom">
                <strong>Conservation logic:</strong>
                <span>
                  we cannot predict which stress or trait will matter next, so
                  preserving diverse genetic resources preserves future options.
                </span>
              </div>
            </div>
          </PrintSlideReplica>
        );
      })}
    </>
  );
}

function PrintSourceSlides() {
  return (
    <>
      {Object.entries(traitSources).map(([activeKey, sourceItem]) => (
        <PrintSlideReplica
          key={`print-source-${activeKey}`}
          variantLabel={`Slide 05 · ${sourceItem.title}`}
        >
          <div className="search-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">
                05 · WIDEN THE SEARCH
              </span>

              <h2>
                The crop in the field is only
                <em> one place to look.</em>
              </h2>
            </div>

            <div className="search-explorer">
              <div className="search-map">
                <button
                  type="button"
                  tabIndex={-1}
                  className={activeKey === "wild" ? "active" : ""}
                >
                  <span>Crop wild relative</span>
                  <small>outside cultivation</small>
                </button>

                <button
                  type="button"
                  tabIndex={-1}
                  className={activeKey === "obsolete" ? "active" : ""}
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
                  tabIndex={-1}
                  className={activeKey === "landrace" ? "active" : ""}
                >
                  <span>Landrace</span>
                  <small>farmer-maintained</small>
                </button>

                <button
                  type="button"
                  tabIndex={-1}
                  className={activeKey === "breeding" ? "active" : ""}
                >
                  <span>Breeding line</span>
                  <small>experimental material</small>
                </button>
              </div>

              <article className="source-detail">
                <span className="source-detail__label">
                  {sourceItem.short}
                </span>

                <h3>{sourceItem.title}</h3>
                <p>{sourceItem.description}</p>

                <div className="source-value">
                  <small>POTENTIAL VALUE</small>
                  <strong>{sourceItem.value}</strong>
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
        </PrintSlideReplica>
      ))}
    </>
  );
}

function PrintFormSlides() {
  return (
    <>
      {Object.entries(germplasmForms).map(([activeKey, formItem]) => (
        <PrintSlideReplica
          key={`print-form-${activeKey}`}
          variantLabel={`Slide 08 · ${formItem.title}`}
        >
          <div className="germplasm-forms-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">
                08 · WHAT CAN BE CONSERVED?
              </span>

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
                    tabIndex={-1}
                    className={activeKey === key ? "active" : ""}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <article className="form-detail">
                <span>{formItem.label}</span>
                <h3>{formItem.title}</h3>
                <p>{formItem.description}</p>

                <div className="form-detail-meta">
                  <div>
                    <small>EXAMPLES</small>
                    <strong>{formItem.examples}</strong>
                  </div>

                  <div>
                    <small>CONSERVATION</small>
                    <strong>{formItem.conservation}</strong>
                  </div>
                </div>
              </article>
            </div>

            <div className="form-note">
              The biology of the material determines how it can be conserved.
              One storage method cannot work for every crop.
            </div>
          </div>
        </PrintSlideReplica>
      ))}
    </>
  );
}

function PrintSeedSlides() {
  return (
    <>
      {Object.entries(seedBehaviours).map(([activeKey, seedItem]) => (
        <PrintSlideReplica
          key={`print-seed-${activeKey}`}
          variantLabel={`Slide 11 · ${seedItem.label}`}
        >
          <div className="seed-behaviour-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">
                11 · NOT ALL SEEDS STORE THE SAME WAY
              </span>

              <h2>
                Before putting seed in storage,
                <em> understand its behaviour.</em>
              </h2>
            </div>

            <div className="seed-explorer">
              <div className="seed-type-buttons">
                {Object.entries(seedBehaviours).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    tabIndex={-1}
                    className={activeKey === key ? "active" : ""}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <article className="seed-type-detail">
                <span>{seedItem.label}</span>
                <h3>{seedItem.headline}</h3>
                <p>{seedItem.description}</p>

                <div className="seed-type-meta">
                  <div>
                    <small>EXAMPLES / CONTEXT</small>
                    <strong>{seedItem.examples}</strong>
                  </div>

                  <div>
                    <small>CONSERVATION ROUTE</small>
                    <strong>{seedItem.route}</strong>
                  </div>
                </div>
              </article>
            </div>

            <div className="seed-spectrum">
              <div>
                <strong>ORTHODOX</strong>
                <span>drying tolerant</span>
              </div>

              <i />

              <div>
                <strong>INTERMEDIATE</strong>
                <span>limited tolerance</span>
              </div>

              <i />

              <div>
                <strong>RECALCITRANT</strong>
                <span>drying sensitive</span>
              </div>
            </div>
          </div>
        </PrintSlideReplica>
      ))}
    </>
  );
}

function PrintLifecycleSlides() {
  return (
    <>
      {Object.entries(genebankStages).map(([activeKey, stageItem]) => (
        <PrintSlideReplica
          key={`print-stage-${activeKey}`}
          variantLabel={`Slide 14 · ${stageItem.title}`}
        >
          <div className="lifecycle-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">
                14 · FOLLOW ONE ACCESSION
              </span>

              <h2>
                Every accession has
                <em> a lifecycle.</em>
              </h2>
            </div>

            <div className="lifecycle-layout">
              <div className="lifecycle-buttons">
                {Object.entries(genebankStages).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    tabIndex={-1}
                    className={activeKey === key ? "active" : ""}
                  >
                    <span>{item.number}</span>
                    <strong>{item.label}</strong>
                  </button>
                ))}
              </div>

              <article className="lifecycle-detail">
                <span>STEP {stageItem.number}</span>
                <h3>{stageItem.title}</h3>
                <p>{stageItem.description}</p>

                <div>
                  <small>RESULT</small>
                  <strong>{stageItem.output}</strong>
                </div>
              </article>
            </div>

            <div className="lifecycle-warning">
              <strong>Storage alone is not conservation.</strong>
              <span>
                An accession must remain identifiable, biologically viable and
                recoverable when someone needs it.
              </span>
            </div>
          </div>
        </PrintSlideReplica>
      ))}
    </>
  );
}

function PrintTraitSlides() {
  return (
    <>
      {Object.entries(breedingTraitExamples).map(
        ([activeKey, traitItem]) => (
          <PrintSlideReplica
            key={`print-trait-${activeKey}`}
            variantLabel={`Slide 26 · ${traitItem.label}`}
          >
            <div className="trait-evaluation-slide">
              <div className="slide-heading slide-heading--compact">
                <span className="slide-eyebrow">
                  26 · FIND THE USEFUL VARIATION
                </span>

                <h2>
                  A genebank accession is not automatically
                  <em> a useful breeding parent.</em>
                </h2>
              </div>

              <div className="trait-evaluation-layout">
                <div className="trait-evaluation-buttons">
                  {Object.entries(breedingTraitExamples).map(
                    ([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        tabIndex={-1}
                        className={activeKey === key ? "active" : ""}
                      >
                        {item.label}
                      </button>
                    ),
                  )}
                </div>

                <article className="trait-evaluation-detail">
                  <span>QUESTION</span>
                  <h3>{traitItem.question}</h3>

                  <div>
                    <small>EVALUATION</small>
                    <p>{traitItem.evidence}</p>
                  </div>

                  <div>
                    <small>IF USEFUL</small>
                    <p>{traitItem.next}</p>
                  </div>
                </article>
              </div>

              <div className="trait-evaluation-note">
                <strong>
                  Characterization tells us what material is.
                </strong>

                <span>
                  Evaluation asks how it performs for traits of interest.
                </span>
              </div>
            </div>
          </PrintSlideReplica>
        ),
      )}
    </>
  );
}
function SlideFrame({ active, children, className = "" }) {
  return (
    <section
      className={`deck-slide ${active ? "deck-slide--active" : ""} ${className}`.trim()}
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
  const [activeSeedType, setActiveSeedType] = useState("orthodox");
  const [activeGenebankStage, setActiveGenebankStage] = useState("acquire");
  const [activeBreedingTrait, setActiveBreedingTrait] = useState("disease");

  const scenario = stressScenarios[activeStress];
  const stressCase = stressCaseStudies[activeStress];
  const source = traitSources[activeSource];
  const form = germplasmForms[activeForm];
  const seedType = seedBehaviours[activeSeedType];
  const genebankStage = genebankStages[activeGenebankStage];
  const breedingTrait = breedingTraitExamples[activeBreedingTrait];


  const currentChapter =
    slideIndex < 3
      ? "Chapter 01 · Why diversity matters"
      : slideIndex < 6
        ? "Chapter 02 · Where useful variation comes from"
        : slideIndex < 9
          ? "Chapter 03 · What is germplasm?"
          : slideIndex < 12
            ? "Chapter 04 · Choosing a conservation method"
            : slideIndex < 15
              ? "Chapter 05 · Inside a genebank"
              : slideIndex < 18
                ? "Chapter 06 · The global conservation system"
                : slideIndex < 21
                  ? "Chapter 07 · Plant genetic resources in India"
                  : slideIndex < 24
                    ? "Chapter 08 · Beyond conventional seed banking"
                    : slideIndex < 27
                      ? "Chapter 09 · From conservation back to use"
                      : "Chapter 10 · Explore real germplasm resources";

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [slideIndex]);

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

        <button
          type="button"
          className="deck-print-button"
          onClick={() => window.print()}
          title="Print all slides or save them as a PDF"
        >
          Print / PDF
        </button>
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

        <SlideFrame active={slideIndex === 1} className="interactive-screen-slide">
          <div className="case-driven-stress-slide">

            <div className="case-driven-heading">
              <div>
                <span className="slide-eyebrow">02 · TEST THE CROP</span>

                <h2>
                  Same stress.
                  <em> Different possible outcomes.</em>
                </h2>
              </div>

              <div className="case-driven-buttons">
                {Object.entries(stressScenarios).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={activeStress === key ? "active" : ""}
                    onClick={() => setActiveStress(key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="case-driven-scenario">
              <div>
                <span>{scenario.eyebrow}</span>
                <strong>{scenario.title}</strong>
              </div>

              <p>{scenario.short}</p>
            </div>

            <div className="case-driven-body">

              <article className="compact-response-panel">
                <div className="compact-response-title">
                  <span>CONCEPT</span>
                  <strong>Same stress — different genetic responses</strong>
                </div>

                <div className="compact-response-fields">

                  <div className="compact-field compact-field--narrow">
                    <div>
                      <strong>Narrow</strong>
                      <small>similar response</small>
                    </div>

                    <div className="compact-mini-field">
                      <MiniCropField survivors={scenario.narrowSurvivors} />
                    </div>
                  </div>

                  <div className="compact-vs">
                    VS
                  </div>

                  <div className="compact-field compact-field--broad">
                    <div>
                      <strong>Broader</strong>
                      <small>more possible responses</small>
                    </div>

                    <div className="compact-mini-field">
                      <MiniCropField survivors={scenario.diverseSurvivors} />
                    </div>
                  </div>

                </div>

                <p className="compact-response-caption">
                  Genetic diversity does not guarantee survival. It increases
                  the range of biological responses available for selection.
                </p>
              </article>

              <article className="dynamic-real-case">

                <div className="dynamic-case-heading">
                  <span>{stressCase.kicker}</span>
                  <h3>{stressCase.title}</h3>
                  <p>{stressCase.context}</p>
                </div>

                <div className="dynamic-case-stats">
                  {stressCase.stats.map((stat) => (
                    <div key={`${stat.value}-${stat.label}`}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="dynamic-case-lesson">
                  <strong>Why this matters</strong>
                  <span>{stressCase.lesson}</span>
                </div>

                <div className="dynamic-case-links">
                  {stressCase.sources.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.label} &nearr;
                    </a>
                  ))}
                </div>

              </article>

            </div>

            <div className="case-driven-bottom">
              <strong>Conservation logic:</strong>

              <span>
                we cannot predict which stress or trait will matter next, so
                preserving diverse genetic resources preserves future options.
              </span>
            </div>

          </div>
        </SlideFrame>

        {/* ------------------------------------------------------- */}
        {/* SLIDE 3 — INSIGHT / BRIDGE                              */}
        {/* ------------------------------------------------------- */}

        <PrintStressSlides />

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

        <SlideFrame active={slideIndex === 4} className="interactive-screen-slide">
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

        <PrintSourceSlides />

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

        <SlideFrame active={slideIndex === 7} className="interactive-screen-slide">
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

        <PrintFormSlides />

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
        </SlideFrame>
        <SlideFrame active={slideIndex === 9}>
          <div className="conservation-choice-slide">
            <span className="slide-eyebrow">
              10 · CONSERVATION STARTS WITH BIOLOGY
            </span>

            <h2>
              Do not choose the storage method first.
              <em> Ask what the material can survive.</em>
            </h2>

            <div className="conservation-flow">
              <article>
                <span>01</span>
                <strong>What material?</strong>
                <p>Seed, shoot tip, embryo, pollen or whole plant?</p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>02</span>
                <strong>Can it be dried?</strong>
                <p>Drying tolerance strongly affects storage options.</p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>03</span>
                <strong>Can it tolerate cold?</strong>
                <p>Seeds and tissues differ in their response to freezing.</p>
              </article>

              <b>&rarr;</b>

              <article className="conservation-flow-result">
                <span>04</span>
                <strong>Choose the method</strong>
                <p>Seed bank, field, in-vitro or cryogenic conservation.</p>
              </article>
            </div>

            <div className="conservation-rule">
              <strong>Core principle:</strong>
              <span>
                conservation method follows biological behaviour.
              </span>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 10} className="interactive-screen-slide">
          <div className="seed-behaviour-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">
                11 · NOT ALL SEEDS STORE THE SAME WAY
              </span>

              <h2>
                Before putting seed in storage,
                <em> understand its behaviour.</em>
              </h2>
            </div>

            <div className="seed-explorer">
              <div className="seed-type-buttons">
                {Object.entries(seedBehaviours).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={activeSeedType === key ? "active" : ""}
                    onClick={() => setActiveSeedType(key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <article className="seed-type-detail">
                <span>{seedType.label}</span>
                <h3>{seedType.headline}</h3>
                <p>{seedType.description}</p>

                <div className="seed-type-meta">
                  <div>
                    <small>EXAMPLES / CONTEXT</small>
                    <strong>{seedType.examples}</strong>
                  </div>

                  <div>
                    <small>CONSERVATION ROUTE</small>
                    <strong>{seedType.route}</strong>
                  </div>
                </div>
              </article>
            </div>

            <div className="seed-spectrum">
              <div>
                <strong>ORTHODOX</strong>
                <span>drying tolerant</span>
              </div>

              <i />

              <div>
                <strong>INTERMEDIATE</strong>
                <span>limited tolerance</span>
              </div>

              <i />

              <div>
                <strong>RECALCITRANT</strong>
                <span>drying sensitive</span>
              </div>
            </div>
          </div>
        </SlideFrame>

        <PrintSeedSlides />

        <SlideFrame active={slideIndex === 11}>
          <div className="method-map-slide">
            <span className="slide-eyebrow">
              12 · MATCH MATERIAL TO METHOD
            </span>

            <h2>
              Different biology requires
              <em> different conservation strategies.</em>
            </h2>

            <div className="method-grid">
              <article>
                <span>SEED BANK</span>
                <h3>Orthodox seeds</h3>
                <p>
                  Drying- and cold-tolerant seeds can often be stored
                  efficiently for long periods.
                </p>
              </article>

              <article>
                <span>FIELD GENEBANK</span>
                <h3>Living plants</h3>
                <p>
                  Useful for perennial and clonally propagated crops maintained
                  as complete plants.
                </p>
              </article>

              <article>
                <span>IN-VITRO BANK</span>
                <h3>Living tissues</h3>
                <p>
                  Shoot cultures and other tissues can be maintained under
                  controlled sterile conditions.
                </p>
              </article>

              <article>
                <span>CRYOPRESERVATION</span>
                <h3>Selected tissues</h3>
                <p>
                  Validated shoot tips, embryos and other material can be stored
                  at ultra-low temperature.
                </p>
              </article>

              <article className="method-grid-in-situ">
                <span>IN SITU / ON-FARM</span>
                <h3>Keep diversity where it continues to live</h3>
                <p>
                  Wild populations remain in natural habitats, while crop
                  diversity can continue under farmer management and selection.
                </p>
              </article>
            </div>

            <div className="method-conclusion">
              <strong>No single method works for every genetic resource.</strong>
              <span>
                Conservation programmes combine complementary approaches.
              </span>
            </div>

            <div className="chapter-next chapter-next--chapter4">
              <span>Chapter 05</span>
              <strong>
                What happens after material enters a genebank? &rarr;
              </strong>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 12}>
          <div className="genebank-pipeline-slide">
            <span className="slide-eyebrow">
              13 · A GENEBANK IS NOT JUST A FREEZER
            </span>

            <h2>
              Conservation is an
              <em> active management cycle.</em>
            </h2>

            <p className="genebank-intro">
              Material must remain identifiable, viable and available for future use.
            </p>

            <div className="genebank-pipeline">
              <article>
                <span>01</span>
                <strong>Acquire</strong>
                <small>receive material</small>
              </article>

              <b>&rarr;</b>

              <article>
                <span>02</span>
                <strong>Document</strong>
                <small>assign identity</small>
              </article>

              <b>&rarr;</b>

              <article>
                <span>03</span>
                <strong>Prepare</strong>
                <small>process correctly</small>
              </article>

              <b>&rarr;</b>

              <article>
                <span>04</span>
                <strong>Store</strong>
                <small>protect material</small>
              </article>

              <b>&rarr;</b>

              <article>
                <span>05</span>
                <strong>Monitor</strong>
                <small>check condition</small>
              </article>

              <b>&rarr;</b>

              <article className="pipeline-use">
                <span>06</span>
                <strong>Regenerate / use</strong>
                <small>keep it available</small>
              </article>
            </div>

            <div className="pipeline-note">
              <strong>The exact protocol varies by crop and conservation method.</strong>
              <span>
                The common goal is to preserve both the biological material and
                the information that makes it scientifically useful.
              </span>
            </div>

            <div className="source-link-row">
              <span>Reference:</span>
              <a
                href="https://www.fao.org/wiews/resources/en/"
                target="_blank"
                rel="noreferrer"
              >
                FAO Genebank Standards &nearr;
              </a>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 13} className="interactive-screen-slide">
          <div className="lifecycle-slide">
            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">
                14 · FOLLOW ONE ACCESSION
              </span>

              <h2>
                Every accession has
                <em> a lifecycle.</em>
              </h2>
            </div>

            <div className="lifecycle-layout">
              <div className="lifecycle-buttons">
                {Object.entries(genebankStages).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={activeGenebankStage === key ? "active" : ""}
                    onClick={() => setActiveGenebankStage(key)}
                  >
                    <span>{item.number}</span>
                    <strong>{item.label}</strong>
                  </button>
                ))}
              </div>

              <article className="lifecycle-detail">
                <span>
                  STEP {genebankStage.number}
                </span>

                <h3>{genebankStage.title}</h3>

                <p>{genebankStage.description}</p>

                <div>
                  <small>RESULT</small>
                  <strong>{genebankStage.output}</strong>
                </div>
              </article>
            </div>

            <div className="lifecycle-warning">
              <strong>Storage alone is not conservation.</strong>
              <span>
                An accession must remain identifiable, biologically viable and
                recoverable when someone needs it.
              </span>
            </div>
          </div>
        </SlideFrame>

        <PrintLifecycleSlides />

        <SlideFrame active={slideIndex === 14}>
          <div className="usable-slide">
            <span className="slide-eyebrow">
              15 · CONSERVATION MUST PRESERVE USE
            </span>

            <h2>
              A collection succeeds when material can
              <em> return to research and breeding.</em>
            </h2>

            <div className="usable-grid">
              <article>
                <span>MONITOR</span>
                <h3>Is it still alive?</h3>
                <p>
                  Viability and condition are monitored so deterioration can be
                  detected before the accession is lost.
                </p>
              </article>

              <article>
                <span>REGENERATE</span>
                <h3>Renew when necessary</h3>
                <p>
                  When viability or available quantity becomes too low, material
                  is multiplied again while protecting genetic integrity.
                </p>
              </article>

              <article>
                <span>SAFETY DUPLICATE</span>
                <h3>Do not keep the only copy in one place</h3>
                <p>
                  Important collections can be duplicated at another secure
                  location to reduce the risk of catastrophic loss.
                </p>
              </article>

              <article>
                <span>DISTRIBUTE</span>
                <h3>Put conserved diversity back into use</h3>
                <p>
                  Viable material can be supplied for legitimate research,
                  evaluation and crop-improvement work.
                </p>
              </article>
            </div>

            <div className="usable-loop">
              <strong>
                CONSERVE &rarr; MONITOR &rarr; REGENERATE &rarr; DISTRIBUTE
              </strong>

              <span>
                A genebank is a living scientific infrastructure, not a static warehouse.
              </span>
            </div>

            <div className="chapter-next chapter-next--chapter5">
              <span>Chapter 06</span>
              <strong>
                How do genebanks connect into a global conservation system? &rarr;
              </strong>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 15}>
          <div className="global-network-slide">
            <span className="slide-eyebrow">
              16 · CONSERVATION IS A NETWORK
            </span>

            <h2>
              No single genebank can conserve
              <em> all crop diversity.</em>
            </h2>

            <div className="global-network-flow">
              <article>
                <span>LOCAL / NATIONAL</span>
                <h3>National genebanks</h3>
                <p>
                  Countries conserve genetic resources important to their
                  agriculture, ecosystems and breeding programmes.
                </p>
              </article>

              <b>&harr;</b>

              <article className="global-network-core">
                <span>INTERNATIONAL</span>
                <h3>International collections</h3>
                <p>
                  Major crop collections connect conservation, research and
                  distribution across countries.
                </p>
              </article>

              <b>&harr;</b>

              <article>
                <span>INFORMATION</span>
                <h3>Shared databases</h3>
                <p>
                  Accession information allows researchers to discover material
                  conserved in many different institutions.
                </p>
              </article>

              <b>&harr;</b>

              <article>
                <span>SAFETY BACKUP</span>
                <h3>Duplicate collections</h3>
                <p>
                  Important seed collections can be duplicated elsewhere so a
                  disaster at one facility does not erase the only copy.
                </p>
              </article>
            </div>

            <div className="global-network-rule">
              <strong>One system, different roles:</strong>
              <span>
                conserve locally, share information globally, and protect
                important material with safety duplication.
              </span>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 16}>
          <div className="cgiar-genesys-slide">
            <span className="slide-eyebrow">
              17 · COLLECTIONS + INFORMATION
            </span>

            <h2>
              Physical germplasm and digital records
              <em> work together.</em>
            </h2>

            <div className="global-resource-grid">
              <article className="cgiar-card">
                <span>CGIAR GENEBANKS</span>

                <div className="global-stat-row">
                  <div>
                    <strong>11</strong>
                    <small>genebanks</small>
                  </div>

                  <div>
                    <strong>700,000+</strong>
                    <small>accessions</small>
                  </div>

                  <div>
                    <strong>3,000+</strong>
                    <small>plant species</small>
                  </div>
                </div>

                <p>
                  CGIAR genebanks conserve major international crop collections
                  and make genetic material available for research and breeding.
                </p>
              </article>

              <article className="genesys-card">
                <span>GENESYS</span>

                <strong className="genesys-number">
                  4,542,188
                </strong>

                <small>accession records currently discoverable</small>

                <p>
                  Genesys is an information platform connecting records from
                  genebanks around the world.
                </p>

                <div className="genesys-distinction">
                  <strong>Important:</strong>
                  <span>
                    Genesys does not contain millions of seed packets. It
                    contains information describing germplasm held by genebanks.
                  </span>
                </div>
              </article>
            </div>

            <div className="physical-digital-flow">
              <strong>GENEBANK</strong>
              <span>holds biological material</span>
              <b>&harr;</b>
              <strong>DATABASE</strong>
              <span>makes the material discoverable</span>
              <b>&rarr;</b>
              <strong>USER</strong>
              <span>finds material for research or breeding</span>
            </div>

            <div className="source-link-row">
              <span>Explore:</span>

              <a
                href="https://www.genesys-pgr.org/"
                target="_blank"
                rel="noreferrer"
              >
                Genesys &nearr;
              </a>

              <a
                href="https://www.cgiar.org/cgiar-research-portfolio-2025-2030/genebanks"
                target="_blank"
                rel="noreferrer"
              >
                CGIAR Genebanks &nearr;
              </a>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 17}>
          <div className="svalbard-slide">
            <span className="slide-eyebrow">
              18 · THE SAFETY BACKUP
            </span>

            <h2>
              Svalbard protects
              <em> duplicate seed samples.</em>
            </h2>

            <div className="svalbard-layout">
              <article className="svalbard-explain">
                <span>SVALBARD GLOBAL SEED VAULT</span>

                <h3>
                  A backup for genebanks — not a replacement for them.
                </h3>

                <div className="backup-flow">
                  <div>
                    <strong>Primary genebank</strong>
                    <small>manages and distributes its collection</small>
                  </div>

                  <b>&rarr;</b>

                  <div>
                    <strong>Duplicate seed sample</strong>
                    <small>prepared for safety storage</small>
                  </div>

                  <b>&rarr;</b>

                  <div>
                    <strong>Svalbard</strong>
                    <small>secure long-term backup</small>
                  </div>
                </div>

                <p>
                  The depositing institution retains responsibility for its
                  material. The Seed Vault provides insurance against loss of a
                  collection elsewhere.
                </p>
              </article>

              <article className="svalbard-stats">
                <div>
                  <strong>1,401,285</strong>
                  <span>seed samples</span>
                </div>

                <div>
                  <strong>134</strong>
                  <span>depositors</span>
                </div>

                <div>
                  <strong>6,539</strong>
                  <span>species</span>
                </div>

                <small>
                  Official Seed Vault figures accessed October 2026
                </small>
              </article>
            </div>

            <div className="svalbard-rule">
              <strong>Think of it as:</strong>
              <span>
                genebank collection &rarr; safety duplicate &rarr; secure backup.
              </span>
            </div>

            <div className="source-link-row">
              <span>Official resource:</span>

              <a
                href="https://www.seedvault.no/"
                target="_blank"
                rel="noreferrer"
              >
                Svalbard Global Seed Vault &nearr;
              </a>
            </div>

            <div className="chapter-next chapter-next--chapter6">
              <span>Chapter 07</span>
              <strong>
                How is plant germplasm conserved in India? &rarr;
              </strong>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 18}>
          <div className="india-system-slide">
            <span className="slide-eyebrow">
              19 · INDIA'S PLANT GENETIC RESOURCE SYSTEM
            </span>

            <h2>
              India's national hub is
              <em> ICAR-NBPGR.</em>
            </h2>

            <p className="india-lead">
              The National Bureau of Plant Genetic Resources coordinates major
              activities for collection, conservation, characterization,
              documentation and use of plant genetic resources.
            </p>

            <div className="india-role-grid">
              <article>
                <span>COLLECT</span>
                <h3>Explore diversity</h3>
                <p>
                  Germplasm is collected from farming systems, natural habitats
                  and other sources before valuable variation disappears.
                </p>
              </article>

              <article>
                <span>CONSERVE</span>
                <h3>Maintain material</h3>
                <p>
                  Seed, field, in-vitro and cryogenic approaches are used
                  according to the biology of the material.
                </p>
              </article>

              <article>
                <span>CHARACTERIZE</span>
                <h3>Understand what is stored</h3>
                <p>
                  Accessions are evaluated and documented so useful variation
                  can be identified.
                </p>
              </article>

              <article>
                <span>DISTRIBUTE</span>
                <h3>Return diversity to use</h3>
                <p>
                  Conserved germplasm supports crop improvement, research and
                  genetic-resource management.
                </p>
              </article>
            </div>

            <div className="india-system-note">
              <strong>ICAR-NBPGR, New Delhi</strong>
              <span>
                works with a network that includes regional stations across India.
              </span>
            </div>

            <div className="source-link-row">
              <span>Official resource:</span>

              <a
                href="https://icar.gov.in/en/national-bureaux"
                target="_blank"
                rel="noreferrer"
              >
                ICAR National Bureaux / NBPGR &nearr;
              </a>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 19}>
          <div className="india-genebank-slide">
            <span className="slide-eyebrow">
              20 · INDIA'S NATIONAL GENE BANK
            </span>

            <h2>
              More than{" "}
              <em>4.7 lakh accessions</em>{" "}
              are conserved.
            </h2>

            <div className="india-stat-layout">
              <article className="india-main-stat">
                <small>NATIONAL GENE BANK · ICAR-NBPGR · NEW DELHI</small>

                <strong>471,561</strong>
                <span>accessions</span>

                <div>
                  <b>2,157</b>
                  <span>species represented</span>
                </div>
              </article>

              <div className="india-crop-stats">
                <article>
                  <strong>~170,000</strong>
                  <span>cereal accessions</span>
                </article>

                <article>
                  <strong>60,600+</strong>
                  <span>millet accessions</span>
                </article>

                <article>
                  <strong>69,200+</strong>
                  <span>legume accessions</span>
                </article>

                <article>
                  <strong>63,500+</strong>
                  <span>oilseed accessions</span>
                </article>

                <article>
                  <strong>~30,000</strong>
                  <span>vegetable accessions</span>
                </article>
              </div>
            </div>

            <div className="india-stat-note">
              <strong>What does 471,561 mean?</strong>
              <span>
                Not 471,561 species. Each accession is a distinct documented
                germplasm sample within the collection.
              </span>
            </div>

            <div className="source-link-row">
              <span>Official source:</span>

              <a
                href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2116216&lang=2&reg=3"
                target="_blank"
                rel="noreferrer"
              >
                Government of India — National Gene Bank figures &nearr;
              </a>
            </div>

            <small className="data-date">
              Official Government of India figures reported in 2025
            </small>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 20}>
          <div className="india-safety-slide">
            <span className="slide-eyebrow">
              21 · BUILDING MORE SAFETY
            </span>

            <h2>
              One national collection should not remain
              <em> the only secure copy.</em>
            </h2>

            <div className="india-safety-flow">
              <article>
                <span>EXISTING</span>
                <h3>National Gene Bank</h3>
                <strong>4.7+ lakh accessions</strong>
                <p>
                  India's established national plant germplasm collection at
                  ICAR-NBPGR, New Delhi.
                </p>
              </article>

              <b>&rarr;</b>

              <article className="india-safety-highlight">
                <span>EXPANSION / SAFETY</span>
                <h3>Additional national capacity</h3>
                <strong>10 lakh germplasm lines</strong>
                <p>
                  A second national genebank was announced with large-scale
                  capacity to strengthen conservation and redundancy.
                </p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>2026 STATUS</span>
                <h3>National Safety Genebank</h3>
                <strong>Progress under review</strong>
                <p>
                  ICAR reported ongoing work toward a safety genebank intended
                  to strengthen long-term protection of national collections.
                </p>
              </article>
            </div>

            <div className="india-safety-rule">
              <strong>Same principle as Svalbard:</strong>
              <span>
                important genetic resources need redundancy so one failure does
                not become irreversible genetic loss.
              </span>
            </div>

            <div className="source-link-row">
              <span>Follow the programme:</span>

              <a
                href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098404&lang=2&reg=3"
                target="_blank"
                rel="noreferrer"
              >
                Second Gene Bank announcement &nearr;
              </a>

              <a
                href="https://www.icar.gov.in/en/national-advisory-board-management-genetic-resources-charts-roadmap-strengthening-indias"
                target="_blank"
                rel="noreferrer"
              >
                2026 National Safety Genebank update &nearr;
              </a>
            </div>

            <div className="chapter-next chapter-next--chapter7">
              <span>Chapter 08</span>
              <strong>
                What happens when ordinary seed banking is not enough? &rarr;
              </strong>
            </div>
          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 21}>
          <div className="seedbank-limit-slide">
            <span className="slide-eyebrow">
              22 · WHEN A SEED BANK IS NOT ENOUGH
            </span>

            <h2>
              Conventional seed banking works well —
              <em> but not for every plant.</em>
            </h2>

            <div className="seedbank-limit-grid">

              <article>
                <span>PROBLEM 01</span>
                <h3>Recalcitrant seeds</h3>
                <p>
                  Some seeds are damaged by the drying required for conventional
                  seed-bank storage.
                </p>
                <strong>Drying becomes the problem.</strong>
              </article>

              <article>
                <span>PROBLEM 02</span>
                <h3>Clonally propagated crops</h3>
                <p>
                  A seed may not reproduce the exact cultivar that growers want
                  to preserve.
                </p>
                <strong>The clone itself must be conserved.</strong>
              </article>

              <article>
                <span>PROBLEM 03</span>
                <h3>Seedless or poorly fertile material</h3>
                <p>
                  Some important crops produce little useful seed or are normally
                  propagated vegetatively.
                </p>
                <strong>There may be no suitable seed to bank.</strong>
              </article>

            </div>

            <div className="seedbank-limit-answer">
              <strong>So what can we conserve instead?</strong>

              <div>
                <span>shoot tips</span>
                <span>meristems</span>
                <span>embryos</span>
                <span>buds</span>
                <span>other living tissues</span>
              </div>
            </div>

          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 22}>
          <div className="invitro-slide">
            <span className="slide-eyebrow">
              23 · IN-VITRO CONSERVATION
            </span>

            <h2>
              Keep living tissue
              <em> growing slowly under controlled conditions.</em>
            </h2>

            <div className="invitro-flow">

              <article>
                <span>01</span>
                <strong>Select tissue</strong>
                <p>
                  A shoot tip, meristem or other suitable propagule is chosen.
                </p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>02</span>
                <strong>Establish sterile culture</strong>
                <p>
                  Material is introduced into an appropriate culture medium
                  under aseptic conditions.
                </p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>03</span>
                <strong>Slow growth</strong>
                <p>
                  Temperature, nutrients or other culture conditions are managed
                  to reduce growth and extend the interval between transfers.
                </p>
              </article>

              <b>&rarr;</b>

              <article className="invitro-flow-result">
                <span>04</span>
                <strong>Recover when needed</strong>
                <p>
                  Viable cultures can be multiplied and regenerated back into
                  plants.
                </p>
              </article>

            </div>

            <div className="invitro-use-grid">
              <div>
                <strong>Useful for</strong>
                <span>banana · potato · cassava · yam · other clonal crops</span>
              </div>

              <div>
                <strong>Main advantage</strong>
                <span>
                  living material can be maintained in a relatively compact,
                  controlled environment
                </span>
              </div>

              <div>
                <strong>Important limitation</strong>
                <span>
                  cultures still require management, monitoring and periodic
                  transfer
                </span>
              </div>
            </div>

          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 23}>
          <div className="cryo-slide">
            <span className="slide-eyebrow">
              24 · CRYOPRESERVATION
            </span>

            <h2>
              For selected material, metabolism can be reduced
              <em> to an extremely low level.</em>
            </h2>

            <div className="cryo-layout">

              <article className="cryo-main">
                <span>ULTRA-LOW-TEMPERATURE STORAGE</span>

                <strong>-196°C</strong>

                <small>temperature of liquid nitrogen</small>

                <p>
                  Carefully prepared biological material can be stored in or
                  above liquid nitrogen. At these temperatures, metabolic and
                  biochemical processes are essentially arrested.
                </p>
              </article>

              <div className="cryo-process">
                <article>
                  <span>01</span>
                  <strong>Prepare tissue</strong>
                  <small>control water and protect cells</small>
                </article>

                <b>&rarr;</b>

                <article>
                  <span>02</span>
                  <strong>Cool safely</strong>
                  <small>avoid lethal ice-crystal injury</small>
                </article>

                <b>&rarr;</b>

                <article>
                  <span>03</span>
                  <strong>Store</strong>
                  <small>liquid-nitrogen temperatures</small>
                </article>

                <b>&rarr;</b>

                <article>
                  <span>04</span>
                  <strong>Warm + recover</strong>
                  <small>regenerate viable material</small>
                </article>
              </div>

            </div>

            <div className="cryo-caution">
              <strong>Cryopreservation is not one universal recipe.</strong>
              <span>
                Controlled freezing, vitrification-based approaches and other
                protocols are selected and validated for the particular species
                and tissue.
              </span>
            </div>

            <div className="source-link-row">
              <span>Technical resources:</span>

              <a
                href="https://www.fao.org/wiews/resources/en/"
                target="_blank"
                rel="noreferrer"
              >
                FAO genebank guidance &nearr;
              </a>

              <a
                href="https://genebanks.cgiar.org/"
                target="_blank"
                rel="noreferrer"
              >
                CGIAR Genebanks &nearr;
              </a>
            </div>

            <div className="chapter-next chapter-next--chapter8">
              <span>Chapter 09</span>
              <strong>
                How does conserved diversity return to breeding and agriculture?
                &rarr;
              </strong>
            </div>

          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 24}>
          <div className="return-use-slide">

            <span className="slide-eyebrow">
              25 · CONSERVATION IS NOT THE END POINT
            </span>

            <h2>
              Germplasm matters because it can
              <em> return to use.</em>
            </h2>

            <div className="return-use-flow">

              <article>
                <span>01</span>
                <strong>Discover</strong>
                <p>
                  Search accession records for material that may contain useful
                  variation.
                </p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>02</span>
                <strong>Request</strong>
                <p>
                  Obtain available material from the conserving genebank under
                  the appropriate procedures.
                </p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>03</span>
                <strong>Evaluate</strong>
                <p>
                  Test the material to determine whether the desired phenotype
                  or genetic variation is really present.
                </p>
              </article>

              <b>&rarr;</b>

              <article className="return-use-result">
                <span>04</span>
                <strong>Use</strong>
                <p>
                  Useful material can enter research, pre-breeding or crop
                  improvement.
                </p>
              </article>

            </div>

            <div className="return-use-rule">
              <strong>A conserved accession is potential.</strong>
              <span>
                Evaluation reveals whether that potential contains something
                useful for a specific problem.
              </span>
            </div>

          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 25} className="interactive-screen-slide">
          <div className="trait-evaluation-slide">

            <div className="slide-heading slide-heading--compact">
              <span className="slide-eyebrow">
                26 · FIND THE USEFUL VARIATION
              </span>

              <h2>
                A genebank accession is not automatically
                <em> a useful breeding parent.</em>
              </h2>
            </div>

            <div className="trait-evaluation-layout">

              <div className="trait-evaluation-buttons">
                {Object.entries(breedingTraitExamples).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={activeBreedingTrait === key ? "active" : ""}
                    onClick={() => setActiveBreedingTrait(key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <article className="trait-evaluation-detail">
                <span>QUESTION</span>
                <h3>{breedingTrait.question}</h3>

                <div>
                  <small>EVALUATION</small>
                  <p>{breedingTrait.evidence}</p>
                </div>

                <div>
                  <small>IF USEFUL</small>
                  <p>{breedingTrait.next}</p>
                </div>
              </article>

            </div>

            <div className="trait-evaluation-note">
              <strong>Characterization tells us what material is.</strong>
              <span>
                Evaluation asks how it performs for traits of interest.
              </span>
            </div>

          </div>
        </SlideFrame>

        <PrintTraitSlides />

        <SlideFrame active={slideIndex === 26}>
          <div className="bank-field-slide">

            <span className="slide-eyebrow">
              27 · FROM DONOR TO CULTIVAR
            </span>

            <h2>
              Finding a useful trait is only
              <em> the beginning of breeding.</em>
            </h2>

            <div className="bank-field-flow">

              <article>
                <span>GENEBANK</span>
                <strong>Donor accession</strong>
                <p>Useful variation identified.</p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>CROSSING</span>
                <strong>Introduce the trait</strong>
                <p>Combine donor material with adapted breeding material.</p>
              </article>

              <b>&rarr;</b>

              <article className="bank-field-prebreed">
                <span>PRE-BREEDING</span>
                <strong>Make diversity usable</strong>
                <p>
                  Reduce undesirable donor characteristics while retaining the
                  valuable variation.
                </p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>SELECTION</span>
                <strong>Choose better combinations</strong>
                <p>Evaluate generations and retain promising material.</p>
              </article>

              <b>&rarr;</b>

              <article>
                <span>FIELD TESTING</span>
                <strong>Prove performance</strong>
                <p>Test agronomic value across relevant environments.</p>
              </article>

            </div>

            <div className="linkage-drag-note">
              <strong>Why can this take time?</strong>
              <span>
                A donor — especially a wild relative — may carry useful genes
                together with undesirable traits. Breeders must separate the
                useful variation from unwanted genetic background.
              </span>
            </div>

            <div className="chapter-next chapter-next--chapter9">
              <span>Chapter 10</span>
              <strong>
                Explore real germplasm collections and accession databases
                &rarr;
              </strong>
            </div>

          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 27}>
          <div className="resource-map-slide">

            <span className="slide-eyebrow">
              28 · THE REAL SYSTEM IS ONLINE
            </span>

            <h2>
              Now explore the
              <em> actual conservation network.</em>
            </h2>

            <div className="resource-map-grid">

              <a
                href="https://www.genesys-pgr.org/"
                target="_blank"
                rel="noreferrer"
              >
                <span>ACCESSION DATABASE</span>
                <h3>Genesys</h3>
                <p>
                  Search millions of plant genetic resource records contributed
                  by genebanks around the world.
                </p>
                <strong>Browse accessions &nearr;</strong>
              </a>

              <a
                href="https://www.fao.org/wiews/en/"
                target="_blank"
                rel="noreferrer"
              >
                <span>GLOBAL INFORMATION SYSTEM</span>
                <h3>FAO WIEWS</h3>
                <p>
                  Explore official information on conservation and use of plant
                  genetic resources for food and agriculture.
                </p>
                <strong>Open WIEWS &nearr;</strong>
              </a>

              <a
                href="https://www.cgiar.org/cgiar-research-portfolio-2025-2030/genebanks"
                target="_blank"
                rel="noreferrer"
              >
                <span>INTERNATIONAL COLLECTIONS</span>
                <h3>CGIAR Genebanks</h3>
                <p>
                  See how international crop collections are conserved,
                  managed and connected to research and breeding.
                </p>
                <strong>Explore CGIAR &nearr;</strong>
              </a>

              <a
                href="https://www.seedvault.no/"
                target="_blank"
                rel="noreferrer"
              >
                <span>SAFETY DUPLICATION</span>
                <h3>Svalbard Seed Vault</h3>
                <p>
                  Explore the global backup facility and see current deposit,
                  species and depositor information.
                </p>
                <strong>Visit Seed Vault &nearr;</strong>
              </a>

              <a
                href="https://icar.gov.in/en/national-bureaux"
                target="_blank"
                rel="noreferrer"
                className="resource-map-india"
              >
                <span>INDIA</span>
                <h3>ICAR-NBPGR</h3>
                <p>
                  Locate India's National Bureau of Plant Genetic Resources
                  within the ICAR national research system.
                </p>
                <strong>Open ICAR resource &nearr;</strong>
              </a>

            </div>

            <div className="resource-map-note">
              <strong>Remember:</strong>
              <span>
                these websites provide information about conserved material.
                The biological germplasm remains physically held by genebanks
                and other conservation facilities.
              </span>
            </div>

          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 28}>
          <div className="read-accession-slide">

            <span className="slide-eyebrow">
              29 · LEARN TO READ AN ACCESSION RECORD
            </span>

            <h2>
              An accession page tells a
              <em> biological story.</em>
            </h2>

            <div className="accession-reading-layout">

              <article className="accession-reading-record">

                <div>
                  <small>ACCESSION NUMBER</small>
                  <strong>Unique identity</strong>
                </div>

                <div>
                  <small>TAXON</small>
                  <strong>What species is it?</strong>
                </div>

                <div>
                  <small>COUNTRY OF ORIGIN</small>
                  <strong>Where did it come from?</strong>
                </div>

                <div>
                  <small>BIOLOGICAL STATUS</small>
                  <strong>Landrace? Wild? Cultivar? Breeding material?</strong>
                </div>

                <div>
                  <small>COLLECTING SITE</small>
                  <strong>Where was the sample obtained?</strong>
                </div>

                <div>
                  <small>HOLDING INSTITUTE</small>
                  <strong>Which genebank conserves it?</strong>
                </div>

              </article>

              <article className="accession-reading-questions">
                <span>ASK THESE QUESTIONS</span>

                <ol>
                  <li>What exactly is being conserved?</li>
                  <li>Where did the material originate?</li>
                  <li>Is it wild, traditional or bred material?</li>
                  <li>Who currently holds the accession?</li>
                  <li>What additional characterization or evaluation data exist?</li>
                </ol>

                <div>
                  <a
                    href="https://www.genesys-pgr.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Practice in Genesys &nearr;
                  </a>

                  <a
                    href="https://www.fao.org/wiews/data/ex-situ-sdg-251/search/en/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Practice in FAO WIEWS &nearr;
                  </a>
                </div>
              </article>

            </div>

          </div>
        </SlideFrame>

        <SlideFrame active={slideIndex === 29}>
          <div className="explore-challenge-slide">

            <span className="slide-eyebrow">
              30 · EXPLORE IT YOURSELF
            </span>

            <h2>
              Move from
              <em> learning about germplasm</em>
              to investigating it.
            </h2>

            <div className="explore-task-grid">

              <a
                href="https://www.genesys-pgr.org/"
                target="_blank"
                rel="noreferrer"
              >
                <span>CHALLENGE 01</span>
                <h3>Find a rice accession</h3>
                <p>
                  Identify its accession number, biological status and country
                  of origin.
                </p>
                <strong>Open Genesys &nearr;</strong>
              </a>

              <a
                href="https://www.fao.org/wiews/data/ex-situ-sdg-251/search/en/?instcode=IND002"
                target="_blank"
                rel="noreferrer"
              >
                <span>CHALLENGE 02</span>
                <h3>Explore Indian holdings</h3>
                <p>
                  Examine fields used to describe accessions held under the
                  selected Indian institute record.
                </p>
                <strong>Open WIEWS search &nearr;</strong>
              </a>

              <a
                href="https://www.seedvault.no/"
                target="_blank"
                rel="noreferrer"
              >
                <span>CHALLENGE 03</span>
                <h3>Check the global backup</h3>
                <p>
                  Find the current number of samples, depositors and species
                  represented at Svalbard.
                </p>
                <strong>Open Seed Vault &nearr;</strong>
              </a>

              <a
                href="https://www.cgiar.org/cgiar-research-portfolio-2025-2030/genebanks"
                target="_blank"
                rel="noreferrer"
              >
                <span>CHALLENGE 04</span>
                <h3>Find an international crop collection</h3>
                <p>
                  Identify one CGIAR genebank and the crops or collections it
                  conserves.
                </p>
                <strong>Open CGIAR &nearr;</strong>
              </a>

            </div>

            <div className="course-synthesis">
              <span>THE COMPLETE IDEA</span>

              <strong>
                DIVERSITY
                &rarr; GERMPLASM
                &rarr; CONSERVATION
                &rarr; DOCUMENTATION
                &rarr; EVALUATION
                &rarr; USE
              </strong>

              <p>
                Germplasm conservation protects biological options so future
                researchers, breeders and farmers are not limited only to the
                variation available in today's crops.
              </p>
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
