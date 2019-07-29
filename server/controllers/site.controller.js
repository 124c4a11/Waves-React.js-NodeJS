const Site = require('../models/site');


module.exports.getData = async (req, res) => {
  try {
    const site = await Site.find({});

    res.status(200).send(site[0].siteInfo);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};


module.exports.updateData = async (req, res) => {
  try {
    const doc = await Site.findOneAndUpdate(
      { name: 'Site' },
      { "$set": { siteInfo: req.body } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      siteInfo: doc.siteInfo
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, err });
  }
};
