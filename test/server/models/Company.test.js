require('../../db')
const mongoose = require('mongoose');
const CompanyModel = require('../../../server/models/Company');
const UserModel = require('../../../server/models/User');
const { UserNotFound } = require('../../../utils/variables/error')

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
    name: 'myName',
    address: 'myAdress',
    city: 'myCity',
    zip: 1234,
    country: 'myCountry'
}]

describe('Add', () => {

    test('Create with data', async () => {
        try {
            const BeforeCompanies = await CompanyModel.find({})

            const users = await UserModel.findById('5cebe81e8cc6086ee98e7f20').lean();
            await CompanyModel.add(Object.assign({ userId: users._id }, MockCompany[0]));

            const AfterCompanies = await CompanyModel.find({})

            expect(BeforeCompanies.length).toBeLessThan(AfterCompanies.length)
        } catch (err) {
            expect(err).toBeTruthy();
            expect(err.message).toEqual(UserNotFound);
        }
    })
    // test('Create without userId', async () => {
    //     try {
    //         await CompanyModel.add({});
    //     } catch (err) {
    //         expect(err).toBeTruthy();
    //         expect(err.message).toEqual(UserNotFound);
    //     }
    // });
});
