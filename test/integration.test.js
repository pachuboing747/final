const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requestor = supertest('http://localhost:8080')

// INTEGRACION DE PRUEBAS

describe('Integration - Tests', () => {

    // TEST DE PRODUCTS
    describe('Product', () => {

        let adminSession // Variable para almacenar la sesión del administrador

        // Antes de cada prueba, inicia sesión como administrador
        beforeEach(async () => {
            // Realiza un proceso de inicio de sesión de administrador y guarda la sesión
            const loginResponse = await requestor
                .post('/login') // Ruta de inicio de sesión
                .send({
                    email: 'pachu1982721@gmail.com',
                    password: 'contraseña'
                });

            adminSession = loginResponse.header['set-cookie'][0];
        });

        let idProduct

        it('Product - /POST', async () => {
            const product = {
                title: "camiseta Boca Juniors",
                description:  "Esta prenda titular, vuelve al modelo iconico de los 90",
                code: 'a288',
                price: 20000,
                stock: 100,
                thumbnail:"data:image/jpeg;base64,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",
                owner: 'admin'
            }

            const { statusCode, ok, _body: { payload } } = await requestor.post('/api/products').set('Cookie', adminSession).send(product)

            idProduct = payload._id
            expect(payload.status).to.be.true
            expect(statusCode).to.be.equal(201)

            console.log(`Este es el id del producto que luego se eliminara: ${idProduct}`)
        })

        it('Product - /GET', async () => {
            const { _body: { status, payload } } = await requestor.get('/api/products')

            expect(status).to.be.equal('success')
            expect(Array.isArray(payload)).to.be.true

        })

        it('Product - /DELETE', async () => {

            const response = await requestor.del(`/api/products/${idProduct}`).set('Cookie', adminSession)

            expect(response.statusCode).to.be.equal(200)

            const { _body: { payload } } = await requestor.get('/api/products')

            const productDeleted = payload.find(p => p._id == idProduct)

            expect(productDeleted).to.be.undefined

        })
    })

    // TEST CART
    describe('Cart', () => {

        let idCart

        it('Cart - /POST', async () => {

            const cart = {
                user: '6511e76c922311fc5fcbc50a',
                products: []
            }

            const { statusCode, ok, _body: { payload } } = await requestor.post('/api/carts').send(cart)

            idCart = payload._id
            expect(statusCode).to.be.equal(201)

            console.log(`Este es el id del carrito que luego se eliminara: ${idCart}`)
        })

        it('Cart - /GET', async () => {

            const { _body } = await requestor.get('/api/carts')

            expect(Array.isArray(_body)).to.be.true

        })

        it('Cart - /DELETE', async () => {

            const response = await requestor.del(`/api/carts/${idCart}/delete`)

            expect(response.statusCode).to.be.equal(202)

            const { _body }  = await requestor.get('/api/carts')

            const cartDeleted = _body.find(c => c._id == idCart)
            
            expect(cartDeleted).to.be.undefined

        })
    })

    // TEST USER
    describe('User', () => {
        let idUser
        const userFail = {
            firstname: 'Juan Roman',
            lastname: 'Riquelme',
            email: 'jrriquelme@gmail.com',
            age: 30,
            password: 'jrr10',
        }
        const user = {
            firstname: 'Martin',
            lastname: 'Palermo',
            email: 'mpalermo@gmail.com',
            role: 'Customer',
            age: 30,
            password: 'palermo9',
        }

        it('User - /POST', async () => {

            const { statusCode, ok, _body: { payload } } = await requestor.post('/api/users').send(user)

            idUser = payload._id
            expect(statusCode).to.be.equal(201)

            console.log(`El usuario se creo con el id: ${idUser}`)
        })

        it('User - /POST - 400', async () => {

            const { statusCode } = await requestor.post('/api/users').send(userFail)

            expect(statusCode).to.be.equal(400)
        })

        it('User - /GET', async () => {

        const { _body } = await requestor.get('/api/users')

        expect(Array.isArray(_body)).to.be.true

        })

        it('User - /DELETE', async () => {

            const response = await requestor.del(`/api/users/${idUser}`)

            expect(response.statusCode).to.be.equal(202)

            const { _body }  = await requestor.get('/api/users')

            const userDeleted = _body.find(u => u._id == idUser)
            
            expect(userDeleted).to.be.undefined

        })
    })
})