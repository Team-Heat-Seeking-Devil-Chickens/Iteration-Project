//const app = require('../server/server.js');
const request = require('supertest');

const server = 'http://localhost:3000';


require("dotenv").config();


//Testing routes
describe('Route integration', () => {
    //testing route '/resturrants
    //testing methods in route and response 
    describe('/restaurants', () => {
        //testing get methods 
        describe(('GET'),()=>{ 

            it('responds with 200 status and json content type', () => {
                return request(server)
                  .get('/restaurants')
                  .expect('Content-Type', /json/)
                  .expect(200)
                  .then((res) => {
                    expect(typeof res).toBe('object'); // its reciving a string?
                    expect(Object.keys(res).length).toBeGreaterThan(0);
                  });
              });


            it('responds with json data in the body',  ()=>{
                return request(server)
                .get('/restaurants')
                .expect('Content-Type', /json/)
                .expect((res) => { 
                    expect(res.body.length).toBeGreaterThanOrEqual(0);
                })
            })

            it('bad routes respond with 404 status',  ()=>{
                return request(server)
                .get('/restauran')
                .expect(404)
                
            })
        });
    
        //testing post methods
        xdescribe('POST', ()=>{

            it(('responds with 404 for incorrect data fields'), ()=>{
                const badQuery = {
                    name: '',
                }
                return request(server)
                .post('/restaurants')
                .send(badQuery)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then((response) => {
                    expect(response.body).toHaveProperty('error');
                });
            })

            it(('responds with 200 for correct data fields'), ()=>{
                const restaurantQuery = {
                    name: 'Johnny Cakes',
                    cuisine: 'Japanese',
                    price_tier: 'splurge',

                }
                return request(server)
                .post('/restaurants')
                .send(restaurantQuery)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
                
        })

        })


    });

    xdescribe(('/reviews'), ()=>{
        describe(('GET'),()=>{

            it('responds with 200 status and json content type', ()=>{
              return request(server)
              .get('/reviews')
              .expect('Content-Type', /json/)
              .expect(200);
              });
  
  
              it('responds with json data in the body',  ()=>{
                  return request(server)
                  .get('/reviews')
                  .expect('Content-Type', /json/)
                  .expect((response) => {
                      expect(res.body.length).toBeGreaterThanOrEqual(1);
                  })
              })
  
              it('bad routes respond with 404 status',  ()=>{
                  return request(server)
                  .get('/reviews')
                  .expect(404)
              
              })
  
          });
     })

     xdescribe(('/signUp'), ()=>{
        describe(('POST'),()=>{

            it('', ()=>{
              return request(server)
              .get('/reviews')
              .expect('Content-Type', /json/)
              .expect(200);
              });
  
  
              it('',  ()=>{
                  return request(server)
                  .get('/reviews')
                  .expect('Content-Type', /json/)
                  .expect((response) => {
                      expect(res.body.length).toBeGreaterThanOrEqual(1);
                  })
              })
  
          });
     })

     xdescribe(('/login'), ()=>{
        describe(('GET'),()=>{

            it('should verification works ', ()=>{
              return request(server)
              .get('/reviews')
              .expect('Content-Type', /json/)
              .expect(200);
              });
  
  
              it('cookies are created',  ()=>{
                  return request(server)
                  .get('/reviews')
                  .expect('Content-Type', /json/)
                  .expect((response) => {
                      expect(res.body.length).toBeGreaterThanOrEqual(1);
                  })
              })
  
              it('bad routes respond with 404 status',  ()=>{
                  return request(server)
                  .get('/reviews')
                  .expect(404)
              
              })
  
          });
     })
      
});