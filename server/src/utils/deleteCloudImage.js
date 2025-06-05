const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
require('dotenv').config();

const deleteCloudImage = async (aid) => {
    const timestamp = Math.round((new Date).getTime()/1000);
    console.log("Timestamp: ", timestamp);

    const signature = cloudinary.utils.api_sign_request({
        asset_ids: aid,
        timestamp:timestamp,
    }, process.env.CLOUDINARY_SECRET);
    console.log("Signature: ", signature)

    const url = `${process.env.CLOUDINARY_API_URL}/image/destroy`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            signature: signature,
            timestamp: timestamp,
        }
    })
    console.log(response);
    const json = await response.json();
}

module.exports = deleteCloudImage;