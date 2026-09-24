# 1. Temperature label. Ask for a temperature in °C, then print "cold" below 15, "warm" from 15
# 28, and "hot" above 28, using if / elif / else.

temperature = int(input("Enter the temperature in °C: "))

if temperature < 15:
    print("cold")
elif temperature <= 28:
    print("warm")
else:
    print("hot")

# 2. Receipt loop. Use a for loop and range to print receipt numbers 1 through 10, each on its own 
# line as "Receipt #N".

for number in range(1, 11):
    print(f"Receipt #{number}")

# 3. Even numbers. Print every even number from 1 to 20 using a loop and the modulo operator %. 
for number in range(1, 21):
    if number % 2 == 0:
        print(number)

# 4. Discount function. Write apply_discount(price, percent=10) that returns the price after the 
# discount. Test it with and without the default. 

def apply_discount(price, percent=10):
    discount = price * percent / 100
    return price - discount


# Test with the default discount (10%)
print(apply_discount(100))

# 5. Countdown. Use a while loop to count down from 5 to 1, printing each number, then print 
# "Liftoff!". 
count = 5

while count >= 1:
    print(count)
    count -= 1

print("Liftoff!")