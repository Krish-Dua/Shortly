const shortid =require('shortid');
const Url=require('../model/url.model.js');


const genUniqueShortid = async () => {
  let shortedId;
  let existingUrl;

  do {
    shortedId = shortid.generate(4).slice(0, 5); 
    existingUrl = await Url.findOne({ shortid: shortedId });
  } while (existingUrl);

  return shortedId;
}

module.exports = {
  genUniqueShortid
}
