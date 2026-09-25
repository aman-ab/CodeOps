# 1. Name the Big-O. For five short snippets (a list index, a single loop, a nested loop, a dict 
# lookup, a binary search), write the Big-O of each as a comment and explain why. 
# 1. List Index
numbers = [10, 20, 30, 40]
print(numbers[2])

# Big-O: O(1)
# Accessing an item by index takes constant time.


# 2. Single Loop
for i in range(10):
    print(i)

# Big-O: O(n)
# The loop visits every item once.


# 3. Nested Loop
for i in range(5):
    for j in range(5):
        print(i, j)

# Big-O: O(n²)
# Every item is compared with every other item.


# 4. Dictionary Lookup
student = {"101": "Almaz", "102": "Dawit"}
print(student["101"])

# Big-O: O(1)
# Dictionary lookup uses hashing.


# 5. Binary Search

def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            low = mid + 1

        else:
            high = mid - 1

    return -1


numbers = [2,4,6,8,10,12,14]
print(binary_search(numbers,10))

# Big-O: O(log n)
# The search cuts the list in half each step.


# 2. List vs. dict lookup. Build a list and a dict of 100,000 fake account numbers. Time how long it 
# takes to find one near the end in each. 
import time

accounts_list = []
accounts_dict = {}

for i in range(100000):
    number = f"ACC{i}"

    accounts_list.append(number)
    accounts_dict[number] = number

target = "ACC99999"

start = time.time()

target in accounts_list

print("List:", time.time()-start)

start = time.time()

accounts_dict.get(target)

print("Dictionary:", time.time()-start)

# 3. Build a stack. Write a Stack class with push, pop, and peek, and use it to reverse a list of 
# names.
class Stack:

    def __init__(self):
        self.items = []

    def push(self,item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]


stack = Stack()

names = ["Almaz","Dawit","Hanna"]

for name in names:
    stack.push(name)

while stack.items:
    print(stack.pop())

# 4. Build a queue. Use collections.deque to model a bank service line: enqueue five customers, 
# then serve them in order. 
from collections import deque

queue = deque()

queue.append("Almaz")
queue.append("Dawit")
queue.append("Hanna")
queue.append("Samuel")
queue.append("Abel")

while queue:
    customer = queue.popleft()
    print(customer,"served")

# 5. Singly linked list. Implement a Node and a LinkedList with push_front and a print_all() that 
# walks the chain
class Node:

    def __init__(self,data):
        self.data = data
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def push_front(self,data):

        new_node = Node(data)

        new_node.next = self.head

        self.head = new_node

    def print_all(self):

        current = self.head

        while current:
            print(current.data)
            current = current.next


ll = LinkedList()

ll.push_front("Samuel")
ll.push_front("Dawit")
ll.push_front("Almaz")

ll.print_all()