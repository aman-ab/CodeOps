# 1. Build a BST. Write a Node class and an insert(root, value) function. Insert several balances, 
# then print them with an in-order traversal — they should come out sorted. 
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(root):
    if root:
        inorder(root.left)
        print(root.value)
        inorder(root.right)


root = None

balances = [500, 200, 800, 100, 400, 700, 900]

for balance in balances:
    root = insert(root, balance)

print("Sorted balances:")
inorder(root)

# 2. Tree depth. Write a recursive height(node) that returns the depth of a binary tree

def height(node):
    if node is None:
        return 0

    return 1 + max(height(node.left), height(node.right))


print(height(root))

# 3. Graph BFS. Given an adjacency-list graph, implement bfs(graph, start) and return the set of 
# reachable vertices. 
from collections import deque

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": []
}


def bfs(graph, start):

    visited = set()

    queue = deque([start])

    while queue:

        node = queue.popleft()

        if node not in visited:

            visited.add(node)

            for neighbor in graph[node]:
                queue.append(neighbor)

    return visited


print(bfs(graph, "A"))

# 4. Graph DFS. Implement dfs(graph, start) recursively, and compare the visit order with your 
# BFS. 

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": []
}


def dfs(graph, node, visited=None):

    if visited is None:
        visited = []

    visited.append(node)

    for neighbor in graph[node]:

        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited


print(dfs(graph, "A"))

# 5. Priority queue. Use heapq to push five (priority, task) tuples in mixed order, then pop them all 
# — they should come out by priority. 

import heapq

tasks = []

heapq.heappush(tasks, (3, "Study Python"))
heapq.heappush(tasks, (1, "Wake up"))
heapq.heappush(tasks, (5, "Sleep"))
heapq.heappush(tasks, (2, "Breakfast"))
heapq.heappush(tasks, (4, "Exercise"))

while tasks:
    print(heapq.heappop(tasks))
    