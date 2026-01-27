import { useEffect } from 'react';

const FAVICON_SVG_TEMPLATE = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="128px" height="128px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(2.5,0,0,2.444444,-26,-40)">
        <ellipse cx="36" cy="22.5" rx="24" ry="4.5" style="fill:COLOR_PLACEHOLDER;"/>
    </g>
    <g transform="matrix(2.768117,0,0,1.782564,-25.928325,-49.11082)">
        <path d="M11,44.006C11,44.006 9.886,53.499 13.081,56C16.664,58.805 23.726,60.852 32.5,60.836C41.325,60.82 48.278,58.728 51.862,55.923C55.039,53.435 54,44.006 54,44.006C54,44.006 50.567,50.555 32.5,50C12.855,49.397 11,44.006 11,44.006Z" style="fill:COLOR_PLACEHOLDER;"/>
    </g>
    <g transform="matrix(2.768117,0,0,1.782564,-25.928325,17.555847)">
        <path d="M11,44.006C11,44.006 9.886,53.499 13.081,56C16.664,58.805 23.726,60.852 32.5,60.836C41.325,60.82 48.278,58.728 51.862,55.923C55.039,53.435 54,44.006 54,44.006C54,44.006 50.567,50.555 32.5,50C12.855,49.397 11,44.006 11,44.006Z" style="fill:COLOR_PLACEHOLDER;"/>
    </g>
    <g transform="matrix(2.768117,0,0,1.782564,-25.928325,-15.777486)">
        <path d="M11,44.006C11,44.006 9.886,53.499 13.081,56C16.664,58.805 23.726,60.852 32.5,60.836C41.325,60.82 48.278,58.728 51.862,55.923C55.039,53.435 54,44.006 54,44.006C54,44.006 50.567,50.555 32.5,50C12.855,49.397 11,44.006 11,44.006Z" style="fill:COLOR_PLACEHOLDER;"/>
    </g>
</svg>`;

export const useDynamicFavicon = (isDarkMode: boolean) => {
  useEffect(() => {
    const color = isDarkMode ? '#D40900' : '#23B706';
    const svgContent = FAVICON_SVG_TEMPLATE.replaceAll('COLOR_PLACEHOLDER', color);
    const encodedSvg = encodeURIComponent(svgContent);
    const dataUri = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

    let link = document.getElementById('dynamic-favicon') as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.id = 'dynamic-favicon';
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    }
    
    link.href = dataUri;
  }, [isDarkMode]);
};
