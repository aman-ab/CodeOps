# 1. Unique cities. Given a list with repeated city names, use a set to print the distinct cities, then 
# the count. 

cities = [
    "Addis Ababa",
    "Adama",
    "Hawassa",
    "Addis Ababa",
    "Bahir Dar",
    "Adama"
]

unique_cities = set(cities)

print("Unique cities:")
for city in unique_cities:
    print(city)

print("Total unique cities:", len(unique_cities))

# 2. Price report. Make a dictionary of five grocery items and prices in ETB. Loop with .items() to 
# print each on its own line.

prices = {
    "Bread": 50,
    "Milk": 80,
    "Eggs": 120,
    "Rice": 250,
    "Sugar": 90
}

for item, price in prices.items():
    print(f"{item}: {price} ETB")


# 3. Tax comprehension. Given prices = [100, 250, 400, 80], use one comprehension to build 
# a list with 15% tax added. 

prices = [100, 250, 400, 80]

prices_with_tax = [price * 1.15 for price in prices]

print(prices_with_tax)

# 4. Cheap items. From the same list, use a comprehension with a condition to keep only prices 
# under 200.
prices = [100, 250, 400, 80]

cheap_items = [price for price in prices if price < 200]

print(cheap_items)

# 5. Write & read. Write three customer names to names.txt, then open it and print each name 
# back, one per line. 

# Write names to the file
with open("names.txt", "w") as file:
    file.write("Abel\n")
    file.write("Hana\n")
    file.write("Samuel\n")

# Read the file
with open("names.txt", "r") as file:
    for name in file:
        print(name.strip())

# 6. Safe division. Ask the user for a number and divide 1000 by it, catching both ValueError and 
# ZeroDivisionError. 

try:
    number = int(input("Enter a number: "))
    result = 1000 / number
except ValueError:
    print("Please enter a valid number.")
except ZeroDivisionError:
    print("You cannot divide by zero.")
else:
    print("Result:", result)
finally:
    print("Program finished.")