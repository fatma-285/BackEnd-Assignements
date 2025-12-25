/* -------------------------------------------------------------------------- */
//?                           169. Majority Element                            */
/* -------------------------------------------------------------------------- */

//*Given an array nums of size n, return the majority element.
//*The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
// Input: nums = [3,2,3]
// Output: 3

var majorityElement = function(nums) {
    const majorityElement=Math.floor(nums.length/2);
    let map={};
    for(let i=0;i<nums.length;i++){
        map[nums[i]]=(map[nums[i]]||0)+1;
        if(map[nums[i]]>majorityElement){
            return nums[i];
        }
    }

};
console.log(majorityElement([3,2,3,2,2]));
