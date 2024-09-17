import time

class FakeDatabase:
   def __init__(self):
       self.data = {
           1: {"make": "Toyota", "model": "Corolla", "year": 2010},
           2: {"make": "Ford", "model": "Fusion", "year": 2012},
           3: {"make": "Honda", "model": "Civic", "year": 2015},
       }


   def get_car(self, car_id):
       # Simulate a slow database call
       time.sleep(2)
       return self.data.get(car_id, None)

class CarService:
   cache = {}


   def __init__(self):
       self.db = FakeDatabase()


   def get_car_info(self, car_id):
       if car_id in CarService.cache:
           print(f"Cache hit for car_id: {car_id}")
           return CarService.cache[car_id]
       else:
           print(f"Cache miss for car_id: {car_id}")
           car = self.db.get_car(car_id)
           if car is not None:
               CarService.cache[car_id] = car
               return car
           else:
               print(f"No car found in database for car_id: {car_id}")
               return "Car not found"


   def get_all_cars(self):
       for car_id in range(1, len(self.db.data) + 1):
           if car_id not in CarService.cache:
               self.get_car_info(car_id)
       return CarService.cache.values()


   def add_car(self, car_id, make, model, year):
       self.db.data[car_id] = {"make": make, "model": model, "year": year}
       print(f"Car added with id {car_id}: {make} {model} {year}")




# Example usage
service = CarService()
print(service.get_car_info(1))  
print(service.get_car_info(1))  
print(service.get_all_cars())  
service.add_car(4, "Nissan", "Altima", 2020) 
print(service.get_car_info(4))
