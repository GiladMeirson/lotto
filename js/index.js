
$(document).ready(()=>{
    $('#winBalls').hide();
    $('#Card-PH').hide();
    _tickets = 0;
    _userGuest =[];
    _userMoney=0;
    _winNumbers=[];
    _rows=0;
})


//generate six uniq random number
function generateRandomNumbers() {
    let uniqueNumbers = new Set();
  
    while (uniqueNumbers.size < 6) {
      let randomNumber = Math.floor(Math.random() * 37) + 1;
      uniqueNumbers.add(randomNumber);
    }
  
    return Array.from(uniqueNumbers);
  }
  
  //generate uniq sequences of six`s
  function generateUniqueSequences(numSequences) {
    let allSequences = [];
  
    while (allSequences.length < numSequences) {
      let sequence = generateRandomNumbers();
  
      // Check if the generated sequence already exists in the result
      if (!allSequences.some(existingSequence => arraysEqual(existingSequence, sequence))) {
        allSequences.push(sequence);
      }
    }
  
    return allSequences;
  }
  
  // Helper function to check if two arrays are equal
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }
  
  function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Sort both arrays
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    // Compare each element
    for (let i = 0; i < arr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

function isMatchingArray(arrays, targetArray) {
  // Iterate through each array in the 'arrays' parameter
  for (let i = 0; i < arrays.length; i++) {
    const currentArray = arrays[i];

    // Check if the current array is the same as the targetArray
    if (areArraysEqual(currentArray, targetArray)) {
      return true; // Match found, return true
    }
  }

  // No match found
  return false;
}


  
  const isWin=()=>{
    _winNumbers.push(_winStrongNum);
    for (let i = 0; i < _userGuest.length; i++) {
      const array = _userGuest[i];
      if (areArraysEqual(_winNumbers,array)) {
        console.log('WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-WIN-');
        winAnimation();

   

      }
      
    }
  }
//generate  6 uniq sequences from numbers
function generateAllCombinations(numbers) {
    const combinations = [];
  
    // Recursive function to generate combinations
    function generateCombination(currentCombo, remainingNumbers, startIndex) {
      if (currentCombo.length === 6) {
        combinations.push([...currentCombo]);
        return;
      }
  
      for (let i = startIndex; i < remainingNumbers.length; i++) {
        currentCombo.push(remainingNumbers[i]);
        generateCombination(currentCombo, remainingNumbers, i + 1);
        currentCombo.pop();
      }
    }
  
    // Start the generation with an empty combination, all numbers, and index 0
    generateCombination([], numbers, 0);
  
    return combinations;
  }
  

// no need for now
const GetRandomColor=()=>{
    let resArr =['red','blue','black','orange','purple','yellow'];
    let RandomIndex = Math.floor(Math.random() * 6);
    return resArr[RandomIndex];
}

//start main lotto
const GenerateLotto=()=>{
    $('#Card-PH').hide();
    $('#winBalls').show();

    let newElement = document.getElementById(`winBalls`);
    newElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    setTimeout(()=>{
      document.getElementById('WheelSound').play();
    }
    ,500)
   _WinInterval = setInterval(()=>{
        let numbers = generateRandomNumbers();
        _winNumbers = numbers;
        RenderWinNumbers(numbers);
        for (let i = 1; i < 8; i++) {
            let duration = Math.random()*1000+1000;
            let speed = Math.random()*300+200;
            let distance = Math.round(Math.random()*55)+150
            rotateAndShake('ball-'+i,duration,speed,distance)
            
        }
    },750)

    setTimeout(()=>{
        clearInterval(_WinInterval);
        

        isWin();
    },1000*3)
    setTimeout(()=>{
      document.getElementById('WheelSound').pause();
    },4500)

}

//render the random win numbers
const RenderWinNumbers=(numbers)=>{
    if (numbers.length!=6) {
        return false;
    }
    const divs = document.getElementsByClassName('centered-content')
    for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        let p = div.getElementsByTagName('p')[0];
        //console.log('?',i,numbers[i])
        if (i==6) {
          _winStrongNum =  Math.floor(Math.random()*7)+1;
          p.innerHTML =_winStrongNum;
          continue;
        }
        p.innerHTML = numbers[i];        
    }
   return true;

}

