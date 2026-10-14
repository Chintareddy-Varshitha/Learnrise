// ═══════════════════════════════════════════════════
// LearnRise — Central Frontend Mock Data Store
// ═══════════════════════════════════════════════════

export const STUDENT_CREDENTIALS = {
  email: "student@gmail.com",
  password: "123456789",
  otp: "000000",
};

export const studentProfile = {
  id: "stu_001",
  name: "Alex Johnson",
  email: "student@gmail.com",
  avatar: null,
  initials: "AJ",
  enrolledAt: "2026-08-01",
  grade: "3rd Year",
  department: "Computer Science",
  streakDays: 14,
  totalXP: 2840,
  level: 7,
};

// ── Question Interface ───────────────────────────────

export interface TestCase {
  input: string;
  expected: string;
}

export interface Question {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  topic: string;
  hints: string[];
  answer: string;
  explanation: string;
  starterCode: string;
  exampleInput: string;
  exampleOutput: string;
  testCases: TestCase[];
  requiredKeywords: string[];
}

// ── 10 Questions: Python Programming (Course 1) ──────

const pythonQuestions: Question[] = [
  {
    id: "py_q1",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "1. Contains Duplicate",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    topic: "Arrays & Hash Sets",
    exampleInput: "[1, 2, 3, 3]",
    exampleOutput: "True",
    hints: [
      "Think about storing previously seen elements in a data structure that provides fast O(1) lookups.",
      "A hash set allows you to check membership in O(1) average time. Iterate through nums and check if num is in seen.",
      "If num in seen, return True immediately. Otherwise, add num to seen. If loop finishes, return False.",
    ],
    answer: `def hasDuplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False`,
    explanation:
      "We initialize an empty set. As we iterate through each number in the array, we check if it is already present in our set. If yes, we found a duplicate and return True. If not, we add it. This runs in O(n) time and O(n) space.",
    starterCode: `def hasDuplicate(nums):
    # Write your solution here
    pass`,
    testCases: [
      { input: "[1, 2, 3, 3]", expected: "True" },
      { input: "[1, 2, 3, 4]", expected: "False" },
    ],
    requiredKeywords: ["seen", "set", "for", "return"],
  },
  {
    id: "py_q2",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "2. Valid Anagram",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram contains the exact same letters in different order.",
    topic: "Strings & Dictionaries",
    exampleInput: 's = "anagram", t = "nagaram"',
    exampleOutput: "True",
    hints: [
      "Two anagrams must have identical length and identical character frequencies.",
      "Count character frequencies in s with a dictionary, then decrement counts for each character in t.",
      "If lengths differ, return False immediately. Return True only if all counts match zero.",
    ],
    answer: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in t:
        if ch not in counts or counts[ch] == 0:
            return False
        counts[ch] -= 1
    return True`,
    explanation:
      "First check if lengths match. Then count occurrences of each character in s using a hash map. Iterate through t, reducing counts. If a character is missing or over-allocated, return False. Total time: O(n), space: O(1) for fixed alphabet.",
    starterCode: `def isAnagram(s, t):
    # Write your solution here
    pass`,
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expected: "True" },
      { input: 's = "rat", t = "car"', expected: "False" },
    ],
    requiredKeywords: ["len", "counts", "for", "return"],
  },
  {
    id: "py_q3",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "3. Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    topic: "Arrays & Hash Maps",
    exampleInput: "nums = [2, 7, 11, 15], target = 9",
    exampleOutput: "[0, 1]",
    hints: [
      "Instead of checking all pairs with two loops (O(n²)), check what complement is needed for each number.",
      "For each number n, its complement is target - n. Can we store seen numbers and their indices in a dictionary?",
      "As you iterate, check if (target - n) exists in the dictionary. If so, return [seen[target - n], i].",
    ],
    answer: `def twoSum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []`,
    explanation:
      "We store the value and its index in a hash map as we iterate. For each element, we calculate diff = target - n. If diff is already in our map, we have found the matching pair in O(n) time.",
    starterCode: `def twoSum(nums, target):
    # Write your solution here
    pass`,
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]" },
    ],
    requiredKeywords: ["seen", "diff", "enumerate", "return"],
  },
  {
    id: "py_q4",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "4. Fibonacci Number",
    description:
      "The Fibonacci numbers form a sequence where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1. Given n, calculate F(n).",
    topic: "Recursion & Iteration",
    exampleInput: "n = 10",
    exampleOutput: "55",
    hints: [
      "Base cases: if n <= 1, return n directly.",
      "To avoid exponential recursion stack overhead, compute values bottom-up iteratively using two variables.",
      "Keep previous two numbers a and b initialized to 0 and 1. Loop from 2 to n updating a, b = b, a + b.",
    ],
    answer: `def fib(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
    explanation:
      "We iterate from 2 up to n, updating variables a and b iteratively. This achieves O(n) time and O(1) space, avoiding redundant recursion calls.",
    starterCode: `def fib(n):
    # Write your solution here
    pass`,
    testCases: [
      { input: "n = 10", expected: "55" },
      { input: "n = 4", expected: "3" },
    ],
    requiredKeywords: ["if", "for", "return"],
  },
  {
    id: "py_q5",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "5. Maximum Subarray (Kadane's Algorithm)",
    description:
      "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
    topic: "Arrays & Dynamic Logic",
    exampleInput: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
    exampleOutput: "6",
    hints: [
      "At each index, decide whether to continue the existing subarray or start a new subarray from the current element.",
      "Current sum becomes max(n, current_sum + n).",
      "Maintain a global max_sum initialized to nums[0] and update it whenever current_sum exceeds it.",
    ],
    answer: `def maxSubArray(nums):
    max_sum = nums[0]
    cur_sum = nums[0]
    for n in nums[1:]:
        cur_sum = max(n, cur_sum + n)
        max_sum = max(max_sum, cur_sum)
    return max_sum`,
    explanation:
      "Kadane's algorithm maintains the maximum subarray ending at the current position. If the previous running sum is negative, starting a new subarray is better. Runs in O(n) time.",
    starterCode: `def maxSubArray(nums):
    # Write your solution here
    pass`,
    testCases: [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", expected: "6" },
      { input: "nums = [1]", expected: "1" },
    ],
    requiredKeywords: ["max", "cur_sum", "max_sum", "return"],
  },
  {
    id: "py_q6",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "6. Reverse String",
    description:
      "Write a function that reverses a list of characters in-place with O(1) extra memory.",
    topic: "Two Pointers",
    exampleInput: 's = ["h","e","l","l","o"]',
    exampleOutput: '["o","l","l","e","h"]',
    hints: [
      "Use two pointers: left starting at 0, right starting at len(s) - 1.",
      "Swap characters at left and right, then advance left and decrement right.",
      "Continue while left < right.",
    ],
    answer: `def reverseString(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s`,
    explanation:
      "Using two pointers meeting in the middle, we swap opposite elements in-place. Runs in O(n) time and O(1) additional memory.",
    starterCode: `def reverseString(s):
    # Write your solution here
    pass`,
    testCases: [
      { input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
    ],
    requiredKeywords: ["left", "right", "while", "return"],
  },
  {
    id: "py_q7",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "7. Palindrome Number",
    description:
      "Given an integer x, return true if x is a palindrome (reads the same backwards as forwards), and false otherwise.",
    topic: "Math & String Logic",
    exampleInput: "x = 121",
    exampleOutput: "True",
    hints: [
      "Negative numbers can never be palindromes due to the leading minus sign.",
      "Convert the number to string and compare it with its reverse: s == s[::-1].",
      "Or reverse the integer mathematically using modulo 10.",
    ],
    answer: `def isPalindrome(x):
    if x < 0:
        return False
    s = str(x)
    return s == s[::-1]`,
    explanation:
      "Negative numbers are not palindromes. For non-negative integers, converting to string and comparing with reversed string s[::-1] takes O(d) time where d is the number of digits.",
    starterCode: `def isPalindrome(x):
    # Write your solution here
    pass`,
    testCases: [
      { input: "x = 121", expected: "True" },
      { input: "x = -121", expected: "False" },
    ],
    requiredKeywords: ["str", "return"],
  },
  {
    id: "py_q8",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "8. Count Vowels in a String",
    description:
      "Write a function that returns the total count of vowels (a, e, i, o, u, case-insensitive) in a given string.",
    topic: "Strings & Sets",
    exampleInput: 's = "LearnRise Education"',
    exampleOutput: "9",
    hints: [
      "Define a set of vowels: vowels = set('aeiouAEIOU').",
      "Iterate through the string, counting characters that exist in your set.",
      "Return the total count.",
    ],
    answer: `def countVowels(s):
    vowels = set("aeiouAEIOU")
    return sum(1 for ch in s if ch in vowels)`,
    explanation:
      "We check membership in a vowel set in O(1) time per character, summing the matches. Overall time complexity is O(n).",
    starterCode: `def countVowels(s):
    # Write your solution here
    pass`,
    testCases: [
      { input: 's = "LearnRise Education"', expected: "9" },
      { input: 's = "xyz"', expected: "0" },
    ],
    requiredKeywords: ["vowels", "return"],
  },
  {
    id: "py_q9",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "9. Find Missing Number",
    description:
      "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    topic: "Math & Arrays",
    exampleInput: "nums = [3, 0, 1]",
    exampleOutput: "2",
    hints: [
      "The expected sum of numbers from 0 to n is n * (n + 1) // 2.",
      "The missing number is simply the difference between expected sum and actual sum of nums.",
      "Calculate expected_sum - sum(nums).",
    ],
    answer: `def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    return expected_sum - sum(nums)`,
    explanation:
      "Gauss's summation formula computes the sum of the first n integers in O(1). Subtracting sum(nums) gives the missing number in O(n) time and O(1) extra space.",
    starterCode: `def missingNumber(nums):
    # Write your solution here
    pass`,
    testCases: [
      { input: "nums = [3, 0, 1]", expected: "2" },
      { input: "nums = [0, 1]", expected: "2" },
    ],
    requiredKeywords: ["len", "sum", "return"],
  },
  {
    id: "py_q10",
    courseId: "c1",
    courseTitle: "Python Programming",
    title: "10. Merge Two Sorted Lists",
    description:
      "Given two sorted lists list1 and list2, merge them into a single sorted list and return it.",
    topic: "Lists & Pointers",
    exampleInput: "list1 = [1, 2, 4], list2 = [1, 3, 4]",
    exampleOutput: "[1, 1, 2, 3, 4, 4]",
    hints: [
      "Use two pointers i and j initialized to 0, traversing both lists simultaneously.",
      "Append the smaller element to result, then increment its pointer.",
      "Append remaining elements once one list is exhausted.",
    ],
    answer: `def mergeSorted(list1, list2):
    res = []
    i, j = 0, 0
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            res.append(list1[i])
            i += 1
        else:
            res.append(list2[j])
            j += 1
    res.extend(list1[i:])
    res.extend(list2[j:])
    return res`,
    explanation:
      "We compare the heads of both lists iteratively, appending the smaller item. Runs in O(n + m) time, preserving order efficiently.",
    starterCode: `def mergeSorted(list1, list2):
    # Write your solution here
    pass`,
    testCases: [
      { input: "list1 = [1, 2, 4], list2 = [1, 3, 4]", expected: "[1, 1, 2, 3, 4, 4]" },
      { input: "list1 = [], list2 = [0]", expected: "[0]" },
    ],
    requiredKeywords: ["res", "while", "append", "return"],
  },
];

// ── 10 Questions: Data Structures & Algorithms (Course 2) ──

const dsaQuestions: Question[] = [
  {
    id: "dsa_q1",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "1. Binary Search",
    description:
      "Given a sorted array of distinct integers nums and a target value, return the index if the target is found. If not, return -1 in O(log n) runtime.",
    topic: "Binary Search",
    exampleInput: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
    exampleOutput: "4",
    hints: [
      "Maintain low and high pointers: low = 0, high = len(nums) - 1.",
      "Calculate mid = (low + high) // 2.",
      "If nums[mid] == target return mid. If nums[mid] < target, low = mid + 1; else high = mid - 1.",
    ],
    answer: `def binarySearch(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    explanation:
      "Binary search repeatedly halves the search space by inspecting the midpoint of the sorted list, ensuring O(log n) efficiency.",
    starterCode: `def binarySearch(nums, target):
    # Write your solution here
    pass`,
    testCases: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", expected: "4" },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", expected: "-1" },
    ],
    requiredKeywords: ["low", "high", "mid", "while", "return"],
  },
  {
    id: "dsa_q2",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "2. Valid Parentheses",
    description:
      "Given a string s containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Brackets must close in the correct order.",
    topic: "Stacks",
    exampleInput: 's = "()[]{}"',
    exampleOutput: "True",
    hints: [
      "Use a stack to keep track of open brackets.",
      "Use a dictionary mapping closing brackets to their matching open brackets: {')': '(', '}': '{', ']': '['}.",
      "For every closing bracket, pop from the stack and verify a match. If stack is empty at end, return True.",
    ],
    answer: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
    explanation:
      "A stack ensures LIFO matching for nested pairs. If a closing bracket doesn't match the top of the stack, return False immediately.",
    starterCode: `def isValid(s):
    # Write your solution here
    pass`,
    testCases: [
      { input: 's = "()[]{}"', expected: "True" },
      { input: 's = "(]"', expected: "False" },
    ],
    requiredKeywords: ["stack", "pop", "append", "return"],
  },
  {
    id: "dsa_q3",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "3. Best Time to Buy and Sell Stock",
    description:
      "You are given an array prices where prices[i] is the price on the ith day. Return the maximum profit you can achieve from a single transaction.",
    topic: "Greedy / Dynamic Programming",
    exampleInput: "prices = [7, 1, 5, 3, 6, 4]",
    exampleOutput: "5",
    hints: [
      "Track the lowest buying price seen so far as you iterate through prices.",
      "Calculate profit at each day: current_price - min_price.",
      "Update max_profit whenever current profit is greater.",
    ],
    answer: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
    explanation:
      "We iterate in a single pass, updating min_price and checking if selling today yields a higher profit than any previous peak. Runs in O(n) time.",
    starterCode: `def maxProfit(prices):
    # Write your solution here
    pass`,
    testCases: [
      { input: "prices = [7, 1, 5, 3, 6, 4]", expected: "5" },
      { input: "prices = [7, 6, 4, 3, 1]", expected: "0" },
    ],
    requiredKeywords: ["min_price", "max_profit", "return"],
  },
  {
    id: "dsa_q4",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "4. Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
    topic: "Dynamic Programming",
    exampleInput: "n = 3",
    exampleOutput: "3",
    hints: [
      "To reach step n, you can arrive from step n-1 (1 step) or step n-2 (2 steps).",
      "Thus: ways(n) = ways(n-1) + ways(n-2).",
      "This is equivalent to the Fibonacci recurrence.",
    ],
    answer: `def climbStairs(n):
    if n <= 2:
        return n
    one, two = 1, 2
    for _ in range(3, n + 1):
        one, two = two, one + two
    return two`,
    explanation:
      "Because each state only depends on the previous two steps, we store just two variables and compute forward in O(n) time.",
    starterCode: `def climbStairs(n):
    # Write your solution here
    pass`,
    testCases: [
      { input: "n = 3", expected: "3" },
      { input: "n = 2", expected: "2" },
    ],
    requiredKeywords: ["for", "return"],
  },
  {
    id: "dsa_q5",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "5. Linked List Cycle Detection",
    description:
      "Given the head of a linked list represented as node values, determine if the list has a cycle using Floyd's Tortoise and Hare algorithm.",
    topic: "Linked Lists & Pointers",
    exampleInput: "has_cycle = True",
    exampleOutput: "True",
    hints: [
      "Use two pointers moving at different speeds: slow moves 1 step, fast moves 2 steps.",
      "If there is a cycle, fast will eventually lap and meet slow.",
      "If fast reaches None, there is no cycle.",
    ],
    answer: `def hasCycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    explanation:
      "Floyd's Tortoise and Hare algorithm detects loops in O(n) time and O(1) space without needing a hash set of visited nodes.",
    starterCode: `def hasCycle(head):
    # Write your solution here
    pass`,
    testCases: [
      { input: "head = [3,2,0,-4], pos = 1", expected: "True" },
      { input: "head = [1], pos = -1", expected: "False" },
    ],
    requiredKeywords: ["slow", "fast", "next", "return"],
  },
  {
    id: "dsa_q6",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "6. Maximum Depth of Binary Tree",
    description:
      "Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root down to the farthest leaf).",
    topic: "Trees & DFS",
    exampleInput: "root = [3, 9, 20, None, None, 15, 7]",
    exampleOutput: "3",
    hints: [
      "Base case: if root is None, depth is 0.",
      "Recursively calculate maxDepth of root.left and root.right.",
      "Return 1 + max(leftDepth, rightDepth).",
    ],
    answer: `def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
    explanation:
      "Standard recursive DFS computes the depth of each subtree, returning 1 + max(left, right). Runs in O(n) time.",
    starterCode: `def maxDepth(root):
    # Write your solution here
    pass`,
    testCases: [
      { input: "root = [3, 9, 20, None, None, 15, 7]", expected: "3" },
      { input: "root = [1, None, 2]", expected: "2" },
    ],
    requiredKeywords: ["max", "root", "return"],
  },
  {
    id: "dsa_q7",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "7. Invert Binary Tree",
    description:
      "Given the root of a binary tree, invert the tree (swap left and right children recursively) and return its root.",
    topic: "Trees & Recursion",
    exampleInput: "root = [4, 2, 7, 1, 3, 6, 9]",
    exampleOutput: "[4, 7, 2, 9, 6, 3, 1]",
    hints: [
      "Base case: if root is None, return None.",
      "Swap root.left and root.right: root.left, root.right = root.right, root.left.",
      "Recursively invert both subtrees.",
    ],
    answer: `def invertTree(root):
    if not root:
        return None
    root.left, root.right = root.right, root.left
    invertTree(root.left)
    invertTree(root.right)
    return root`,
    explanation:
      "We swap the left and right child pointers at each node, then recursively recurse down both branches in O(n) time.",
    starterCode: `def invertTree(root):
    # Write your solution here
    pass`,
    testCases: [
      { input: "root = [4, 2, 7, 1, 3, 6, 9]", expected: "[4, 7, 2, 9, 6, 3, 1]" },
      { input: "root = [2, 1, 3]", expected: "[2, 3, 1]" },
    ],
    requiredKeywords: ["root.left", "root.right", "return"],
  },
  {
    id: "dsa_q8",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "8. Intersection of Two Arrays",
    description:
      "Given two integer arrays nums1 and nums2, return an array of their unique intersection elements.",
    topic: "Hash Sets",
    exampleInput: "nums1 = [1, 2, 2, 1], nums2 = [2, 2]",
    exampleOutput: "[2]",
    hints: [
      "Convert both arrays to sets: set(nums1) and set(nums2).",
      "Compute set intersection using the & operator: set(nums1) & set(nums2).",
      "Return the result as a list.",
    ],
    answer: `def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))`,
    explanation:
      "Set intersection provides unique common elements with O(n + m) time complexity.",
    starterCode: `def intersection(nums1, nums2):
    # Write your solution here
    pass`,
    testCases: [
      { input: "nums1 = [1, 2, 2, 1], nums2 = [2, 2]", expected: "[2]" },
      { input: "nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]", expected: "[9, 4]" },
    ],
    requiredKeywords: ["set", "return"],
  },
  {
    id: "dsa_q9",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "9. Implement Queue using Stacks",
    description:
      "Implement a first in first out (FIFO) queue using only two stacks with push, pop, peek, and empty operations.",
    topic: "Data Structure Design",
    exampleInput: 'push(1), push(2), peek(), pop()',
    exampleOutput: "1, 1",
    hints: [
      "Maintain two stacks: in_stack for push, out_stack for pop/peek.",
      "When popping or peeking, if out_stack is empty, transfer all elements from in_stack to out_stack.",
      "This reverses the order to achieve FIFO behavior.",
    ],
    answer: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self.peek()
        return self.out_stack.pop()

    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack`,
    explanation:
      "Amortized O(1) runtime per operation. Elements are moved from in_stack to out_stack only when out_stack is exhausted.",
    starterCode: `class MyQueue:
    def __init__(self):
        pass
    def push(self, x: int) -> None:
        pass
    def pop(self) -> int:
        pass`,
    testCases: [
      { input: "operations: push(1), push(2), peek()", expected: "1" },
      { input: "pop(), empty()", expected: "False" },
    ],
    requiredKeywords: ["in_stack", "out_stack", "append", "pop"],
  },
  {
    id: "dsa_q10",
    courseId: "c2",
    courseTitle: "Data Structures & Algorithms",
    title: "10. Min Stack Design",
    description:
      "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) constant time.",
    topic: "Stacks & Auxiliary Memory",
    exampleInput: 'push(-2), push(0), push(-3), getMin()',
    exampleOutput: "-3",
    hints: [
      "Use an auxiliary min_stack that keeps track of the current minimum element alongside the main stack.",
      "When pushing a value x, push min(x, min_stack[-1]) onto min_stack.",
      "Pop both stacks simultaneously to maintain synchronization.",
    ],
    answer: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1]) if self.min_stack else val
        self.min_stack.append(min_val)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
    explanation:
      "By recording the minimum seen so far with each element pushed onto min_stack, getMin() executes in guaranteed O(1) constant time.",
    starterCode: `class MinStack:
    def __init__(self):
        pass
    def push(self, val: int) -> None:
        pass
    def getMin(self) -> int:
        pass`,
    testCases: [
      { input: "push(-2), push(0), push(-3), getMin()", expected: "-3" },
      { input: "pop(), top(), getMin()", expected: "0, -2" },
    ],
    requiredKeywords: ["min_stack", "append", "pop", "return"],
  },
];

