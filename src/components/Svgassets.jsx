import { forwardRef } from "react";

/**
 * All SVG assets as inline React components.
 * Every element is accessible via refs for GSAP animation.
 *
 * Usage:
 *   import { ViralLabsLogo, ArrowIcon, ... } from "./SvgAssets";
 */

// ── Viral Labs Logo (13×13) ──
export const ViralLabsLogo = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 0.682246V1.3511V2.01878V2.40452C0 2.52779 0.0999335 2.62772 0.223208 2.62772H0.676259C3.10505 2.63021 8.11332 2.6337 8.71602 2.62772C9.31872 2.62175 9.42692 3.09595 9.40568 3.3338L9.43567 11.3883V11.7184C9.43567 11.9033 9.58557 12.0532 9.77048 12.0532H10.0466H11.4109H11.8287C11.9519 12.0532 12.0519 11.9533 12.0519 11.83V11.7917C12.0469 9.4805 12.0399 4.84083 12.0519 4.77209C12.0639 4.70336 11.9944 4.53425 11.9582 4.45828C10.5589 3.0586 7.73176 0.233068 7.61782 0.128464C7.50387 0.0238607 7.35295 -0.000751861 7.29173 1.72957e-05H7.10652H0.677771H0.223208C0.0999337 1.72957e-05 0 0.0999511 0 0.223226V0.682246Z"
      fill="white"
    />
    <path
      d="M9.04931 11.6991C9.0655 11.9803 8.83244 12.0524 8.71388 12.0532L6.69556 12.0363H6.65134C6.50968 12.0363 6.39484 11.9214 6.39484 11.7798C6.40159 10.1091 6.41103 6.65829 6.39484 6.22021C6.37865 5.78214 5.99291 5.65148 5.80206 5.64091H0.669517H0.467106H0.181571C0.0812922 5.64091 0 5.55962 0 5.45934V3.35542V3.23278C0 3.1095 0.0999337 3.00957 0.223208 3.00957H0.232889C1.49844 3.00669 4.07406 3.00265 4.25218 3.00957C4.4303 3.01649 4.54808 3.08162 4.58471 3.11333C5.92833 4.46502 8.66068 7.203 8.84111 7.34134C9.02155 7.47968 9.05509 7.71409 9.04931 7.81401V10.039C9.04256 10.4751 9.03311 11.4178 9.04931 11.6991Z"
      fill="white"
    />
  </svg>
));

// ── Viral Labs Wordmark Logo (white) ──
export const ViralLabsWordmark = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 795 123"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M168.165 120.188L131.928 11.9696H154.555L181.938 102.48H183.905L211.452 11.9696H233.752L197.351 120.188H168.165Z" fill="white"/>
    <path d="M240.809 120.188V34.4332H261.468V120.188H240.809ZM251.138 20.9878C246.985 20.9878 243.76 20.1133 241.464 18.3644C239.278 16.5061 238.185 13.8826 238.185 10.4939C238.185 7.10526 239.278 4.53643 241.464 2.78745C243.76 0.92915 246.985 0 251.138 0C255.511 0 258.79 0.874495 260.977 2.62348C263.163 4.37247 264.256 6.99595 264.256 10.4939C264.256 13.8826 263.108 16.5061 260.813 18.3644C258.626 20.1133 255.402 20.9878 251.138 20.9878Z" fill="white"/>
    <path d="M269.926 120.188V34.4332H287.306L286.978 63.9473H289.93C290.913 56.9514 292.444 51.1579 294.521 46.5668C296.598 41.8664 299.494 38.3684 303.211 36.0728C306.928 33.668 311.519 32.4656 316.984 32.4656C318.077 32.4656 319.225 32.5202 320.428 32.6295C321.739 32.7388 323.16 33.0121 324.691 33.4494L323.871 55.257C322.122 54.6012 320.318 54.1639 318.46 53.9453C316.711 53.6174 315.071 53.4534 313.541 53.4534C309.278 53.4534 305.561 54.5465 302.391 56.7327C299.33 58.919 296.816 62.0344 294.849 66.0789C292.99 70.0141 291.569 74.7145 290.585 80.1801V120.188H269.926Z" fill="white"/>
    <path d="M351.1 122.32C346.399 122.32 342.191 121.445 338.474 119.696C334.758 117.838 331.806 115.105 329.62 111.498C327.543 107.891 326.505 103.409 326.505 98.0526C326.505 93.5708 327.324 89.7449 328.964 86.5748C330.713 83.4048 333.282 80.836 336.671 78.8684C340.059 76.7914 344.268 75.0971 349.296 73.7854C354.324 72.3643 360.227 71.1619 367.005 70.1781C370.721 69.6315 373.727 69.085 376.023 68.5384C378.428 67.9918 380.177 67.172 381.27 66.0789C382.363 64.8765 382.909 63.1275 382.909 60.8319C382.909 57.4433 381.707 54.5465 379.302 52.1417C377.007 49.6275 373.235 48.3704 367.988 48.3704C364.818 48.3704 361.758 48.917 358.806 50.0101C355.964 51.1032 353.505 52.8522 351.428 55.257C349.351 57.5526 347.93 60.6133 347.165 64.4392L328.636 58.7004C329.839 54.3279 331.588 50.5566 333.883 47.3866C336.179 44.1073 339.021 41.3198 342.409 39.0243C345.798 36.7287 349.679 35.0344 354.051 33.9413C358.424 32.8482 363.233 32.3016 368.48 32.3016C376.46 32.3016 383.019 33.6133 388.156 36.2368C393.294 38.751 397.12 42.7409 399.634 48.2064C402.148 53.5627 403.405 60.504 403.405 69.0303V85.0991C403.405 88.8157 403.46 92.6963 403.569 96.7408C403.788 100.676 404.007 104.666 404.225 108.71C404.553 112.646 404.936 116.472 405.373 120.188H386.845C386.407 117.127 386.025 113.848 385.697 110.35C385.369 106.852 385.096 103.3 384.877 99.6922H382.254C380.723 103.846 378.537 107.672 375.695 111.17C372.853 114.559 369.355 117.291 365.201 119.368C361.156 121.336 356.456 122.32 351.1 122.32ZM359.298 107.071C361.484 107.071 363.671 106.688 365.857 105.923C368.152 105.158 370.393 104.01 372.579 102.48C374.766 100.949 376.788 99.091 378.646 96.9048C380.505 94.6092 382.09 91.9311 383.401 88.8704L383.073 74.2773L387.009 74.9331C385.15 76.4635 382.855 77.6659 380.122 78.5404C377.389 79.4149 374.492 80.0708 371.432 80.508C368.48 80.9453 365.474 81.4918 362.413 82.1477C359.462 82.6943 356.784 83.4594 354.379 84.4433C351.974 85.3177 350.061 86.6295 348.64 88.3785C347.219 90.0181 346.509 92.3137 346.509 95.2651C346.509 98.9817 347.711 101.878 350.116 103.955C352.521 106.032 355.581 107.071 359.298 107.071Z" fill="white"/>
    <path d="M410.976 120.188V3.77125H431.308V120.188H410.976Z" fill="white"/>
    <path d="M475.072 120.188V11.9696H495.732V120.188H475.072ZM479.827 120.188V102.48H543.118V120.188H479.827Z" fill="white"/>
    <path d="M571.111 122.32C566.41 122.32 562.202 121.445 558.485 119.696C554.769 117.838 551.817 115.105 549.631 111.498C547.554 107.891 546.516 103.409 546.516 98.0526C546.516 93.5708 547.335 89.7449 548.975 86.5748C550.724 83.4048 553.293 80.836 556.682 78.8684C560.07 76.7914 564.279 75.0971 569.307 73.7854C574.335 72.3643 580.238 71.1619 587.016 70.1781C590.732 69.6315 593.738 69.085 596.034 68.5384C598.439 67.9918 600.188 67.172 601.281 66.0789C602.374 64.8765 602.92 63.1275 602.92 60.8319C602.92 57.4433 601.718 54.5465 599.313 52.1417C597.018 49.6275 593.246 48.3704 587.999 48.3704C584.829 48.3704 581.769 48.917 578.817 50.0101C575.975 51.1032 573.516 52.8522 571.439 55.257C569.362 57.5526 567.941 60.6133 567.176 64.4392L548.647 58.7004C549.85 54.3279 551.599 50.5566 553.894 47.3866C556.19 44.1073 559.032 41.3198 562.42 39.0243C565.809 36.7287 569.69 35.0344 574.062 33.9413C578.435 32.8482 583.244 32.3016 588.491 32.3016C596.471 32.3016 603.03 33.6133 608.167 36.2368C613.305 38.751 617.131 42.7409 619.645 48.2064C622.159 53.5627 623.416 60.504 623.416 69.0303V85.0991C623.416 88.8157 623.471 92.6963 623.58 96.7408C623.799 100.676 624.018 104.666 624.236 108.71C624.564 112.646 624.947 116.472 625.384 120.188H606.856C606.418 117.127 606.036 113.848 605.708 110.35C605.38 106.852 605.107 103.3 604.888 99.6922H602.265C600.734 103.846 598.548 107.672 595.706 111.17C592.864 114.559 589.366 117.291 585.212 119.368C581.167 121.336 576.467 122.32 571.111 122.32ZM579.309 107.071C581.495 107.071 583.682 106.688 585.868 105.923C588.163 105.158 590.404 104.01 592.59 102.48C594.777 100.949 596.799 99.091 598.657 96.9048C600.516 94.6092 602.101 91.9311 603.412 88.8704L603.084 74.2773L607.02 74.9331C605.161 76.4635 602.866 77.6659 600.133 78.5404C597.4 79.4149 594.503 80.0708 591.443 80.508C588.491 80.9453 585.485 81.4918 582.424 82.1477C579.473 82.6943 576.795 83.4594 574.39 84.4433C571.985 85.3177 570.072 86.6295 568.651 88.3785C567.23 90.0181 566.52 92.3137 566.52 95.2651C566.52 98.9817 567.722 101.878 570.127 103.955C572.532 106.032 575.593 107.071 579.309 107.071Z" fill="white"/>
    <path d="M680.177 122.32C674.712 122.32 670.011 121.281 666.076 119.204C662.141 117.018 658.916 113.957 656.402 110.022C653.997 106.087 652.248 101.387 651.155 95.921H648.204L648.368 120.188H630.987V3.77125H651.647V31.4818C651.647 34.1052 651.483 36.9473 651.155 40.0081C650.827 43.0688 650.39 46.2388 649.843 49.5182C649.297 52.6882 648.696 55.9129 648.04 59.1923H651.483C652.904 53.9453 654.762 49.3542 657.058 45.419C659.463 41.3745 662.578 38.2044 666.404 35.9089C670.23 33.6133 674.93 32.4656 680.505 32.4656C687.611 32.4656 693.732 34.3785 698.87 38.2044C704.117 41.921 708.161 47.168 711.003 53.9453C713.845 60.6133 715.266 68.5384 715.266 77.7206C715.266 86.6841 713.845 94.4999 711.003 101.168C708.27 107.836 704.281 113.028 699.034 116.745C693.896 120.461 687.61 122.32 680.177 122.32ZM673.619 105.267C677.663 105.267 681.216 104.119 684.276 101.824C687.337 99.5283 689.633 96.3036 691.163 92.1497C692.803 87.9959 693.623 83.0769 693.623 77.3926C693.623 71.9271 692.857 67.1174 691.327 62.9635C689.797 58.8097 687.556 55.5303 684.604 53.1255C681.653 50.7206 678.046 49.5182 673.783 49.5182C670.94 49.5182 668.317 50.1194 665.912 51.3218C663.507 52.4149 661.43 53.9453 659.681 55.9129C657.932 57.7712 656.457 59.8481 655.254 62.1437C654.052 64.4392 653.123 66.8441 652.467 69.3582C651.92 71.7631 651.647 74.004 651.647 76.0809V78.8684C651.647 81.6011 652.084 84.5526 652.959 87.7226C653.833 90.7833 655.2 93.6254 657.058 96.2489C658.916 98.8724 661.212 101.059 663.945 102.808C666.677 104.447 669.902 105.267 673.619 105.267Z" fill="white"/>
    <path d="M756.716 122.32C750.922 122.32 745.675 121.719 740.975 120.516C736.384 119.423 732.448 117.838 729.169 115.761C725.89 113.575 723.266 111.006 721.299 108.055C719.331 104.994 718.128 101.605 717.691 97.8886L733.924 91.8218C734.143 94.6639 735.236 97.2327 737.203 99.5283C739.171 101.714 741.904 103.463 745.402 104.775C748.9 106.087 753.108 106.743 758.027 106.743C763.493 106.743 767.701 105.923 770.653 104.283C773.713 102.534 775.244 100.075 775.244 96.9048C775.244 94.6092 774.424 92.8056 772.784 91.4939C771.145 90.0728 768.74 88.925 765.57 88.0505C762.509 87.0667 758.792 86.1376 754.42 85.2631C750.375 84.3886 746.276 83.4048 742.122 82.3117C738.078 81.1092 734.307 79.5789 730.809 77.7206C727.42 75.753 724.633 73.2388 722.446 70.1781C720.369 67.008 719.331 63.0182 719.331 58.2085C719.331 52.9615 720.697 48.4251 723.43 44.5992C726.272 40.7732 730.317 37.7672 735.564 35.5809C740.92 33.3947 747.369 32.3016 754.912 32.3016C762.017 32.3016 768.139 33.2854 773.276 35.253C778.523 37.2206 782.786 40.0627 786.066 43.7793C789.345 47.3866 791.422 51.7044 792.296 56.7327L775.244 62.1437C774.916 59.0829 773.877 56.5141 772.128 54.4372C770.379 52.251 768.029 50.6113 765.078 49.5182C762.126 48.4251 758.683 47.8785 754.748 47.8785C749.72 47.8785 745.784 48.753 742.942 50.502C740.1 52.251 738.679 54.6012 738.679 57.5526C738.679 59.9574 739.554 61.8704 741.303 63.2915C743.161 64.7125 745.675 65.8603 748.845 66.7348C752.124 67.6093 755.841 68.4838 759.995 69.3582C764.367 70.2327 768.576 71.2712 772.62 72.4736C776.774 73.5667 780.491 75.0424 783.77 76.9007C787.049 78.759 789.673 81.2186 791.641 84.2793C793.608 87.2307 794.592 91.0566 794.592 95.757C794.592 101.441 793.062 106.306 790.001 110.35C786.94 114.285 782.568 117.291 776.883 119.368C771.309 121.336 764.586 122.32 756.716 122.32Z" fill="white"/>
    <g clipPath="url(#clip0_vl_wordmark)">
      <path fillRule="evenodd" clipRule="evenodd" d="M51.6508 63.1364H2.56969C2.56969 63.1364 0 62.7214 0 60.5667V41.551C0 41.551 0.475649 39.2383 2.82666 39.2383H37.0035C37.0035 39.2383 40.3624 39.2565 41.629 40.5231C42.8956 41.7897 79.1793 78.0735 79.1793 78.0735C79.1793 78.0735 81.2022 79.7065 81.2022 82.4091V117.871C81.2022 117.871 81.1778 120.486 79.1464 120.44C77.1151 120.395 59.8738 120.44 59.8738 120.44C59.8738 120.44 57.5492 120.232 57.561 118.128C57.5729 116.023 57.561 68.7897 57.561 68.7897C57.561 68.7897 57.8684 63.1364 51.6508 63.1364Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M78.3755 35.8981H2.56969C2.56969 35.8981 0 35.4831 0 33.3284V14.3127C0 14.3127 0.475649 12 2.82666 12H63.7283C63.7283 12 67.0871 12.0182 68.3537 13.2848C69.6203 14.5514 105.904 50.8352 105.904 50.8352C105.904 50.8352 107.927 52.4682 107.927 55.1708V117.871C107.927 117.871 107.903 120.486 105.871 120.441C103.84 120.395 86.5985 120.441 86.5985 120.441C86.5985 120.441 84.274 120.233 84.2858 118.128C84.2976 116.024 84.2858 41.5514 84.2858 41.5514C84.2858 41.5514 84.5931 35.8981 78.3755 35.8981Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_vl_wordmark">
        <rect width="107.927" height="108.455" fill="white" transform="translate(0 12)"/>
      </clipPath>
    </defs>
  </svg>
));

