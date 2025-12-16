/**
 * CHAIN-OF-THOUGHT PROMPT:
 * 
 * Let's implement a kebab-case converter step by step, thinking through each requirement:
 * 
 * Step 1: What is kebab-case?
 * - Words are lowercase
 * - Words are separated by hyphens (-)
 * - Example: "Hello World" → "hello-world"
 * 
 * Step 2: What input formats do we need to handle?
 * - Space-separated: "hello world"
 * - Underscore-separated: "hello_world"
 * - Dot-separated: "hello.world"
 * - camelCase: "helloWorld"
 * - PascalCase: "HelloWorld"
 * - SCREAMING_CASE: "HELLO_WORLD"
 * - Mixed: "hello_World TEST-case"
 * 
 * Step 3: What are the transformation steps?
 * a) First, handle camelCase/PascalCase by inserting separators before capital letters
 * b) Then, replace all existing separators (spaces, underscores, dots) with hyphens
 * c) Convert everything to lowercase
 * d) Clean up any consecutive hyphens
 * e) Remove leading/trailing hyphens
 * 
 * Step 4: What edge cases should we handle?
 * - Empty strings
 * - null/undefined inputs
 * - Non-string inputs
 * - Strings with only separators
 * - Numbers in the string
 * - Consecutive separators
 * - Leading/trailing whitespace
 * 
 * Step 5: Let's implement it step by step
 */

function toKebabCase(str) {
  // Step 5a: Input validation
  // Why? We need to ensure we have a valid string to work with
  if (str === null || str === undefined) {
    throw new TypeError('Input must be a string');
  }
  
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  // Step 5b: Handle empty or whitespace-only strings
  // Why? These should return empty string, not cause errors
  const trimmed = str.trim();
  if (trimmed === '') {
    return '';
  }
  
  // Step 5c: Check if string contains only separators
  // Why? "___" or "   " should return empty, not produce invalid kebab-case
  if (/^[\s._-]+$/.test(trimmed)) {
    return '';
  }
  
  // Step 5d: Transform the string through our pipeline
  let result = trimmed;
  
  // First: Handle camelCase - insert hyphen before uppercase letters that follow lowercase
  // Example: "helloWorld" → "hello-World"
  result = result.replace(/([a-z\d])([A-Z])/g, '$1-$2');
  
  // Second: Handle acronyms - insert hyphen between consecutive caps before a lowercase
  // Example: "XMLParser" → "XML-Parser"
  result = result.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');
  
  // Third: Replace all other separators (spaces, underscores, dots) with hyphens
  // Example: "hello_world test.case" → "hello-world-test-case"
  result = result.replace(/[\s_.]+/g, '-');
  
  // Fourth: Clean up consecutive hyphens
  // Example: "hello---world" → "hello-world"
  result = result.replace(/-+/g, '-');
  
  // Fifth: Remove leading and trailing hyphens
  // Example: "-hello-world-" → "hello-world"
  result = result.replace(/^-|-$/g, '');
  
  // Sixth: Convert everything to lowercase
  // Example: "Hello-World" → "hello-world"
  result = result.toLowerCase();
  
  return result;
}

/**
 * Step 6: Test our implementation with various cases
 */

// Test basic conversions
console.log('Basic conversions:');
console.log(toKebabCase("hello world"));        // → "hello-world"
console.log(toKebabCase("user_id"));            // → "user-id"
console.log(toKebabCase("SCREEN_NAME"));        // → "screen-name"

// Test camelCase conversions
console.log('\nCamelCase conversions:');
console.log(toKebabCase("firstName"));          // → "first-name"
console.log(toKebabCase("XMLHttpRequest"));     // → "xml-http-request"
console.log(toKebabCase("myComponentName"));    // → "my-component-name"

// Test with numbers
console.log('\nWith numbers:');
console.log(toKebabCase("user123Id"));          // → "user123-id"
console.log(toKebabCase("version2Update"));     // → "version2-update"

// Test edge cases
console.log('\nEdge cases:');
console.log(toKebabCase(""));                   // → ""
console.log(toKebabCase("single"));             // → "single"
console.log(toKebabCase("   trim   spaces   ")); // → "trim-spaces"
console.log(toKebabCase("multiple___seps"));    // → "multiple-seps"

// Test mixed separators
console.log('\nMixed separators:');
console.log(toKebabCase("first.name_last name")); // → "first-name-last-name"
console.log(toKebabCase("mix.of-all_separators")); // → "mix-of-all-separators"

// Test error cases
console.log('\nError handling:');
try {
  toKebabCase(null);
} catch (e) {
  console.log('null input:', e.message);        // → "Input must be a string"
}

try {
  toKebabCase(123);
} catch (e) {
  console.log('number input:', e.message);      // → "Input must be a string"
}

/**
 * Step 7: Reflection - Why chain-of-thought prompting works:
 * 
 * By breaking down the problem into steps and explaining our reasoning,
 * we created a more maintainable and understandable solution. Each step
 * has a clear purpose, making it easier to debug and extend.
 * 
 * This approach helps both the AI and future developers understand:
 * - WHAT we're doing
 * - WHY we're doing it
 * - HOW it handles edge cases
 * 
 * The chain-of-thought method leads to more robust implementations because
 * we think through requirements systematically rather than jumping to code.
 */
