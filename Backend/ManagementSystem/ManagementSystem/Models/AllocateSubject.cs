using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ManagementSystem.Models
{
    public class AllocateSubject
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AllocateSubjectID { get; set; }
        public int TeacherId { get; set; }
        public int SubjectID { get; set; }
        public Teacher Teachers { get; set; }
        public Subject Subjects { get; set; }
    }
}
