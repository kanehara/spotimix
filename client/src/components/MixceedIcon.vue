<template>
  <svg viewBox="0 0 82 102" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <filter x="-18.9%" y="-14.4%" width="137.7%" height="128.8%" filterUnits="objectBoundingBox" id="filter-s1fiios14_-1">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
    </defs>
    <g id="Group" filter="url(#filter-s1fiios14_-1)" transform="translate(9.290000, 9.040000)" :fill="fill" fill-rule="nonzero">
        <path d="M56.68,62.74 C55.82,55.48 52.38,48.78 47.21,44.17 L47.09,44.23 C44.6,46.07 42.12,47.37 39.14,47.78 L39.07,47.81 L39.6,48.17 C44.39,51.46 47.51,57.13 47.93,63.34 L48.04,64.98 L42.34,64.98 L52.96,83.38 L63.58,64.98 L56.94,64.98 L56.68,62.74 Z" id="Path"></path>
        <path d="M56.68,20.67 L56.95,18.4 L63.58,18.4 L52.96,0 L42.34,18.4 L48.15,18.4 L48.04,20.1 C47.37,30.16 39.9041489,37.2324909 31.68,38.05 L31.71,38.05 C28.4744227,38.2347798 26.1573527,38.7163588 25.12,39 C24.0826473,39.2836412 22.15,40.3 21.2,40.78 C13.45,44.73 8.13,52.93 6.97,62.73 L6.7,65 L0,65 L10.62,83.4 L21.24,65 L15.49,65 L15.6,63.3 C16.27,53.22 23.5384381,45.2691852 31.8984381,45.2691852 L29.5951469,45.32 C31.0696059,45.32 31.9647415,45.1375606 32.6839273,45.0791455 C36.2281682,44.6771844 35.5121129,44.6898674 38.2098532,44.2384255 C49.7629094,40.8101314 55.919625,32.9539896 56.68,20.67 Z" id="Path"></path>
        <path d="M6.97,20.65 C7.83,27.91 11.27,34.61 16.44,39.22 L16.56,39.16 C19.05,37.32 21.53,36.02 24.51,35.61 L24.58,35.58 L24.05,35.22 C19.26,31.93 16.14,26.26 15.72,20.05 L15.61,18.41 L21.31,18.41 L10.69,0.01 L0.07,18.41 L6.71,18.41 L6.97,20.65 Z" id="Path"></path>
    </g>
  </svg>
</template>
  
  <script>
  export default {
    props: ['fill'],
  }
  </script>
  