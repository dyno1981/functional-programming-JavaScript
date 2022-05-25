/* 순수 함수 */
function add(a, b) {
  return a + b
}
123
// 동일한 인자를 주면 동일한 결과를 리턴
console.log(add(10, 5))
console.log(add(10, 5))
console.log(add(10, 5))

// 동일한 인자를 주었을때 상황에 따라 다른 결과를 리턴 예시
let c = 10 // 상수로 선언했다면 순수함수가 된다.

function add2(a, b) {
  return a + b + c
}

console.log(add2(10, 2))
console.log(add2(10, 3))
console.log(add2(10, 4))
c = 20 // 아래 동일한 인자를 주었지만 c가 상수가 아니기 때문에 순수 함수가 아니게 된다.
console.log(add2(10, 2))
console.log(add2(10, 3))
console.log(add2(10, 4))

// 부수효과가 있는 함수 - 순수 함수 x
// 결과 값 외에 외부 상태에 직접 관여한다.
c = 20

function add3(a, b) {
  c = b
  return a + b
}

console.log(c)
console.log(add3(20, 30))
console.log(c)
console.log(add3(20, 30))
console.log(add3(20, 30))

// 순수 함수 x
let obj1 = {val: 10}

function add4(obj, b) {
  obj.val += b
}

console.log(obj1.val)
add4(obj1, 20)
console.log(obj1.val)

// 다시 순수 함수
// 리턴부분에 새로운 객체를 생성하고 그 안에서 연산함으로 이는 obj2의 값을 변경하지 않는다.
let obj2 = {val: 10}

function add5(obj2, b) {
  return {val: obj2.val + b}
}

console.log(obj2)
let obj3 = add5(obj2, 20)
console.log(obj2)
console.log(obj3.val)
// point: 순수 함수의 중요한 특징은 평가 시점이 중요하지 않다.
// 함수형 프로그램이 가능한 중요한 이유이다.


/* 일급 함수 */
let f1 = function (a) {
  return a * a
}
console.log(f1)

let f2 = add
console.log(f2)

function f3(f) {
  return f()
}

console.log(f3(function () {
  return 10
}))
console.log(f3(function () {
  return 20
}))

/* add_maker */
function add_maker(a) {
  return function (b) {
    return a + b
  }
}

let add10 = add_maker(10)

console.log(add10(20))

let _add5 = add_maker(5)
let _add15 = add_maker(15)

console.log(_add5(10))
console.log(_add15(10))

function f4(f1, f2, f3) {
  return f3(f1() + f2())
}

console.log(f4(
  function () {
    return 2
  },
  function () {
    return 1
  },
  function (a) {
    return a * a
  }
))