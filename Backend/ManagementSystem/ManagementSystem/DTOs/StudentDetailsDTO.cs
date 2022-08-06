using ManagementSystem.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.DTOs
{
    public class StudentDetailsDTO
    {
        public int StudentId { get; set; }
        [Required]
        public string ContactPerson { get; set; }
        [Required]
        public string ContactNo { get; set; }
        [Required]
        public string Email { get; set; }
        public string Dateofbirth { get; set; }
        public int ClassroomID { get; set; }
        public string ClassroomName { get; set; }
        public ICollection<AllocateSubjectDTO> allocateSubjects{ get; set; }
    }
}
