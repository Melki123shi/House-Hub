import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class BeteHouseHubLogo extends StatelessWidget {
  final double width;
  final double? height;

  const BeteHouseHubLogo({super.key, this.width = 300, this.height});

  @override
  Widget build(BuildContext context) {
    // Increased vertical spacing and adjusted viewBox to 800x600 for more room
    const String svgString = '''
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#d6269d;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#7c51ac;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2a82cf;stop-opacity:1" />
    </linearGradient>
    
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
      <feOffset dx="0" dy="2" result="offsetblur" />
      <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>

  <!-- GRAPHIC SECTION (Shifted Up) -->
  <g transform="translate(0, -40)">
    <!-- THE WAVE -->
    <path d="M 80,300 
             C 150,220 350,220 520,280 
             C 650,330 720,300 740,260 
             C 720,310 650,345 520,300 
             C 350,240 150,245 100,330 
             Z" fill="url(#brandGrad)" />

    <!-- THE HOUSE ICON -->
    <path d="M 405,245 L 470,140 L 495,140 L 430,245 Z" fill="#7c51ac" />
    <path d="M 480,140 L 620,140 L 700,245 L 560,245 Z" fill="url(#brandGrad)" />
    <path d="M 490,150 L 605,150 L 640,195 L 525,195 Z" fill="white" fill-opacity="0.2" />
  </g>

  <!-- TEXT SECTION (Shifted Down to prevent overlap) -->
  <g filter="url(#shadow)">
    <!-- Main Company Name - Centered at y=420 -->
    <text  y="420" font-family="sans-serif" text-anchor="middle">
    <tspan x="220" font-family="sans-serif" text-anchor="middle" font-weight="900" font-size="62" fill="white" letter-spacing="2">BETE </tspan>
      <tspan x="500" font-weight="400" font-size="62" fill="white" letter-spacing="6">HOUSE HUB</tspan>
    </text>

    <!-- Tagline - Centered at y=485 (65px below main text) -->
    <text x="400" y="495" font-family="sans-serif" font-weight="400" font-size="32" text-anchor="middle" letter-spacing="5" fill="white" opacity="0.8">
      YOUR HOME, JOURNEY IN ONE HUB
    </text>
  </g>
</svg>
''';

    return SvgPicture.string(
      svgString,
      width: width,
      height: height,
      fit: BoxFit.contain,
    );
  }
}
