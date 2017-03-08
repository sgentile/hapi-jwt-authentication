const
  Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Code = require('code'),
  server = require('../server');

//experiment === describe
lab.experiment('Users', () => {
 lab.test("main endpoint to list users without a token", (done) => {
   const options = {
     method: 'GET',
     url: '/api/users'
   };

   server.inject(options, (response) => {
     var result = response.result;
     console.log(JSON.stringify(result));
     Code.expect(response.statusCode).to.equal(401);
     Code.expect(result.error).to.equal('Unauthorized');
     Code.expect(result.message).to.equal('Missing authentication');
     // Code.expect(response.statusCode).to.equal(200);
     // Code.expect(result).to.be.instanceof(Array);
     // Code.expect(result).to.have.length(5);

     done();
   })
 });

 lab.test("getUsers with auth token", (done) => {
   const authOptions = {
     method: 'POST',
     url: '/api/users/authenticate',
     payload: {
         username:'sgentile',
         password: 'testing123'
       }
     };

     server.inject(authOptions, (response) => {
       var result = response.result;
       console.log(JSON.stringify(result));
       Code.expect(response.statusCode).to.equal(201);
       Code.expect(result.id_token).to.be.not.null();
       done();

       //now use the token to get the users....
       // const options = {
       //   method: 'GET',
       //   url: '/api/users',
       //
       // };
     });
 });
});