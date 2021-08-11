var birthday = document.querySelector("#birthday");
var checkBtn = document.querySelector("#checkBtn");
var result = document.querySelector("#result");


checkBtn.addEventListener('click', clickHandler);


function clickHandler() {
    const dob = birthday.value.split('-');
    console.log(dob)
    var date = {
        day : dob[2],
        month: dob[1],
        year: dob[0]
    }
    var dobCombinations = dateCombination(date.day,date.month,date.year);
    
    
      
      var isPalindrome = checkPalindrome(dobCombinations);
      if(isPalindrome){
          console.log("your birthday is palindroome");
       }
     if(!isPalindrome){
         nextPalindromeDate(date);
     }
     
}


function dateCombination( dd,mm,yyyy ){
   console.log(typeof dd);
    var ddmmyyyy = dd + mm + yyyy ;
    var mmddyyyy =   mm +dd + yyyy ;
    var yyyyddmm =  yyyy +dd + mm ;
    var yyyymmdd =  yyyy  +  mm  +dd ;
    var ddmmyy = dd  +  mm  +  yyyy.slice(-2);
    var mmddyy  =  mm  + dd  +  yyyy.slice(-2);
    return [ ddmmyyyy,mmddyyyy ,yyyyddmm,yyyymmdd,ddmmyy, mmddyy]
}

function nextPalindromeDate(date){
 var futurePalindrome =  possiblePalindromeInFuture(date);
 console.log(futurePalindrome);
}


function possiblePalindromeInFuture(date){
 var   dayIs = Number(date.day)
 var   monthIs = Number(date.month)
 var   yearIs = Number(date.year)
 var  isTrue = true;
 var differenceOfDays = 0;
 
 while(isTrue){
     var daysInMonth = checkLeapYear(yearIs);
     dayIs = dayIs +1;
     if(dayIs > daysInMonth[monthIs - 1]){
         dayIs = 1;
         monthIs = monthIs + 1;
         if( monthIs > 12){
             monthIs = 1;
             yearIs = yearIs +1;
         }
     }

    isTrue = !(checkPalindrome(dateCombination(dayIs.toString,monthIs.toString,yearIs.toString)));
    differenceOfDays++;
 }
 var newDate = dayIs.toString + monthIs.toString + yearIs.toString;
 return [ newDate, differenceOfDays ];
}

function checkLeapYear(yearIs){
    if(yearIs % 4 == 0 || (yearIs % 100 == 0 && year % 400 == 0)){
        return [31,29,31,30,31,30,31,31,30,31,30,31]
    }
    else {
        return [31,28,31,30,31,30,31,31,30,31,30,31]
    }
}
function checkPalindrome(combination){
    var isTrue = false;
   for(let i=0;i<combination.length;i++){
    var reverseCombination = combination[i].split('').reverse().join('');
    if(reverseCombination == combination[i]){
        isTrue = true ;
        break;
    }
    
       
}
return isTrue;
}
