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
    public class StudentsController : ControllerBase
    {
        private readonly DataContext _context;

        public StudentsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> Getstudents()
        {

            return await (from s in _context.students
                          join cl in _context.classrooms
                          on s.ClassroomID equals cl.ClassroomID
                          select new StudentDTO
                          {
                              StudentId = s.StudentId,
                              FirstName = s.FirstName,
                              LastName = s.LastName,
                              ContactPerson = s.ContactPerson,
                              ContactNo = s.ContactNo,
                              Email = s.Email,
                              Dateofbirth = s.Dateofbirth,
                              Age = s.Age,
                              ClassroomName = cl.ClassroomName,
                              ClassroomID = cl.ClassroomID,
                          }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDetailsDTO>> GetStudent(int id)
        {
            var student = await (from s in _context.students
                                      join cl in _context.classrooms
                                      on s.ClassroomID equals cl.ClassroomID
                                      where s.StudentId == id
                                      select new
                                      {
                                          StudentId = s.StudentId,
                                          ContactPerson = s.ContactPerson,
                                          ContactNo = s.ContactNo,
                                          Email = s.Email,
                                          Dateofbirth = s.Dateofbirth,
                                          ClassroomName = cl.ClassroomName,
                                          ClassroomID = cl.ClassroomID,
                                      }).FirstOrDefaultAsync();

            var teacher = await _context.allocateClassrooms.Where(e => e.ClassroomID == student.ClassroomID).ToListAsync();

            List<AllocateSubjectDTO> allocateSubjects = new List<AllocateSubjectDTO>();

            foreach (var item in teacher)
            {
                var alocateDetails = await _context.allocateSubjects.Where(e => e.TeacherId == item.TeacherId).ToListAsync();

                foreach (var details in alocateDetails)
                {
                    var subjectName = _context.subjects.Where(e => e.SubjectID == details.SubjectID).FirstOrDefaultAsync().Result.SubjectName;
                    var teacherName = _context.teachers.Where(e => e.TeacherId == details.TeacherId).FirstOrDefaultAsync().Result.FirstName;
                    allocateSubjects.Add( new AllocateSubjectDTO
                    {
                        SubjectName = subjectName,
                        TeacherName = teacherName,
                    });
                }

                
            }

            var studentDetails = new StudentDetailsDTO
            {
                StudentId = student.StudentId,
                ContactPerson = student.ContactPerson,
                ContactNo = student.ContactNo,
                Email = student.Email,
                Dateofbirth = student.Dateofbirth,
                ClassroomID = student.ClassroomID,
                ClassroomName = student.ClassroomName,
                allocateSubjects = allocateSubjects,

            };

            if (studentDetails == null)
            {
                return NotFound();
            }

            return studentDetails;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // POST: api/Students
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            _context.students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.StudentId }, student);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> DeleteStudent(int id)
        {
            var student = await _context.students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.students.Remove(student);
            await _context.SaveChangesAsync();

            return student;
        }

        private bool StudentExists(int id)
        {
            return _context.students.Any(e => e.StudentId == id);
        }
    }
}