// ── Arrow Icon (10×10) — used in "Go Viral" & "Viral Results" ──
export const ArrowIcon = forwardRef(({ className = "", size = 10 }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0.75 8.75L8.75 0.75M8.75 0.75H0.75M8.75 0.75V8.75"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

// ── Grid Crosshair (9×9) — corner markers ──
export const GridCrosshair = forwardRef(({ className = "", size = 9 }, ref) => {
  const mid = size / 2;
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1={mid} y1="0.5" x2={mid} y2={size - 0.5} stroke="white" strokeLinecap="round" />
      <line x1="0.5" y1={mid} x2={size - 0.5} y2={mid} stroke="white" strokeLinecap="round" />
    </svg>
  );
});

// ── Grid Line Top (horizontal) — width controlled by CSS ──
export const GridLineTop = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="1"
    viewBox="0 0 1280 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <line y1="0.5" x2="1280" y2="0.5" stroke="white" strokeOpacity="0.2" />
  </svg>
));

// ── Grid Line Left (1×945) — vertical line ──
export const GridLineLeft = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="1"
    height="945"
    viewBox="0 0 1 945"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <line x1="0.5" y1="1568" x2="0.500069" y2="-17" stroke="white" strokeOpacity="0.2" />
  </svg>
));

// ── Grid Line Right (1×945) — vertical line ──
export const GridLineRight = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="1"
    height="945"
    viewBox="0 0 1 945"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <line x1="0.5" y1="1509" x2="0.500067" y2="-17" stroke="white" strokeOpacity="0.2" />
  </svg>
));

// ── Screen Grid (1280×892) — full grid mesh ──
// viewBox crops at 892px; paths extend to 1278 (matching Figma frame behavior)
// width/height 100% — container controls size
export const ScreenGrid = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="100%"
    viewBox="0 0 1280 892"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    overflow="hidden"
    preserveAspectRatio="none"
  >
    <path
      d="M2.25294 1278L1280 1278L1280 0M1280 1210.74L2.25293 1210.74M1280 1143.47L2.25293 1143.47M1280 1076.21L2.25293 1076.21M1280 1008.95L2.25293 1008.95M1280 941.685L2.25292 941.685M1280 874.422L2.25292 874.422M1280 807.158L2.25292 807.159M1280 739.895L2.25291 739.896M1280 672.632L2.25291 672.632M1280 605.369L2.25291 605.369M1280 538.106L2.2529 538.106M1280 470.843L2.2529 470.843M1280 403.58L2.2529 403.58M1280 336.317L2.2529 336.317M1280 269.054L2.25289 269.054M1280 201.791L2.25289 201.791M1280 134.528L2.25289 134.528M1280 67.2646L2.25288 67.2649M1280 0.00158691L2.25288 0.00183105M1212.63 0V1278M1145.26 0L1145.26 1278M1077.89 0L1077.89 1278M1010.53 0L1010.53 1278M943.158 0V1278M875.789 0L875.79 1278M808.421 0L808.421 1278M741.053 0L741.053 1278M673.684 0L673.685 1278M606.316 0L606.316 1278M538.948 0L538.948 1278M471.579 0L471.579 1278M404.211 0L404.211 1278M336.842 0L336.842 1278M269.474 0L269.474 1278M202.105 0L202.106 1278M134.737 0L134.737 1278M67.3684 0L67.3686 1278M0 0L0.000187485 1278"
      stroke="white"
      strokeOpacity="0.08"
    />
  </svg>
));

// ── Navbar Glow Line — width controlled by CSS ──
export const NavGlowLine = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="13"
    viewBox="0 0 88 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <g filter="url(#navGlow0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#navGlow1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#navGlow2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <defs>
      <filter id="navGlow0" x="10" y="10" width="68" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="navGlow1" x="5" y="5" width="78" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="navGlow2" x="0" y="0" width="88" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));

// ── CTA Glow Line (182×23) — wider orange glow under "Viral Results" ──
export const CtaGlowLine = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="182"
    height="23"
    viewBox="0 0 182 23"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#ctaGlow0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#ctaGlow1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#ctaGlow2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <defs>
      <filter id="ctaGlow0" x="10" y="10" width="162" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="ctaGlow1" x="5" y="5" width="172" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="ctaGlow2" x="0" y="0" width="182" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));

export const CardGlowH = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="82"
    height="23"
    viewBox="0 0 82 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#cardGlowH0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowH1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowH2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <defs>
      <filter id="cardGlowH0" x="10" y="10" width="62" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="cardGlowH1" x="5" y="5" width="72" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="cardGlowH2" x="0" y="0" width="82" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));

// ── Card Vertical Glow Line (23×122) — orange glow accent on card edges ──
export const CardGlowV = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="23"
    height="122"
    viewBox="0 0 23 122"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#cardGlowV0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowV1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowV2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <defs>
      <filter id="cardGlowV0" x="10" y="10" width="3" height="102" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="cardGlowV1" x="5" y="5" width="13" height="112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="cardGlowV2" x="0" y="0" width="23" height="122" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));

// ── Card Cubes (27×42) — two glowing orange squares ──
export const CardCubes = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="27"
    height="42"
    viewBox="0 0 27 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
    <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    <g filter="url(#cardCubes0)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <g filter="url(#cardCubes1)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <defs>
      <filter id="cardCubes0" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1" />
      </filter>
      <filter id="cardCubes1" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1" />
      </filter>
    </defs>
  </svg>
));

// ══════════════════════════════════════════════════
// Playbook Section SVGs
// ══════════════════════════════════════════════════


// ── Grid Lines Optimize (415×300) — background grid mesh ──
export const GridLinesOptimizeSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="415" height="300" viewBox="0 0 415 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clipPath="url(#clip0_1_734)">
      <path d="M1.01734 486.096L578 486.096L578 -91.0007M578 455.723L1.01734 455.723M578 425.349L1.01734 425.349M578 394.976L1.01734 394.976M578 364.602L1.01734 364.602M578 334.229L1.01734 334.229M578 303.855L1.01733 303.855M578 273.482L1.01733 273.482M578 243.108L1.01733 243.108M578 212.735L1.01733 212.735M578 182.361L1.01733 182.361M578 151.988L1.01733 151.988M578 121.614L1.01733 121.615M578 91.241L1.01732 91.2411M578 60.8675L1.01732 60.8676M578 30.494L1.01732 30.4941M578 0.120468L1.01732 0.120578M578 -30.253L1.01732 -30.2529M578 -60.6265L1.01732 -60.6264M578 -91L1.01732 -90.9998M547.579 -91.0007V486.096M517.158 -91.0007L517.158 486.096M486.737 -91.0007L486.737 486.096M456.316 -91.0007L456.316 486.096M425.895 -91.0007V486.096M395.474 -91.0007L395.474 486.096M365.053 -91.0007L365.053 486.096M334.632 -91.0007L334.632 486.096M304.211 -91.0007L304.211 486.096M273.79 -91.0007L273.79 486.096M243.369 -91.0007L243.369 486.096M212.947 -91.0007L212.948 486.096M182.526 -91.0007L182.526 486.096M152.105 -91.0007L152.105 486.096M121.684 -91.0007L121.684 486.096M91.2632 -91.0007L91.2633 486.096M60.8421 -91.0007L60.8422 486.096M30.4211 -91.0007L30.4211 486.096M0 -91.0007L8.46611e-05 486.096" stroke="white" strokeOpacity="0.06" strokeWidth="0.451562" />
    </g>
    <defs>
      <clipPath id="clip0_1_734">
        <rect width="578" height="550.455" fill="white" transform="translate(0 -91)" />
      </clipPath>
    </defs>
  </svg>
));

// ── Recon Lines + Radar (388×300) — combined circuit lines and radar dial ──

