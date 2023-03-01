
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
