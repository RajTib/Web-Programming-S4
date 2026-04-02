import random
palindromes = [round(a + b/10 + a/100, 2) for a in range(1, 10) for b in range(10)]
cgpa = random.choice(palindromes)
print(f"cgpa: {cgpa}")
