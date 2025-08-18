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

    public VeiculoController(ILogger<VeiculoController> logger, VeiculoService service, IWebHostEnvironment env)
    {
        _logger = logger;
        _service = service;

    }

    [HttpPost("Cadastrar")]
    public async Task<ActionResult<Veiculo>> Cadastrar(InsertVeiculoRequest veiculo)
    {
        try
        {
            var insertedVehicle = await _service.AddVeiculo(veiculo);

            return Ok(insertedVehicle);
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

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult> DeleteVeiculoAsync(int id)
    {
        try
        {
            await _service.DeleteVeiculo(id);

            return Ok();
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }
}

