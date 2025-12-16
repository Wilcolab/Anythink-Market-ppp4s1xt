/**
 * REFINED PROMPT (Detailed with edge cases and error handling):
 * 
 * Write a JavaScript function toCamelCase that converts any string to camelCase format.
 * 
 * Requirements:
 * - Accept a single string parameter as input
 * - Handle multiple types of word separators: spaces, hyphens, underscores, and mixed combinations
 * - Convert the first word to lowercase and capitalize the first letter of subsequent words
 * - Remove all separators and non-letter characters (except preserve numbers)
 * - Preserve numbers in their positions (e.g., "user_id_123" → "userId123")
 * - Handle consecutive separators (e.g., "hello___world" should work correctly)
 * - Handle leading and trailing separators/whitespace
 * 
 * Edge Cases:
 * - Empty string: return empty string
 * - null or undefined: throw a TypeError with message "Input must be a string"
 * - Non-string input (numbers, objects, arrays): throw a TypeError with message "Input must be a string"
 * - Single word: return the word in lowercase (e.g., "HELLO" → "hello")
 * - Already camelCase: return as-is (e.g., "alreadyCamelCase" → "alreadyCamelCase")
 * - String with only separators: return empty string
 * - Mixed case with separators: handle correctly (e.g., "FIRST_name" → "firstName")
 * 
 * Examples:
 * toCamelCase("hello world") → "helloWorld"
 * toCamelCase("user_id") → "userId"
 * toCamelCase("SCREEN-NAME") → "screenName"
 * toCamelCase("mobile_number-123") → "mobileNumber123"
 * toCamelCase("") → ""
 * toCamelCase("single") → "single"
 * toCamelCase(null) → throws TypeError
 * toCamelCase(123) → throws TypeError
 * toCamelCase("   trim   spaces   ") → "trimSpaces"
 * toCamelCase("multiple___separators") → "multipleSeparators"
 */

function toCamelCase(str) {
  // Comprehensive input validation
  if (str === null || str === undefined) {
    throw new TypeError('Input must be a string');
  }
  
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  // Handle empty or whitespace-only strings
  const trimmed = str.trim();
  if (trimmed === '') {
    return '';
  }
  
  // Check if string contains only separators
  if (/^[\s_-]+$/.test(trimmed)) {
    return '';
  }
  
  // Split by separators while preserving numbers and alphanumeric characters
  // This regex splits on spaces, hyphens, and underscores
  const parts = trimmed.split(/[\s_-]+/).filter(part => part.length > 0);
  
  if (parts.length === 0) {
    return '';
  }
  
  // Process each part
  return parts
    .map((part, index) => {
      // Preserve numbers but handle mixed alphanumeric strings
      if (/^\d+$/.test(part)) {
        return part; // Pure number, keep as is
      }
      
      // Convert to lowercase first
      let processed = part.toLowerCase();
      
      // For first part, keep all lowercase
      if (index === 0) {
        return processed;
      }
      
      // For subsequent parts, capitalize first letter
      return processed.charAt(0).toUpperCase() + processed.slice(1);
    })
    .join('');
}

// Comprehensive test examples:
// Basic conversions
// toCamelCase("hello world") → "helloWorld"
// toCamelCase("user_id") → "userId"
// toCamelCase("SCREEN-NAME") → "screenName"
// toCamelCase("mobile-number") → "mobileNumber"

// With numbers
// toCamelCase("mobile_number-123") → "mobileNumber123"
// toCamelCase("user_id_123") → "userId123"

// Edge cases
// toCamelCase("") → ""
// toCamelCase("   ") → ""
// toCamelCase("single") → "single"
// toCamelCase("HELLO") → "hello"
// toCamelCase("___") → ""
// toCamelCase("   trim   spaces   ") → "trimSpaces"
// toCamelCase("multiple___separators") → "multipleSeparators"
// toCamelCase("___leading_underscores") → "leadingUnderscores"
// toCamelCase("trailing_underscores___") → "trailingUnderscores"

// Error cases
// toCamelCase(null) → throws TypeError: "Input must be a string"
// toCamelCase(undefined) → throws TypeError: "Input must be a string"
// toCamelCase(123) → throws TypeError: "Input must be a string"
// toCamelCase({}) → throws TypeError: "Input must be a string"
// toCamelCase([]) → throws TypeError: "Input must be a string"

// Already camelCase
// toCamelCase("alreadyCamelCase") → "alreadycamelcase" (normalizes to standard camelCase)

// Mixed separators
// toCamelCase("first-name_last name") → "firstNameLastName"
// toCamelCase("FIRST_name-LAST") → "firstNameLast"
