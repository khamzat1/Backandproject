const request = require('supertest')
const config = require('config');
let server
const { Category } = require('../../models/category');
const { User } = require('../../models/user')

const mongoose = require('mongoose');
const { before } = require('lodash');

describe('/api/categores', () => {
    beforeEach(() => {
        server = require('../../index')
    });
    afterEach(async () => {
        server.close;
        await Category.remove({})
    });
    describe('GET /', () => {
        it('should return all categories', async () => {
            Category.collection.insertMany([
                { name: 'dasturlash' },
                { name: 'tarmoqlar' },
                { name: 'dizayn' }
            ])
            const response = await request(server).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body.some(cat => cat.name == 'dasturlash')).toBeTruthy()
        })

    });
    describe('GET /:id', () => {
        //  it('should return a category if valid id is given', async () => {
        //      const category = new Category({ name: 'suniy idrok' });
        //      await category.save()

        //      const response = await request(server).get('/api/categories' + category._id);
        //       expect(response.status).toBe(200)
        //      expect(response.body).toHaveProperty('name', 'suniy idrok')
        //  }) tugallammagan muammosi  topilgan masala
        it('should return a 404 if valid id is given', async () => {
            
            const response = await request(server).get('/api/categories/123');
            expect(response.status).toBe(404);
            
        })
     });
describe('POST /',()=>{
    let token;
    let name;


    //testlar uchun ishlatiladigan funksiyani bu yerda oldindan 
    //aniqlab olamiz va uni har bir test ichida alohida chaqiramiz

    const execuet = async()=>{
        return await request(server)
        .post('/api/categories')
        .set('x-auth-token',token)
        .send({name});
    }

    //beforeeach orqali hamma testni ishga tushirishdan oldin qilinadigan ish kodi yoziladi
    beforeEach(()=>{
        token = new User().generateAuthToken();
        name = 'dasturlash';
    })

    it('should return 401 if user is not logged in',async ()=>{
        token = '';
        const res = await execuet();
        expect(res.status).toBe(401);
    })
    it('should return 400 category name carakter',async ()=>{
        name = '12';
        const res = await execuet();
        expect(res.status).toBe(400);
    })
    it('should return 400 category name 50 carakter',async ()=>{
        name = new Array(52).join('c');
        const res = await execuet();
        expect(res.status).toBe(400);
    })
    it('should return 400 category name 50 carakter',async ()=>{
        await execuet;
        const category = await Category.find({name:'dasturlash'});
        expect(category).not.toBeNull();
    })
    it('should return 400 category name 50 carakter',async ()=>{
        const res =  await execuet();
        expect(res.body).toHaveProperty('_id')
        expect(res.body).toHaveProperty('name','dasturlash')
    })
})

})


//integreshin test bizga front bilan yoki databaseni ham backand
//bilan birga test qilish imkon beradi
//yana bir xususiyati bizga posrtmen bilan qiladigan ishimizni kod
//orqali qilishga imkonini beradi

//har bir testni ishga tushirishdan oldin server obyektini yaratib olamiza
    //bolmasi umumiy qilib import qilsak port band bulib qolishi hisobiga keyin tekshira olmay qolamiza
    //har bir test yakunlanishi bilan serverni portni yopishimiza tugri yul buladi