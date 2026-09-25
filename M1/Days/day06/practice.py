# 1. Spot the SRP violation. Take a Report class that builds, saves, and emails a report. Split it 
# into three focused classes. 

class Report:

    def build(self):
        print("Building report")


class ReportSaver:

    def save(self):
        print("Saving report")


class ReportEmailer:

    def email(self):
        print("Sending email")


report = Report()
report.build()

saver = ReportSaver()
saver.save()

emailer = ReportEmailer()
emailer.email()

# 2. Refactor to OCP. Replace an if/elif that prints a shape's area by shape type with a small 
# class hierarchy and one method. 

import math

class Shape:

    def area(self):
        pass


class Circle(Shape):

    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2


class Square(Shape):

    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Triangle(Shape):

    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


shapes = [
    Circle(5),
    Square(4),
    Triangle(10,6)
]

for shape in shapes:
    print(shape.area())

# 3. Write a Singleton. Build an AppSettings Singleton holding a currency ("ETB") and confirm two 
# instances are the same object. 

class AppSettings:

    _instance = None

    def __new__(cls):

        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"

        return cls._instance


a = AppSettings()
b = AppSettings()

print(a.currency)
print(a is b)


# 4. Write a Factory. Create a ShapeFactory.create(kind) that returns a Circle, Square, or 
# Triangle. 

class Circle:
    pass


class Square:
    pass


class Triangle:
    pass


class ShapeFactory:

    @staticmethod
    def create(kind):

        if kind == "circle":
            return Circle()

        elif kind == "square":
            return Square()

        elif kind == "triangle":
            return Triangle()

        else:
            raise ValueError("Unknown shape")


shape = ShapeFactory.create("circle")

print(type(shape).__name__)

# 5. Write an Observer pair. Make a NewsAgency subject and two subscriber classes that print when 
# notified. 

class NewsAgency:

    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):

        for subscriber in self.subscribers:
            subscriber.update(news)


class EmailSubscriber:

    def update(self, news):
        print("Email:", news)


class SMSSubscriber:

    def update(self, news):
        print("SMS:", news)


agency = NewsAgency()

agency.subscribe(EmailSubscriber())
agency.subscribe(SMSSubscriber())

agency.notify("Python 3.15 Released!")