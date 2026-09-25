# 1. Vehicle hierarchy. Make a Vehicle base class with make, model, and a describe() method. 
# Add Car and Truck subclasses.
   
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")


class Car(Vehicle):
    pass


class Truck(Vehicle):
    pass


car = Car("Toyota", "Corolla")
truck = Truck("Volvo", "FH16")

car.describe()
truck.describe()

# 2. Use super(). Give Truck a capacity attribute, setting make and model via super().__init__(). 
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")


class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity


truck = Truck("Volvo", "FH16", "25 Tons")

truck.describe()
print("Capacity:", truck.capacity)


# 3. Override. Override describe() in Truck so it also mentions the capacity. 

class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")


class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(f"{self.make} {self.model} - Capacity: {self.capacity}")


truck = Truck("Volvo", "FH16", "25 Tons")
truck.describe()

# 4. Polymorphism. Put several vehicles in a list and loop over them, calling describe() on each. 

class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")


class Car(Vehicle):
    pass


class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(f"{self.make} {self.model} - Capacity: {self.capacity}")


vehicles = [
    Car("Toyota", "Corolla"),
    Truck("Volvo", "FH16", "25 Tons"),
    Car("Honda", "Civic")
]

for vehicle in vehicles:
    vehicle.describe()

# 5. Abstract method. Make Vehicle an abstract base class with an abstract wheels() method, and 
# have each subclass return its own number. 
from abc import ABC, abstractmethod


class Vehicle(ABC):

    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        pass


class Car(Vehicle):

    def wheels(self):
        return 4


class Truck(Vehicle):

    def wheels(self):
        return 6


car = Car("Toyota", "Corolla")
truck = Truck("Volvo", "FH16")

print(car.wheels())
print(truck.wheels())