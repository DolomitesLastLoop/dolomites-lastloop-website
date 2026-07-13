// Centralised photo paths used by individual sections.
// Curated semantic photos are in /public/images/<name>.jpg.
// Raw Wisthaler photos have a leading © which needs URL encoding.

const RAW_PREFIX = "/images/%C2%A9www.wisthaler.com_26_05_dolomites_last_lop__";
const raw = (id: string) => `${RAW_PREFIX}${id}.jpg`;

export const photo = {
  // Curated highlights (10) – also used on home slideshow
  hero_start: "/images/hero-start.jpg",
  day_running_1: "/images/day-running-1.jpg",
  day_running_2: "/images/day-running-2.jpg",
  day_runner_portrait: "/images/day-runner-portrait.jpg",
  bib_detail: "/images/bib-detail.jpg",
  night_runners: "/images/night-runners.jpg",
  night_camp: "/images/night-camp.jpg",
  night_headlamp: "/images/night-headlamp.jpg",
  emotion_smile: "/images/emotion-smile.jpg",
  portrait_exhausted: "/images/portrait-exhausted.jpg",

  // Raw photos picked for specific section roles
  start_atmosphere_a: raw("HW80368"), // day · start area
  start_atmosphere_b: raw("HW80286"), // day · start atmosphere
  start_close: raw("HW80522"), // day · close-up runner
  start_group: raw("HW80406"), // day · group/start
  course_runner_a: raw("HW89889"), // day · runner on course
  course_runner_b: raw("HW89427"), // day · basecamp / fatigue
  course_runner_c: raw("HW89695"), // day · runner on course (alt)
  course_anmeldung: raw("HW80361"), // day · pre-race scene
  portrait_a: raw("HHW8415"), // day · personal portrait
  portrait_b: raw("HHW8869"), // day · personal portrait
  night_focus: raw("HHW0129"), // night · transition moment
  night_intense: raw("HHW0175"), // night · gear change
  night_recovery: raw("HHW9146"), // night · two athletes recovering
  course_valley: raw("HHW7790"), // day · runner on course, Dolomites backdrop
  finish_group: raw("HW89453"), // day · four finishers under "miles over feelings" sign
};

// Object-position presets
export const pos = {
  portrait: "center 20%",
  group: "center center",
  landscape: "center 40%",
  faceTight: "center 15%",
  upper: "center 30%",
};
