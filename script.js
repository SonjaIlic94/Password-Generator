// Assignment code here

//password characteristics
var passwordStructure = {
  length: 8,
  specialCharacter: false,
  upperCase: false,
  lowerCase: false,
  numeric: false,
}

// possible character sets
var characterSets = {
  specialCharacter: "!@#$%^&*()",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  numeric: "0123456789",
}

// prompt that asks how many characters are in the password they want
function getPasswordLength() {
  return window.prompt("How many characters would you like your password to contain?");
}

// checks if user input is a number or not
var passwordIntegerFilter = function (passwordLengthString) {
  var parsedLengthString = parseInt(passwordLengthString);
  if (isNaN(parsedLengthString)) {
    window.alert("Password length must be a number.")
    return NaN;
  }
  return parsedLengthString;
}

//  checks if user input for password length is between 8-128
var passwordRangeFilter = function (passLength) {
  if (isNaN(passLength)) {
    return passLength;
  }
  if (passLength < 8 || passLength > 128) {
    window.alert("You must enter a number between 8 and 128.");
    return NaN;
  }
  window.alert("Your password is " + passLength + " characters long.");
  return passLength;
};

// asks user if that want to include special characters or not
var confirmSpecialCharacters = function () {
  return window.confirm("Do you want to include special characters?");
}

// asks user if they to include upperase or not
var confirmUpperCase = function () {
  return window.confirm("Do you want to include uppercase letters?");
}

// asks user if they to include lowercase or not
var confirmLowerCase = function () {
  return window.confirm("Do you want to include lowercase letters?");
}

// asks user if they to include numbers or not
var confirmNumeric = function () {
  return window.confirm("Do you want to include numeric characters?");
}

// combine conditions user stated. creates a new character set
var buildPasswordCharacterSet = function (passwordData) {
  var passwordCharacterSet = "";
  if (passwordData.specialCharacter) {
    passwordCharacterSet = passwordCharacterSet + characterSets.specialCharacter;
  }
  if (passwordData.upperCase) {
    passwordCharacterSet = passwordCharacterSet + characterSets.upperCase;
  }
  if (passwordData.lowerCase) {
    passwordCharacterSet = passwordCharacterSet + characterSets.lowerCase;
  }
  if (passwordData.numeric) {
    passwordCharacterSet = passwordCharacterSet + characterSets.numeric;
  }
  return passwordCharacterSet;
}

// checks user input to see if no conditions have been selected
var checkCharacterSetValid = function () {
  if (passwordStructure.upperCase == false &&
    passwordStructure.lowerCase == false &&
    passwordStructure.specialCharacter == false &&
    passwordStructure.numeric == false) {
    window.alert("Please choose at least 1 of the 4 following conditions.");
    return false;
  }
  return true;
}

// password length is users input, choose from new characterset string randomly
var generatePasswordWithConditions = function (passwordLength, characterSet) {
  var result = "";
  for (var i = 0; i < passwordLength; i++) {
    result += characterSet.charAt(Math.random() * characterSet.length);
  }
  return result;
}

// if user does not choose any character conditions, ask again
var resetPasswordStructure = function () {
  passwordStructure.specialCharacter = false;
  //ask for upperCase
  passwordStructure.upperCase = false;
  //ask for lowercase
  passwordStructure.lowerCase = false;
  //ask for numbers
  passwordStructure.numeric = false;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
//main function
var generatePassword = function () {
  // get password length
  var passwordLength = NaN;
  // while password length is NOT a number, must try again
  while (isNaN(passwordLength)) {
    passwordLength = getPasswordLength();
    passwordLength = passwordIntegerFilter(passwordLength);
    passwordLength = passwordRangeFilter(passwordLength);
  }
  password.length = passwordLength;
  resetPasswordStructure();
  // make sure password includes result of all conditions
  while (!checkCharacterSetValid()) {
    //ask for special character
    passwordStructure.specialCharacter = confirmSpecialCharacters();
    //ask for upperCase
    passwordStructure.upperCase = confirmUpperCase();
    //ask for lowercase
    passwordStructure.lowerCase = confirmLowerCase();
    //ask for numbers
    passwordStructure.numeric = confirmNumeric();
  }
  return generatePasswordWithConditions(password.length,
    buildPasswordCharacterSet(passwordStructure));
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  window.alert(password);
  passwordText.value = password;
}