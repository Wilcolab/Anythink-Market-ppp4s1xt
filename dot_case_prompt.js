/**
 * Function to convert strings to dot.case format
 * 
 * Requirements:
 * - Accept a single string parameter as input
 * - Handle multiple types of word separators: spaces, hyphens, underscores, camelCase
 * - Convert all words to lowercase and separate them with dots
 * - Handle consecutive separators and normalize them to single dots
 * - Handle leading and trailing separators/whitespace
 * - Preserve numbers in their positions
 */

function toDotCase(str) {
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
  if (/^[\s._-]+$/.test(trimmed)) {
    return '';
  }
  
  // Convert to dot.case with comprehensive pattern matching
  return trimmed
    // Handle camelCase and PascalCase: insert separator before uppercase letters
    .replace(/([a-z\d])([A-Z])/g, '$1.$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1.$2')  // Handle acronyms
    // Replace existing separators (spaces, hyphens, underscores, dots) with dots
    .replace(/[\s_-]+/g, '.')
    // Remove consecutive dots
    .replace(/\.+/g, '.')
    // Remove leading/trailing dots
    .replace(/^\.|\.$/g, '')
    // Convert to lowercase
    .toLowerCase();
}

// Comprehensive test examples:
// Basic conversions
// toDotCase("hello world") → "hello.world"
// toDotCase("user_id") → "user.id"
// toDotCase("SCREEN-NAME") → "screen.name"
// toDotCase("mobile-number") → "mobile.number"

// CamelCase conversions
// toDotCase("firstName") → "first.name"
// toDotCase("XMLHttpRequest") → "xml.http.request"
// toDotCase("camelCaseString") → "camel.case.string"

// With numbers
// toDotCase("mobile_number_123") → "mobile.number.123"
// toDotCase("user123Id") → "user123.id"

// Edge cases
// toDotCase("") → ""
// toDotCase("   ") → ""
// toDotCase("single") → "single"
// toDotCase("HELLO") → "hello"
// toDotCase("___") → ""
// toDotCase("...") → ""
// toDotCase("   trim   spaces   ") → "trim.spaces"
// toDotCase("multiple___separators") → "multiple.separators"
// toDotCase("___leading_underscores") → "leading.underscores"
// toDotCase("trailing_underscores___") → "trailing.underscores"

// Error cases
// toDotCase(null) → throws TypeError: "Input must be a string"
// toDotCase(undefined) → throws TypeError: "Input must be a string"
// toDotCase(123) → throws TypeError: "Input must be a string"
// toDotCase({}) → throws TypeError: "Input must be a string"
// toDotCase([]) → throws TypeError: "Input must be a string"

// Mixed separators
// toDotCase("first-name_last name") → "first.name.last.name"
// toDotCase("FIRST_name-LAST") → "first.name.last"
// toDotCase("mix.of-all_separators here") → "mix.of.all.separators.here"
