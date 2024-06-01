const request = require('supertest');
const app = require('../index.js');
const bcrypt = require('bcrypt')


describe('Security Service Unit test', () => {
    it('should create a new User ', async () => {
        const newItem = {
        
   
                "firstName": 'maissa',
                "lastName": 'salah',
                "email": 'maissa@gmail.com',
                "password": '123456',
                "checkPassword": '123456',
                "phone": '98776543'
            
     
        };
        const res = await request(app)
            .post('/api/auth/register')
            .send(newItem);
        console.log(res.body);
        expect(res.statusCode).toEqual(400)?.or.toEqual(201);
        if (res.statusCode === 201) {
            expect(res.body).toEqual('Registration successful');
        }
    });


     
    it('should  get list of User ', async () => {
        const res = await request(app).get('/api/user/getUserList');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0); 
    })
 
});



