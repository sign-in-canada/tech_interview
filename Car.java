public class Car {


   private String id;
   private String number;
   private String make;
   private String model;
   private String owner;


   public Car(String id, String number, String make, String model, String owner, int year) {
       this.id = id;
       this.number = number;
       this.make = make;
       this.model = model;
       this.owner = owner;
       this.year = year;
   }


   public String getId() {
       return id;
   }


   public String getNumber() {
       return number;
   }


   public String getMake() {
       return make;
   }


   public String getModel() {
       return model;
   }


   public String getOwner() {
       return owner;
   }

   public int getYear() {
       return year;
   }
}

import java.util.HashMap;


public class CarService {


   Cache cache = new Cache();
   CarDao carDAO = new CarDao();


   public String getCarDetails(String carId) {


       String carDetails = carDAO.getDetails();
       Object cacheResult = cache.get(carId);
       if(cacheResult == null) {
           return carDetails;
       }
       return cacheResult.toString();
   }


   public Object getAllCarDetails() {


       HashMap<String, Object> all = cache.getAll();
      
       if(all != null) {
           return all.values();
       }
      
       return carDAO.getAll();
   }


   public void storeCarDetails(Car car) {
       cache.put(car.getId(), car);
       carDAO.store(car.getId(), car);
   }
}

import java.util.HashMap;


public class Cache {
   public HashMap<String, Object> cache = new HashMap<>();


   public Object get(String key) {
       return cache.get(key);
   }


   public void remove(String key) {
       cache.remove(key);
   }


   public void put(String key, Object value) {
        cache.put(key, value);
   }


   public HashMap<String, Object> getAll() {
       return cache;
   }


}