// ── 10 Questions: Web Development Basics (Course 3) ──

const webDevQuestions: Question[] = [
  {
    id: "web_q1",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "1. Responsive Navbar Toggle",
    description:
      "Write a JavaScript function toggleNav(isOpen) that adds or removes the CSS class 'active' on the navigation element with id 'mobile-menu'.",
    topic: "DOM Manipulation",
    exampleInput: "toggleNav(true)",
    exampleOutput: 'element.classList.contains("active") === true',
    hints: [
      "Use document.getElementById('mobile-menu') to select the target element.",
      "Use element.classList.add('active') if isOpen is true, else element.classList.remove('active').",
      "Or use element.classList.toggle('active', isOpen).",
    ],
    answer: `function toggleNav(isOpen) {
    const menu = document.getElementById("mobile-menu");
    if (!menu) return;
    menu.classList.toggle("active", Boolean(isOpen));
    return menu.classList.contains("active");
}`,
    explanation:
      "classList.toggle takes a boolean force parameter to reliably synchronize element visibility states without manual if-else branching.",
    starterCode: `function toggleNav(isOpen) {
    // Write your solution here
    return false;
}`,
    testCases: [
      { input: "toggleNav(true)", expected: "true" },
      { input: "toggleNav(false)", expected: "false" },
    ],
    requiredKeywords: ["classList", "mobile-menu", "toggle", "return"],
  },
  {
    id: "web_q2",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "2. Fetch and Display Users",
    description:
      "Write an asynchronous function fetchUserNames(apiUrl) that fetches JSON user data and returns an array of user names formatted in uppercase.",
    topic: "Async / Await & Fetch API",
    exampleInput: 'fetchUserNames("/api/users")',
    exampleOutput: '["ALEX", "SARAH", "JAMES"]',
    hints: [
      "Use await fetch(apiUrl) to send the network request.",
      "Parse the response with await res.json().",
      "Map over the users array returning user.name.toUpperCase().",
    ],
    answer: `async function fetchUserNames(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();
        return users.map(user => user.name.toUpperCase());
    } catch (err) {
        return [];
    }
}`,
    explanation:
      "Using async/await handles asynchronous promises cleanly with try/catch fallback error handling.",
    starterCode: `async function fetchUserNames(apiUrl) {
    // Write your solution here
    return [];
}`,
    testCases: [
      { input: 'apiUrl = "/api/users"', expected: '["ALEX", "SARAH", "JAMES"]' },
      { input: 'apiUrl = "/api/empty"', expected: '[]' },
    ],
    requiredKeywords: ["async", "await", "fetch", "map", "return"],
  },
  {
    id: "web_q3",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "3. Email Format Validator",
    description:
      "Write a function validateEmail(email) that returns true if the email string matches a standard valid pattern, and false otherwise.",
    topic: "Regular Expressions",
    exampleInput: 'validateEmail("student@gmail.com")',
    exampleOutput: "true",
    hints: [
      "Use a regular expression to test email structure: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.",
      "Use regex.test(email) to return a boolean.",
    ],
    answer: `function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(String(email).toLowerCase());
}`,
    explanation:
      "Validates that string has characters before @, a valid domain host, and a top-level domain suffix.",
    starterCode: `function validateEmail(email) {
    // Write your solution here
    return false;
}`,
    testCases: [
      { input: 'validateEmail("student@gmail.com")', expected: "true" },
      { input: 'validateEmail("invalid-email")', expected: "false" },
    ],
    requiredKeywords: ["test", "return"],
  },
  {
    id: "web_q4",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "4. Dark Mode Theme Toggle",
    description:
      "Write a function toggleTheme() that switches the document.documentElement class between 'light' and 'dark' and persists the preference in localStorage.",
    topic: "LocalStorage & Theme Management",
    exampleInput: "toggleTheme()",
    exampleOutput: '"dark"',
    hints: [
      "Check current theme: document.documentElement.classList.contains('dark').",
      "Toggle class: if dark, switch to light; else switch to dark.",
      "Save new theme in localStorage.setItem('theme', newTheme) and return it.",
    ],
    answer: `function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.classList.remove(isDark ? "dark" : "light");
    document.documentElement.classList.add(nextTheme);
    localStorage.setItem("theme", nextTheme);
    return nextTheme;
}`,
    explanation:
      "Toggles theme classes on root HTML tag and syncs state in browser localStorage for persistence.",
    starterCode: `function toggleTheme() {
    // Write your solution here
    return "light";
}`,
    testCases: [
      { input: "toggleTheme()", expected: '"dark"' },
      { input: "toggleTheme()", expected: '"light"' },
    ],
    requiredKeywords: ["classList", "localStorage", "return"],
  },
  {
    id: "web_q5",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "5. Debounce Search Function",
    description:
      "Implement a debounce(fn, delay) function that delays executing fn until after delay milliseconds have elapsed since the last time it was called.",
    topic: "Closures & Timers",
    exampleInput: "debounce(fn, 300)",
    exampleOutput: "Function debounced",
    hints: [
      "Store a timer variable in the closure.",
      "Clear previous timer with clearTimeout(timer) whenever the function is invoked.",
      "Set a new timer with setTimeout to call fn with passed arguments.",
    ],
    answer: `function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}`,
    explanation:
      "Prevents excessive function triggers (such as keyup search API requests) by resetting the timer on each invocation.",
    starterCode: `function debounce(fn, delay) {
    // Write your solution here
    return fn;
}`,
    testCases: [
      { input: "debounce(search, 300)", expected: "Function debounced" },
      { input: "rapid triggers (10x in 50ms)", expected: "1 execution" },
    ],
    requiredKeywords: ["clearTimeout", "setTimeout", "return"],
  },
  {
    id: "web_q6",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "6. Modal Dialog Controller",
    description:
      "Write openModal(modalId) and closeModal(modalId) functions that toggle aria-hidden attribute and CSS hidden state on a modal container.",
    topic: "Accessibility & DOM Events",
    exampleInput: 'openModal("signup-modal")',
    exampleOutput: 'modal.style.display = "flex"',
    hints: [
      "Select modal by document.getElementById(modalId).",
      "To open: set modal.style.display = 'flex', setAttribute('aria-hidden', 'false').",
      "To close: set modal.style.display = 'none', setAttribute('aria-hidden', 'true').",
    ],
    answer: `function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return false;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    return true;
}`,
    explanation:
      "Properly pairs visual display property updates with accessibility aria-hidden attributes.",
    starterCode: `function openModal(modalId) {
    // Write your solution here
    return false;
}`,
    testCases: [
      { input: 'openModal("test-modal")', expected: "true" },
      { input: 'openModal("nonexistent")', expected: "false" },
    ],
    requiredKeywords: ["getElementById", "style", "aria-hidden", "return"],
  },
  {
    id: "web_q7",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "7. Filter Course List by Search Term",
    description:
      "Write a function filterItems(items, query) that returns items whose title or tags match query (case-insensitive).",
    topic: "Array Filtering",
    exampleInput: 'items = [{title: "Python"}, {title: "Web"}], query = "py"',
    exampleOutput: '[{title: "Python"}]',
    hints: [
      "Convert query to lowercase: q = query.toLowerCase().",
      "Use items.filter(item => item.title.toLowerCase().includes(q)).",
    ],
    answer: `function filterItems(items, query) {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(item => 
        item.title.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(q)))
    );
}`,
    explanation:
      "Filters an array of objects against a normalized query string across multiple fields.",
    starterCode: `function filterItems(items, query) {
    // Write your solution here
    return [];
}`,
    testCases: [
      { input: 'items, query = "py"', expected: "1 item matched" },
      { input: 'items, query = ""', expected: "all items returned" },
    ],
    requiredKeywords: ["filter", "toLowerCase", "includes", "return"],
  },
  {
    id: "web_q8",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "8. Simple Counter Closure",
    description:
      "Create a function createCounter(initialValue) that returns an object with increment(), decrement(), and getValue() methods.",
    topic: "JavaScript Closures",
    exampleInput: "const c = createCounter(5); c.increment(); c.getValue()",
    exampleOutput: "6",
    hints: [
      "Declare let count = initialValue in function scope.",
      "Return an object containing increment: () => ++count, decrement: () => --count, getValue: () => count.",
    ],
    answer: `function createCounter(initialValue = 0) {
    let count = initialValue;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}`,
    explanation:
      "Uses lexical closure scoping to encapsulate internal state without exposing count variable directly.",
    starterCode: `function createCounter(initialValue = 0) {
    // Write your solution here
    return {};
}`,
    testCases: [
      { input: "createCounter(0).increment()", expected: "1" },
      { input: "createCounter(10).decrement()", expected: "9" },
    ],
    requiredKeywords: ["increment", "decrement", "getValue", "return"],
  },
  {
    id: "web_q9",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "9. URL Parameter Parser",
    description:
      "Write a function getQueryParams(url) that parses a URL string and returns an object of key-value query parameters.",
    topic: "URLSearchParams & Strings",
    exampleInput: 'getQueryParams("https://learnrise.com?course=python&id=5")',
    exampleOutput: '{ course: "python", id: "5" }',
    hints: [
      "Use new URL(url).searchParams or URLSearchParams(url.split('?')[1]).",
      "Convert entries to an object using Object.fromEntries(params.entries()).",
    ],
    answer: `function getQueryParams(url) {
    try {
        const queryString = url.includes("?") ? url.split("?")[1] : url;
        const params = new URLSearchParams(queryString);
        return Object.fromEntries(params.entries());
    } catch (e) {
        return {};
    }
}`,
    explanation:
      "URLSearchParams standardizes query parameter parsing across all modern browsers.",
    starterCode: `function getQueryParams(url) {
    // Write your solution here
    return {};
}`,
    testCases: [
      { input: '"https://example.com?course=python&id=5"', expected: '{ course: "python", id: "5" }' },
      { input: '"https://example.com"', expected: "{}" },
    ],
    requiredKeywords: ["URLSearchParams", "Object.fromEntries", "return"],
  },
  {
    id: "web_q10",
    courseId: "c3",
    courseTitle: "Web Development Basics",
    title: "10. Dynamic HTML Template Generator",
    description:
      "Write a function renderCard(title, description, badgeText) that returns an HTML string for a styled card component safely escaping special characters.",
    topic: "Template Literals & Security",
    exampleInput: 'renderCard("LearnRise", "AI Learning", "New")',
    exampleOutput: '<div class="card"><h3>LearnRise</h3>...</div>',
    hints: [
      "Use template literals with backticks ``.",
      "Interpolate \${title}, \${description}, and \${badgeText} into semantic HTML elements.",
    ],
    answer: `function renderCard(title, description, badgeText) {
    const safeTitle = String(title).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeDesc = String(description).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeBadge = String(badgeText).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return \`<div class="course-card"><span class="badge">\${safeBadge}</span><h3>\${safeTitle}</h3><p>\${safeDesc}</p></div>\`;
}`,
    explanation:
      "Template strings assemble dynamic component markup cleanly while escaping angle brackets prevents XSS injection.",
    starterCode: `function renderCard(title, description, badgeText) {
    // Write your solution here
    return "";
}`,
    testCases: [
      { input: 'renderCard("Python", "Learn coding", "Active")', expected: "Valid HTML Card String" },
      { input: 'renderCard("<script>", "test", "alert")', expected: "Escaped HTML String" },
    ],
    requiredKeywords: ["replace", "course-card", "return"],
  },
];

