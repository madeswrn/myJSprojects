'use strict';
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const diaplayovements = function (movements, sort) {
  containerMovements.innerHTML = ' ';
  let movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type 
      movements__type--${type}">${i + 1
      } ${type}</div>
      <div class="movements__value">${mov}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//diaplayovements(account1.movements);
const displaysummary = function (accs) {
  const incomes = accs.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}`;
  const out = accs.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${-out}`;
  const intrest = accs.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * accs.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${intrest}`;
}
//displaysummary(account1.movements);

//const user = `Steven Thomas Williams`;
const createusername = function (accs) {
  accs.forEach(function (acc) {
    acc.usname = acc.owner.split(' ').map(function (name) {
      return name[0];
    }).join('');
  })
};
createusername(accounts);
//console.log(accounts);
const displaybalance = function (accs) {
  let cubal = accs.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  accs.balance = cubal;
  labelBalance.textContent = accs.balance;
}

//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
const callfun = function () {

  //display movements
  diaplayovements(userthatlogin.movements);

  //display balance
  displaybalance(userthatlogin);

  //display summary
  displaysummary(userthatlogin);
}

let userthatlogin;
btnLogin.addEventListener('click', function (e) {
  //prevent form from login
  e.preventDefault();
  userthatlogin = accounts.find(acc => acc.usname === inputLoginUsername.value);
  //console.log(userthatlogin);
  if (userthatlogin.pin == Number(inputLoginPin.value)) {

    //display ui message
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';

    labelWelcome.textContent = ` welcome back , ${userthatlogin.owner.split(' ')[0]}`;
    callfun();
  }
}
);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  const receiveracc = accounts.find(acc => acc.usname === inputTransferTo.value);
  //console.log(amount, receiveracc);
  inputTransferAmount.value = inputTransferTo.value = ' ';
  if (amount > 0 &&
    userthatlogin.usname != receiveracc.usname &&
    amount <= userthatlogin.balance) {
    receiveracc.movements.push(amount);
    userthatlogin.movements.push(-amount);
    callfun();
  }
});


btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === userthatlogin.usname &&
    Number(inputClosePin.value) === userthatlogin.pin
  ) {
    const index = accounts.findIndex(acc => acc.usname === userthatlogin.usname);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ' ';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  // console.log(userthatlogin.movements.some(mov => mov >= mov * 0.1));
  if (amount > 0 && userthatlogin.movements.some(mov => mov >= (mov * 10) / 1006
  )
  ) {
    userthatlogin.movements.push(amount);
    callfun(userthatlogin);
  }
  console.log('error');
});

let sortit = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  diaplayovements(userthatlogin.movements, !sortit);
  sortit = !sortit;

});

//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

//console.log(usname);
// let usprof = usname.map(fs => {
//   for (let i = 0; i < fs.length; i++) {
//     console.log(fs[i]);
//     break
//   }
// });
// console.log(usprof);


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
// end parameter 4 is not included in the string
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
// this slice method creates a shallow copy of the array
console.log([...arr]);
console.log(arr.slice());

//splice
//it does change the original array
console.log(arr.splice(2));
console.log(arr);
*/
//at method
// let cp = [23, 11, 64];
// console.log(cp[0]);
// console.log(cp.at(1));
// console.log(cp[cp.length - 1]);
// console.log(cp.at(-1));
//for of 
// let wwe = ['bigshow', 'randyorton', 'undertaker', 'HHH'];
// for (const x of wwe) {
//   console.log(` ${x} is a wwe heavyweight champian`);
// }
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdraw ${Math.abs(movement)}`);
  }
};
console.log(`---------------------------------------------------------`);
// using for each
// is a higher orderfunction

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`you deposited ${mov} at movementnumber ${i}`);
  } else {
    console.log(`you withdraw ${Math.abs(mov)}`);
  }
});
*/
// const usdtoinr = 1.1;
// // const pr = movements.map(function (mov) {
//   return mov * usdtoinr;
// });

// const pr = movements.map(mov => mov * usdtoinr);
// ;
// console.log(pr);
// console.log(movements);

// let mte = movements.map((mov, i) => {
//   if (mov > 0) {
//     return `movements ${i + 1}: you deposited ${mov}`;
//   } else {
//     return `movements ${i + 1}: you widthdraw ${Math.abs(mov)}`;
//   }
// });
// console.log(mte);

// const widthdraw = movements.filter((mov) => mov < 0);
// console.log(widthdraw);

// const dataset = [5, 2, 4, 1, 15, 8, 3];
// const calhuage = function (ages) {
//   const calavghum = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(calavghum);
//   const adults = calavghum.filter(age => age >= 18)
//   console.log(adults);
//   const avg = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   return avg;
// }
// humanage = calavghum.filter((cur) => {
//   return cur > 18;
// });
// console.log(humanage);
// let avg = calhuage(dataset);
// console.log(avg);

// const useraccount = accounts.find(acc => acc.owner === 'Sarah Smith');
// console.log(useraccount);
/*
const deposits = movements.some(mov => mov > 100);
console.log(deposits);
*/
// return >0  : switch a and b 
// return <0  :  place as it is  


// let ascending = movements.slice().sort((a, b) => {
//   if (a > b)
//     return 1;
//   if (a < b)
//     return -1;
// });
// console.log(movements);
// console.log(ascending);

// let descending = movements.slice().sort((a, b) => {
//   if (a > b)
//     return -1;
//   if (a < b)
//     return 1;
// });
// console.log(descending);

// const overallamt = accounts.flatMap(acc => acc.movements).reduce((acc, cur) => {
//   return acc + cur;
// }, 0);
// console.log(bankdepositsum);

// const amtgrtthou = accounts.flatMap(acc => acc.movements).reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// console.log(amtgrtthou);



const convert = function (title) {
  const exp = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titlecase = title.toLowerCase().split(' ')
    .map(word => exp.includes(word) ? word : word[0]
      .toUpperCase() + word.slice(1)).join(' ');
  return titlecase;
};
console.log(convert('this is a nice title'));