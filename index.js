function isPalindrome(str){
    const reversed = str.split("").reverse().join("")
    return reversed === str
}

// const result = isPalindrome("madam")
// console.log(result)

function reverseString(str){
    const reversed = str.split("").reverse().join("")
    return reversed
}
const result = reverseString("Azhar")
console.log(result)