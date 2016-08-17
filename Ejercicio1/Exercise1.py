#!/usr/bin/env python

from __future__ import print_function
import itertools


def categorize(listNum):

    perfectNumbers = {'perfectNumbers': list(filter(isPerfect, listNum))}
    abundantNumbers = {'abundantNumbers': list(filter(isAbundant, listNum))}
    deficientNumbers = {'defectiveNumbers': list(filter(isDeficient, listNum))}

    return {key: value for key, value in itertools.chain(perfectNumbers.items(), abundantNumbers.items(), deficientNumbers.items())}


def isPerfect(num):
    return sum(divisor(num)) == num


def isAbundant(num):
    return sum(divisor(num)) > num


def isDeficient(num):
    return sum(divisor(num)) < num


def divisor(num):
    return [i for i in range(1, int(num / 2) + 1) if num % i == 0]


if __name__ == '__main__':
    print(categorize([num for num in range(1, 100)]))
