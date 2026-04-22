import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class SilkBackground extends StatelessWidget {
  final Widget? child;

  const SilkBackground({super.key, this.child});

  @override
  Widget build(BuildContext context) {
    const String backgroundSvg = '''
<svg width="800" height="800" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="silkBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0c29;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#302b63;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#24243e;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="foldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0" />
      <stop offset="50%" style="stop-color:#ffffff;stop-opacity:0.07" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#silkBg)" />
  <path d="M0,800 C200,700 400,850 800,600 L800,800 Z" fill="url(#foldGradient)" opacity="0.6" />
  <path d="M0,0 C300,200 500,-100 800,100 L800,0 Z" fill="url(#foldGradient)" opacity="0.4" />
</svg>
''';

    return Stack(
      children: [
        Positioned.fill(
          child: SvgPicture.string(backgroundSvg, fit: BoxFit.cover),
        ),
        ?child,
      ],
    );
  }
}
