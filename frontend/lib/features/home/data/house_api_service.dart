import 'package:dio/dio.dart';
import 'package:frontend/features/home/data/house_listing_model.dart';

class HouseApiService {
  HouseApiService({Dio? dio})
    : _dio =
          dio ??
          Dio(
            BaseOptions(
              baseUrl: const String.fromEnvironment(
                'HOUSE_HUB_API_URL',
                defaultValue: 'http://localhost:3000',
              ),
              connectTimeout: const Duration(seconds: 10),
              receiveTimeout: const Duration(seconds: 10),
            ),
          );

  final Dio _dio;

  Future<List<HouseListing>> getHouses() async {
    final response = await _dio.get<dynamic>('/house');
    final data = response.data;
    if (data is! List) {
      return <HouseListing>[];
    }
    return data
        .whereType<Map<String, dynamic>>()
        .map(HouseListing.fromJson)
        .toList();
  }
}
