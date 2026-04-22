class HouseListing {
  HouseListing({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.type,
    required this.status,
    required this.rooms,
    required this.bedrooms,
    required this.bathrooms,
    required this.area,
    required this.city,
    required this.country,
    required this.address,
    required this.imageUrl,
  });

  final String id;
  final String title;
  final String description;
  final double price;
  final String type;
  final String status;
  final int rooms;
  final int bedrooms;
  final int bathrooms;
  final int area;
  final String city;
  final String country;
  final String address;
  final String? imageUrl;

  factory HouseListing.fromJson(Map<String, dynamic> json) {
    final location = (json['location'] is Map<String, dynamic>)
        ? json['location'] as Map<String, dynamic>
        : <String, dynamic>{};
    final rawImages = json['images'];
    String? firstImageUrl;
    if (rawImages is List && rawImages.isNotEmpty) {
      final firstItem = rawImages.first;
      if (firstItem is Map<String, dynamic>) {
        firstImageUrl = firstItem['url']?.toString();
      }
    }

    return HouseListing(
      id: json['id']?.toString() ?? '',
      title: json['title']?.toString() ?? 'Untitled',
      description: json['description']?.toString() ?? '',
      price: double.tryParse(json['price']?.toString() ?? '') ?? 0,
      type: json['type']?.toString() ?? '',
      status: json['status']?.toString() ?? '',
      rooms: int.tryParse(json['rooms']?.toString() ?? '') ?? 0,
      bedrooms: int.tryParse(json['bedrooms']?.toString() ?? '') ?? 0,
      bathrooms: int.tryParse(json['bathrooms']?.toString() ?? '') ?? 0,
      area: int.tryParse(json['area']?.toString() ?? '') ?? 0,
      city: location['city']?.toString() ?? '',
      country: location['country']?.toString() ?? '',
      address: location['address']?.toString() ?? '',
      imageUrl: firstImageUrl,
    );
  }
}
