class FakeDatabase {
    constructor() {
      this.data = {
        1: { make: "Toyota", model: "Corolla", year: 2010 },
        2: { make: "Ford", model: "Fusion", year: 2012 },
        3: { make: "Honda", model: "Civic", year: 2015 },
      };
    }
  
    // Simulate a slow database call
    getCar(carId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.data[carId] || null);
        }, 2000); // 2 seconds delay
      });
    }
  }
  
  class CarService {
    static cache = {};

    constructor() {
      this.db = new FakeDatabase();
    }
  
    async getCarInfo(carId) {
      if (this.cache[carId]) {
        console.log(`Cache hit for car_id: ${carId}`);
        return this.cache[carId];
      } else {
        console.log(`Cache miss for car_id: ${carId}`);
        const car = await this.db.getCar(carId);
        if (car) {
          this.cache[carId] = car;
          return car;
        } else {
          console.log(`No car found in database for car_id: ${carId}`);
          return "Car not found";
        }
      }
    }
  
    async getAllCars() {
      const promises = [];
      for (let carId = 1; carId <= Object.keys(this.db.data).length; carId++) {
        if (!this.cache[carId]) {
          promises.push(this.getCarInfo(carId));
        }
      }
      await Promise.all(promises);
      return Object.values(this.cache);
    }
  
    addCar(carId, make, model, year) {
      this.db.data[carId] = { make, model, year };
      console.log(`Car added with id ${carId}: ${make} ${model} ${year}`);
    }
  }
  
  // Example usage
  const service = new CarService();
  
  (async () => {
    console.log(await service.getCarInfo(1)); // Cache miss
    console.log(await service.getCarInfo(1)); // Cache hit
    console.log(await service.getAllCars());  // Retrieve all cars
    service.addCar(4, "Nissan", "Altima", 2020); // Add a new car
    console.log(await service.getCarInfo(4)); // Cache miss, fetch from DB
  })();
  