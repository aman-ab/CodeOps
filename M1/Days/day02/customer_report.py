# customer_report.py

# List of customers (name, balance)
customers = [
    ("Almaz", 1500),
    ("Dawit", 700),
    ("Tigist", 200),
    ("Hanna", 1200),
    ("Samuel", 450)
]

# Function to determine customer tier
def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"

# Counters for each tier
premium_count = 0
standard_count = 0
basic_count = 0

print("===== TeleBirr Customer Report =====")

# Print customer report
for name, balance in customers:
    customer_tier = tier(balance)
    print(f"Name: {name} | Tier: {customer_tier} | Balance: {balance} ETB")

    if customer_tier == "Premium":
        premium_count += 1
    elif customer_tier == "Standard":
        standard_count += 1
    else:
        basic_count += 1

# Print summary
print("\n===== Summary =====")
print(f"Premium customers: {premium_count}")
print(f"Standard customers: {standard_count}")
print(f"Basic customers: {basic_count}")