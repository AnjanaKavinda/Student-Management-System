using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ManagementSystem.Models
{
    public class Classroom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClassroomID { get; set; }
        [Required]
        public string ClassroomName { get; set; }
        public virtual ICollection<Student> students{ get; set; }
        public virtual ICollection<ClassroomTeacher> classroomTeachers{ get; set; }

    }
}