const ReconRadarInlineSvg = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="388"
    height="300"
    viewBox="0 0 388 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* ── Left orange connector lines (each has its own animated gradient) ── */}
    <path className="connector-bottom" d="M7 181H65V213H126V214H64V182H7V185H0V178H7V181Z" fill="url(#pulseGradBottom)" />
    <path className="connector-middle" d="M7 152H113V153H7V155H0V148H7V152Z" fill="url(#pulseGradMiddle)" />
    <path className="connector-top" d="M127 92H65V122H7V125H0V118H7V121H64V91H127V92Z" fill="url(#pulseGradTop)" />

    {/* ── Cube glow overlays (7×7 squares at left end of each connector) ── */}
    <rect className="cube-glow-bottom" x="0" y="178" width="7" height="7" fill="#FF6F21" opacity="0" filter="url(#signalGlow)" />
    <rect className="cube-glow-middle" x="0" y="148" width="7" height="7" fill="#FF6F21" opacity="0" filter="url(#signalGlow)" />
    <rect className="cube-glow-top" x="0" y="118" width="7" height="7" fill="#FF6F21" opacity="0" filter="url(#signalGlow)" />

    {/* ── Background gradient circle ── */}
    <g filter="url(#filter0_d_1120_70)">
      <circle
        cx="242.84"
        cy="149.84"
        r="135.84"
        fill="url(#paint0_linear_1120_70)"
      />
    </g>

    {/* ── Concentric dashed rings ── */}
    <circle opacity="0.3" cx="242.488" cy="150.566" r="101.815" stroke="#FF6F21" strokeWidth="0.370912" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.74 0.74" />
    <circle opacity="0.7" cx="242.491" cy="150.565" r="109.79" stroke="#FF6F21" strokeWidth="10.0146" strokeDasharray="0.37 0.37" />
    <circle opacity="0.7" cx="242.49" cy="150.566" r="120.547" stroke="#FF6F21" strokeWidth="1.11274" strokeDasharray="29.67 37.09" />

    {/* ── Inner concentric rings ── */}
    <circle opacity="0.1" cx="242.491" cy="150.57" r="74.9243" stroke="#FF6F21" strokeWidth="0.370912" />
    <circle opacity="0.1" cx="242.488" cy="150.568" r="43.3968" stroke="#FF6F21" strokeWidth="0.370912" />

    {/* ── Crosshair lines ── */}
    <line opacity="0.1" x1="143.641" y1="150.753" x2="341.708" y2="150.753" stroke="#393E44" strokeWidth="0.741825" />
    <line opacity="0.1" x1="173.055" y1="80.9208" x2="312.803" y2="220.668" stroke="#393E44" strokeWidth="0.741825" />
    <line opacity="0.1" x1="242.675" y1="250.159" x2="242.675" y2="52.0915" stroke="#393E44" strokeWidth="0.741825" />
    <line opacity="0.1" x1="172.531" y1="220.63" x2="312.278" y2="80.8823" stroke="#393E44" strokeWidth="0.741825" />

    {/* ── Small center ring ── */}
    <circle opacity="0.1" cx="242.675" cy="150.755" r="12.6674" stroke="#FF6F21" strokeWidth="0.629017" />

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        SWEEP GROUP – conic gradient trail + glow lines
        GSAP rotates this <g> around (242.49, 150.57)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <g className="radar-sweep-group">
      {/* Conic gradient sweep trail */}
      <g clipPath="url(#paint1_angular_1120_70_clip_path)" data-figma-skip-parse="true">
        <g transform="matrix(0 0.0988481 -0.0988481 0 242.487 150.565)">
          <foreignObject x="-1003.75" y="-1003.75" width="2007.5" height="2007.5">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                background:
                  "conic-gradient(from 90deg, rgba(145,194,254,0) 0deg, rgba(255,111,33,0) 226.875deg, rgba(255,111,33,1) 360deg)",
                height: "100%",
                width: "100%",
                opacity: 0.6,
              }}
            />
          </foreignObject>
        </g>
      </g>
      {/* Figma angular-gradient metadata circle (non-visual) */}
      <circle cx="242.487" cy="150.565" r="98.8481" fill="none" />

      {/* Glow line layers (5×, progressive blur for bloom effect) */}
      <g filter="url(#filter1_f_1120_70)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="244.161" y1="247.005" x2="242.024" y2="150.813" stroke="#F05A1F" strokeWidth="0.712537" />
      </g>
      <g filter="url(#filter2_f_1120_70)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="244.161" y1="247.005" x2="242.024" y2="150.813" stroke="#F05A1F" strokeWidth="0.712537" />
      </g>
      <g filter="url(#filter3_f_1120_70)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="244.161" y1="247.005" x2="242.024" y2="150.813" stroke="#F05A1F" strokeWidth="0.712537" />
      </g>
      <g filter="url(#filter4_f_1120_70)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="244.161" y1="247.005" x2="242.024" y2="150.813" stroke="#F05A1F" strokeWidth="0.712537" />
      </g>
      <g filter="url(#filter5_f_1120_70)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="244.161" y1="247.005" x2="242.024" y2="150.813" stroke="#F05A1F" strokeWidth="0.712537" />
      </g>
    </g>
    {/* ━━━ END SWEEP GROUP ━━━ */}

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        RADAR DOTS – pulse on sweep pass
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

    {/* Bottom dot – near 6 o'clock (≈180°) */}
    <g className="radar-dot-bottom" filter="url(#filter6_dd_1120_70)">
      <ellipse cx="248.427" cy="234.024" rx="1.43729" ry="1.53001" fill="white" />
    </g>

    {/* Right dot – near 3 o'clock (≈90°) */}
    <g className="radar-dot-right" filter="url(#filter7_dd_1120_70)">
      <ellipse cx="304.987" cy="147.6" rx="1.48365" ry="1.43729" fill="white" />
    </g>

    {/* Top dot – near 12 o'clock (≈0°) */}
    <g className="radar-dot-top" filter="url(#filter8_dd_1120_70)">
      <ellipse cx="241.191" cy="80.8362" rx="1.48365" ry="1.53001" fill="white" />
    </g>

    {/* ── Decorative orange glyphs around the perimeter ── */}
    <g opacity="0.6">
      <path opacity="0.4" d="M240.63 24.4478C240.512 24.4478 240.405 24.4201 240.308 24.3647C240.214 24.3058 240.14 24.2297 240.085 24.1362C240.029 24.0393 240.002 23.9337 240.002 23.8194V21.3425C240.002 21.2248 240.029 21.1192 240.085 21.0257C240.14 20.9288 240.214 20.8526 240.308 20.7972C240.405 20.7384 240.512 20.709 240.63 20.709H243.148C243.263 20.709 243.366 20.7384 243.46 20.7972C243.557 20.8526 243.633 20.9288 243.688 21.0257C243.747 21.1192 243.777 21.2248 243.777 21.3425V23.8194C243.777 23.9337 243.747 24.0393 243.688 24.1362C243.633 24.2297 243.557 24.3058 243.46 24.3647C243.366 24.4201 243.263 24.4478 243.148 24.4478H240.63ZM240.479 24.0219H243.148C243.204 24.0219 243.25 24.0029 243.289 23.9648C243.33 23.9233 243.351 23.8748 243.351 23.8194V21.654L240.479 24.0219ZM240.427 23.5079L243.294 21.14H240.63C240.574 21.14 240.526 21.1607 240.484 21.2023C240.446 21.2404 240.427 21.2871 240.427 21.3425V23.5079ZM245.641 21.8098V20.7038H246.067V21.2127C246.067 21.3061 246.048 21.3944 246.01 21.4775C245.975 21.5571 245.925 21.6263 245.859 21.6852C245.797 21.7441 245.724 21.7856 245.641 21.8098Z" fill="#FF6F21" />
      <path opacity="0.4" d="M301.793 40.1824C301.691 40.1236 301.612 40.0459 301.556 39.9495C301.504 39.8518 301.476 39.7478 301.472 39.6374C301.472 39.5258 301.501 39.4205 301.558 39.3215L301.6 39.2496L301.973 39.4651L301.932 39.537C301.904 39.585 301.896 39.6365 301.908 39.6915C301.925 39.7453 301.958 39.786 302.006 39.8137L304.187 41.0729C304.235 41.1006 304.285 41.1075 304.337 41.0936C304.394 41.0784 304.436 41.0468 304.463 40.9988L304.897 40.2478C304.925 40.1998 304.93 40.149 304.913 40.0952C304.901 40.0402 304.871 39.9988 304.823 39.9711L302.714 38.7534L302.927 38.3847L304.892 39.5193C304.94 39.547 304.99 39.5539 305.042 39.5399C305.099 39.5247 305.141 39.4931 305.169 39.4452L305.561 38.7661C305.588 38.7182 305.594 38.6673 305.577 38.6135C305.565 38.5585 305.534 38.5172 305.487 38.4895L303.449 37.3133C303.401 37.2856 303.349 37.2794 303.292 37.2946C303.24 37.3085 303.2 37.3395 303.173 37.3874L303.105 37.5044L302.732 37.2889L302.799 37.1719C302.858 37.07 302.935 36.9924 303.03 36.9392C303.129 36.8846 303.233 36.8568 303.342 36.8555C303.455 36.853 303.563 36.8812 303.665 36.9401L305.702 38.1162C305.804 38.1751 305.881 38.2533 305.932 38.351C305.988 38.4475 306.016 38.5515 306.016 38.6632C306.017 38.7718 305.988 38.8771 305.929 38.979L305.537 39.6581C305.513 39.7001 305.483 39.7386 305.447 39.7736C305.415 39.8074 305.382 39.8364 305.348 39.8608C305.382 39.976 305.387 40.0849 305.364 40.1874C305.343 40.2916 305.311 40.3827 305.266 40.4607L304.832 41.2117C304.775 41.3106 304.697 41.3874 304.597 41.4419C304.503 41.4951 304.399 41.523 304.285 41.5255C304.177 41.5268 304.073 41.4988 303.974 41.4417L301.793 40.1824ZM306.668 42.9974C306.567 42.9385 306.487 42.8609 306.431 42.7644C306.38 42.6667 306.353 42.5636 306.352 42.4549C306.353 42.3433 306.381 42.238 306.438 42.1391L307.677 39.994C307.736 39.892 307.813 39.8144 307.907 39.7612C308.004 39.7049 308.106 39.6762 308.215 39.675C308.328 39.6725 308.436 39.7006 308.538 39.7595L310.719 41.0187C310.818 41.0758 310.893 41.1533 310.945 41.251C311.001 41.3474 311.029 41.4514 311.028 41.5631C311.032 41.6734 311.005 41.7796 310.946 41.8815L309.708 44.0266C309.651 44.1256 309.572 44.2023 309.473 44.2568C309.378 44.3101 309.274 44.3379 309.161 44.3405C309.052 44.3417 308.948 44.3137 308.85 44.2566L306.668 42.9974ZM306.751 42.5533L309.062 43.8879C309.11 43.9156 309.16 43.9224 309.212 43.9085C309.269 43.8933 309.311 43.8617 309.339 43.8137L310.422 41.9385L306.751 42.5533ZM306.963 42.0821L310.629 41.4647L308.322 40.1327C308.274 40.105 308.222 40.0988 308.165 40.114C308.113 40.1279 308.073 40.1589 308.046 40.2069L306.963 42.0821ZM312.327 43.2183L312.88 42.2605L313.249 42.4734L312.994 42.9141C312.948 42.995 312.887 43.0619 312.812 43.1149C312.743 43.1665 312.665 43.2014 312.578 43.2195C312.495 43.2393 312.411 43.2389 312.327 43.2183Z" fill="#FF6F21" />
      <path opacity="0.4" d="M366.751 146.514C366.751 146.424 366.768 146.337 366.803 146.254C366.841 146.174 366.891 146.105 366.953 146.046C367.019 145.988 367.094 145.944 367.177 145.917L367.177 149.032C367.177 149.088 367.196 149.134 367.234 149.172C367.275 149.214 367.324 149.235 367.379 149.235L368.132 149.235C368.188 149.235 368.234 149.214 368.272 149.172C368.314 149.134 368.335 149.088 368.335 149.032L368.335 146.514C368.335 146.396 368.362 146.289 368.418 146.192C368.477 146.098 368.553 146.022 368.646 145.963C368.743 145.908 368.849 145.88 368.963 145.88L369.861 145.88C369.979 145.88 370.085 145.908 370.178 145.963C370.275 146.022 370.351 146.098 370.407 146.192C370.466 146.289 370.495 146.396 370.495 146.514L370.495 149.032C370.495 149.146 370.466 149.25 370.407 149.344C370.351 149.441 370.275 149.517 370.178 149.572C370.085 149.631 369.979 149.661 369.861 149.661L367.379 149.661C367.265 149.661 367.159 149.631 367.063 149.572C366.969 149.517 366.893 149.441 366.834 149.344C366.779 149.25 366.751 149.146 366.751 149.032L366.751 146.514ZM368.761 146.514L368.761 149.235L369.861 149.235C369.917 149.235 369.964 149.214 370.002 149.172C370.043 149.134 370.064 149.088 370.064 149.032L370.064 146.514C370.064 146.458 370.043 146.41 370.002 146.368C369.964 146.33 369.917 146.311 369.861 146.311L368.963 146.311C368.908 146.311 368.859 146.33 368.818 146.368C368.78 146.41 368.761 146.458 368.761 146.514ZM366.751 152.164C366.751 152.046 366.779 151.939 366.834 151.842C366.893 151.749 366.969 151.674 367.063 151.619C367.159 151.563 367.265 151.536 367.379 151.536L369.856 151.536C369.974 151.536 370.08 151.563 370.173 151.619C370.27 151.674 370.346 151.749 370.401 151.842C370.46 151.939 370.49 152.046 370.49 152.164L370.49 154.683C370.49 154.797 370.46 154.901 370.401 154.994C370.346 155.091 370.27 155.167 370.173 155.223C370.08 155.281 369.974 155.311 369.856 155.311L367.379 155.311C367.265 155.311 367.159 155.281 367.063 155.223C366.969 155.167 366.893 155.091 366.834 154.994C366.779 154.901 366.751 154.797 366.751 154.683L366.751 152.164ZM367.177 152.014L367.177 154.683C367.177 154.738 367.196 154.785 367.234 154.823C367.275 154.864 367.324 154.885 367.379 154.885L369.545 154.885L367.177 152.014ZM367.691 151.962L370.059 154.828L370.059 152.164C370.059 152.109 370.038 152.06 369.996 152.019C369.958 151.981 369.912 151.962 369.856 151.962L367.691 151.962ZM369.389 157.175L370.495 157.175L370.495 157.601L369.986 157.601C369.893 157.601 369.804 157.582 369.721 157.544C369.642 157.509 369.572 157.459 369.514 157.393C369.455 157.331 369.413 157.258 369.389 157.175Z" fill="#FF6F21" />
      <path opacity="0.4" d="M356.917 208.197L359.741 209.827L359.431 208.983L359.709 208.502L360.23 209.936L359.939 210.439L356.701 208.57L356.917 208.197ZM355.661 210.372L356.875 211.073C356.977 211.131 357.055 211.208 357.108 211.303C357.164 211.399 357.193 211.502 357.194 211.611C357.194 211.722 357.164 211.829 357.105 211.931L355.846 214.112C355.818 214.16 355.811 214.21 355.825 214.262C355.841 214.319 355.872 214.361 355.92 214.389L356.68 214.827C356.728 214.855 356.779 214.86 356.833 214.844C356.888 214.831 356.929 214.801 356.957 214.753L358.216 212.572C358.244 212.524 358.25 212.472 358.235 212.415C358.221 212.363 358.19 212.323 358.142 212.296L358.016 212.223L358.229 211.854L358.355 211.927C358.457 211.986 358.534 212.062 358.588 212.157C358.644 212.254 358.673 212.356 358.674 212.465C358.676 212.578 358.648 212.686 358.589 212.788L357.33 214.969C357.273 215.068 357.196 215.143 357.098 215.194C357.001 215.251 356.897 215.279 356.786 215.278C356.675 215.282 356.569 215.255 356.467 215.196L355.707 214.757C355.608 214.7 355.532 214.622 355.477 214.523C355.424 214.428 355.396 214.324 355.393 214.21C355.392 214.102 355.42 213.998 355.477 213.899L356.736 211.718C356.764 211.67 356.77 211.618 356.755 211.561C356.741 211.509 356.71 211.469 356.662 211.441L355.992 211.054C355.944 211.027 355.893 211.019 355.838 211.031C355.784 211.048 355.743 211.081 355.716 211.129L354.142 213.854L353.773 213.641L355.661 210.372ZM352.53 215.795C352.588 215.693 352.666 215.614 352.763 215.558C352.86 215.507 352.963 215.48 353.072 215.479C353.184 215.479 353.289 215.508 353.388 215.565L355.533 216.804C355.635 216.863 355.713 216.94 355.766 217.034C355.822 217.131 355.851 217.233 355.852 217.342C355.855 217.455 355.826 217.563 355.768 217.665L354.508 219.846C354.451 219.945 354.374 220.02 354.276 220.072C354.18 220.128 354.076 220.156 353.964 220.155C353.854 220.159 353.747 220.132 353.645 220.073L351.5 218.835C351.401 218.778 351.325 218.699 351.27 218.6C351.217 218.505 351.189 218.401 351.187 218.288C351.185 218.179 351.213 218.075 351.27 217.976L352.53 215.795ZM352.974 215.878L351.639 218.189C351.611 218.237 351.605 218.287 351.618 218.339C351.634 218.396 351.665 218.438 351.713 218.466L353.589 219.549L352.974 215.878ZM353.445 216.09L354.062 219.756L355.394 217.449C355.422 217.401 355.428 217.349 355.413 217.292C355.399 217.24 355.368 217.2 355.32 217.173L353.445 216.09ZM352.309 221.454L353.267 222.007L353.054 222.376L352.613 222.121C352.532 222.075 352.465 222.014 352.412 221.939C352.36 221.87 352.326 221.792 352.308 221.705C352.288 221.622 352.288 221.538 352.309 221.454Z" fill="#FF6F21" />
      <path opacity="0.4" d="M249.089 274.461L249.089 277.722L249.665 277.031L250.221 277.031L249.239 278.2L248.658 278.2L248.658 274.461L249.089 274.461ZM245.949 274.461C246.067 274.461 246.174 274.489 246.271 274.544C246.365 274.603 246.439 274.679 246.494 274.773C246.55 274.869 246.577 274.975 246.577 275.089L246.577 275.972C246.577 276.041 246.564 276.111 246.536 276.18C246.508 276.252 246.47 276.322 246.422 276.387C246.47 276.453 246.508 276.522 246.536 276.595C246.564 276.668 246.577 276.739 246.577 276.808L246.577 277.571C246.577 277.689 246.55 277.795 246.494 277.888C246.439 277.985 246.365 278.061 246.271 278.117C246.174 278.176 246.067 278.205 245.949 278.205L243.431 278.205C243.334 278.205 243.244 278.179 243.161 278.127C243.074 278.079 243 278.013 242.937 277.93C242.872 277.85 242.827 277.765 242.802 277.675L242.802 276.808C242.802 276.67 242.854 276.529 242.958 276.387C242.854 276.252 242.802 276.114 242.802 275.972L242.802 275.089C242.802 274.975 242.832 274.869 242.891 274.773C242.946 274.679 243.022 274.603 243.119 274.544C243.213 274.489 243.316 274.461 243.431 274.461L245.949 274.461ZM245.949 274.887L243.431 274.887C243.375 274.887 243.329 274.906 243.29 274.944C243.249 274.985 243.228 275.034 243.228 275.089L243.228 275.972C243.228 276.027 243.249 276.074 243.29 276.112C243.329 276.154 243.375 276.175 243.431 276.175L245.949 276.175C246.005 276.175 246.053 276.154 246.095 276.112C246.133 276.074 246.152 276.027 246.152 275.972L246.152 275.089C246.152 275.034 246.133 274.985 246.095 274.944C246.053 274.906 246.005 274.887 245.949 274.887ZM245.949 276.543L243.431 276.543C243.375 276.543 243.329 276.562 243.29 276.6C243.249 276.642 243.228 276.69 243.228 276.746L243.228 277.566C243.228 277.622 243.249 277.668 243.29 277.706C243.329 277.748 243.375 277.769 243.431 277.769L245.949 277.769C246.005 277.769 246.053 277.748 246.095 277.706C246.133 277.668 246.152 277.622 246.152 277.566L246.152 276.746C246.152 276.69 246.133 276.642 246.095 276.6C246.053 276.562 246.005 276.543 245.949 276.543ZM240.294 274.461C240.412 274.461 240.519 274.489 240.616 274.544C240.71 274.603 240.784 274.679 240.84 274.773C240.895 274.869 240.923 274.975 240.923 275.089L240.923 277.566C240.923 277.684 240.895 277.79 240.84 277.883C240.784 277.98 240.71 278.056 240.616 278.111C240.519 278.17 240.412 278.2 240.294 278.2L237.776 278.2C237.662 278.2 237.558 278.17 237.464 278.111C237.367 278.056 237.291 277.98 237.236 277.883C237.177 277.79 237.147 277.684 237.147 277.566L237.147 275.089C237.147 274.975 237.177 274.869 237.236 274.773C237.291 274.679 237.367 274.603 237.464 274.544C237.558 274.489 237.662 274.461 237.776 274.461L240.294 274.461ZM240.445 274.887L237.776 274.887C237.72 274.887 237.674 274.906 237.636 274.944C237.594 274.985 237.573 275.034 237.573 275.089L237.573 277.255L240.445 274.887ZM240.497 275.401L237.63 277.769L240.294 277.769C240.35 277.769 240.398 277.748 240.44 277.706C240.478 277.668 240.497 277.622 240.497 277.566L240.497 275.401ZM235.283 277.099L235.283 278.205L234.858 278.205L234.858 277.696C234.858 277.603 234.877 277.514 234.915 277.431C234.949 277.352 234.999 277.282 235.065 277.223C235.128 277.165 235.2 277.123 235.283 277.099Z" fill="#FF6F21" />
      <path opacity="0.4" d="M182.899 263.578L182.198 264.792C182.139 264.894 182.062 264.971 181.968 265.025C181.871 265.081 181.769 265.11 181.66 265.111C181.548 265.11 181.442 265.081 181.34 265.022L179.159 263.763C179.111 263.735 179.061 263.728 179.009 263.742C178.952 263.757 178.91 263.789 178.882 263.837L178.443 264.597C178.416 264.645 178.41 264.695 178.427 264.749C178.439 264.804 178.469 264.846 178.517 264.873L180.698 266.133C180.746 266.16 180.799 266.166 180.855 266.151C180.907 266.137 180.947 266.106 180.975 266.058L181.048 265.933L181.417 266.145L181.344 266.271C181.285 266.373 181.208 266.451 181.113 266.504C181.017 266.56 180.915 266.589 180.806 266.59C180.692 266.593 180.585 266.565 180.483 266.506L178.302 265.247C178.203 265.189 178.128 265.112 178.076 265.014C178.02 264.918 177.992 264.814 177.993 264.702C177.988 264.592 178.016 264.486 178.074 264.384L178.513 263.624C178.57 263.525 178.649 263.448 178.748 263.394C178.843 263.34 178.947 263.312 179.06 263.31C179.169 263.309 179.273 263.337 179.372 263.394L181.553 264.653C181.601 264.681 181.653 264.687 181.71 264.672C181.762 264.658 181.802 264.627 181.829 264.579L182.216 263.909C182.244 263.861 182.252 263.809 182.239 263.754C182.222 263.701 182.19 263.66 182.142 263.632L179.417 262.059L179.63 261.69L182.899 263.578ZM177.291 260.34L175.66 263.164L176.505 262.854L176.986 263.132L175.552 263.653L175.048 263.362L176.918 260.124L177.291 260.34ZM174.572 258.77C174.674 258.829 174.753 258.906 174.809 259.003C174.861 259.1 174.887 259.204 174.888 259.312C174.888 259.424 174.859 259.529 174.802 259.628L173.563 261.773C173.504 261.875 173.428 261.953 173.333 262.006C173.237 262.062 173.134 262.091 173.025 262.092C172.912 262.095 172.804 262.067 172.702 262.008L170.521 260.748C170.422 260.691 170.347 260.614 170.296 260.516C170.239 260.42 170.212 260.316 170.212 260.204C170.208 260.094 170.235 259.988 170.294 259.886L171.532 257.741C171.59 257.642 171.668 257.565 171.767 257.51C171.862 257.457 171.966 257.429 172.079 257.427C172.188 257.426 172.292 257.453 172.391 257.511L174.572 258.77ZM174.489 259.214L172.178 257.879C172.13 257.852 172.08 257.845 172.028 257.859C171.971 257.874 171.929 257.906 171.901 257.953L170.818 259.829L174.489 259.214ZM174.277 259.685L170.611 260.303L172.918 261.634C172.966 261.662 173.018 261.668 173.075 261.653C173.127 261.639 173.167 261.608 173.195 261.56L174.277 259.685ZM168.913 258.549L168.36 259.507L167.991 259.294L168.246 258.853C168.293 258.772 168.353 258.705 168.428 258.652C168.498 258.601 168.576 258.566 168.662 258.548C168.745 258.528 168.829 258.528 168.913 258.549Z" fill="#FF6F21" />
      <path opacity="0.4" d="M135.213 219.897L133.999 220.598C133.897 220.657 133.792 220.686 133.683 220.685C133.571 220.685 133.468 220.659 133.373 220.606C133.277 220.549 133.199 220.47 133.14 220.368L131.881 218.187C131.853 218.139 131.814 218.108 131.762 218.094C131.705 218.079 131.653 218.085 131.605 218.113L130.845 218.552C130.797 218.58 130.766 218.621 130.754 218.676C130.737 218.73 130.743 218.781 130.77 218.829L132.03 221.01C132.057 221.058 132.1 221.089 132.156 221.104C132.208 221.118 132.258 221.111 132.306 221.084L132.432 221.011L132.645 221.38L132.519 221.453C132.417 221.511 132.312 221.54 132.203 221.539C132.092 221.539 131.989 221.513 131.894 221.46C131.794 221.405 131.715 221.327 131.656 221.225L130.397 219.044C130.34 218.945 130.314 218.84 130.318 218.73C130.317 218.618 130.345 218.514 130.401 218.418C130.453 218.32 130.53 218.242 130.632 218.183L131.392 217.744C131.491 217.687 131.597 217.66 131.71 217.662C131.819 217.664 131.923 217.692 132.022 217.746C132.117 217.799 132.193 217.875 132.25 217.974L133.509 220.155C133.537 220.203 133.579 220.235 133.636 220.25C133.688 220.264 133.738 220.257 133.786 220.23L134.456 219.843C134.504 219.815 134.536 219.774 134.553 219.721C134.565 219.665 134.558 219.614 134.53 219.566L132.957 216.841L133.325 216.628L135.213 219.897ZM131.225 212.989L130.388 213.472L131.692 215.73L131.278 215.969L128.008 214.906L127.769 214.493L129.807 213.316L129.516 212.813L129.885 212.6L130.175 213.104L131.012 212.621L131.225 212.989ZM129.523 210.042C129.582 210.144 129.611 210.25 129.612 210.362C129.608 210.472 129.579 210.575 129.526 210.67C129.469 210.766 129.392 210.843 129.293 210.9L127.148 212.139C127.046 212.197 126.941 212.226 126.832 212.225C126.72 212.225 126.617 212.199 126.522 212.146C126.423 212.091 126.344 212.013 126.285 211.911L125.026 209.73C124.969 209.631 124.942 209.526 124.946 209.416C124.946 209.304 124.974 209.2 125.03 209.104C125.082 209.006 125.158 208.928 125.26 208.869L127.405 207.631C127.504 207.574 127.61 207.546 127.724 207.549C127.832 207.55 127.936 207.578 128.036 207.632C128.131 207.686 128.206 207.762 128.264 207.861L129.523 210.042ZM129.229 210.385L127.895 208.074C127.867 208.026 127.827 207.995 127.775 207.981C127.719 207.965 127.666 207.972 127.618 207.999L125.743 209.082L129.229 210.385ZM128.81 210.687L125.326 209.389L126.658 211.696C126.686 211.744 126.728 211.775 126.785 211.79C126.837 211.804 126.887 211.797 126.935 211.77L128.81 210.687ZM124.733 207.021L123.775 207.574L123.562 207.205L124.003 206.951C124.084 206.904 124.17 206.877 124.261 206.868C124.347 206.858 124.432 206.867 124.516 206.895C124.598 206.919 124.67 206.961 124.733 207.021Z" fill="#FF6F21" />
      <path opacity="0.4" d="M118.228 158.566L116.826 158.566C116.708 158.566 116.603 158.538 116.509 158.483C116.412 158.428 116.336 158.353 116.281 158.26C116.225 158.163 116.198 158.055 116.198 157.938L116.198 155.419C116.198 155.364 116.179 155.317 116.141 155.279C116.099 155.237 116.051 155.217 115.995 155.217L115.118 155.217C115.062 155.217 115.015 155.237 114.977 155.279C114.936 155.317 114.915 155.364 114.915 155.419L114.915 157.938C114.915 157.993 114.936 158.042 114.977 158.083C115.015 158.121 115.062 158.14 115.118 158.14L115.263 158.14L115.263 158.566L115.118 158.566C115 158.566 114.894 158.538 114.801 158.483C114.704 158.428 114.628 158.353 114.572 158.26C114.513 158.163 114.484 158.055 114.484 157.938L114.484 155.419C114.484 155.305 114.513 155.201 114.572 155.108C114.628 155.011 114.704 154.935 114.801 154.879C114.894 154.82 115 154.791 115.118 154.791L115.995 154.791C116.109 154.791 116.215 154.82 116.312 154.879C116.405 154.935 116.482 155.011 116.54 155.108C116.596 155.201 116.623 155.305 116.623 155.419L116.623 157.938C116.623 157.993 116.644 158.042 116.686 158.083C116.724 158.121 116.771 158.14 116.826 158.14L117.6 158.14C117.655 158.14 117.704 158.121 117.745 158.083C117.783 158.042 117.802 157.993 117.802 157.938L117.802 154.791L118.228 154.791L118.228 158.566ZM118.228 150.517L115.118 150.517C115.062 150.517 115.015 150.538 114.977 150.579C114.936 150.617 114.915 150.664 114.915 150.719L114.915 153.212L114.484 153.212L114.484 150.719C114.484 150.605 114.513 150.501 114.572 150.408C114.628 150.311 114.704 150.235 114.801 150.179C114.894 150.12 115 150.091 115.118 150.091L118.228 150.091L118.228 150.517ZM118.228 147.551C118.228 147.669 118.2 147.776 118.145 147.873C118.086 147.966 118.01 148.041 117.916 148.096C117.82 148.152 117.714 148.179 117.6 148.179L115.123 148.179C115.005 148.179 114.899 148.152 114.806 148.096C114.709 148.041 114.633 147.966 114.578 147.873C114.519 147.776 114.489 147.669 114.489 147.551L114.489 145.032C114.489 144.918 114.519 144.814 114.578 144.721C114.633 144.624 114.709 144.548 114.806 144.492C114.899 144.434 115.005 144.404 115.123 144.404L117.6 144.404C117.714 144.404 117.82 144.434 117.916 144.492C118.01 144.548 118.086 144.624 118.145 144.721C118.2 144.814 118.228 144.918 118.228 145.032L118.228 147.551ZM117.802 147.702L117.802 145.032C117.802 144.977 117.783 144.93 117.745 144.892C117.704 144.851 117.655 144.83 117.6 144.83L115.434 144.83L117.802 147.702ZM117.288 147.753L114.92 144.887L114.92 147.551C114.92 147.606 114.941 147.655 114.983 147.696C115.021 147.734 115.067 147.753 115.123 147.753L117.288 147.753ZM115.59 142.54L114.484 142.54L114.484 142.114L114.993 142.114C115.086 142.114 115.175 142.133 115.258 142.171C115.337 142.206 115.407 142.256 115.465 142.322C115.524 142.384 115.566 142.457 115.59 142.54Z" fill="#FF6F21" />
      <path opacity="0.4" d="M130.86 92.5447C130.801 92.6466 130.723 92.7257 130.627 92.782C130.529 92.8335 130.425 92.8614 130.315 92.8656C130.203 92.8651 130.098 92.8363 129.999 92.7792L129.927 92.7376L130.142 92.3644L130.214 92.4059C130.262 92.4336 130.314 92.4414 130.369 92.4291C130.423 92.4122 130.463 92.3798 130.491 92.3318L131.75 90.1507C131.778 90.1027 131.785 90.0527 131.771 90.0007C131.756 89.944 131.724 89.9018 131.676 89.8741L130.925 89.4405C130.877 89.4128 130.826 89.4074 130.772 89.4243C130.717 89.4365 130.676 89.4666 130.648 89.5146L129.431 91.6237L129.062 91.4108L130.197 89.4456C130.224 89.3976 130.231 89.3476 130.217 89.2956C130.202 89.2389 130.17 89.1966 130.122 89.1689L129.443 88.7769C129.395 88.7492 129.345 88.7438 129.291 88.7608C129.236 88.773 129.194 88.8031 129.167 88.851L127.991 90.8882C127.963 90.9362 127.957 90.9885 127.972 91.0453C127.986 91.0973 128.017 91.1371 128.065 91.1648L128.182 91.2323L127.966 91.6056L127.849 91.5381C127.747 91.4792 127.67 91.4025 127.616 91.3078C127.562 91.2083 127.534 91.1043 127.533 90.9957C127.53 90.8823 127.558 90.7746 127.617 90.6727L128.793 88.6355C128.852 88.5336 128.931 88.4569 129.028 88.4053C129.125 88.3491 129.229 88.3212 129.34 88.3217C129.449 88.3205 129.554 88.3493 129.656 88.4081L130.335 88.8002C130.377 88.8244 130.416 88.8546 130.451 88.8909C130.485 88.9224 130.514 88.9551 130.538 88.9892C130.653 88.9558 130.762 88.9507 130.865 88.9739C130.969 88.9941 131.06 89.0267 131.138 89.0717L131.889 89.5053C131.988 89.5624 132.065 89.6407 132.119 89.7401C132.172 89.8348 132.2 89.9389 132.203 90.0522C132.204 90.1609 132.176 90.2647 132.119 90.3636L130.86 92.5447ZM133.675 87.6691C133.616 87.771 133.538 87.8501 133.442 87.9064C133.344 87.9579 133.241 87.9843 133.132 87.9855C133.021 87.985 132.915 87.9562 132.816 87.8991L130.671 86.6606C130.569 86.6017 130.492 86.525 130.438 86.4303C130.382 86.3338 130.353 86.2313 130.352 86.1226C130.35 86.0093 130.378 85.9016 130.437 85.7997L131.696 83.6186C131.753 83.5197 131.831 83.4444 131.928 83.3929C132.025 83.3367 132.129 83.3088 132.24 83.3093C132.351 83.3051 132.457 83.3324 132.559 83.3912L134.704 84.6297C134.803 84.6868 134.88 84.7651 134.934 84.8645C134.987 84.9592 135.015 85.0633 135.018 85.1766C135.019 85.2853 134.991 85.3891 134.934 85.488L133.675 87.6691ZM133.231 87.5866L134.565 85.2751C134.593 85.2271 134.6 85.1771 134.586 85.1251C134.571 85.0684 134.539 85.0262 134.491 84.9985L132.616 83.9158L133.231 87.5866ZM132.759 87.3745L132.142 83.7082L130.81 86.0152C130.782 86.0632 130.776 86.1155 130.791 86.1723C130.805 86.2243 130.836 86.2641 130.884 86.2918L132.759 87.3745ZM136.502 82.7718C136.443 82.8738 136.366 82.9529 136.269 83.0091C136.171 83.0606 136.068 83.087 135.96 83.0883C135.848 83.0878 135.743 83.0589 135.644 83.0018L133.499 81.7634C133.397 81.7045 133.319 81.6277 133.266 81.533C133.21 81.4366 133.181 81.334 133.18 81.2254C133.177 81.112 133.205 81.0044 133.264 80.9024L134.523 78.7214C134.581 78.6224 134.658 78.5472 134.756 78.4957C134.852 78.4394 134.956 78.4116 135.068 78.4121C135.178 78.4078 135.284 78.4351 135.386 78.494L137.531 79.7325C137.63 79.7896 137.707 79.8679 137.762 79.9673C137.815 80.062 137.843 80.166 137.845 80.2794C137.846 80.388 137.818 80.4918 137.761 80.5908L136.502 82.7718ZM136.058 82.6894L137.393 80.3779C137.42 80.3299 137.427 80.2799 137.413 80.2279C137.398 80.1711 137.366 80.1289 137.318 80.1012L135.443 79.0185L136.058 82.6894ZM135.587 82.4773L134.969 78.8109L133.637 81.1179C133.61 81.1659 133.603 81.2183 133.619 81.275C133.633 81.327 133.664 81.3669 133.712 81.3946L135.587 82.4773ZM136.723 77.1133L135.765 76.5602L135.978 76.1915L136.419 76.4459C136.5 76.4927 136.567 76.5533 136.62 76.6278C136.671 76.6976 136.706 76.7757 136.724 76.8621C136.744 76.9455 136.744 77.0292 136.723 77.1133Z" fill="#FF6F21" />
      <path opacity="0.4" d="M173.004 44.774C172.902 44.8329 172.795 44.8626 172.684 44.8631C172.573 44.8588 172.469 44.831 172.372 44.7794C172.275 44.7232 172.198 44.6456 172.141 44.5467L172.1 44.4747L172.473 44.2592L172.515 44.3312C172.542 44.3791 172.583 44.4116 172.637 44.4285C172.692 44.4407 172.743 44.433 172.791 44.4053L174.972 43.146C175.02 43.1183 175.051 43.0785 175.065 43.0265C175.08 42.9697 175.074 42.9174 175.046 42.8694L174.613 42.1184C174.585 42.0704 174.544 42.0403 174.489 42.0281C174.435 42.0112 174.384 42.0166 174.336 42.0443L172.227 43.262L172.014 42.8932L173.979 41.7586C174.027 41.7309 174.058 41.691 174.072 41.639C174.087 41.5823 174.081 41.5299 174.054 41.4819L173.661 40.8029C173.634 40.7549 173.592 40.7248 173.537 40.7126C173.484 40.6957 173.433 40.7011 173.385 40.7288L171.348 41.9049C171.3 41.9326 171.268 41.9748 171.253 42.0316C171.239 42.0836 171.246 42.1336 171.274 42.1816L171.341 42.2985L170.968 42.514L170.9 42.3971C170.841 42.2951 170.813 42.1898 170.814 42.0812C170.816 41.9678 170.844 41.8638 170.897 41.7691C170.952 41.6696 171.03 41.5905 171.132 41.5317L173.169 40.3555C173.271 40.2966 173.377 40.2693 173.488 40.2736C173.599 40.2731 173.703 40.3009 173.8 40.3572C173.895 40.4104 173.971 40.488 174.03 40.59L174.422 41.269C174.446 41.311 174.465 41.3564 174.477 41.4053C174.49 41.4495 174.499 41.4924 174.503 41.534C174.62 41.5627 174.717 41.6127 174.794 41.6841C174.874 41.7537 174.937 41.8275 174.982 41.9055L175.415 42.6565C175.472 42.7554 175.5 42.8616 175.497 42.9749C175.496 43.0836 175.468 43.1876 175.413 43.2871C175.36 43.3818 175.284 43.4577 175.185 43.5148L173.004 44.774ZM177.866 41.9669C177.764 42.0258 177.658 42.0554 177.546 42.0559C177.436 42.0517 177.331 42.0238 177.234 41.9723C177.137 41.916 177.061 41.8385 177.003 41.7395L176.962 41.6676L177.335 41.4521L177.377 41.524C177.404 41.572 177.445 41.6044 177.499 41.6214C177.554 41.6336 177.605 41.6258 177.653 41.5981L179.834 40.3389C179.882 40.3112 179.913 40.2713 179.927 40.2193C179.942 40.1626 179.936 40.1102 179.909 40.0623L179.475 39.3112C179.447 39.2633 179.406 39.2332 179.351 39.221C179.297 39.204 179.246 39.2094 179.198 39.2371L177.089 40.4548L176.876 40.0861L178.841 38.9514C178.889 38.9237 178.92 38.8839 178.934 38.8319C178.95 38.7751 178.943 38.7228 178.916 38.6748L178.524 37.9957C178.496 37.9478 178.455 37.9177 178.399 37.9055C178.346 37.8885 178.295 37.8939 178.247 37.9216L176.21 39.0978C176.162 39.1255 176.13 39.1677 176.115 39.2244C176.101 39.2765 176.108 39.3264 176.136 39.3744L176.203 39.4913L175.83 39.7068L175.762 39.5899C175.704 39.488 175.675 39.3827 175.676 39.2741C175.678 39.1607 175.706 39.0566 175.76 38.9619C175.814 38.8625 175.892 38.7834 175.994 38.7245L178.031 37.5484C178.133 37.4895 178.24 37.4622 178.35 37.4664C178.462 37.4659 178.566 37.4938 178.662 37.5501C178.757 37.6033 178.833 37.6809 178.892 37.7828L179.284 38.4619C179.309 38.5039 179.327 38.5493 179.339 38.5982C179.353 38.6424 179.361 38.6853 179.365 38.7269C179.482 38.7556 179.579 38.8056 179.656 38.877C179.736 38.9466 179.799 39.0204 179.844 39.0983L180.277 39.8493C180.334 39.9483 180.362 40.0544 180.359 40.1678C180.358 40.2765 180.33 40.3805 180.276 40.4799C180.222 40.5746 180.146 40.6505 180.047 40.7077L177.866 41.9669ZM182.742 39.152C182.64 39.2108 182.533 39.2405 182.421 39.241C182.311 39.2368 182.209 39.208 182.114 39.1548C182.017 39.0985 181.941 39.0209 181.884 38.922L180.645 36.7769C180.586 36.675 180.557 36.5697 180.559 36.461C180.558 36.3494 180.585 36.2462 180.638 36.1515C180.692 36.0521 180.771 35.9729 180.872 35.9141L183.054 34.6548C183.152 34.5977 183.257 34.5713 183.367 34.5755C183.479 34.575 183.583 34.6029 183.68 34.6591C183.777 34.7107 183.856 34.7874 183.914 34.8893L185.153 37.0344C185.21 37.1334 185.237 37.2395 185.235 37.3529C185.234 37.4615 185.206 37.5656 185.151 37.665C185.098 37.7597 185.022 37.8356 184.923 37.8927L182.742 39.152ZM182.399 38.8585L184.71 37.524C184.758 37.4963 184.789 37.4564 184.803 37.4044C184.818 37.3477 184.812 37.2953 184.784 37.2473L183.701 35.372L182.399 38.8585ZM182.097 38.4393L183.395 34.9554L181.088 36.2873C181.04 36.315 181.008 36.3573 180.993 36.414C180.979 36.466 180.986 36.516 181.014 36.564L182.097 38.4393ZM185.762 34.362L185.209 33.4041L185.578 33.1912L185.833 33.6319C185.879 33.7129 185.907 33.7988 185.916 33.8898C185.925 33.9761 185.917 34.0612 185.889 34.145C185.865 34.2271 185.822 34.2995 185.762 34.362Z" fill="#FF6F21" />
      <path opacity="0.4" d="M312.182 256.01L313.812 258.834L313.966 257.948L314.447 257.67L314.182 259.173L313.678 259.463L311.808 256.225L312.182 256.01ZM309.463 257.58C309.565 257.521 309.671 257.491 309.783 257.491C309.893 257.495 309.996 257.524 310.091 257.577C310.187 257.633 310.264 257.711 310.321 257.81L310.396 257.94L310.028 258.153L309.952 258.023C309.925 257.975 309.884 257.942 309.83 257.925C309.775 257.913 309.724 257.921 309.676 257.949L307.495 259.208C307.447 259.235 307.416 259.275 307.402 259.327C307.386 259.384 307.393 259.436 307.42 259.484L307.862 260.249C307.889 260.297 307.931 260.327 307.986 260.339C308.04 260.356 308.09 260.351 308.138 260.323L310.864 258.75L311.879 260.508L308.609 262.396L308.394 262.022L311.119 260.449C311.167 260.421 311.199 260.379 311.214 260.322C311.228 260.27 311.221 260.22 311.193 260.172L310.812 259.511C310.784 259.463 310.743 259.431 310.689 259.414C310.633 259.399 310.58 259.405 310.532 259.433L308.351 260.692C308.252 260.749 308.149 260.777 308.04 260.776C307.928 260.776 307.824 260.748 307.728 260.692C307.63 260.64 307.552 260.564 307.493 260.462L307.052 259.697C306.995 259.598 306.967 259.492 306.97 259.379C306.971 259.27 306.999 259.166 307.053 259.067C307.107 258.972 307.183 258.896 307.282 258.839L309.463 257.58ZM304.583 260.397C304.685 260.338 304.792 260.309 304.903 260.308C305.014 260.312 305.116 260.341 305.211 260.394C305.307 260.45 305.384 260.528 305.441 260.627L306.68 262.772C306.739 262.874 306.767 262.979 306.766 263.088C306.767 263.2 306.74 263.303 306.687 263.398C306.633 263.497 306.554 263.576 306.452 263.635L304.271 264.894C304.172 264.951 304.068 264.978 303.957 264.974C303.846 264.974 303.742 264.946 303.645 264.89C303.548 264.838 303.469 264.762 303.41 264.66L302.172 262.515C302.115 262.416 302.088 262.31 302.09 262.196C302.091 262.087 302.119 261.983 302.174 261.884C302.227 261.789 302.303 261.713 302.402 261.656L304.583 260.397ZM304.926 260.691L302.615 262.025C302.567 262.053 302.536 262.093 302.522 262.145C302.507 262.201 302.513 262.254 302.541 262.302L303.623 264.177L304.926 260.691ZM305.228 261.11L303.93 264.594L306.237 263.262C306.285 263.234 306.316 263.192 306.332 263.135C306.346 263.083 306.339 263.033 306.311 262.985L305.228 261.11ZM301.562 265.187L302.115 266.145L301.747 266.358L301.492 265.917C301.445 265.836 301.418 265.75 301.409 265.659C301.399 265.573 301.408 265.488 301.436 265.404C301.46 265.322 301.503 265.25 301.562 265.187Z" fill="#FF6F21" />
      <path opacity="0.4" d="M349.409 83.6005C349.35 83.4986 349.32 83.3918 349.32 83.2801C349.324 83.1698 349.353 83.0672 349.406 82.9725C349.462 82.8761 349.54 82.7993 349.639 82.7422L351.788 81.5011C351.89 81.4423 351.995 81.4135 352.104 81.4147C352.216 81.4142 352.319 81.4406 352.414 81.4938C352.513 81.5483 352.592 81.6266 352.651 81.7285L353.897 83.8871L353.524 84.1026L352.278 81.944C352.25 81.896 352.208 81.8644 352.151 81.8492C352.099 81.8353 352.049 81.8422 352.001 81.8699L351.354 82.2438C351.306 82.2714 351.273 82.3122 351.256 82.3659C351.241 82.4227 351.247 82.475 351.275 82.523L352.534 84.7041C352.591 84.803 352.619 84.9068 352.618 85.0154C352.618 85.1271 352.591 85.2311 352.534 85.3276C352.483 85.4253 352.406 85.5035 352.304 85.5624L351.526 86.0116C351.427 86.0687 351.321 86.096 351.208 86.0935C351.099 86.0923 350.995 86.0644 350.896 86.0099C350.801 85.9566 350.725 85.8805 350.668 85.7816L349.409 83.6005ZM349.777 83.3876L351.037 85.5687C351.064 85.6166 351.104 85.6476 351.156 85.6615C351.213 85.6767 351.265 85.6705 351.313 85.6428L352.091 85.1936C352.139 85.1659 352.169 85.1246 352.182 85.0696C352.198 85.0158 352.193 84.9649 352.165 84.917L350.805 82.5605L349.851 83.1109C349.804 83.1386 349.771 83.1794 349.754 83.2331C349.742 83.2881 349.75 83.3396 349.777 83.3876ZM352.201 88.4363C352.142 88.3343 352.112 88.2275 352.111 88.1159C352.116 88.0055 352.144 87.903 352.198 87.8083C352.254 87.7118 352.332 87.6351 352.431 87.5779L354.576 86.3395C354.678 86.2806 354.783 86.2518 354.891 86.253C355.003 86.2525 355.106 86.2789 355.201 86.3322C355.3 86.3867 355.38 86.4649 355.438 86.5669L356.698 88.7479C356.755 88.8469 356.781 88.9515 356.777 89.0619C356.777 89.1735 356.75 89.2776 356.693 89.374C356.642 89.4717 356.565 89.55 356.463 89.6088L354.318 90.8473C354.219 90.9044 354.113 90.9317 354 90.9292C353.891 90.928 353.787 90.9001 353.688 90.8456C353.593 90.7924 353.517 90.7163 353.46 90.6173L352.201 88.4363ZM352.494 88.0929L353.829 90.4044C353.856 90.4524 353.896 90.4834 353.948 90.4973C354.005 90.5125 354.057 90.5063 354.105 90.4786L355.98 89.3959L352.494 88.0929ZM352.913 87.7909L356.397 89.0894L355.065 86.7824C355.037 86.7344 354.995 86.7028 354.938 86.6876C354.886 86.6737 354.836 86.6805 354.789 86.7082L352.913 87.7909ZM356.991 91.4569L357.948 90.9039L358.161 91.2726L357.721 91.5271C357.64 91.5738 357.554 91.6015 357.463 91.61C357.376 91.6199 357.291 91.611 357.207 91.5835C357.125 91.5589 357.053 91.5167 356.991 91.4569Z" fill="#FF6F21" />
    </g>

    {/* ── Filter & gradient definitions ── */}
    <defs>
      {/* Background circle shadow */}
      <filter id="filter0_d_1120_70" x="35.7082" y="-43.8042" width="394.995" height="394.995" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="-9.63403" dy="3.85361" />
        <feGaussianBlur stdDeviation="30.8289" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1120_70" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1120_70" result="shape" />
      </filter>

      {/* Sweep trail clip-path */}
      <clipPath id="paint1_angular_1120_70_clip_path">
        <circle cx="242.487" cy="150.565" r="98.8481" />
      </clipPath>

      {/* Glow line blur filters (progressive bloom) */}
      <filter id="filter1_f_1120_70" x="240.955" y="150.093" width="4.27517" height="97.6331" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.356268" result="effect1_foregroundBlur_1120_70" />
      </filter>
      <filter id="filter2_f_1120_70" x="240.955" y="150.093" width="4.27517" height="97.6331" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.356268" result="effect1_foregroundBlur_1120_70" />
      </filter>
      <filter id="filter3_f_1120_70" x="237.392" y="146.53" width="11.4005" height="104.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="2.13761" result="effect1_foregroundBlur_1120_70" />
      </filter>
      <filter id="filter4_f_1120_70" x="237.392" y="146.53" width="11.4005" height="104.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="2.13761" result="effect1_foregroundBlur_1120_70" />
      </filter>
      <filter id="filter5_f_1120_70" x="233.83" y="142.967" width="18.5259" height="111.884" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3.91895" result="effect1_foregroundBlur_1120_70" />
      </filter>

      {/* Dot glow filters */}
      <filter id="filter6_dd_1120_70" x="245.506" y="231.01" width="5.84181" height="6.02736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="0.741825" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1120_70" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.370912" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.584314 0 0 0 0 0.780392 0 0 0 0 0.992157 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1120_70" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="0.370912" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_1120_70" />
        <feOffset />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.584314 0 0 0 0 0.780392 0 0 0 0 0.992157 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="effect1_dropShadow_1120_70" result="effect2_dropShadow_1120_70" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1120_70" result="shape" />
      </filter>
      <filter id="filter7_dd_1120_70" x="302.02" y="144.679" width="5.93458" height="5.84181" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="0.741825" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1120_70" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.370912" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.584314 0 0 0 0 0.780392 0 0 0 0 0.992157 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1120_70" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="0.370912" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_1120_70" />
        <feOffset />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.584314 0 0 0 0 0.780392 0 0 0 0 0.992157 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="effect1_dropShadow_1120_70" result="effect2_dropShadow_1120_70" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1120_70" result="shape" />
      </filter>
      <filter id="filter8_dd_1120_70" x="238.224" y="77.8225" width="5.93458" height="6.02736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="0.741825" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1120_70" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.370912" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.584314 0 0 0 0 0.780392 0 0 0 0 0.992157 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1120_70" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="0.370912" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_1120_70" />
        <feOffset />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.584314 0 0 0 0 0.780392 0 0 0 0 0.992157 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="effect1_dropShadow_1120_70" result="effect2_dropShadow_1120_70" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1120_70" result="shape" />
      </filter>

      {/* Signal pulse glow */}
      <filter id="signalGlow" x="-200%" y="-200%" width="500%" height="500%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.2  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Radial pulse gradients – one per connector, animated cx/cy */}
      <radialGradient id="pulseGradBottom" cx="-50" cy="181" r="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="15%" stopColor="#FFB974" />
        <stop offset="40%" stopColor="#FF6F21" />
        <stop offset="100%" stopColor="#FF6F21" />
      </radialGradient>
      <radialGradient id="pulseGradMiddle" cx="-50" cy="152" r="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="15%" stopColor="#FFB974" />
        <stop offset="40%" stopColor="#FF6F21" />
        <stop offset="100%" stopColor="#FF6F21" />
      </radialGradient>
      <radialGradient id="pulseGradTop" cx="-50" cy="121" r="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="15%" stopColor="#FFB974" />
        <stop offset="40%" stopColor="#FF6F21" />
        <stop offset="100%" stopColor="#FF6F21" />
      </radialGradient>

      {/* Background circle gradient */}
      <linearGradient id="paint0_linear_1120_70" x1="324.324" y1="240.23" x2="144.573" y2="48.6825" gradientUnits="userSpaceOnUse">
        <stop />
        <stop offset="1" stopColor="#1A1A1A" />
      </linearGradient>
    </defs>
  </svg>
));

