import 'package:flutter/material.dart';
import 'package:frontend/core/theme/colors.dart';
class CustomBottomNavBar extends StatelessWidget {
final int currentIndex;
  final ValueChanged<int> onTap;
  final List<BottomNavigationBarItem> items;

  const CustomBottomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
    this.items = _defaultItems,
  }) : assert(currentIndex >= 0),
       assert(currentIndex < items.length);

  static const List<BottomNavigationBarItem> _defaultItems = [
    BottomNavigationBarItem(icon: Icon(Icons.home_rounded), label: 'Home'),
    BottomNavigationBarItem(
      icon: Icon(Icons.favorite_outline_rounded),
      label: 'Saved',
    ),
    BottomNavigationBarItem(icon: Icon(Icons.message_outlined), label: 'Messages'),
    BottomNavigationBarItem(
      icon: Icon(Icons.person_outline_rounded),
      label: 'Profile',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(color: Color(0x14000000), blurRadius: 20, offset: Offset(0, -4)),
        ],
      ),
      child: SafeArea(
        top: false,
        child: BottomNavigationBar(
          currentIndex: currentIndex,
          onTap: onTap,
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.white,
          selectedItemColor: AppColors.secondary,
          unselectedItemColor: Colors.grey,
          selectedFontSize: 12,
          unselectedFontSize: 12,
          items: items,
        ),
      ),
    );
  }
}