// All questions combined lookup
export const allQuestions: Question[] = [
  ...pythonQuestions,
  ...dsaQuestions,
  ...webDevQuestions,
];

export function getQuestionsForCourse(courseId: string): Question[] {
  if (courseId === "c2") return dsaQuestions;
  if (courseId === "c3") return webDevQuestions;
  return pythonQuestions;
}

// ── Courses Structure ────────────────────────────────

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  color: string;
  icon: string;
  progress: number;
  totalStudents: number;
  tags: string[];
  totalQuestions: number;
  modules: {
    id: string;
    title: string;
    lessons: { id: string; title: string; durationMins: number; completed: boolean }[];
  }[];
}

export const courses: Course[] = [
  {
    id: "c1",
    title: "Python Programming",
    description:
      "Master Python from fundamentals to problem-solving with real-world exercises and AI-powered guidance.",
    instructor: "Prof. Sarah Mitchell",
    color: "#3B82F6",
    icon: "🐍",
    progress: 65,
    totalStudents: 35,
    totalQuestions: 10,
    tags: ["Programming", "Python", "DSA"],
    modules: [
      {
        id: "m1",
        title: "Module 1: Python Basics & Types",
        lessons: [
          { id: "l1", title: "Variables & Data Types", durationMins: 15, completed: true },
          { id: "l2", title: "Operators & Expressions", durationMins: 12, completed: true },
          { id: "l3", title: "Working with Collections", durationMins: 30, completed: true },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Control Flow & Functions",
        lessons: [
          { id: "l4", title: "Conditional Branching", durationMins: 10, completed: true },
          { id: "l5", title: "Looping Structures & Iterators", durationMins: 15, completed: false },
          { id: "l6", title: "Defining Functions & Scope", durationMins: 20, completed: false },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Data Structures & Hashing",
        lessons: [
          { id: "l7", title: "Lists & Tuples In Depth", durationMins: 20, completed: false },
          { id: "l8", title: "Dictionaries & Sets Optimization", durationMins: 18, completed: false },
        ],
      },
      {
        id: "m4",
        title: "Module 4: Algorithmic Problem Solving",
        lessons: [
          { id: "l9", title: "Recursion & Call Stacks", durationMins: 25, completed: false },
          { id: "l10", title: "Two Pointers & Sliding Window", durationMins: 30, completed: false },
        ],
      },
    ],
  },
  {
    id: "c2",
    title: "Data Structures & Algorithms",
    description:
      "Deep dive into arrays, stacks, trees, linked lists, and dynamic programming with interview-grade problems.",
    instructor: "Prof. James Carter",
    color: "#8B5CF6",
    icon: "🧩",
    progress: 32,
    totalStudents: 28,
    totalQuestions: 10,
    tags: ["DSA", "Algorithms", "Competitive"],
    modules: [
      {
        id: "m5",
        title: "Module 1: Linear Data Structures",
        lessons: [
          { id: "l11", title: "Arrays & Dynamic Allocation", durationMins: 20, completed: true },
          { id: "l12", title: "Stacks & Queues Principles", durationMins: 25, completed: false },
          { id: "l13", title: "Linked List Pointers", durationMins: 30, completed: false },
        ],
      },
      {
        id: "m6",
        title: "Module 2: Trees & Dynamic Programming",
        lessons: [
          { id: "l14", title: "Binary Trees & Traversals", durationMins: 30, completed: false },
          { id: "l15", title: "Dynamic Programming Memoization", durationMins: 45, completed: false },
        ],
      },
    ],
  },
  {
    id: "c3",
    title: "Web Development Basics",
    description:
      "Build modern web applications with JavaScript, DOM manipulation, responsive layouts, and asynchronous APIs.",
    instructor: "Prof. Emily Chen",
    color: "#F59E0B",
    icon: "🌐",
    progress: 88,
    totalStudents: 42,
    totalQuestions: 10,
    tags: ["Web", "HTML", "CSS", "JavaScript"],
    modules: [
      {
        id: "m7",
        title: "Module 1: DOM & Browser APIs",
        lessons: [
          { id: "l16", title: "DOM Element Selectors & Events", durationMins: 15, completed: true },
          { id: "l17", title: "Form Validation & Regex", durationMins: 20, completed: true },
        ],
      },
      {
        id: "m8",
        title: "Module 2: Async JS & Modern Architecture",
        lessons: [
          { id: "l18", title: "Async/Await & Fetching APIs", durationMins: 25, completed: true },
          { id: "l19", title: "Theme Switching & LocalStorage", durationMins: 20, completed: false },
        ],
      },
    ],
  },
];

// ── Progress & Historical Attempts ───────────────────

export interface TopicProgress {
  topic: string;
  courseId: string;
  courseTitle: string;
  courseIcon: string;
  accuracy: number;
  avgHints: number;
  mastery: "Strong" | "Developing" | "Needs Practice";
  attempted: number;
  solved: number;
  color: string;
}

export const topicProgress: TopicProgress[] = [
  // Course 1: Python Programming
  { topic: "Arrays & Hash Sets", courseId: "c1", courseTitle: "Python Programming", courseIcon: "🐍", accuracy: 90, avgHints: 0.4, mastery: "Strong", attempted: 20, solved: 18, color: "#14b8a6" },
  { topic: "Strings & Dictionaries", courseId: "c1", courseTitle: "Python Programming", courseIcon: "🐍", accuracy: 85, avgHints: 0.6, mastery: "Strong", attempted: 15, solved: 13, color: "#3B82F6" },
  { topic: "Recursion & Backtracking", courseId: "c1", courseTitle: "Python Programming", courseIcon: "🐍", accuracy: 43, avgHints: 2.8, mastery: "Needs Practice", attempted: 8, solved: 3, color: "#EF4444" },

  // Course 2: Data Structures & Algorithms
  { topic: "Stacks & Queues", courseId: "c2", courseTitle: "Data Structures & Algorithms", courseIcon: "🧩", accuracy: 80, avgHints: 0.8, mastery: "Strong", attempted: 12, solved: 10, color: "#8B5CF6" },
  { topic: "Binary Search & Trees", courseId: "c2", courseTitle: "Data Structures & Algorithms", courseIcon: "🧩", accuracy: 62, avgHints: 1.4, mastery: "Developing", attempted: 10, solved: 6, color: "#F59E0B" },
  { topic: "Dynamic Programming", courseId: "c2", courseTitle: "Data Structures & Algorithms", courseIcon: "🧩", accuracy: 35, avgHints: 3.1, mastery: "Needs Practice", attempted: 6, solved: 2, color: "#EC4899" },

  // Course 3: Web Development Basics
  { topic: "DOM & Web APIs", courseId: "c3", courseTitle: "Web Development Basics", courseIcon: "🌐", accuracy: 88, avgHints: 0.5, mastery: "Strong", attempted: 14, solved: 12, color: "#14b8a6" },
  { topic: "Event Handlers & State", courseId: "c3", courseTitle: "Web Development Basics", courseIcon: "🌐", accuracy: 74, avgHints: 1.2, mastery: "Developing", attempted: 10, solved: 7, color: "#F59E0B" },
  { topic: "Async Fetch & Promises", courseId: "c3", courseTitle: "Web Development Basics", courseIcon: "🌐", accuracy: 52, avgHints: 2.4, mastery: "Needs Practice", attempted: 8, solved: 4, color: "#EF4444" },
];

export interface AttemptRecord {
  id: string;
  courseId: string;
  courseTitle: string;
  questionTitle: string;
  topic: string;
  date: string;
  attempts: number;
  hintsUsed: number;
  solved: boolean;
  timeMins: number;
}

export const attemptHistory: AttemptRecord[] = [
  { id: "a1", courseId: "c1", courseTitle: "Python Programming", questionTitle: "Contains Duplicate", topic: "Arrays & Hash Sets", date: "2026-10-13", attempts: 2, hintsUsed: 1, solved: true, timeMins: 8 },
  { id: "a2", courseId: "c1", courseTitle: "Python Programming", questionTitle: "Valid Anagram", topic: "Strings & Dictionaries", date: "2026-10-12", attempts: 1, hintsUsed: 0, solved: true, timeMins: 5 },
  { id: "a3", courseId: "c1", courseTitle: "Python Programming", questionTitle: "Two Sum", topic: "Arrays & Hash Sets", date: "2026-10-11", attempts: 3, hintsUsed: 2, solved: true, timeMins: 14 },
  { id: "a4", courseId: "c1", courseTitle: "Python Programming", questionTitle: "Recursion Fundamentals", topic: "Recursion & Backtracking", date: "2026-10-10", attempts: 4, hintsUsed: 3, solved: true, timeMins: 18 },
  { id: "a5", courseId: "c2", courseTitle: "Data Structures & Algorithms", questionTitle: "Maximum Subarray", topic: "Dynamic Programming", date: "2026-10-09", attempts: 5, hintsUsed: 3, solved: false, timeMins: 25 },
  { id: "a6", courseId: "c2", courseTitle: "Data Structures & Algorithms", questionTitle: "Binary Search", topic: "Binary Search & Trees", date: "2026-10-08", attempts: 1, hintsUsed: 0, solved: true, timeMins: 4 },
  { id: "a7", courseId: "c3", courseTitle: "Web Development Basics", questionTitle: "Responsive Navbar Toggle", topic: "DOM & Web APIs", date: "2026-10-07", attempts: 2, hintsUsed: 1, solved: true, timeMins: 12 },
  { id: "a8", courseId: "c3", courseTitle: "Web Development Basics", questionTitle: "Debounced Search Input", topic: "Event Handlers & State", date: "2026-10-06", attempts: 3, hintsUsed: 2, solved: true, timeMins: 16 },
];

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "feedback";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export const notifications: Notification[] = [
  { id: "n1", type: "feedback", title: "Educator Feedback", message: "Prof. Mitchell reviewed your Recursion assessment: 'Solid attempt! Pay attention to recursive base case conditions.'", time: "2 hours ago", read: false, icon: "💬" },
  { id: "n2", type: "warning", title: "Assessment Scheduled", message: "Data Structures & Algorithms test is open. You have 10 questions to complete.", time: "5 hours ago", read: false, icon: "⚠️" },
  { id: "n3", type: "success", title: "Streak Maintained!", message: "You've maintained a 14-day study streak! Keep going to unlock Level 8.", time: "1 day ago", read: false, icon: "🔥" },
  { id: "n4", type: "info", title: "New Test Questions Added", message: "10 new questions have been published across all 3 enrolled courses.", time: "2 days ago", read: true, icon: "📚" },
];

export interface Recommendation {
  id: string;
  type: "practice" | "review" | "challenge";
  title: string;
  topic: string;
  courseId: string;
  courseTitle: string;
  courseIcon: string;
  reason: string;
  estimatedMins: number;
  questionId: string;
  urgency: "high" | "medium" | "low";
}

export const recommendations: Recommendation[] = [
  // Python Recommendations
  { id: "r1", type: "practice", title: "Recursion & Call Stacks", topic: "Recursion & Backtracking", courseId: "c1", courseTitle: "Python Programming", courseIcon: "🐍", reason: "Your mastery in Python Recursion is at 43%. Solving problems with recursive base cases will solidify your understanding.", estimatedMins: 25, questionId: "py_q4", urgency: "high" },
  { id: "r2", type: "review", title: "Two Sum Hash Map Review", topic: "Arrays & Hash Sets", courseId: "c1", courseTitle: "Python Programming", courseIcon: "🐍", reason: "You completed Two Sum with 2 hints previously. Try solving it independently without requesting AI hints.", estimatedMins: 15, questionId: "py_q3", urgency: "medium" },

  // DSA Recommendations
  { id: "r3", type: "challenge", title: "Maximum Subarray Challenge", topic: "Dynamic Programming", courseId: "c2", courseTitle: "Data Structures & Algorithms", courseIcon: "🧩", reason: "Kadane's algorithm was missed in previous attempt. Review running sums with a fresh attempt.", estimatedMins: 35, questionId: "dsa_q5", urgency: "high" },
  { id: "r4", type: "practice", title: "Binary Search Boundaries", topic: "Binary Search & Trees", courseId: "c2", courseTitle: "Data Structures & Algorithms", courseIcon: "🧩", reason: "Master O(log n) boundary conditions and midpoint calculations for sorted collections.", estimatedMins: 20, questionId: "dsa_q1", urgency: "medium" },

  // Web Dev Recommendations
  { id: "r5", type: "practice", title: "Async Fetch & Promises", topic: "Async Fetch & Promises", courseId: "c3", courseTitle: "Web Development Basics", courseIcon: "🌐", reason: "Your accuracy on Async JS is at 52%. Practice handling promise rejections and try/catch blocks.", estimatedMins: 22, questionId: "web_q7", urgency: "high" },
  { id: "r6", type: "challenge", title: "Interactive DOM Event Handlers", topic: "Event Handlers & State", courseId: "c3", courseTitle: "Web Development Basics", courseIcon: "🌐", reason: "Level up your event listener performance with event delegation and throttling.", estimatedMins: 18, questionId: "web_q3", urgency: "low" },
];

export const dashboardStats = {
  questionsAttempted: 48,
  questionsSolved: 38,
  solvedWithoutHints: 26,
  solvedWithHints: 12,
  streakDays: 14,
  totalTimeMins: 320,
  weeklyGoal: 5,
  weeklyCompleted: 3,
};

export const weeklyActivity = [
  { day: "Mon", questions: 3, timeMins: 35 },
  { day: "Tue", questions: 5, timeMins: 60 },
  { day: "Wed", questions: 2, timeMins: 25 },
  { day: "Thu", questions: 4, timeMins: 48 },
  { day: "Fri", questions: 6, timeMins: 70 },
  { day: "Sat", questions: 1, timeMins: 15 },
  { day: "Sun", questions: 3, timeMins: 40 },
];

export function getMasteryColor(mastery: string): string {
  switch (mastery) {
    case "Strong": return "#14b8a6";
    case "Developing": return "#F59E0B";
    case "Needs Practice": return "#EF4444";
    default: return "#94a3b8";
  }
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export { pythonQuestions, dsaQuestions, webDevQuestions };
