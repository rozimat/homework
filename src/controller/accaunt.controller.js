
const  Io = require('../utils/io');
const Videos = new Io('./databases/videos.json');
const VideoModels = require('../models/Video');
const { v4 :uuid } = require("uuid");

const accaunt = async ( req, res)=>{
  res.render('accaunt');
  
}
const addpost = async (req,res)=>{
  try {
    const videosData = await Videos.read();
    const { title, hashteg } = req.body;
    const { video } = req.files;

    const id = uuid();
     
    const videoName = `${uuid()}.${video.mimetype.split("/")[1]}`;
    video.mv(`${process.cwd()}/videos/${videoName}`);

    const user_id = 1;

    const newVideo = new VideoModels(id, user_id, title, hashteg, videoName);

    const data = videosData.length ? [...videosData , newVideo] : [newVideo];
    
    await Videos.write(data);
    res.render('accaunt',{
      data
    });
    res.redirect('/api/accaunt')
    res.status(201).json({message: "Sucsessfully Created!"})

    } catch (error) {
      console.log(error);
    }
}






module.exports = {
  accaunt,
  addpost,

}



