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
    public class AllocateSubjectsController : ControllerBase
    {
        private readonly DataContext _context;

        public AllocateSubjectsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocateSubjectDTO>>> GetallocateSubjects()
        {

            return await _context.allocateSubjects
                        .Join(_context.subjects, s => s.SubjectID, sb => sb.SubjectID, (s, sb) => new { s, sb })
                        .Join(_context.teachers, asb => asb.s.TeacherId, t => t.TeacherId, (asb, t) => new { asb, t})
                        .Select(m => new AllocateSubjectDTO
                        {
                            AllocateSubjectID = m.asb.s.AllocateSubjectID,
                            SubjectName = m.asb.sb.SubjectName,
                            TeacherName = m.t.FirstName,
                        })
                        .ToListAsync();


             
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AllocateSubject>> GetAllocateSubject(int id)
        {
            var allocateSubject = await _context.allocateSubjects.FindAsync(id);

            if (allocateSubject == null)
            {
                return NotFound();
            }

            return allocateSubject;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllocateSubject(int id, AllocateSubject allocateSubject)
        {
            if (id != allocateSubject.AllocateSubjectID)
            {
                return BadRequest();
            }

            _context.Entry(allocateSubject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllocateSubjectExists(id))
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
        public async Task<ActionResult<AllocateSubject>> PostAllocateSubject(List<AllocateSubject> allocateSubject)
        {
            await _context.allocateSubjects.AddRangeAsync(allocateSubject);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetallocateSubjects", new { }, allocateSubject);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AllocateSubject>> DeleteAllocateSubject(int id)
        {
            var allocateSubject = await _context.allocateSubjects.FindAsync(id);
            if (allocateSubject == null)
            {
                return NotFound();
            }

            _context.allocateSubjects.Remove(allocateSubject);
            await _context.SaveChangesAsync();

            return allocateSubject;
        }

        private bool AllocateSubjectExists(int id)
        {
            return _context.allocateSubjects.Any(e => e.AllocateSubjectID == id);
        }
    }
}
