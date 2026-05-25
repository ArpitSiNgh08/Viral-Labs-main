/**
 * loadingState — shared reactive object for the loading screen.
 *
 * progress:    0→1 tracks real asset loading (textures, fonts, video)
 * isComplete:  flipped to true when all assets are ready
 * onReady:     callback set by HeroSection — LoadingScreen calls it after exit animation
 *
 * Pattern matches transitionState / entranceState for consistency.
 */
export const loadingState = {
    progress: 0,
    isComplete: false,

    // HeroSection registers its entrance.play() here.
    // LoadingScreen calls it after its exit animation finishes.
    onReady: null,

    // True once the loading screen exit animation has fired.
    // Handles the race where the loader finishes before HeroSection
    // registers its onReady callback (e.g. fontReady still pending).
    hasExited: false,
  };