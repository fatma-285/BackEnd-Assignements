//? 14. Longest Common Prefix
//* function to find the longest common prefix string amongst an array of strings.
//* If there is no common prefix, return an empty string "".

var longestCommonPrefix = function (strs) {
    if (strs.length === 0) return "";
    let commonPrefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(commonPrefix)) {
            commonPrefix = commonPrefix.slice(0,-1);
        }
    }
    return commonPrefix;
};
console.log(longestCommonPrefix(["dd","p","w"]));

