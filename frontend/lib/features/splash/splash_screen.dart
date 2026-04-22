import 'package:flutter/material.dart';
import 'package:frontend/core/common/logo.dart';
import 'package:frontend/features/splash/splash_bg.dart';
import 'package:frontend/features/splash/splash_contoller.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    SplashController.initializeApp(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SilkBackground(
        child: Center(
          child: BeteHouseHubLogo(
            width: MediaQuery.of(context).size.width * 0.8,
          ),
        ),
      ),
    );
  }
}
