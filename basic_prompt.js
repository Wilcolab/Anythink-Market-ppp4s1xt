/**
 * ONE-SHOT PROMPT (Basic with one example):
 * 
 * Create a function that converts strings to camelCase format.
 * 
 * The function should:
 * - Take a string as input that may contain spaces, hyphens, underscores, or mixed cases
 * - Return a camelCase version where the first word is lowercase and subsequent words 
 *   start with an uppercase letter, with no spaces or special characters
 * - Handle edge cases like empty strings, single words, and strings with multiple separators
 * 
 * Example:
 * Input: "hello world"
 * Output: "helloWorld"
 */

function toCamelCase(str) {
  // Input validation
  if (str === null || str === undefined) {
    throw new TypeError('Input cannot be null or undefined');
  }
  
  if (typeof str !== 'string') {
    throw new TypeError(`Input must be a string, received ${typeof str}`);
  }
  
  // Handle empty or whitespace-only strings
  const trimmed = str.trim();
  if (trimmed === '') {
    return '';
  }
  
  // Split on common separators and filter empty strings
  const words = trimmed
    .split(/[\s_-]+/)
    .filter(word => word.length > 0);
  
  // Handle single word or no words
  if (words.length === 0) {
    return '';
  }
  
  if (words.length === 1) {
    return words[0].toLowerCase();
  }
  
  // Convert to camelCase
  return words
    .map((word, index) => {
      const lowerWord = word.toLowerCase();
      if (index === 0) {
        return lowerWord;
      }
      return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    })
    .join('');
}

// Example usage:
// toCamelCase("hello world") returns "helloWorld"
// toCamelCase("user_id") returns "userId"
// toCamelCase("SCREEN-NAME") returns "screenName"
// toCamelCase("") returns ""
// toCamelCase("single") returns "single"
// toCamelCase(null) throws TypeError
// toCamelCase(123) throws TypeError
