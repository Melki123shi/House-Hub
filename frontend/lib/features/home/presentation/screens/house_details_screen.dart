import 'package:flutter/material.dart';
import 'package:frontend/core/theme/colors.dart';
import 'package:frontend/features/home/presentation/widgets/custom_bottom_nav_bar.dart';
import 'package:frontend/core/common/widgets/custom_app_bar.dart';
import 'package:go_router/go_router.dart';

class HouseDetailsScreen extends StatelessWidget {
  final Object? extra;

  const HouseDetailsScreen({super.key, this.extra});

  @override
  Widget build(BuildContext context) {
    final data = (extra is Map<String, dynamic>)
        ? extra! as Map<String, dynamic>
        : <String, dynamic>{};

    final title = data['title']?.toString() ?? 'House Details';
    final description = data['description']?.toString() ?? 'No description.';
    final city = data['city']?.toString() ?? '';
    final country = data['country']?.toString() ?? '';
    final address = data['address']?.toString() ?? '';
    final type = data['type']?.toString() ?? '-';
    final status = data['status']?.toString() ?? '-';
    final imageUrl = data['imageUrl']?.toString();
    final price = (data['price'] as num?)?.toDouble() ?? 0;
    final bedrooms = (data['bedrooms'] as num?)?.toInt() ?? 0;
    final bathrooms = (data['bathrooms'] as num?)?.toInt() ?? 0;
    final rooms = (data['rooms'] as num?)?.toInt() ?? 0;
    final area = (data['area'] as num?)?.toDouble() ?? 0;

    return Scaffold(
      appBar: const CustomAppBar(),
      backgroundColor: const Color(0xFFF8FAFC),
      bottomNavigationBar: CustomBottomNavBar(
        currentIndex: 0,
        onTap: (index) {
          if (index == 0) {
            context.go('/');
          }
        },
      ),
      body: CustomScrollView(
        slivers: [
          CustomAppBar.sliver(
            expandedHeight: 300,
            floating: false,
            pinned: true,
            backgroundColor: AppColors.primaryDark,
            leading: IconButton(
              onPressed: () => context.pop(),
              icon: const Icon(Icons.arrow_back_ios_new),
            ),
            backgroundImage: imageUrl != null && imageUrl.isNotEmpty
                ? NetworkImage(imageUrl)
                : null,
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 30),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1E293B),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '\$${price.toStringAsFixed(0)}',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w700,
                      color: AppColors.secondary,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      const Icon(Icons.location_on_outlined, color: Colors.grey),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          '$address, $city, $country',
                          style: const TextStyle(
                            fontSize: 14,
                            color: Color(0xFF64748B),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _chip('Type: $type'),
                      _chip('Status: $status'),
                      _chip('$bedrooms Beds'),
                      _chip('$bathrooms Baths'),
                      _chip('$rooms Rooms'),
                      _chip('${area.toStringAsFixed(0)} m²'),
                    ],
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'About',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    description,
                    style: const TextStyle(
                      fontSize: 15,
                      height: 1.6,
                      color: Color(0xFF334155),
                    ),
                  ),
                  const SizedBox(height: 28),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.secondary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      child: const Text(
                        'Contact Agent',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

Widget _chip(String text) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(20),
      border: Border.all(color: const Color(0xFFE2E8F0)),
    ),
    child: Text(
      text,
      style: const TextStyle(
        fontSize: 13,
        fontWeight: FontWeight.w600,
        color: Color(0xFF334155),
      ),
    ),
  );
}