using Inlog.Desafio.Backend.Application;
using Inlog.Desafio.Backend.Domain.Models;
using Inlog.Desafio.Backend.Domain.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace Inlog.Desafio.Backend.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class VeiculoController : ControllerBase
{
    private VeiculoService _service { get; set; }

    private readonly ILogger<VeiculoController> _logger;

    private readonly IWebHostEnvironment _env;

    public VeiculoController(ILogger<VeiculoController> logger, VeiculoService service, IWebHostEnvironment env)
    {
        _logger = logger;
        _service = service;
        _env = env;
        _env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

    }

    [HttpPost("Cadastrar")]
    public async Task<ActionResult<Veiculo>> Cadastrar(InsertVeiculoRequest veiculo)
    {
        try
        {
            var url = $"{Request.Scheme}://{Request.Host}/images/{veiculo.Placa}.png";

            await _service.AddVeiculo(veiculo, _env.WebRootPath, url);

            return Ok(veiculo);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }

    [HttpGet("Listar")]
    public async Task<ActionResult<List<Veiculo>>> ListarVeiculosAsync()
    {
        try
        {
            var veiculos = await _service.ReadAllVeiculos();

            return Ok(veiculos);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }
}

