const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

class CenterOfInterestClass {
  static async getIdByName({ name }) {
    const centerOfInterest = await this.findOne({ name })
      .select('_id')
      .lean();
    if (!centerOfInterest) {
      throw new Error('CenterOfInterest not found');
    }
    return centerOfInterest._id;
  }

  static async getByName({ name }) {
    const centerOfInterest = await this.findOne({ name });
    if (!centerOfInterest) {
      throw new Error('CenterOfInterest not found');
    }
    return { centerOfInterest };
  }

  static async getAll() {
    const centersOfInterest = await this.find({});
    return { centersOfInterest };
  }

  static async add({ name }) {
    const centerOfInterest = await this.create({ name });
    return { centerOfInterest };
  }

  static async updateByName({ origName, newName }) {
    const centerOfInterest = await this.findOne({ name: origName });
    if (!centerOfInterest) {
      throw new Error('CenterOfInterest not found');
    }
    centerOfInterest.name = newName;
    await centerOfInterest.save();
    return { centerOfInterest };
  }

  static async deleteByName({ name }) {
    await this.deleteOne({ name });
  }
}

mongoSchema.loadClass(CenterOfInterestClass);

const CenterOfInterest = mongoose.model('CenterOfInterest', mongoSchema);

module.exports = CenterOfInterest;
