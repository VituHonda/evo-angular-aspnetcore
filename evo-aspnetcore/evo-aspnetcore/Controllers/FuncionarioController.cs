
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class FuncionarioController : ControllerBase
{
    private readonly DeptContext _context;

    public FuncionarioController(DeptContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Funcionario>> Get()
        => await _context.Funcionarios.ToListAsync();


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var funcionario = await _context.Funcionarios.FindAsync(id);
        return funcionario == null ? NotFound() : Ok(funcionario);
    }

    [HttpGet("ByDepartment/{departmentId}")]
    public async Task<IActionResult> GetByDepartment(int departmentId)
    {
        var funcionariosDoDepartamento = await _context.Funcionarios
            .Where(f => f.DepartamentoId == departmentId)
            .ToListAsync();

        return funcionariosDoDepartamento.Any() ? Ok(funcionariosDoDepartamento) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Create(Funcionario funcionario)
    {
        await _context.Funcionarios.AddAsync(funcionario);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = funcionario.Id }, funcionario);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Funcionario funcionario)
    {
        if (id != funcionario.Id) return BadRequest();

        _context.Entry(funcionario).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var funcionarioToDelete = await _context.Funcionarios.FindAsync(id);
        if (funcionarioToDelete == null) return NotFound();

        _context.Funcionarios.Remove(funcionarioToDelete);
        await _context.SaveChangesAsync();

        return NoContent();
    }


}

