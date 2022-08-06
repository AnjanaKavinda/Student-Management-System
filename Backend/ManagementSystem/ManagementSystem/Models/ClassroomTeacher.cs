using System.Collections.Generic;

namespace ManagementSystem.Models
{
    public class ClassroomTeacher
    {
        public int ClassroomID { get; set; }
        public int TeacherId { get; set; }
        public virtual Classroom  classrooms { get; set; }
        public virtual Teacher Teachers { get; set; }
    }
}
