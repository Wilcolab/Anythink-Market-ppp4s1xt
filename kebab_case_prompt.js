/**
 * Function to convert strings to kebab-case format
 * 
 * Requirements:
 * - Accept a single string parameter as input
 * - Handle multiple types of word separators: spaces, underscores, dots, camelCase, PascalCase
 * - Convert all words to lowercase and separate them with hyphens
 * - Handle consecutive separators and normalize them to single hyphens
 * - Handle leading and trailing separators/whitespace
 * - Preserve numbers in their positions
 */

function toKebabCase(str) {
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
  
  // Convert to kebab-case with comprehensive pattern matching
  return trimmed
    // Handle camelCase and PascalCase: insert separator before uppercase letters
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')  // Handle acronyms
    // Replace existing separators (spaces, underscores, dots) with hyphens
    .replace(/[\s_.]+/g, '-')
    // Remove consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, '')
    // Convert to lowercase
    .toLowerCase();
}

// Comprehensive test examples:
// Basic conversions
// toKebabCase("hello world") → "hello-world"
// toKebabCase("user_id") → "user-id"
// toKebabCase("SCREEN_NAME") → "screen-name"
// toKebabCase("mobile.number") → "mobile-number"

// CamelCase conversions
// toKebabCase("firstName") → "first-name"
// toKebabCase("XMLHttpRequest") → "xml-http-request"
// toKebabCase("camelCaseString") → "camel-case-string"
// toKebabCase("myComponentName") → "my-component-name"

// With numbers
// toKebabCase("mobile_number_123") → "mobile-number-123"
// toKebabCase("user123Id") → "user123-id"
// toKebabCase("version2Update") → "version2-update"

// Edge cases
// toKebabCase("") → ""
// toKebabCase("   ") → ""
// toKebabCase("single") → "single"
// toKebabCase("HELLO") → "hello"
// toKebabCase("___") → ""
// toKebabCase("---") → ""
// toKebabCase("...") → ""
// toKebabCase("   trim   spaces   ") → "trim-spaces"
// toKebabCase("multiple___separators") → "multiple-separators"
// toKebabCase("___leading_underscores") → "leading-underscores"
// toKebabCase("trailing_underscores___") → "trailing-underscores"

// Error cases
// toKebabCase(null) → throws TypeError: "Input must be a string"
// toKebabCase(undefined) → throws TypeError: "Input must be a string"
// toKebabCase(123) → throws TypeError: "Input must be a string"
// toKebabCase({}) → throws TypeError: "Input must be a string"
// toKebabCase([]) → throws TypeError: "Input must be a string"

// Already kebab-case
// toKebabCase("already-kebab-case") → "already-kebab-case"

// Mixed separators
// toKebabCase("first-name_last name") → "first-name-last-name"
// toKebabCase("FIRST_name-LAST") → "first-name-last"
// toKebabCase("mix.of-all_separators here") → "mix-of-all-separators-here"
// toKebabCase("React.Component.Name") → "react-component-name"