ReconRadarInlineSvg.displayName = "ReconRadarInlineSvg";
export default ReconRadarInlineSvg;

// ── Cubes (27×42) — two small orange glowing squares ──
export const CubesSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="27" height="42" viewBox="0 0 27 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
    <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    <g filter="url(#filter0_f_1_474)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <g filter="url(#filter1_f_1_474)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <defs>
      <filter id="filter0_f_1_474" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_1_474" />
      </filter>
      <filter id="filter1_f_1_474" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_1_474" />
      </filter>
    </defs>
  </svg>
));

// ── IMG-based components (too large to inline) ──

export const GlobeAndMobileSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/images/Globe_and_mobile.webp" alt="" className={className} loading="lazy" />
));

export const LinesDeploySvg = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="418"
    height="103"
    viewBox="0 0 418 103"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
      <g filter="url(#fDL_0)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="91.5" x2="116.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_1)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="91.5" x2="116.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_2)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="91.5" x2="116.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_3)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="91.5" x2="116.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_4)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="91.5" x2="116.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_5)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="91.5" x2="266.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_6)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="91.5" x2="266.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_7)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="91.5" x2="266.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_8)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="91.5" x2="266.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_9)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="91.5" x2="266.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_10)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="91.5" x2="406.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_11)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="91.5" x2="406.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_12)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="91.5" x2="406.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_13)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="91.5" x2="406.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_14)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="91.5" x2="406.818" y2="91.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_15)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="71.5" x2="116.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_16)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="71.5" x2="116.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_17)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="71.5" x2="116.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_18)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="71.5" x2="116.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_19)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="71.5" x2="116.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_20)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="71.5" x2="266.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_21)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="71.5" x2="266.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_22)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="71.5" x2="266.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_23)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="71.5" x2="266.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_24)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="71.5" x2="266.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_25)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="71.5" x2="406.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_26)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="71.5" x2="406.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_27)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="71.5" x2="406.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_28)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="71.5" x2="406.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_29)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="71.5" x2="406.818" y2="71.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_30)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="51.5" x2="116.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_31)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="51.5" x2="116.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_32)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="51.5" x2="116.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_33)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="51.5" x2="116.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_34)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="51.5" x2="116.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_35)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="51.5" x2="266.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_36)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="51.5" x2="266.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_37)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="51.5" x2="266.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_38)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="51.5" x2="266.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_39)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="51.5" x2="266.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_40)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="51.5" x2="406.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_41)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="51.5" x2="406.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_42)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="51.5" x2="406.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_43)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="51.5" x2="406.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_44)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="51.5" x2="406.818" y2="51.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_45)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="31.5" x2="116.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_46)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="31.5" x2="116.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_47)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="31.5" x2="116.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_48)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="31.5" x2="116.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_49)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="31.5" x2="116.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_50)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="31.5" x2="266.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_51)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="31.5" x2="266.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_52)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="31.5" x2="266.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_53)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="31.5" x2="266.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_54)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="31.5" x2="266.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_55)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="31.5" x2="406.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_56)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="31.5" x2="406.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_57)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="31.5" x2="406.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_58)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="31.5" x2="406.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_59)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="31.5" x2="406.818" y2="31.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_60)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="11.5" x2="116.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_61)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="11.5" x2="116.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_62)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="11.5" x2="116.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_63)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="11.5" x2="116.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_64)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="-6.18164" y1="11.5" x2="116.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_65)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="11.5" x2="266.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_66)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="11.5" x2="266.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_67)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="11.5" x2="266.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_68)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="11.5" x2="266.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_69)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="143.818" y1="11.5" x2="266.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_70)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="11.5" x2="406.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_71)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="11.5" x2="406.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_72)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="11.5" x2="406.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_73)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="11.5" x2="406.818" y2="11.5" stroke="#F05A1F" />
      </g>
      <g filter="url(#fDL_74)" style={{ mixBlendMode: "plus-lighter" }}>
        <line x1="283.818" y1="11.5" x2="406.818" y2="11.5" stroke="#F05A1F" />
      </g>
    <defs>
      <filter id="fDL_0" x="-7.6816" y="90.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_1" x="-7.6816" y="90.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_2" x="-10.1816" y="87.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_3" x="-10.1816" y="87.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_4" x="-12.6816" y="85.0" width="135.9996" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_5" x="142.3180" y="90.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_6" x="142.3180" y="90.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_7" x="139.8180" y="87.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_8" x="139.8180" y="87.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_9" x="137.3180" y="85.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_10" x="282.3180" y="90.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_11" x="282.3180" y="90.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_12" x="279.8180" y="87.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_13" x="279.8180" y="87.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_14" x="277.3180" y="85.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_15" x="-7.6816" y="70.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_16" x="-7.6816" y="70.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_17" x="-10.1816" y="67.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_18" x="-10.1816" y="67.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_19" x="-12.6816" y="65.0" width="135.9996" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_20" x="142.3180" y="70.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_21" x="142.3180" y="70.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_22" x="139.8180" y="67.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_23" x="139.8180" y="67.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_24" x="137.3180" y="65.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_25" x="282.3180" y="70.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_26" x="282.3180" y="70.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_27" x="279.8180" y="67.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_28" x="279.8180" y="67.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_29" x="277.3180" y="65.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_30" x="-7.6816" y="50.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_31" x="-7.6816" y="50.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_32" x="-10.1816" y="47.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_33" x="-10.1816" y="47.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_34" x="-12.6816" y="45.0" width="135.9996" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_35" x="142.3180" y="50.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_36" x="142.3180" y="50.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_37" x="139.8180" y="47.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_38" x="139.8180" y="47.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_39" x="137.3180" y="45.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_40" x="282.3180" y="50.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_41" x="282.3180" y="50.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_42" x="279.8180" y="47.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_43" x="279.8180" y="47.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_44" x="277.3180" y="45.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_45" x="-7.6816" y="30.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_46" x="-7.6816" y="30.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_47" x="-10.1816" y="27.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_48" x="-10.1816" y="27.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_49" x="-12.6816" y="25.0" width="135.9996" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_50" x="142.3180" y="30.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_51" x="142.3180" y="30.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_52" x="139.8180" y="27.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_53" x="139.8180" y="27.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_54" x="137.3180" y="25.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_55" x="282.3180" y="30.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_56" x="282.3180" y="30.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_57" x="279.8180" y="27.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_58" x="279.8180" y="27.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_59" x="277.3180" y="25.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_60" x="-7.6816" y="10.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_61" x="-7.6816" y="10.0" width="125.9996" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_62" x="-10.1816" y="7.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_63" x="-10.1816" y="7.5" width="130.9996" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_64" x="-12.6816" y="5.0" width="135.9996" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_65" x="142.3180" y="10.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_66" x="142.3180" y="10.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_67" x="139.8180" y="7.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_68" x="139.8180" y="7.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_69" x="137.3180" y="5.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_70" x="282.3180" y="10.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_71" x="282.3180" y="10.0" width="126.0000" height="4.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_72" x="279.8180" y="7.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_73" x="279.8180" y="7.5" width="131.0000" height="9.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur" />
      </filter>
      <filter id="fDL_74" x="277.3180" y="5.0" width="136.0000" height="14.0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1_foregroundBlur" />
      </filter>
    </defs>
  </svg>
));

