//ALL CUSTOM ATTRIBUTE , CLASS AND ID FETCH in js file
const inputSlider = document.querySelector("[data-lengthSlider]");          // IN 39 LINE OF CODE
const lengthDisplay = document.querySelector("[data-lengthNumber]");         //34 LOC

const passwordDisplay = document.querySelector("[data-passwordDisplay]");       //20 LOC
const copyBtn = document.querySelector("[data-copy]");                         //21 LOC
const copyMsg = document.querySelector("[data-copyMsg]");                     //22  LOC
const uppercaseCheck = document.querySelector("#uppercase");                  //43 LOC
const lowercaseCheck = document.querySelector("#lowercase"); 
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");                // 66 LOC
const generateBtn = document.querySelector(".generateButton");               //70 LOC 
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';                 //random symbol comes from here

 
//initially Slider line
let password = "";                      //starting me password not show
let passwordLength = 10;              //by default password length show in starting 10
let checkCount = 0;                      //checkbox me  0 tick pada hai ki nhi
handleSlider();                          // UI update by password length value ,call handleSlider function .
//set strength circle color to grey at intially
setIndicator("#ccc");


//set passwordLength  reflect on ui 
function handleSlider() {            
    inputSlider.value = passwordLength;           //starting me 10 length position me pada ho slider line,20loc
    lengthDisplay.innerText = passwordLength;        // 10 length value display ho
    //or kuch bhi karna chahiye ? - HW
}

function setIndicator(color) {                             //12loc check in js file me hi 
    indicator.style.backgroundColor = color;                //color change of strength text and circle
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;      /*shadow of circle */
}


//RANDOM NO GENERATE CODE -
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;    //explain in copy how its work
}

function generateRandomNumber() {         
    return getRndInteger(0,9);              //40 loc code ka use here 0 se 9 k bich ka no want
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123)) //letter want a to z k bich ka random so, in small letter 
  }          //a ascii value 97 and z Ascii value 123 . its give in so converted into string string.fromcharCode use

function generateUpperCase() {                           //uper Capital letter k liye A ascii value is 65 
    return String.fromCharCode(getRndInteger(65,91))      // Z ascii value is 91
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);      // Symbol variable me 0 index no se total symbol length k no me se ek ek index nikal k dega
    return symbols.charAt(randNum);                //randNum me jo index value aaya hai uspe kaun sa symbol 
}                                                  // pada hai wo charAt method find kr k dega


//Password Strength Checked 
function calcStrength() {
    let hasUpper = false;                 //at starting state 64 to 67 loc
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

//.checked function is check box me tick pada hua hai naa will check , UppercaseCheck is variable where checkbox is
 //fetch look 8loc isi js file me, hasUpper me 64loc = true daal dega . mns checked tick put
    if (uppercaseCheck.checked) hasUpper = true;    
    if (lowercaseCheck.checked) hasLower = true;    
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {    //&& AND, || is OR operator
      setIndicator("#0f0");                                 //#0f0 is color when all 76 verify then show this color
    } else if (
      (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

//async function coz we use await : until pasword is not geberate copy button is not active
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);   //password whatever generate usko copy krne ka code hai await k baad wala all text
        copyMsg.innerText = "copied";                  //copied text show  after copy pass frm clipboard
    }                                                  //copyMsg varaible container in 7loc in js file
    catch(e) {
        copyMsg.innerText = "Failed";
    }
   
    //to make copy wala span visible
    copyMsg.classList.add("active");     

    setTimeout( () => {                        //copied text show for some time k liye after that its remove
        copyMsg.classList.remove("active");     //classList css file me hai
    },2000);                                    //2sec k baad remove

}

function shufflePassword(array) {         //for Shuffle
    //Fisher Yates Method
    for (let i = array.length - 1;  i > 0;  i--) {

        // j varaibel me value found by random
        const j = Math.floor(Math.random() * (i + 1));

        //swap i index no value at j index pe and vice versa
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      //empty string create
    let str = "";
    array.forEach((el) => (str += el));    ///array k value ko string me converted coz pass as a string lega all value sth me chipak k aayega naa k separetely like array.
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)                 //if checkbox checked 
            checkCount++;                 //checkcount ek ek kr k dts y ++
    });

    //special condition  (if pasword length is smaller then checkbox count then password generate is equal to pass check box count! see copy for better clear)
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();                //handleslider called when password speacial ccondition perform
    }
}

allCheckBox.forEach( (checkbox) => {       //allcheckBox is variable where all checkbox store, forEach loop is counting 
    checkbox.addEventListener('change', handleCheckBoxChange);     //if change in checkbox means u have tick one or more then ya untick checkbox then forEach loop count from starting
})                                          //handleCheckBox function is run wch is in LOC 118

//Event listner on Slider button e.target is slider moving stop mark repesent 
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;           //Slider move krne par jis value pe hoga usko passwordLength me store ho jayega jo upar me show hota hai no
    handleSlider();                             //handle slider function call 27 to 30 loc code check in js for update UI
})   

//event listner on copy button
copyBtn.addEventListener('click', () => {   
    if(passwordDisplay.value)                // if password display button me value pada hai then copyContent function called
        copyContent();                       //87 loc in js file called
})

generateBtn.addEventListener('click', () => {
     if(checkCount == 0)           //if none checkbox tick
        return;                   //no password given .

    if(passwordLength < checkCount) {     //Event listner apply when click same look 126 to 128 loc in js file
        passwordLength = checkCount;
        handleSlider();
    }

// let's start the jouney to find new password after create one pasword again want new password
    console.log("Starting the Journey");
    //remove old password
    password = "";                //remove old password
  

// Empty Array with name of funcArr create to take password generate value
    let funcArr = [];           //its a function. in js array treat as a function

//let's put the stuff mentioned by checkboxes
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);     //push uppercase in empty array 

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition    : its means jo jo tick pade by user wo compulsory hai daalna
    for(let i=0; i<funcArr.length; i++) {         //length is  checkbox tick length
        password += funcArr[i]();               //iterate and give value in funcArr k [i] index me, when call its check 167 to 180.
    }
    console.log("COmpulsory adddition done");

    //remaining adddition : let 2 checkbox is tick upper and lower tick and length is 10 then rest 8 k liye value
    for(let i=0; i<passwordLength-funcArr.length; i++) {       // i<10 -3(if 3 tick) =7 empty index pe daalne k liye
        let randIndex = getRndInteger(0 , funcArr.length);     // look getRandinteger in loc 40
        console.log("randIndex" + randIndex);                 //its not for me, its for console.
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");    //code fata(not working) dts y use this
   
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");

    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    
    //calculate strength
    calcStrength();
});