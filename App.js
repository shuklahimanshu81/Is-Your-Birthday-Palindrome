var birthday = document.querySelector("#birthday");
var checkBtn = document.querySelector("#checkBtn");
var result = document.querySelector("#result");
var timer = document.querySelector("#timer");

checkBtn.addEventListener('click', clickHandler);


function clickHandler() {
    const dob = birthday.value.split('-');
    var date = {
        day : dob[2],
        month: dob[1],
        year: dob[0]
    }
    var dobCombinations = dateCombination(date.day,date.month,date.year);
    
    
      
      var isPalindrome = checkPalindrome(dobCombinations);
      if(isPalindrome){
        result.innerText = "your birthday is palindroome";
       }
     if(!isPalindrome){
        checkBtn.style.display ="none";
        timer.style.display = "block" ; 
      var  nextPalindrome = nextPalindromeDate(date);
     setTimeout( function()
     {         
         result.innerText = "Oops! Your birthdate is not palindrome. Nearest palindrome date is " + nextPalindrome[0] + ". You missed it by " + nextPalindrome[1] + " days." ;
         result.style.display = "block";
    timer.style.display = "none";    
    },3200) 

     }
     
     
}


function dateCombination( dd,mm,yyyy ){
    var ddmmyyyy = dd.toString()+ mm.toString()+ yyyy.toString();
    var mmddyyyy =   mm.toString()+ dd.toString()+ yyyy.toString();
    var yyyyddmm =  yyyy.toString()+ dd.toString()+ mm.toString();
    var yyyymmdd =  yyyy.toString() +  mm.toString() + dd.toString();
    var ddmmyy = dd.toString() +  mm.toString() +  yyyy.toString().slice(-2);
    var mmddyy  =  mm.toString() + dd.toString() +  yyyy.toString().slice(-2);
    return [ ddmmyyyy,mmddyyyy ,yyyyddmm,yyyymmdd,ddmmyy, mmddyy];
}

function nextPalindromeDate(date){
 var futurePalindrome =  possiblePalindromeInFuture(date);
 var pastPalindrome = possiblePalindromeInPast(date);
 if(futurePalindrome[1] < pastPalindrome[1]){
     return futurePalindrome;
 }
 else{
     return pastPalindrome;
 }
 
}


function possiblePalindromeInFuture(date){
 var   dayIs = Number(date.day);
 var   monthIs = Number(date.month);
 var   yearIs = Number(date.year);
 var  isTrue = true;
 var differenceOfDays = 0;
 var daysInMonth = checkLeapYear(yearIs);
 
 while(isTrue){
     
     dayIs = dayIs +1;
     if(dayIs > daysInMonth[monthIs - 1]){
         dayIs = 1;
         monthIs = monthIs + 1;
         if( monthIs > 12){
             monthIs = 1;
             yearIs = yearIs +1;
             daysInMonth = checkLeapYear(yearIs);
         }
     }

    isTrue = !(checkPalindrome(dateCombination(dayToString(dayIs),monthToString(monthIs),yearIs.toString())));
    differenceOfDays++;
 }
 
 return [ dayToString(dayIs)+"-"+monthToString(monthIs)+"-"+yearIs.toString(), differenceOfDays ];
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

function dayToString(day){
    if(day<10){
        return "0" + day
    }
    else{
        return day.toString()
    }
}
function monthToString(month){
    if(month < 10 ){
        return "0" + month;
    }
    else{
        return month.toString();
    }
}


function possiblePalindromeInPast(date)
{ 
 var   dayIs = Number(date.day);
 var   monthIs = Number(date.month);
 var   yearIs = Number(date.year);
 var  isTrue = true;
 var differenceOfDays = 0;
 
 var daysInMonth = checkLeapYear(yearIs);
 while(isTrue){
     dayIs = dayIs - 1;
     if(dayIs <= 0){
         if(monthIs > 1){
            dayIs = daysInMonth[monthIs -2];
         }
         else{
             dayIs = 31;
         }
         
         monthIs = monthIs -1;
         if(monthIs <= 0){
             monthIs = 12;
             yearIs = yearIs -1 ;
             daysInMonth = checkLeapYear(yearIs);
         }
     }
     
     isTrue = !(checkPalindrome(dateCombination(dayToString(dayIs),monthToString(monthIs),yearIs.toString())));
     differenceOfDays++ ;
 }
 return [ dayToString(dayIs)+"-"+monthToString(monthIs)+"-"+yearIs.toString(),differenceOfDays];
}