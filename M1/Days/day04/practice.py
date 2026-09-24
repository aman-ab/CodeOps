
# Exercise 1: Book Class

class Book:
    def __init__(self,title,author,pages):
        self.title = title
        self.author = author
        self.pages = pages

    
    def describe(self):
            print(f"'{self.title}' by {self.author},  {self.pages} pages")


book1 = Book("Python Basics", "John Smith", 250)
book2 = Book("Learning OOP", "Jane Doe", 300)

book1.describe()
book2.describe()


# Exercise 2: Product Class


class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price      # ETB
        self.quantity = quantity

    def restock(self, n):
        self.quantity += n

    def sell(self, n):
        self.quantity -= n


p1 = Product("Laptop", 50000, 10)

print("Before:", p1.quantity)
p1.restock(5)
print("After restock:", p1.quantity)
p1.sell(3)
print("After selling:", p1.quantity)



# # Exercise 3: Private Quantity


class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        self.__quantity += n

    def sell(self, n):
        self.__quantity -= n


p2 = Product("Phone", 20000, 15)
print("Quantity:", p2.quantity)




# # Exercise 4: Validation


class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        self.__quantity += n

    def sell(self, n):
        if n > self.__quantity:
            print("Cannot sell. Not enough stock.")
        else:
            self.__quantity -= n


p3 = Product("Tablet", 15000, 8)

print("Stock:", p3.quantity)
p3.sell(5)
print("Stock:", p3.quantity)
p3.sell(10)
print("Stock:", p3.quantity)





product1 = Product("Pen", 20, 100)
product2 = Product("Book", 150, 50)
product3 = Product("Bag", 800, 30)

product1.sell(20)

print("Product 1 quantity:", product1.quantity)
print("Product 2 quantity:", product2.quantity)
print("Product 3 quantity:", product3.quantity)