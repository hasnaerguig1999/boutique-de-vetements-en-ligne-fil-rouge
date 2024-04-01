import request from "supertest";
import { app } from "../server";
import sequelize from "../config/database";

describe("productController", () => {
    let user;
    let product;
    let category

    beforeAll(async () => {
        const res = await request(app).post('/auth/login').send({
            email: "admin@gmail.com",
            password: "admin"
        });
        user = res.body;
        const cat = await request(app).post("/categories").send({
            name: "test",
            description: "test",
            image: "test"
        }).set('Authorization', `Bearer ${user.token}`);
        category = cat.body;
    });

    afterAll((done) => {
        sequelize.close().then(() => done());
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                title: "test",
                description: "test",
                image: "test",
                price: 100.0,
                oldPrice: 120.0,
                quantity: 10,
                inStock: true,
                categoryId: category.id
            })
            .set('Authorization', `Bearer ${user.token}`);
        // console.log(user.token);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            title: expect.any(String),
            description: expect.any(String),
            image: expect.any(String),
            price: expect.any(Number),
            oldPrice: expect.any(Number),
            quantity: expect.any(Number),
            inStock: expect.any(Boolean),
            categoryId: expect.any(Number),
        });
        product = response.body;
    });
    it("should get all products", async () => {
        const response = await request(app).get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }

    );
    it("should get a product by id", async () => {
        const response = await request(app).get(`/products/${product.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: expect.any(String),
            description: expect.any(String),
            image: expect.any(String),
            price: expect.any(Number),
            oldPrice: expect.any(Number),
            quantity: expect.any(Number),
            inStock: expect.any(Boolean),
            categoryId: expect.any(Number),
        });

        
        
       
    }
    );
    it("should delete a product", async () => {
        const response = await request(app)
            .delete(`/products/${product.id}`)
            .set('Authorization', `Bearer ${user.token}`);
        expect(response.status).toBe(204);
        const getProductResponse = await request(app).get(`/products/${product.id}`);
        expect(getProductResponse.status).toBe(404);
    });

   
        

  



});