from random import choice

QUOTES = [
    "Small steps every day. That's progress.",
    "Consistency over intensity.",
    "Do it for the future you will thank today.",
    "A little progress each day adds up to big results.",
    "You don't have to be great to start, but you have to start to be great."
]

def random_quote():
    return choice(QUOTES)
