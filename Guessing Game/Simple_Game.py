import random

num = random.randrange(100, 999, 1)
num = str(num)
print("Welcome")
print(num)

game_on = True

while game_on:

    was_close = False
    has_match = False

    guess = input("Enter your guess: ")
    if len(guess) == 3:
        # match
        for i in range(3):
            if guess[i] == num[i]:
                has_match = True

            for j in range(3):
                if guess[i] == num[j]:
                    was_close = True

        if guess == num:
            print("Correct")
            game_on = False
        elif has_match:
            print("Match")
        elif was_close:
            print("Close")
        else:
            print("Not even close =)")
    else:
        print("You must enter a 3-digit number!!!")
