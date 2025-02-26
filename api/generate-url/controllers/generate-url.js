const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client } = require('../../../config/s3Config');

module.exports = {
  async generateDownloadUrl(ctx) {
    const { fileName } = ctx.request.body
    console.log(ctx.request.body, 'ctx');

    try {
      console.log('try');
      const bucketParams = {
        Bucket: 'incudash',
        Key: fileName,
        // ContentType:'',
      };

      const url = await getSignedUrl(
        s3Client,
        new GetObjectCommand(bucketParams),
        { expiresIn: 900 } // 15 minutes expiration
      );

      ctx.send({ url });
    } catch (error) {
      console.error('Error generating download URL:', error);
      ctx.status = 500;
      ctx.send({ error: 'Internal Server Error' });
    }
  },

  async generateUploadUrl(ctx) {
    try {
      const { name, type } = ctx.request.body;
      console.log(name, type);
      const bucketParams = {
        Bucket: 'incudash',
        Key: name,
        ContentType: type,
      };

      const url = await getSignedUrl(
        s3Client,
        new PutObjectCommand(bucketParams),
        { expiresIn: 900 }
      );

      ctx.send({ url });
    } catch (error) {
      console.error('Error generating upload URL:', error);
      ctx.status = 500;
      ctx.send({ error: 'Internal Server Error' });
    }
  }
};
