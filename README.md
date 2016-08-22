LogTrust Challenge
==================

#Exercise 1

The first exercise deals with perfect, abundant, and deficient numbers;
    - A perfect number is one that is equal to the sum of its divisors
    - A abundant number is one that is greater than the sum of its divisors
    - A deficient number is one that is less than the sum of its divisors

The solution revolves around creating small functions that resolve part of the problem.
My solution for finding a number's divisors revolve around finding the remainder after division of the number by all the numbers between 1 and the number divided by 2

The function categorize returns a python dictionary with the following keys:
- `perfectNumbers`
- `abundantNumbers`
- `defectiveNumbers`

Example of categorize output in finding perfect, abundant, and defective numbers in between 1 and 20

```json
{
  "abundantNumbers": [
    12,
    18,
    20
  ],
  "defectiveNumbers": [
    1,
    2,
    3,
    4,
    5,
    7,
    8,
    9,
    10,
    11,
    13,
    14,
    15,
    16,
    17,
    19
  ],
  "perfectNumbers": [
    6
  ]
}
```

*Future Optimization:*

The divisor function can be turned to return a generator which are more memory efficient
than keeping the divisors in memory.

#Exercise 2

This challenge dealt with data visualization from three separate data sources.
There is a cleaning phase for each of these data sources in order to standardize the data to view.

For the first source, the transformation needs to be the following:

```json
{"d":1435708800000,"cat":"Cat 1","value":832.803815816826}
```

into

```json
{"date": YYYY-MM-DD, "category": "CAT 1", "value": 832.803815816826}
```

For the third source, the transformation uses regular expressions in order to turn:

```json
{"raw":"9OHbc9 O1 WHTxiBPa auwZIVD6 j8jMWWVH UdB6hy 2015­06­18 XF 5xhcx15DD sbYFRPn dyoH1OOIF 6meHw pANknwa2h T imhs24gR5 #cat 1#","val":39.38690127513058}
```

into


```json
{"date":"2015-­06-­18","category": "CAT 1", "val":39.38690127513058}
```


##Result:

![Line Chart](https://cl.ly/2e0O101Q1714/download/Screen%20Shot%202016-08-21%20at%2023.11.44.png)


![Pie Chart](https://cl.ly/340G08272w44/download/Screen%20Shot%202016-08-21%20at%2023.11.52.png)

*Future Optimization:*

Remove `async: false` option from Ajax calls as it is detrimental to performance.

