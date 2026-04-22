import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:frontend/core/theme/colors.dart';
import 'package:frontend/features/home/presentation/widgets/custom_bottom_nav_bar.dart';
import 'package:frontend/core/common/widgets/custom_app_bar.dart';
import 'package:go_router/go_router.dart';

// --- MOCK MODEL ---
class HouseListing {
  final String id, title, description, city, country, address, type, status;
  final double price, area;
  final int bedrooms, bathrooms, rooms;
  final String? imageUrl;

  HouseListing({
    required this.id,
    required this.title,
    required this.description,
    required this.city,
    required this.country,
    required this.address,
    required this.type,
    required this.status,
    required this.price,
    required this.area,
    required this.bedrooms,
    required this.bathrooms,
    required this.rooms,
    this.imageUrl,
  });
}

// --- MOCK DATA ---
final List<HouseListing> mockHouses = [
  HouseListing(
    id: '1',
    title: 'The Glass Pavilion',
    city: 'Oslo',
    country: 'Norway',
    address: 'Vinterveien 12',
    type: 'SELL',
    status: 'AVAILABLE',
    price: 1250000,
    area: 450,
    bedrooms: 4,
    bathrooms: 3,
    rooms: 8,
    description:
        'A masterpiece of modern architecture with floor-to-ceiling glass.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  ),

  HouseListing(
    id: '3',
    title: 'Skyline Penthouse',
    city: 'New York',
    country: 'USA',
    address: '5th Ave 102',
    type: 'SELL',
    status: 'SOLD',
    price: 4500000,
    area: 600,
    bedrooms: 5,
    bathrooms: 4,
    rooms: 12,
    description: 'Unmatched views of Central Park with a private helipad.',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
  ),
];

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();

  String _selectedCategory = 'ALL';
  int _currentBottomIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(
        showProfileIcon: true,
        backgroundImage: NetworkImage(
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
        ),
      ),
      backgroundColor: const Color(0xFFF8FAFC),
      bottomNavigationBar: CustomBottomNavBar(
        currentIndex: _currentBottomIndex,
        onTap: (index) {
          setState(() => _currentBottomIndex = index);
        },
      ),
      body: CustomScrollView(
        slivers: [
          // 1. Custom App Bar with Search
          CustomAppBar.sliver(
            title: _buildSearchField(),
            backgroundImage: const NetworkImage(
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
            ),
          ),

          // 2. Category Filter Chips
          SliverToBoxAdapter(
            child: Container(
              height: 70,
              padding: const EdgeInsets.symmetric(vertical: 15),
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  'ALL',
                  'VILLA',
                  'APARTMENT',
                  'LOFT',
                  'PENTHOUSE',
                ].map((cat) => _buildCategoryChip(cat)).toList(),
              ),
            ),
          ),

          // 3. Animated List of Houses
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            sliver: AnimationLimiter(
              child: SliverList(
                delegate: SliverChildBuilderDelegate((context, index) {
                  return AnimationConfiguration.staggeredList(
                    position: index,
                    duration: const Duration(milliseconds: 600),
                    child: SlideAnimation(
                      verticalOffset: 50.0,
                      child: FadeInAnimation(
                        child: _buildSilkHouseCard(mockHouses[index]),
                      ),
                    ),
                  );
                }, childCount: mockHouses.length),
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 100)),
        ],
      ),
    );
  }

  Widget _buildSearchField() {
    return Container(
      height: 45,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(12),
      ),
      child: TextField(
        controller: _searchController,
        style: const TextStyle(color: Colors.white, fontSize: 14),
        decoration: InputDecoration(
          hintText: "Find your journey...",
          hintStyle: TextStyle(
            color: const Color.fromARGB(
              255,
              255,
              255,
              255,
            ).withValues(alpha: 0.5),
            fontSize: 14,
          ),
          prefixIcon: const Icon(Icons.search, color: Colors.white, size: 20),
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(vertical: 10),
        ),
      ),
    );
  }

  Widget _buildCategoryChip(String label) {
    bool isSelected = _selectedCategory == label;
    return GestureDetector(
      onTap: () => setState(() => _selectedCategory = label),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        margin: const EdgeInsets.only(right: 12),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.secondary : Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            if (isSelected)
              BoxShadow(
                color: AppColors.secondary.withValues(alpha: 0.3),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
          ],
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(
              color: isSelected ? Colors.white : AppColors.background,
              fontWeight: FontWeight.bold,
              fontSize: 12,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSilkHouseCard(HouseListing house) {
    return GestureDetector(
      onTap: () =>
          context.push('/house-details', extra: _toDetailsPayload(house)),
      child: Container(
        margin: const EdgeInsets.only(bottom: 40),
        decoration: BoxDecoration(
          color: const Color.fromARGB(255, 255, 255, 255),
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 20,
              offset: const Offset(0, 20),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image Section
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(24),
                  ),
                  child: Image.network(
                    house.imageUrl!,
                    height: 220,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  top: 15,
                  right: 15,
                  child: _buildBadge(house.status),
                ),
                Positioned(
                  bottom: 15,
                  left: 15,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.6),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      "\$${house.price.toStringAsFixed(0)}",
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            // Info Section
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        house.title,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: const Color.fromARGB(230, 27, 27, 27),
                        ),
                      ),
                      Icon(
                        Icons.favorite_border,
                        color: const Color.fromARGB(200, 29, 29, 29),
                      ),
                    ],
                  ),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      const Icon(
                        Icons.location_on,
                        size: 14,
                        color: Colors.grey,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        "${house.city}, ${house.country}",
                        style: const TextStyle(
                          color: Color.fromARGB(255, 61, 61, 61),
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 15),
                  const Divider(height: 1),
                  const SizedBox(height: 15),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildFeatureIcon(
                        Icons.king_bed_outlined,
                        "${house.bedrooms} Beds",
                      ),
                      _buildFeatureIcon(
                        Icons.bathtub_outlined,
                        "${house.bathrooms} Baths",
                      ),
                      _buildFeatureIcon(
                        Icons.square_foot_rounded,
                        "${house.area} m²",
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBadge(String status) {
    bool isAvailable = status == 'AVAILABLE';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: isAvailable ? AppColors.secondary : Colors.redAccent,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        status,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 10,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildFeatureIcon(IconData icon, String label) {
    return Row(
      children: [
        Icon(
          icon,
          size: 18,
          color: AppColors.background.withValues(alpha: 0.5),
        ),
        const SizedBox(width: 6),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: AppColors.background.withValues(alpha: 0.7),
          ),
        ),
      ],
    );
  }

  Map<String, dynamic> _toDetailsPayload(HouseListing house) {
    return <String, dynamic>{
      'id': house.id,
      'title': house.title,
      'description': house.description,
      'city': house.city,
      'country': house.country,
      'address': house.address,
      'type': house.type,
      'status': house.status,
      'price': house.price,
      'area': house.area,
      'bedrooms': house.bedrooms,
      'bathrooms': house.bathrooms,
      'rooms': house.rooms,
      'imageUrl': house.imageUrl,
    };
  }
}
