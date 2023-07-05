## 1. JavaScript - A quick refresh ##

### 1.1 Declare variables and scopes ###
- ``var``: global scope
- ``let``: block scope local
- ``const``: block scope local

#### Global escope: inside a function block the value is override, the variable is the same ####
#### Block scope: inside a function block the variable is a new variable ####

### 1.2 Functions and arrow functions ###

Why to use arrow functions?
- Short way to write functions
- Because the word ``this`` witch is very important to attach functions into scope of another element/object

### 1.3 References types x array and objects ###

- References types like ``bool``, ``string`` and ``numbers`` are put on stack memory.
- They doesn't change value because they are a value on the memory. One variable receiving another reference type variable and the reference variable has your changing value, the variable copied doesn't the value

- Array and objects are put on heap memory. 
- They aren't immutable, allow changing your values, because they are a memory address. One variable receiving a array or object, and the object copied sufering change, so this variable also changing value.

### 1.4 Spread and Rest operators ###

The same dots ``...`` before an argument name function, although diferent purpose.

Spread operator: to copy an object or array, to have immutability.
Rest operator: to merge many arguments into array or receiving a lot arguments no specifying one by one.

### 1.5 Destructuring ###

Getting one or more attributes from object or array without access the ``object.attribute`` sintaxe.

### 6. Async code and Promises ###

- Code synchronous aren't block
- Code asynchronous is executed after synchronous code have done
- The asynchronous code is executed because the JavaScript knows that a callback function exists and this must be executed