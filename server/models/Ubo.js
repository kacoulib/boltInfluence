const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const mongoSchema = new Schema(
  {
    user: {
      type: ObjectId,
      required: true,
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    nationality: String,
    birthday: Date,
    birthcity: String,
    birthcountry: String,
    mangopay: {
      id: {
        type: String,
        unique: true,
        sparse: true,
      },
    },
  },
  { timestamps: true },
);

class UboClass {
  static async getAllByUserId({ user }) {
    const ubos = await this.find({ user });
    return { ubos };
  }

  static async createOrUpdateManyByUserId({ user, ubos }) {
    const create = ubos
      .filter((ubo) => !ubo._id)
      .map((ubo) => ({
        insertOne: {
          document: { ...ubo, user },
        },
      }));
    const update = ubos
      .filter((ubo) => ubo._id)
      .map((ubo) => ({
        updateOne: {
          filter: { _id: ubo._id },
          update: {
            $set: { ...ubo, user },
          },
        },
      }));
    const ops = [...create, ...update];
    const results = await this.bulkWrite(ops, { ordered: false });
    // TODO: Handle results
    const { ubos: allUbos } = await this.getAllByUserId({ user });
    return { ubos: allUbos };
  }
}
mongoSchema.loadClass(UboClass);

const Ubo = mongoose.model('Ubo', mongoSchema);

module.exports = Ubo;
