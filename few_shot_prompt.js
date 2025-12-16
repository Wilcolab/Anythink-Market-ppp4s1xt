/**
 * FEW-SHOT PROMPT with multiple examples:
 * Write a JavaScript function toCamelCase that converts strings to camelCase.
 * 
 * Examples:
 * "first name" → "firstName"
 * "user_id" → "userId"
 * "SCREEN_NAME" → "screenName"
 * "mobile-number" → "mobileNumber"
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
  
  // Split on multiple separators and filter empty strings
  const words = trimmed
    .split(/[\s_-]+/)
    .filter(word => word.length > 0);
  
  // Handle edge cases
  if (words.length === 0) {
    return '';
  }
  
  if (words.length === 1) {
    return words[0].toLowerCase();
  }
  
  // Convert to camelCase with proper capitalization
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

// Examples demonstrating robust handling:
// toCamelCase("first name") → "firstName"
// toCamelCase("user_id") → "userId"
// toCamelCase("SCREEN_NAME") → "screenName"
// toCamelCase("mobile-number") → "mobileNumber"
// toCamelCase("multiple   spaces") → "multipleSpaces"
// toCamelCase("___leading_underscores") → "leadingUnderscores"
// toCamelCase("") → ""
// toCamelCase(null) → throws TypeError
// toCamelCase(42) → throws TypeError
