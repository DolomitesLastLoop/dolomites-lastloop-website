// Optimierte Homepage-Fotos als ImageMetadata (für <Image> aus astro:assets).
// Quelle liegt unter src/assets/home/, wird beim Build zu WebP konvertiert.
import portraitExhausted from "../assets/home/portrait-exhausted.jpg";
import dayRunning2 from "../assets/home/day-running-2.jpg";
import nightIntense from "../assets/home/night-intense.jpg";
import nightFocus from "../assets/home/night-focus.jpg";
import startGroup from "../assets/home/start-group.jpg";
import portraitA from "../assets/home/portrait-a.jpg";
import courseRunnerC from "../assets/home/course-runner-c.jpg";
import startAtmosphereA from "../assets/home/start-atmosphere-a.jpg";

export const homePhoto = {
  portrait_exhausted: portraitExhausted,
  day_running_2: dayRunning2,
  night_intense: nightIntense,
  night_focus: nightFocus,
  start_group: startGroup,
  portrait_a: portraitA,
  course_runner_c: courseRunnerC,
  start_atmosphere_a: startAtmosphereA,
};