const DeployPhone = ({ x = 0, y = 0, hasShadow = false }) => (
  <g transform={`translate(${x}, ${y})`} {...(hasShadow ? { filter: "url(#filter0_d_deploy)" } : {})}>
    <rect x="0.5" y="0" width="68" height="102" rx="12" fill="#141414" {...(hasShadow ? { shapeRendering: "crispEdges" } : {})} />
    <rect x="0.5" y="0" width="68" height="102" rx="12" stroke="#FF6F21" strokeOpacity="0.25" fill="none" {...(hasShadow ? { shapeRendering: "crispEdges" } : {})} />
    <line x1="13" y1="85.75" x2="56.5" y2="85.75" stroke="#FF6F21" strokeOpacity="0.25" />
  </g>
);
 
const DEPLOY_UNIT = 122;
const DEPLOY_PHONES = 4;
const DEPLOY_SET_H = DEPLOY_UNIT * DEPLOY_PHONES;
 
export const ScreensDeploySvg = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="162"
    height="300"
    viewBox="0 0 162 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left column (moves up) */}
    <g className="deploy-col-left">
      {Array.from({ length: DEPLOY_PHONES }, (_, i) => (
        <DeployPhone key={`la-${i}`} x={0} y={i * DEPLOY_UNIT} />
      ))}
      {Array.from({ length: DEPLOY_PHONES }, (_, i) => (
        <DeployPhone key={`lb-${i}`} x={0} y={DEPLOY_SET_H + i * DEPLOY_UNIT} />
      ))}
    </g>
 
    {/* Right column (moves down) */}
    <g className="deploy-col-right">
      {Array.from({ length: DEPLOY_PHONES }, (_, i) => (
        <DeployPhone key={`ra-${i}`} x={88} y={i * DEPLOY_UNIT} hasShadow={i === 1} />
      ))}
      {Array.from({ length: DEPLOY_PHONES }, (_, i) => (
        <DeployPhone key={`rb-${i}`} x={88} y={DEPLOY_SET_H + i * DEPLOY_UNIT} hasShadow={i === 1} />
      ))}
    </g>
 
    <defs>
      <filter id="filter0_d_deploy" x="-14" y="-9" width="96" height="121" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="-4" dy="1" />
        <feGaussianBlur stdDeviation="4.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
));

