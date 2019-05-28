require('../../db')
const mongoose = require('mongoose');
const CompanyModel = require('../../../server/models/Company');
const UserModel = require('../../../server/models/User');
const { UserNotFound } = require('../../../utils/variables/error')
const faker = require('faker');

const MockUser = {
    slugs: ['john-jonhson-jr', 'john-jonhson-jr-1', 'john'],
    findOne({ slug }) {
        if (this.slugs.includes(slug)) {
            return Promise.resolve({ id: 'id' });
        }

        return Promise.resolve(null);
    },
};

const MockCompany = [{
    name: faker.name.findName(),
    address: faker.address.streetAddress(),
    city: faker.random.number(),
    zip: faker.address.zipCode(),
    country: faker.address.country()
}]

describe('Add', () => {

    test.skip('Create with data', async () => {
        try {
            const BeforeCompanies = await CompanyModel.find({}).lean()

            const users = await UserModel.find({}).lean();
            await CompanyModel.add(Object.assign({ userId: users[0]._id }, MockCompany[0]));

            const AfterCompanies = await CompanyModel.find({}).lean()

            expect(BeforeCompanies.length).toBeLessThan(AfterCompanies.length)
        } catch (err) {
            expect(err).toBeTruthy();
            expect(err.message).toEqual(UserNotFound);
        }
    })
    test('Create without userId', async () => {
        try {
            await CompanyModel.add({});
        } catch (err) {
            expect(err).toBeTruthy();
            expect(err.message).toEqual(UserNotFound);
        }
    });
});

describe('Get', () => {
    test('Get a company with user', () => {
        const id = '5cebe81e8cc6086ee98e7f20';

        try {
            const company = getCompanyUser(id)
            console.log(company)
        } catch (err) {
            throw new Error(err.message)
        }
    })

    test('Get all company', () => {

    })

    test.skip('Delete a company', async () => {
        try {
            const BeforeCompanies = await CompanyModel.find({}).lean()
            await CompanyModel.deleteOne({ _id: BeforeCompanies[0]._id });
            const AfterCompanies = await CompanyModel.find({}).lean()

            expect(BeforeCompanies.length).toBeGreaterThan(AfterCompanies.length)
        } catch (err) {
            expect(err).toBeTruthy();
            expect(err.message).toEqual(UserNotFound);
        }
    })
})
