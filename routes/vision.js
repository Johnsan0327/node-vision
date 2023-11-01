var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIARAR74F5B2ZJFROOU',
  secretAccessKey: '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',
  region: 'ap-southeast-1'
});

const rekognition= new AWS.Rekognition();


router.post('/classify', async function (req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  //let response = ["shoe", "red", "nike", "johnsan"];
  console.log(req.files.file)
  // Your code starts here //
  try {
    const imageBuffer = req.files.file.data;

    if (!imageBuffer){
      return res.status(400).json({error:'Image is missing in the body.....'})
    }

    const changeImage = Buffer.from(imageBuffer, 'base64')
    const params = {
      Image: {
        Bytes: changeImage
      }
    };
    const resuts = await rekognition.detectLabels(params).promise();
    console.log(resuts)
    const labels = resuts.Labels.map((label)=>label.Name)
    res.json({
      "labels": labels
    });
  } catch (error){
    console.error('Error on dettecting the labels', error);
    res.status(500)
        .json({error: 'Label Detection was failed'})
  }
  // Your code ends here //


});

module.exports = router;
