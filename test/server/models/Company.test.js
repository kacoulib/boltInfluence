require('../../db')
const mongoose = require('mongoose');
const companyModel = require('../../../server/models/Company');
const userModel = mongoose.model('User');
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

describe('Add', () => {
    test('Create without userId', async () => {
        try {
            await companyModel.add({});
        } catch (err) {
            expect(err).toBeTruthy();
            expect(err.message).toEqual(UserNotFound);
        }
    });
});
