require('aws-sdk/dist/aws-sdk');

export class HelperService{
  saveToS3(imageFile, foldername: string, cb){
    const image = imageFile;
    const AWSService = (<any>window).AWS;
    const folder = foldername + '/';

    AWSService.config.accessKeyId = 'AKIAIJQ7IVQFSUQRBNEA';
    AWSService.config.secretAccessKey = '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';

    const bucket = new AWSService.S3({params: {Bucket: 'surveyimageupload'}});
    const params = {Key: folder + image.name + new Date().toISOString()  , Body: image};

    bucket.upload(params, function (err, data) {
      cb(data.Location)
    });
  }

  deletefromS3(filename: string){}
}
