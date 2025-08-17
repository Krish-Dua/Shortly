const Url=require('../model/url.model.js');
const isReachable = require('is-reachable');
const {genUniqueShortid}=require('../utils/gen_shortid.js')
const normalizeUrl = async () => {
    const { default: normalize } = await import('normalize-url')
    return normalize
  }
async function generateShortUrl(req, res){
    const {originalUrl}=req.body;
    try {
        if(!originalUrl){
            return res.status(400).json({sucess:false,message: 'No url provided'})
        }
        const ifReachable=await isReachable(originalUrl)
     if(!ifReachable){
        return res.status(400).json({sucess:false,message: 'please provide a valid url'})
     }
        const normalize = await normalizeUrl()
        const normalizedurl = normalize(originalUrl,{
            removeQueryParameters:false,
            stripWWW:true,
            removeTrailingSlash:true,
            stripProtocol: true
        })
        const ifUrlExists=await Url.findOne({originalUrl:normalizedurl})
        if(ifUrlExists){
            return res.json({
                sucess:true,
                message: 'URL already existed fetched and served',
                shortUrl:`${process.env.BASE_URI}/${ifUrlExists.shortid}`
            })
        }
        else{
            const shortid=await genUniqueShortid()
            await Url.create({
                originalUrl:normalizedurl,
                shortid,
            })
            res.json({
                sucess:true,
                 message:"shortUrl created and served",
                shortUrl:`${process.env.BASE_URI}/${shortid}`
            })
        }}
     catch(error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
    }
    async function redirect(req, res) {
        const { shortenid } = req.params;
      try {
          const url = await Url.findOne({ shortid: shortenid });
          if(!url) return res.status(404).json({sucess:false,message: 'Invalid url provided'})
            res.redirect(`https://${url.originalUrl}`)
      } catch(error) {
          console.error(error);
          res.status(500).json({error: 'Internal Server Error'})
      }
      }
      module.exports = { generateShortUrl, redirect }