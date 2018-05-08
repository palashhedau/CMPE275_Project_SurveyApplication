require('aws-sdk/dist/aws-sdk');

export class HelperService{
  saveToS3(imageFile, foldername: string, cb){
    const image = imageFile;

    const AWSService = (<any>window).AWS;
    const folder = foldername + '/';

    const final_imagename = this.getFileName(image);

    AWSService.config.accessKeyId = 'AKIAIJQ7IVQFSUQRBNEA';
    AWSService.config.secretAccessKey = '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';

    const bucket = new AWSService.S3({params: {Bucket: 'surveyimageupload'}});
    const params = {Key: final_imagename  , Body: image};

    bucket.upload(params, function (err, data) {
      cb(data.Location);
    });
  }

  deletefromS3(filename: string){}

  getFileName(image){
    const extension_index = image.name.lastIndexOf('.');
    const imagename = image.name.substring(0, extension_index);
    const extension = image.name.substring(extension_index, image.name.length);
    const final_imagename = imagename + new Date().toISOString() + extension;
    return final_imagename;
  }

}
