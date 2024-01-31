using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class DepartamentoController : ControllerBase
{
    private readonly DeptContext _context;

    public DepartamentoController(DeptContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Departamento>> Get()
        => await _context.Departamentos.ToListAsync();


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var departamento = await _context.Departamentos.FindAsync(id);
        return departamento == null ? NotFound() : Ok(departamento);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Departamento departamento)
    {
        await _context.Departamentos.AddAsync(departamento);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = departamento.Id }, departamento);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Departamento departamento)
    {
        if (id != departamento.Id) return BadRequest();

        _context.Entry(departamento).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var departamentoToDelete = await _context.Departamentos.FindAsync(id);
        if (departamentoToDelete == null) return NotFound();

        _context.Departamentos.Remove(departamentoToDelete);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}





