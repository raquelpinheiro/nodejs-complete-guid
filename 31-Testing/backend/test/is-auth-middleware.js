const expect = require('chai').expect;
const jsonwebtoken = require('jsonwebtoken');
const sinon = require('sinon'); // Mock / Stub library

const authMiddleware = require('../middleware/is-auth');

describe('AuthMiddleware', function () {

    it('should throw an error if no authorization header is present', function () {
        const req = {
            get: function (headerName) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
            'Not authenticated.'
        );
    });

    it('should throw an error if authorization header do not have a token', function () {
        const req = {
            get: function (headerName) {
                return 'bearer ';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
    });

    it('should throw an error if authorization header token do not have a userId', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer abcde';
            }
        };
        jsonwebtoken.verify = function(){
            return null;
        };

        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
    });

    // Using a mock to verify method
    it('should yield a userId after decoding the token', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer abcde';
            }
        };

        sinon.stub(jsonwebtoken, 'verify');
        jsonwebtoken.verify.returns({ userId: '12345'});

        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        expect(jsonwebtoken.verify.called).to.be.true;
        jsonwebtoken.verify.restore();
    });

});