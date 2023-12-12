const { S3 } = require("@aws-sdk/client-s3");

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: "https://blr1.digitaloceanspaces.com",
    region: "blr1",
    credentials: {
      secretAccessKey: 'oxgcz04JUHOJ1fcxAfrz2uk1CGfxr9AlX5zOTkfFi+U', // Replace with your access key
        accessKeyId: 'DO009ZYYNFA3TDZ6XKEW', // Replace with your secret key
    }
});

module.exports = { s3Client };
