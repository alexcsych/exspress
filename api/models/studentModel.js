const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    group: {
      type: String
    },
    photo: {
      type: String
    },
    mark: {
      type: Number
    },
    isDonePr: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Students', StudentSchema)
