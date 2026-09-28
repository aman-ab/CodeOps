# 1. Recursive sum. Write a recursive total(nums) that sums a list, and a recursive count_down(n) 
# that prints n down to 1. 

def total(nums):
    if len(nums) == 0:
        return 0
    return nums[0] + total(nums[1:])


numbers = [10, 20, 30, 40]
print(total(numbers))


# Recursive countdown
def count_down(n):
    if n == 0:
        return

    print(n)
    count_down(n - 1)


count_down(5)

# 2. Binary search. Implement binary_search(items, target) on a sorted list and return the index, 
# or -1. Test it on a sorted list of balances. 

def binary_search(items, target):

    low = 0
    high = len(items) - 1

    while low <= high:

        mid = (low + high) // 2

        if items[mid] == target:
            return mid

        elif items[mid] < target:
            low = mid + 1

        else:
            high = mid - 1

    return -1


balances = [100, 200, 300, 400, 500, 600]

print(binary_search(balances, 400))
print(binary_search(balances, 900))

# 3. Merge sort. Implement merge_sort(items) and its merge helper. Confirm it matches sorted() 
# on random lists. 

def merge(left, right):

    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i] < right[j]:
            result.append(left[i])
            i += 1

        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort(items):

    if len(items) <= 1:
        return items

    mid = len(items) // 2

    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)


numbers = [9, 3, 7, 1, 5, 2]

print(merge_sort(numbers))
print(sorted(numbers))

# 4. Sort with a key. Given a list of (name, balance) tuples, sort it by balance descending using 
# sorted(key=...). 

accounts = [
    ("Almaz", 1500),
    ("Dawit", 700),
    ("Hanna", 2200),
    ("Samuel", 900)
]

sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)

print(sorted_accounts)

# 5. Two pointers. Write has_pair(nums, target) for a sorted list, returning whether two values 
# sum to the target.

def has_pair(nums, target):

    left = 0
    right = len(nums) - 1

    while left < right:

        total = nums[left] + nums[right]

        if total == target:
            return True

        elif total < target:
            left += 1

        else:
            right -= 1

    return False


numbers = [2,4,6,8,10,12]

print(has_pair(numbers,14))
print(has_pair(numbers,25))