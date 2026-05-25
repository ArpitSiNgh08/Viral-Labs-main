/**
 * gsapConfig.js — Single source of truth for GSAP + plugins.
 *
 * WHY:
 *   - Plugins are registered ONCE, not in every component
 *   - Every component imports from here, not from "gsap" directly
 *   - Consistent setup across the entire app
 *   - If you add a new plugin later, add it here only
 *
 * USAGE:
 *   import { gsap, ScrollTrigger, useGSAP } from "../gsapConfig";
 *
 * NOTE:
 *   useGSAP handles cleanup automatically when used with { scope: ref }.
 *   No need for manual killAll().
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

// Register all plugins once
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Draggable, ScrollToPlugin);

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Draggable, ScrollToPlugin, useGSAP };