using Amazon.Runtime.Internal.Endpoints.StandardLibrary;
using Amazon.S3.Model;
using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.RequestModels;
using Inlog.Desafio.Backend.Infra.Database.Repositories;
using Microsoft.Extensions.Configuration;
using System.Security.AccessControl;

namespace Inlog.Desafio.Backend.Application
{
    public class VeiculoService
    {
        private IVeiculoRepository _repository;
        private S3Service _s3Service;
        private IConfiguration _config;

        public VeiculoService(IVeiculoRepository repository, S3Service s3Service, IConfiguration config)
        {
            _config = config;
            _repository = repository;
            _s3Service = s3Service;
        }

        public async Task<Veiculo> AddVeiculo(InsertVeiculoRequest veiculoRequest)
        {
            if (!string.IsNullOrWhiteSpace(veiculoRequest.ImageBase64))
            {
                var bucketUrl = _config["MinioUrl"];
                var bucketName = _config["MinioBucketName"];

                using var stream = new MemoryStream(Convert.FromBase64String(veiculoRequest.ImageBase64));

                var putRequest = new PutObjectRequest
                {
                    BucketName = bucketName,
                    Key = veiculoRequest.Placa,
                    InputStream = stream,
                    ContentType = "image/png"
                };

                await _s3Service.UploadImageAsync(putRequest);

                var url = $"{bucketUrl}/{bucketName}/{veiculoRequest.Placa}";

                veiculoRequest.ImageUrl = url;
            }            

            return await _repository.Insert(veiculoRequest.ToModel());
        }

        public async Task<List<Veiculo>> ReadAllVeiculos()
        {
            return await _repository.ReadAll();
        }

        public async Task DeleteVeiculo(int id)
        {
            await _repository.DeleteById(id);
        }
    }
}
