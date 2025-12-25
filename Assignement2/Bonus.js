//? Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
//? Return the kth positive integer that is missing from this array.

// Example 1:
// Input: arr = [2,3,4,7,11], k = 5
// Output: 9
// Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...].
//  The 5th missing positive integer is 9.

var findKthPositive = function(arr, k) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        debugger;
        let mid = Math.floor((left + right) / 2);
        let missing = arr[mid] - (mid + 1);
        
        if (missing < k) {
            left = mid + 1; 
        } else {
            right = mid - 1; 
                }
    }
    return left + k;
};

console.log(findKthPositive([2,3,4,7,11],5));