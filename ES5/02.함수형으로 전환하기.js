let users = [
  {id: 1, name: 'ID', age: 36},
  {id: 2, name: 'BJ', age: 32},
  {id: 3, name: 'JM', age: 32},
  {id: 4, name: 'PJ', age: 27},
  {id: 5, name: 'HA', age: 25},
  {id: 6, name: 'JE', age: 26},
  {id: 7, name: 'JI', age: 31},
  {id: 8, name: 'MP', age: 23},
]
/* 1. 명령형 코드 */
// 1. 30세 이상인 users를 거른다.
let temp_users = []
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i])
  }
}
console.log(temp_users)
// 2. 30세 이상인 users의 names를 수집한다.
let names = []
for (let i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name)
}
console.log(names)
// 3. 30세 미만인 users를 거른다.
temp_users = []
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i])
  }
}
console.log(temp_users)
// 4. 30세 미만인 users의 ages를 수집한다.
let ages = []
for (let i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age)
}
console.log(ages)


/* 2. _filter, _map으로 리팩토링 */
function _filter(list, predi) {
  let new_list = []
  for (let i = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i])
    }
  }
  return new_list
}

function _map(list, mapper) {
  let new_list = []
  for (let i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]))
  }
  return new_list
}

console.log(
  _filter(users, function (user){ return user.age >= 30})
)

let over30 = _filter(users, function (user){ return user.age >= 30})

let new_names = _map(over30, function (user) {
  return user.name
})

console.log(new_names)

console.log(
  _filter(users, function (user){ return user.age < 30})
)

let under30 = _filter(users, function (user){ return user.age < 30})

new_ages = _map(under30, function (user) {
  return user.age
})

console.log(new_ages)

console.log(_map([1, 2, 3], function (num) {
  return num * 2
}))

console.log(_filter([1, 2, 3, 4], function (num){ return num % 2}))
console.log(_filter([1, 2, 3, 4], function (num){ return !(num % 2)}))

console.log(
  _map(
    _filter(users, function (user) {return user.age >= 30}), function (user) {return user.name}
  ))

console.log(
  _map(
    _filter(users, function (user) {return user.age < 30}), function (user) {return user.age}
  ))


/* 3. each 만들기 */
// 1. _each로 _map, _filter 중복 제거
// _.js에 있음
// 176 _get쪽에 재정의

// function _each(list, iter) {
//   for (let i = 0; i < list.length; i++) {
//     iter(list[i])
//   }
//   return list


// 2. 외부 다형성
// 1. array_like, arguments. document.querySelectorAll
console.log(
  [1, 2, 3].map(function (value) {
    return value * 2
  }))
console.log(
  [1, 2, 3, 4].filter(function (value) {
    return value % 2
  }))

// 3. 내부 다형성
// 1. predicate, iterate, mapper
_map([1, 2, 3, 4], function (v) {
  return v + 10
})

/* 4. 커링 */
// 1. _currt, _curryr
function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : function (b) {return fn(a, b)}
  }
}
function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : function (b) {return fn(b, a)}
  }
}

let add = _curry(function (a, b) {
  return a + b
})


add10 = add(10)
add5 = add(5)
console.log(add10(5))
console.log(add(5)(3))
console.log(add5(3))
console.log(add(10)(3))

console.log(add(1, 2))

let sub = _curryr(function (a, b) {
  return a - b
})

console.log(sub(10, 5))

let sub10 = sub(10)

console.log(sub10(5))


// 2. _get 만들어 좀 더 간단하게 하기
let _get = _curryr(function(obj, key) {
  return obj === null ? undefined : obj[key]
})

let _length = _get('length')
// 다시 맨 아래로 이사 감
// function _each(list, iter) {
//   for (let i = 0, len = _length(list); i < len; i++) {
//     iter(list[i])
//   }
//   return list
// }

let user1 = users[0]
console.log(user1.name)
console.log(_get(user1, 'name'))
console.log(_get('name')(user1))

let get_name = _get('name')
console.log(get_name(user1))
console.log(get_name(users[3]))
console.log(get_name(users[4]))

console.log(
  _map(
    _filter(users, function (user) {return user.age >= 30}),
    _get('name')))

console.log(
  _map(
    _filter(users, function (user) {return user.age < 30}),
    _get('age')))

// console.log(users[10].name)


/* 5. _reduce 만들기 */
let slice = Array.prototype.slice
function _rest(list, num) {
  return slice.call(list, num || 1)
}

function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0]
    list = _rest(list)
  }
  _each(list, function (val) {
    memo = iter(memo, val)
  })
  return memo
}

console.log(
  _reduce([1, 2, 3], add, 10))

console.log(
  _reduce([1, 2, 3, 4], add))




/* 6. 파이프라인 만들기 */
// 1. _pipt
function _pipe() {
  let fns = arguments
  return function (arg) {
    return _reduce(fns, function (arg, fn) {
      return fn(arg)
    }, arg)
  }
}

let f1 = _pipe(
  function (a) { return a + 1},
  function (a) { return a * 2},
  function (a) { return a * a},
)

console.log(f1(1))

// 2. _go
function _go(arg) {
  let fns = _rest(arguments)
  _pipe.apply(null, fns)(arg)
}
_go(1,
  function (a) { return a + 1},
  function (a) { return a * 2},
  function (a) { return a * a},
  console.log)

console.log(
  _map(
    _filter(users, function (user) {return user.age >= 30}),
    _get('name')))

console.log(
  _map(
    _filter(users, function (user) {return user.age < 30}),
    _get('age')))

_go(users,
  function (users) {
    return _filter(users, function (user) {
      return user.age >= 30
    })
  },
  function (users) {
    return _map(users, _get('name'))
  }, console.log)

_go(users,
  function (users) {
    return _filter(users, function (user) {
      return user.age < 30
    })
  },
  function (users) {
    return _map(users, _get('age'))
  }, console.log)

_map = _curryr(_map), _filter = _curryr(_filter)

console.log(_map([1, 2, 3], function (val) { return val * 2}))

console.log(_map(function (val) { return val * 2})([1, 2, 3]))

// 3. users에 _go 적용
_go(users,
  function (users) {
    return _filter(users, function (user) {
      return user.age >= 30
    })
  },
  function (users) {
    return _map(users, _get('name'))
  }, console.log)

_go(users,
  _filter(function (user) { return user.age >= 30}),
  _map(_get('name')),
  console.log)

_go(users,
  _filter(function (user) { return user.age < 30}),
  _map(_get('age')),
  console.log)

_go(users,
  _filter(user => user.age >= 30),
  _map(_get('name')),
  console.log)

_go(users,
  _filter(user => user.age < 30),
  _map(_get('age')),
  console.log)


/* 7. _each의 외부 다형성 높이기 */
// 1. _each에 null 넣어도 에러 안나게
_each(null, console.log)

// 2. _keys 만들기
// 3. _keys에서도 _is_object인지 검사하여 null 에러 안나게
console.log(_keys({name: 'ID', age: 33}))
console.log(_keys([1, 2, 3, 4]))
console.log(_keys(10))
console.log(_keys(null))

function _is_object(obj) {
  return typeof obj === 'object' && !!obj
}
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : []
}
// 4. _each 외부 다형성 높이기
function _each(list, iter) {
  let keys = _keys(list)
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]])
  }
  return list
}

_each({13: 'ID', 19: 'HD', 29: 'YG'},
  function (name) {
    console.log(name)
  })
