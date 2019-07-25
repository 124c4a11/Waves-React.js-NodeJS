const mongoose = require('mongoose');


const siteSchema = new mongoose.Schema({
  featured: {
    required: true,
    type: Array,
    default: []
  },

  siteInfo: {
    address: {
      type: String,
      default: 'Kramer 456'
    },

    hours: {
      type: String,
      default: 'Mon-Sun/9am-8pm'
    },

    phone: {
      type: String,
      default: '12345-34567'
    },

    email: {
      type: String,
      default: 'info@waves.com'
    }
  }
});


module.exports = mongoose.model('Site', siteSchema);
