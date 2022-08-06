using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ManagementSystem.Models
{
    public class AllocateClassroom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AllocateClassroomId { get; set; }
        public int ClassroomID { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teachers { get; set; }
        public Classroom CLassrooms { get; set; }

    }
}
