# Course: NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno) #

## 1 - Introduction ##

### What's NodeJS? ###

- JavaScript running on the server

- A JavaScript runtime outside the browser running on a server/machine

- Allow doing things that the browser can't by security questions

- NodeJS uses v8 engine (write in C++) that compiles JavaScript for machine code, like other languages (Java, C#)

- Things to do with NodeJS: backend code, bussiness rules that doesn't stay on the client side. Access data into a database, authentication and authorization, process wich takes time and can to be asynchronous

- NodeJS also can be the server that redirects requests like Apache and Ngix

## 2 - JavaScript Refresher ##

:arrow_right: JavaScript - A quick refresh

### 2.1 Declare variables and scopes ###
- ``var``: global scope
- ``let``: block scope local
- ``const``: block scope local

#### Global escope: inside a function block the value is override, the variable is the same ####
#### Block scope: inside a function block the variable is a new variable ####

### 2.2 Functions and arrow functions ###

Why to use arrow functions?
- Short way to write functions
- Because the word ``this`` witch is very important to attach functions into scope of another element/object

### 2.3 References types x array and objects ###

- References types like ``bool``, ``string`` and ``numbers`` are put on stack memory.
- They doesn't change value because they are a value on the memory. One variable receiving another reference type variable and the reference variable has your changing value, the variable copied doesn't the value

- Array and objects are put on heap memory. 
- They aren't immutable, allow changing your values, because they are a memory address. One variable receiving a array or object, and the object copied sufering change, so this variable also changing value.

### 2.4 Spread and Rest operators ###

The same dots ``...`` before an argument name function, although diferent purpose.

2.4.1 Spread operator: to copy an object or array, to have immutability.
2.4.2 Rest operator: to merge many arguments into array or receiving a lot arguments no specifying one by one.

### 2.5 Destructuring ###

Getting one or more attributes from object or array without access the ``object.attribute`` sintaxe.

### 2.6 Async code and Promises ###

- Code synchronous aren't block
- Code asynchronous is executed after synchronous code have done
- The asynchronous code is executed because the JavaScript knows that a callback function exists and this must be executed

## 4. Dev Workflow and Debugging ##

### Install packages into two mode: development and production ###

- Development: the package is useful only during development phase
``npm install nodemon --save-dev``

- Prodution: the package will be used to executing application
``npm install nodemon --save``

- Global: the package will be installed on machine
``npm install -g nodemon``

``node_modules`` directory doesn't need to be versioned or shared. The modules can be restored and the directory recreated only executing ``npm install``

### npm commands ###

Add npm manager to the project
``npm start``

Restore packages e recreate the ``node_modules`` directory
``npm install``

## 9 - Dynamic routes and advanced models ##

Register a route with parameters:

```router.get('/products/:productId', shopController.getProduct);```

Different ways to pick up parameters:
- Parameter route: ```req.params.id```
- Body from html form: ```req.body.id```
- Query string: ```req.query.id```

## 10 - SQL Introduction ##

### Connecting MySql database using MySql2 package ###

``npm install --save mysql2 ``

1. **All SQL operations are done with code inline SQL**
1. You must have writing SQL statements on code and this give you a control about SQL commands


## 11. Sequelize ORM ##

Sequelize is a ORM - Object Relational Mapper like Entity Framework

1. **All SQL operations are done without code inline SQL**
1. You don't have writing SQL statements on code

### 11.1 Import package ###

Using a first capital letter, it will instance a class.

``` const Sequelize = require('sequelize'); ```
``` const instanceSequelize = new Sequelize();```

