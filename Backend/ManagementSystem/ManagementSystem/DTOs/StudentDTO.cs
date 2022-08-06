using System;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.DTOs
{
    public class StudentDTO
    {
        public int StudentId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string ContactPerson { get; set; }
        [Required]
        public string ContactNo { get; set; }
        [Required]
        public string Email { get; set; }
        public string Dateofbirth { get; set; }
        [Required]
        public int Age { get; set; }
        public int ClassroomID { get; set; }
        public string ClassroomName { get; set; }

    }
}