export const BlueprintFlowchartSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/blueprint-flowchart.svg" alt="" className={className} loading="lazy" />
));

export const LinesBlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Lines blueprint.svg" alt="" className={className} loading="lazy" />
));

export const ImageHiddenBlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Image [hidden] blueprint.svg" alt="" className={className} loading="lazy" />
));

export const EllipseBlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="276" height="300" viewBox="0 0 276 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_606)">
      <ellipse cx="56.5" cy="152" rx="163.5" ry="211" fill="#171717" />
    </g>
    <defs>
      <filter id="filter0_f_1_606" x="-163" y="-115" width="439" height="534" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="28" result="effect1_foregroundBlur_1_606" />
      </filter>
    </defs>
  </svg>
));

// ── Grid Lines Recon (445×300) — background grid mesh for recon card ──
export const GridLinesReconSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="445" height="300" viewBox="0 0 445 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clipPath="url(#clip0_1_430)">
      <path d="M1.01734 486.096L578 486.096L578 -91.0007M578 455.723L1.01734 455.723M578 425.349L1.01734 425.349M578 394.976L1.01734 394.976M578 364.602L1.01734 364.602M578 334.229L1.01734 334.229M578 303.855L1.01733 303.855M578 273.482L1.01733 273.482M578 243.108L1.01733 243.108M578 212.735L1.01733 212.735M578 182.361L1.01733 182.361M578 151.988L1.01733 151.988M578 121.614L1.01733 121.615M578 91.241L1.01732 91.2411M578 60.8675L1.01732 60.8676M578 30.494L1.01732 30.4941M578 0.120468L1.01732 0.120578M578 -30.253L1.01732 -30.2529M578 -60.6265L1.01732 -60.6264M578 -91L1.01732 -90.9998M547.579 -91.0007V486.096M517.158 -91.0007L517.158 486.096M486.737 -91.0007L486.737 486.096M456.316 -91.0007L456.316 486.096M425.895 -91.0007V486.096M395.474 -91.0007L395.474 486.096M365.053 -91.0007L365.053 486.096M334.632 -91.0007L334.632 486.096M304.211 -91.0007L304.211 486.096M273.79 -91.0007L273.79 486.096M243.369 -91.0007L243.369 486.096M212.947 -91.0007L212.948 486.096M182.526 -91.0007L182.526 486.096M152.105 -91.0007L152.105 486.096M121.684 -91.0007L121.684 486.096M91.2632 -91.0007L91.2633 486.096M60.8421 -91.0007L60.8422 486.096M30.4211 -91.0007L30.4211 486.096M0 -91.0007L8.46611e-05 486.096" stroke="white" strokeOpacity="0.06" strokeWidth="0.451562" />
    </g>
    <defs>
      <clipPath id="clip0_1_430">
        <rect width="578" height="550.455" fill="white" transform="translate(0 -91)" />
      </clipPath>
    </defs>
  </svg>
));

