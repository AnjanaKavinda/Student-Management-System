using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManagementSystem.Data;
using ManagementSystem.Models;
using ManagementSystem.DTOs;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateClassroomsController : ControllerBase
    {
        private readonly DataContext _context;

        public AllocateClassroomsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocateClassroomDTO>>> GetallocateClassrooms()
        {

            return await _context.allocateClassrooms
                       .Join(_context.classrooms, a => a.ClassroomID, cl => cl.ClassroomID, (a, cl) => new { a, cl })
                       .Join(_context.teachers, tea => tea.a.TeacherId, t => t.TeacherId, (tea, t) => new { tea, t })
                       .Select(m => new AllocateClassroomDTO
                       {
                           AllocateClassroomId = m.tea.a.AllocateClassroomId,
                           ClassroomName = m.tea.cl.ClassroomName,
                           TeacherName = m.t.FirstName,
                       })
                       .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AllocateClassroom>> GetAllocateClassroom(int id)
        {
            var allocateClassroom = await _context.allocateClassrooms.FindAsync(id);

            if (allocateClassroom == null)
            {
                return NotFound();
            }

            return allocateClassroom;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllocateClassroom(int id, AllocateClassroom allocateClassroom)
        {
            if (id != allocateClassroom.AllocateClassroomId)
            {
                return BadRequest();
            }

            _context.Entry(allocateClassroom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllocateClassroomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<AllocateClassroom>> PostAllocateClassroom(List<AllocateClassroom> allocateClassroom)
        {
            await _context.allocateClassrooms.AddRangeAsync(allocateClassroom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetallocateClassrooms", new {}, allocateClassroom);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AllocateClassroom>> DeleteAllocateClassroom(int id)
        {
            var allocateClassroom = await _context.allocateClassrooms.FindAsync(id);
            if (allocateClassroom == null)
            {
                return NotFound();
            }

            _context.allocateClassrooms.Remove(allocateClassroom);
            await _context.SaveChangesAsync();

            return allocateClassroom;
        }

        private bool AllocateClassroomExists(int id)
        {
            return _context.allocateClassrooms.Any(e => e.AllocateClassroomId == id);
        }
    }
}
