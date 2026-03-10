import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'house_event.dart';
part 'house_state.dart';

class HouseBloc extends Bloc<HouseEvent, HouseState> {
  HouseBloc() : super(HouseInitial()) {
    on<HouseEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