// ══════════════════════════════════════════════════
// Viral Engine Section SVGs
// ══════════════════════════════════════════════════

// ── Rocket Frame parts (img-based, too complex to inline) ──

export const RocketFrame2Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 2.svg" alt="" className={className} loading="lazy" />
));

export const RocketFrame3Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 3.svg" alt="" className={className} loading="lazy" />
));

export const RocketFrame4Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 4.svg" alt="" className={className} loading="lazy" />
));

export const RocketFrame5Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket Frame 5.svg" alt="" className={className} loading="lazy" />
));

export const RocketFrame6Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 6.svg" alt="" className={className} loading="lazy" />
));

export const RocketFrame7Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket Frame 7.svg" alt="" className={className} loading="lazy" />
));

// ── Connector line (diagonal + horizontal, bridges rocket to labels) ──
export const LinesVectorRocketSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/lines vector rocket.svg" alt="" className={className} loading="lazy" />
));

// ── Glow Line (193×23) — orange glow scan line ──
export const GlowLineSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Glow-line.svg" alt="" className={className} loading="lazy" />
));

// ── Line 744 (134×1) — gray stat divider line ──
export const Line744Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Line 744.svg" alt="" className={className} loading="lazy" />
));

// ── Shift Line (763×31) — curved orange gradient line for BridgeTestimonial ──
export const ShiftLineSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/shift line.svg" alt="" className={className} loading="lazy" />
));

