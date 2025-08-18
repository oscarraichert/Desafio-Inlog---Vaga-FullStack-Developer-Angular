using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;

namespace Inlog.Desafio.Backend.Application
{
    public class S3Service
    {
        private AmazonS3Client _s3Client;

        public S3Service()
        {
            
        }

        public S3Service(IConfiguration config)
        {            
            var minioUrl = config["MINIO_CONTAINER"];
            var minioUsername = config["MINIO_USERNAME"];
            var minioSecret = config["MINIO_SECRET"];
            _s3Client = new AmazonS3Client(
                minioUsername,
                minioSecret,
                new AmazonS3Config
                {
                    ServiceURL = minioUrl,
                    ForcePathStyle = true
                }
            );
        }

        public async Task UploadImageAsync(PutObjectRequest putRequest)
        {
            var response = await _s3Client.PutObjectAsync(putRequest);
        }
    }
}