const showmyNumbers = () =>{
  if (_userGuest.length==0) {
    Swal.fire({
      title:'מאגר הניחושים שלך ריק',
      icon:'warning',
    
      
    });
    return ;
  }

  let str = `
  <div id="table-PH">
    <table>
      <thead>
          <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>חזק</th>
          </tr>
      </thead>
      <tbody>`
      for (let i = 0; i < _userGuest.length; i++) {
        const array = _userGuest[i];
        str+=`<tr id="tr-${i}">
        <td>${array[0]}</td>
        <td>${array[1]}</</td>
        <td>${array[2]}</</td>
        <td>${array[3]}</</td>
        <td>${array[4]}</</td>
        <td>${array[5]}</</td>
        <td>${array[6]}</</td></tr>`
        
      }

      str+=`</tbody>
  </table>
  </div>`
  Swal.fire({
    title: `<h1 style="text-align: center;">הכרטיסים שלך</h1>`,
    icon: "info",
    html: str,
    showCloseButton: true,
    // showCancelButton: true,
    // focusConfirm: false,
    // confirmButtonText: ``,
    // cancelButtonText: ``,
  });
}

function rotateForDuration(elementId, duration, speed) {
    var element = document.getElementById(elementId);

    // Set the initial rotation to 0 degrees
    element.style.transform = 'rotate(0deg)';

    // Calculate the total rotation angle based on the speed and duration
    var totalRotation = speed * (duration / 1000);

    // Start rotating the element
    var startTime = null;
    function rotate(timestamp) {
      if (!startTime) startTime = timestamp;

      // Calculate the rotation angle based on the elapsed time
      var elapsedTime = timestamp - startTime;
      var rotationAngle = (speed / 1000) * elapsedTime;

      // Apply the rotation to the element
      element.style.transform = 'rotate(' + rotationAngle + 'deg)';

      // Continue rotating until the total rotation is reached
      if (rotationAngle < totalRotation) {
        requestAnimationFrame(rotate);
      }
    }

    // Start the rotation animation
    requestAnimationFrame(rotate);
  }

  //animation
  function rotateAndShake2(elementId, duration, speed, shakeDistance) {
    var element = document.getElementById(elementId);

    // Set the initial rotation to 0 degrees and translation to 0 pixels
    element.style.transform = 'rotate(0deg) translateY(0px)';

    // Calculate the total rotation angle based on the speed and duration
    var totalRotation = speed * (duration / 1000);

    // Start rotating and shaking the element
    var startTime = null;
    function rotateAndShake(timestamp) {
      if (!startTime) startTime = timestamp;

      // Calculate the rotation angle based on the elapsed time
      var elapsedTime = timestamp - startTime;
      var rotationAngle = (speed / 1000) * elapsedTime;

      // Calculate the shake distance based on sine function
      var shakeOffset = shakeDistance * Math.sin(elapsedTime * 0.01);

      // Apply the rotation and shake to the element
      element.style.transform = 'rotate(' + rotationAngle + 'deg) translateY(' + shakeOffset + 'px)';

      // Continue rotating and shaking until the total rotation is reached
      if (rotationAngle < totalRotation) {
        requestAnimationFrame(rotateAndShake);
      }
    }

    // Start the rotation and shaking animation
    requestAnimationFrame(rotateAndShake);
  }

  function rotateAndShake(elementId, duration, speed, shakeDistance) {
    var element = document.getElementById(elementId);
  
    // Set the initial rotation to 0 degrees and translation to 0 pixels
    element.style.transform = 'rotate(0deg) translateY(0px)';
  
    // Calculate the total rotation angle based on the speed and duration
    var totalRotation = speed * (duration / 1000);
  
    // Randomize the rotation direction (clockwise or counterclockwise)
    var rotationDirection = Math.random() < 0.5 ? 1 : -1;
  
    // Start rotating and shaking the element
    var startTime = null;
    function rotateAndShake(timestamp) {
      if (!startTime) startTime = timestamp;
  
      // Calculate the rotation angle based on the elapsed time
      var elapsedTime = timestamp - startTime;
      var rotationAngle = rotationDirection * (speed / 1000) * elapsedTime;
  
      // Calculate the shake distance based on sine function
      var shakeOffset = shakeDistance * Math.sin(elapsedTime * 0.01);
  
      // Apply the rotation and shake to the element
      element.style.transform = 'rotate(' + rotationAngle + 'deg) translateY(' + shakeOffset + 'px)';
  
      // Continue rotating and shaking until the total rotation is reached
      if (rotationAngle * rotationDirection < totalRotation * rotationDirection) {
        requestAnimationFrame(rotateAndShake);
      } else {
        // Animation has ended, reset the element to its original position
        element.style.transform = 'rotate(0deg) translateY(0px)';
  
        // Randomize the rotation direction for the next animation
        rotationDirection = Math.random() < 0.5 ? 1 : -1;
  
        // Restart the animation after a brief delay (adjust as needed)
        setTimeout(function () {
          requestAnimationFrame(rotateAndShake);
        }, 500);
      }
    }
  
    // Start the rotation and shaking animation
    requestAnimationFrame(rotateAndShake);
  }

  const removeTicket =(btn)=>{
    //delete the ticket
    _tickets--;
    btn.parentElement.remove();
  }

  const anotherCard = (btn,flag=false) =>{
    _tickets++;
    // console.log(btn.parentElement.parentElement);
    // console.log(btn.parentElement.outerHTML);
    let strToRender = btn.parentElement.outerHTML;
    if (flag) {
      strToRender = _lastTicketStr;
    }
    strToRender=strToRender.replace(`ticket-${_tickets-1}`,`ticket-${_tickets}`);
    btn.parentElement.parentElement.innerHTML+=strToRender
    let newElement = document.getElementById(`ticket-${_tickets}`);
    newElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    $('#winBalls').hide();

  }

  //render any card lotto
  const RenderCard=(phString,length)=>{
    $('#winBalls').hide();
    $('#Card-PH').show();

    _tickets++;
    if (length==undefined) {
      length = $('#sysIN').val();
    }
    let str = `<div id="ticket-${_tickets}"  class="lotto-ticket">
    <h2 style="color: #a52a2a;">Lottery Ticket</h2>
    <p style="color: #004080;font-size:18px ;">Enter Your Numbers (1-37)</p>`;

    for (let i = 0; i < length; i++) {
        
        str+=`<input class="number-input" type="text" maxlength="2" value="${i+1}">`;

    }
    str+=`<br>
    <input class="number-input strong-Num"  type="text" maxlength="1" min="1" max="7" value="7">`
    str+=`<br>
    <button onclick="SubmitCard(this)">שלח טופס</button>
    <button onclick="anotherCard(this)" class="moreCardBtn">עוד כרטיס +</button>
    <button onclick="removeTicket(this)" class="cancelThis">בטל כרטיס</button>
  </div>`;

    document.getElementById(phString).innerHTML += str;
    let newElement = document.getElementById(`ticket-${_tickets}`);
    newElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });


  }

  const returnOrderArr =(arr)=>{
    let strongNum = arr.pop();
    let newArr = generateAllCombinations(arr);
    for (let i = 0; i < newArr.length; i++) {
      const row = newArr[i];
      row.push(strongNum);
      _userGuest.push(row);
    }
    return newArr;

  }

  const SubmitCard =(btn)=>{
    let str = `<h2 style="color: #a52a2a;">Lottery Ticket</h2>
    <h3 style="color: #004080;">has been sent successfully</h3>
    <br>
    <button onclick="anotherCard(this,true)" class="moreCardBtn">עוד כרטיס +</button>`
    _lastTicketStr = btn.parentElement.outerHTML
    let inputs = btn.parentElement.getElementsByClassName('number-input');
    let arrayFromElements = Array.from(inputs);
    if (isValidNum(arrayFromElements)==1) {
      Swal.fire({
        icon: "error",
        title: "בעיה בשליחת נתונים",
        text: "אחד המספרים שהזנת אינו חוקי אנא וודא שכל מספרי המזל בין 1-37 ומספר החזק בין 1-7",
      });
      return;
    }
    if (isValidNum(arrayFromElements)==2) {
      Swal.fire({
        icon: "error",
        title: "בעיה בשליחת נתונים",
        text: "כבר שלחת רצף מספרים זהה נסה להימנע מכפילויות",
      });
      return;
    }
    let values = arrayFromElements.map(function(element) {
        return parseInt(element.value); // or any other property you want to extract
    });
   // console.log(values)
   //console.log(btn.parentElement.id)
    const FatherId = btn.parentElement.id
    btn.parentElement.innerHTML = str;
    if (values.length<8) {
      _userMoney +=3;   
      _userGuest.push(values);
    }
    else {
      returnOrderArr(values);
    }
    if (values.length == 9) {
      _userMoney+=84;
    }
    if (values.length == 10) {
      _userMoney+=252;
    }
    if (values.length == 11) {
      _userMoney+=630;
    }
    if (values.length == 12) {
      _userMoney+=1386;
    }
    if (values.length == 12) {
      _userMoney+=2772;
    }
    setTimeout(()=>{
      $(`#${FatherId}`).fadeOut(1000);
    },2000)
    document.getElementById('money').innerHTML= `כסף: &#8362; ${_userMoney}`;
    document.getElementById('combinations').innerHTML= `קומבינציות: ${_userGuest.length}`;
  }
  function hasDuplicateNumbers(arr) {
    const encounteredNumbers = {}; // Object to track encountered numbers
  
    // Iterate through each number in the array
    for (let i = 0; i < arr.length; i++) {
      const currentNumber = arr[i];
  
      // If the number has been encountered before, it's a duplicate
      if (encounteredNumbers[currentNumber]) {
        return true; // Duplicate found
      }
  
      // Mark the current number as encountered
      encounteredNumbers[currentNumber] = true;
    }
  
    // No duplicates found
    return false;
  }

  const isValidNum = (nums) =>{
    let num = 0;
    let valuesNums=[];
    for (let i = 0; i < nums.length; i++) {
      num = parseInt(nums[i].value);
      valuesNums.push(num);
      if (num<1 || num>37 || isNaN(num) ) {
        return 1;
      }
    
      
    }
    let last = valuesNums.pop()
    if (hasDuplicateNumbers(valuesNums)) {
      return 1;
    }
    valuesNums.push(last);
    if (isMatchingArray(_userGuest,valuesNums)) {
      return 2;
    }
    return 0;
  }

  const winAnimation=()=>{
    
    $('#winDiv').fadeIn(1000);
    document.getElementById('WINNERSound').play();
    setTimeout(()=>{
      $('#winDiv').hide();
    },4250);
  }


  const looseStart=()=>{
    _winNumbers = generateRandomNumbers();
    _winStrongNum = Math.floor(Math.random()*7)+1;
    _noOverRide = [];
    //time effect
    const StartTime = new Date();

    setTimeout(()=>{
      _timeInterval = setInterval(()=>{
        document.getElementById('timepass').innerHTML = `זמן - ${getTimePassed(StartTime)}`
      },1000)
    },8750)


    //win num random effect
    _animationInterval = setInterval(()=>{
      for (let i = 1; i < 8; i++) {
        if (_noOverRide.includes(i)==false) {
          if (i==7) {
            document.getElementById(`winI${i}`).value = Math.floor(Math.random()*7)+1;
          }
          else {
            document.getElementById(`winI${i}`).value = Math.floor(Math.random()*37)+1;        
  
          }
        }

      }
    },50)

    //stop effect win nums
    const ascendingOrder = _winNumbers.slice().sort((a, b) => a - b); 
    _winNumbers.push(_winStrongNum);
    for (let i = 0; i < _winNumbers.length; i++) {
      setTimeout(()=>{
        document.getElementById(`winI${i+1}`).value =i!=_winNumbers.length-1?ascendingOrder[i]:_winNumbers[i]
        _noOverRide.push(i+1);
        i==_winNumbers.length-1?document.getElementById(`winI${i+1}`).style.backgroundColor='#107b43':document.getElementById(`winI${i+1}`).style.backgroundColor='#0f610c';
        i==_winNumbers.length-1?clearInterval(_animationInterval):0;
      },(i+1)*1000)
      
    }

    setTimeout(() => {
      _animationIntervalUser= setInterval(()=>{
        let isntTheSame = true;
        let usernums =[]

        while(isntTheSame){
          console.log('in')
          usernums = generateRandomNumbers();
          const userStro = Math.floor(Math.random()*7)+1;
          usernums =usernums.slice().sort((a, b) => a - b); 
          usernums.push(userStro);
          console.log(usernums);
          if (isMatchingArray(_userGuest,usernums)) {
            isntTheSame=true;
          }
          else{
            _userGuest.push(usernums);
            isntTheSame=false;
          }

        }
        console.log('out')
        //console.log(_winNumbers,usernums)
        for (let i = 0; i < usernums.length; i++) {
          const value = usernums[i];
          document.getElementById(`userI${i+1}`).value = value;
          
        }
        _userMoney+=3;
        document.getElementById('money').innerHTML= `כסף: &#8362; ${_userMoney}`;
        document.getElementById('combinations').innerHTML= `קומבינציות: ${_userGuest.length}`;


        const result = areArraysEqual(_winNumbers,usernums);
        if (!result) {
          $('#userIRow input').css("background-color", "#c70b0b")
        }
        else {
          $('#userIRow input').css("background-color", "#0f610c")
          clearInterval(_animationIntervalUser);
          winAnimation()
        }



      },1)
    }, 8750);
  }










  function getTimePassed(startDate) {
    // Get the current date and time
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - startDate;
  
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    // Format the result as "hh:mm:ss"
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  
    return formattedTime;
  }
  
  // Helper function to pad a number with zero if it's a single digit
  function padZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
  }
  

  