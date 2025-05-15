
# Bloom filters - Eli Bendersky's website


Created: [[2025-05-03]] 

> The original motivation for the creation of Bloom filters is efficient set
membership, using a probabilistic approach to significantly reduce the time and
space required to reject items that are not members in a certain set.



[See in context](https://hyp.is/Sumyyig0EfCbDOuv-9B0ag/eli.thegreenplace.net/2025/bloom-filters/) at [Bloom filters - Eli Bendersky's website](https://eli.thegreenplace.net/2025/bloom-filters/)



Created: [[2025-05-03]] 

> A Bloom filter is a data structure that
implements a cache with probabilistic properties:

If the cache says the key is not present in a specific file, then it's
100% certain we should not be reading the file.
If the cache says the key is present in the file, there's a small chance
this is a false positive (and in fact the key isn't there). In this case
we just read the file as usual.



[See in context](https://hyp.is/WLaz0Cg0EfCdih_7hWo2bw/eli.thegreenplace.net/2025/bloom-filters/) at [Bloom filters - Eli Bendersky's website](https://eli.thegreenplace.net/2025/bloom-filters/)



Created: [[2025-05-03]] 

> The new hash-coding methods to be introduced are
suggested for applications in which the great majority of
messages to be tested will not belong to the given set



[See in context](https://hyp.is/YBPoyCg0EfCQF0s2qoB0dQ/eli.thegreenplace.net/2025/bloom-filters/) at [Bloom filters - Eli Bendersky's website](https://eli.thegreenplace.net/2025/bloom-filters/)



Created: [[2025-05-03]] 

> Insert an item: the item is hashed using each of the k hash functions, and the
appropriate bits in the underlying array are set to 1.
Test if an item is a member: the item is hashed using each of the k hash
functions. If any of the bits indicated by their results is 0, we return "false"
with certainty. If all the bits are 1, we return "true" - and there's a small
chance of false positives.



[See in context](https://hyp.is/L3SiOCg1EfCpDb_sExKI2Q/eli.thegreenplace.net/2025/bloom-filters/) at [Bloom filters - Eli Bendersky's website](https://eli.thegreenplace.net/2025/bloom-filters/)



