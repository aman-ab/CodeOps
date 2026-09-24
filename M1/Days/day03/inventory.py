# Pharmacy Inventory Tracker

stock = {}

# Load stock from file
try:
    with open("stock.txt", "r") as file:
        for line in file:
            item, qty = line.strip().split(",")
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet - starting empty")


# Function to add/remove stock
def adjust(item, amount):
    # Add item if it doesn't exist
    if item not in stock:
        stock[item] = 0

    stock[item] += amount

    # Prevent negative stock
    if stock[item] < 0:
        stock[item] = 0


# Save stock back to file
def save_stock():
    with open("stock.txt", "w") as file:
        for item, qty in stock.items():
            file.write(f"{item},{qty}\n")

print(stock)