// ── Corner bracket (10×10) — orange L-shaped corner marker ──
export const CornerVectorRocketSvg = forwardRef(({ className = "", style = {} }, ref) => (
  <img ref={ref} src="/svgs/corner Vector rocket.svg" alt="" className={className} style={style} loading="lazy" />
));

// ── Rocket Thrusters (182×42) — orange flame glow below rocket frame 7 ──
// PASTE THIS into SvgAssets.jsx right after the RocketFrame7Svg export

export const RocketThrustersSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="182" height="42" viewBox="0 0 182 42" fill="none" xmlns="http://www.w3.org/2000/svg">

    {/* ── Center thruster (cx=91) ── */}
    <g className="thruster thruster-center">
      <g className="thruster-base">
        <g filter="url(#thrA)"><ellipse cx="91" cy="6.297" rx="27" ry="2.297" fill="#fff"/></g>
        <g filter="url(#thrB)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="91" cy="6.297" rx="27" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrC)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="91" cy="6.297" rx="27" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrD)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="91" cy="6.297" rx="27" ry="2.297" fill="#ff6f21"/></g>
      </g>
      <g className="thruster-flame" filter="url(#thrE)" style={{ mixBlendMode: "plus-lighter" }}><path d="M118 6.297c0 1.269-13.168 19.756-28.08 19.756S64 7.566 64 6.297C64 5.03 76.088 4 91 4s27 1.029 27 2.297" fill="#ff6f21"/></g>
    </g>

    {/* ── Left-inner thruster (cx=49.5) ── */}
    <g className="thruster thruster-left-inner">
      <g className="thruster-base">
        <g filter="url(#thrF)"><ellipse cx="49.5" cy="12.73" rx="29.5" ry="2.297" fill="#fff"/></g>
        <g filter="url(#thrG)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="49.5" cy="12.73" rx="29.5" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrH)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="49.5" cy="12.73" rx="29.5" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrI)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="49.5" cy="12.73" rx="29.5" ry="2.297" fill="#ff6f21"/></g>
      </g>
      <g className="thruster-flame" filter="url(#thrJ)" style={{ mixBlendMode: "plus-lighter" }}><path d="M79 12.922C79 14.296 57.5 38 48 38S20 14.296 20 12.922c0-1.375 13.208-2.489 29.5-2.489S79 11.547 79 12.922" fill="#ff6f21"/></g>
    </g>

    {/* ── Left-outer thruster (cx=29) ── */}
    <g className="thruster thruster-left-outer">
      <g className="thruster-base">
        <g filter="url(#thrK)"><ellipse cx="29" cy="8.13" rx="25" ry="2.297" fill="#fff"/></g>
        <g filter="url(#thrL)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="29" cy="8.13" rx="25" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrM)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="29" cy="8.13" rx="25" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrN)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="29" cy="8.13" rx="25" ry="2.297" fill="#ff6f21"/></g>
      </g>
      <g className="thruster-flame" filter="url(#thrO)" style={{ mixBlendMode: "plus-lighter" }}><path d="M54 8.13c0 1.268-12.193 19.756-26 19.756S4 9.398 4 8.13s11.193-2.297 25-2.297S54 6.86 54 8.13" fill="#ff6f21"/></g>
    </g>

    {/* ── Right-outer thruster (cx=153) ── */}
    <g className="thruster thruster-right-outer">
      <g className="thruster-base">
        <g filter="url(#thrP)"><ellipse cx="153" cy="6.297" rx="25" ry="2.297" fill="#fff"/></g>
        <g filter="url(#thrQ)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="153" cy="6.297" rx="25" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrR)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="153" cy="6.297" rx="25" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrS)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="153" cy="6.297" rx="25" ry="2.297" fill="#ff6f21"/></g>
      </g>
      <g className="thruster-flame" filter="url(#thrT)" style={{ mixBlendMode: "plus-lighter" }}><path d="M178 6.297c0 1.269-12.193 19.756-26 19.756S128 7.566 128 6.297C128 5.03 139.193 4 153 4s25 1.029 25 2.297" fill="#ff6f21"/></g>
    </g>

    {/* ── Right-inner thruster (cx=129.5) ── */}
    <g className="thruster thruster-right-inner">
      <g className="thruster-base">
        <g filter="url(#thrU)"><ellipse cx="129.5" cy="11.809" rx="28.5" ry="2.297" fill="#fff"/></g>
        <g filter="url(#thrV)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="129.5" cy="11.809" rx="28.5" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrW)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="129.5" cy="11.809" rx="28.5" ry="2.297" fill="#ff6f21"/></g>
        <g filter="url(#thrX)" style={{ mixBlendMode: "plus-lighter" }}><ellipse cx="129.5" cy="11.809" rx="28.5" ry="2.297" fill="#ff6f21"/></g>
      </g>
      <g className="thruster-flame" filter="url(#thrY)" style={{ mixBlendMode: "plus-lighter" }}><path d="M158 11.809c0 1.269-20 25.27-29.5 25.27-8 0-27.5-24.001-27.5-25.27s12.76-2.297 28.5-2.297S158 10.54 158 11.809" fill="#ff6f21"/></g>
    </g>

    <defs>
      <filter id="thrA" x="60" y="0" width="62" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrB" x="60" y="0" width="62" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrC" x="60" y="0" width="62" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrD" x="60" y="0" width="62" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrE" x="60" y="0" width="62" height="30.053" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrF" x="16" y="6.433" width="67" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrG" x="16" y="6.433" width="67" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrH" x="16" y="6.433" width="67" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrI" x="16" y="6.433" width="67" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrJ" x="16" y="6.433" width="67" height="35.567" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrK" x="0" y="1.833" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrL" x="0" y="1.833" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrM" x="0" y="1.833" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrN" x="0" y="1.833" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrO" x="0" y="1.833" width="58" height="30.053" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrP" x="124" y="0" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrQ" x="124" y="0" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrR" x="124" y="0" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrS" x="124" y="0" width="58" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrT" x="124" y="0" width="58" height="30.053" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrU" x="97" y="5.512" width="65" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrV" x="97" y="5.512" width="65" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrW" x="97" y="5.512" width="65" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrX" x="97" y="5.512" width="65" height="12.595" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
      <filter id="thrY" x="97" y="5.512" width="65" height="35.567" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2" result="effect1"/></filter>
    </defs>
  </svg>
));