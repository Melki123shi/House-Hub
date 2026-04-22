import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SplashController {
  static Future<void> initializeApp(
    BuildContext context, {
    Duration delay = const Duration(seconds: 3),
    String nextRoute = '/',
  }) async {
    // Keep the splash visible while any startup tasks run.
    await Future.delayed(delay);

    if (context.mounted) {
      context.go(nextRoute);
    }
  }
}