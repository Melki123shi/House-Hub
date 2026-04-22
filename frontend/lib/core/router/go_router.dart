import 'package:frontend/features/home/presentation/screens/home_screen.dart';
import 'package:frontend/features/home/presentation/screens/house_details_screen.dart';
import 'package:frontend/features/splash/splash_screen.dart';
import 'package:go_router/go_router.dart';

GoRouter createRouter() => GoRouter(
  initialLocation: '/splash',
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/house-details',
      builder: (context, state) => HouseDetailsScreen(extra: state.extra),
    ),
  ],
);
