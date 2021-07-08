// Assignment Code
var generateBtn = document.querySelector("#generate");
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
/********************************** My Code  **********************************/
// This is a list of global constants
const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // from OWASP site in Readme
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqurstuvwxyz";
const numeric = "01234565789";
const chrTypes = ["uppercase", "lowercase", "numeric", "special characters"];
/* Main function to generate password. This will mainly just call other 
  functions to get the data and then return the data needed */
function generatePassword() {
  let msg;
  let pwdLength;
  let pwdChrTypes;
  alert("Let's make a password!");
  do {
    //get length
    pwdLength = getPwdLength();
    if (pwdLength === "cancel") {
      return null; //exit with no password (should leave default text)
    }
    //get character types (an array)
    pwdChrTypes = getChrTypes();
    if (pwdChrTypes === "cancel") {
      return null; //exit with no password (should leave default text)
    }
    msg =
      "You selected these options:\n    Password length: " +
      pwdLength +
      "\n    These charactertypes:";
    for (let i = 0; i < pwdChrTypes.length; i++) {
      msg += "\n    \u2022    " + chrTypes[pwdChrTypes[i]];
    }
    msg += "\n\nIs this correct?";
  } while (!confirm(msg));
  let newPwd = getPassword(pwdLength, pwdChrTypes);
  return newPwd;
}
/* Prompts the user to enter a password length value between 8 and 128 
   characters. It will loop while the user attempts this. If the user enters a
   cancel, it will return  "cancel". */
function getPwdLength() {
  let input = 0; // leave 0 in case someone leaves the prompt blank it won't return "cancel"
  let length; // declared here for scope outside of "do/while" block
  let badEntry = ""; // variable that will store bad entry text
  do {
    input = prompt(
      `How many characters would you like in your password? (8-128)${badEntry}`,
      "(8-128)"
    );
    if (input == null || input == "") {
      return "cancel";
    }
    // convert the input to an integer. if it is not an integer, then it will be a NaN
    length = parseInt(input);
    if (length < 8 || length > 128 || isNaN(length)) {
      badEntry = "\n\n That was an invalid answer, please try again.";
    } else {
      return length;
    }
  } while (true); // continuous loop, because if success, the value is returned
}
/* This will open a series of prompts asking what types of values the user wants 
   to use in their password. If "Cancel" is ever clicked, cancel is returned. */
function getChrTypes() {
  let arrReturn = []; //the list of items to return
  let type = "";
  let badEntry = "";
  let noChoice = "";
  do {
    // iterate through the array, prompting yes/no to get if we want to use the type
    for (let i = 0; i < chrTypes.length; i++) {
      badEntry = ""; // clear out any bad entry messages
      type = chrTypes[i];
      while (true) {
        // loop until the valid answer executes a break
        let answer = prompt(
          `Would you like to use ${type} characters? (yes/no)${badEntry}${noChoice}`,
          "yes"
        ); // get answer (msg should show any errors)
        if (answer == null) {
          return "cancel";
        }
        answer = answer.toLowerCase(); // make answer case insensitive
        //validate we have a valid answer
        if (answer === "y" || answer === "yes") {
          arrReturn.push(i); // records the choice - this is the index of chrType
          break; // breaks out of the while, to move back to the for loop
        } else if (answer === "n" || answer === "no") {
          break; // breaks out of the while, to move back to the for loop
        } else {
          badEntry = "\n\nI'm sorry that was an invalid answer.";
        }
      }
    }
    noChoice = "\n\nRemember, you must choose at least one type.";
  } while (arrReturn.length < 1);
  return arrReturn;
}
/* This will return a password. it takes an integer len that represents the length and arrTypes that represents an array of chrTypes indicies. 
arrChrCounts is used to ensure we have the proper datatypes included in the array. When the function is entered, the indicies in arrTypes is checked and used to set the arrChrCounts to 0 if it is valid and -1 if it is not. The function then enters a while loop that will randomly choose a type from the arrTypes and then add a randomly choosen character from that string. The while loop ends if arrChrCounts does not include any 0s. (If there is a 0, we were supposed have chosen one of that type.) */
function getPassword(len, arrTypes) {
  let pwd; // just concatenate the new character on to the string
  let arrChrCounts = [];
  let chrChoice;
  do {
    // determine which chr types are chosen (arrChrCounts gives numbers against chrTypes)
    for (let i = 0; i < chrTypes.length; i++) {
      if (arrTypes.includes(i)) {
        arrChrCounts[i] = 0;
      } else {
        arrChrCounts[i] = -1;
      }
    }
    pwd = "";
    for (let i = 0; i < len; i++) {
      // select a random type
      chrChoice = Math.floor(Math.random() * arrTypes.length);
      // select which chrType to add by dereferencing the index stored in arrTypes
      switch (arrTypes[chrChoice]) {
        case 0: // "uppercase":
          pwd += getRandomChr(uppercase);
          arrChrCounts[0]++;
          break;
        case 1: // "lowercase":
          pwd += getRandomChr(lowercase);
          arrChrCounts[1]++;
          break;
        case 2: // "numeric":
          pwd += getRandomChr(numeric);
          arrChrCounts[2]++;
          break;
        case 3: // "special characters":
          pwd += getRandomChr(specialCharacters);
          arrChrCounts[3]++;
          break;
      }
    }
  } while (arrChrCounts.includes(0));
  return pwd;
}
/* This will randomly choose a character out of the chrList and return it. */
function getRandomChr(chrList) {
  let chrChoice = Math.floor(Math.random() * chrList.length);
  return chrList.charAt(chrChoice);
}