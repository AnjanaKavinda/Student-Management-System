using ManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ClassroomTeacher>()
                .HasKey(ct => new { ct.ClassroomID, ct.TeacherId});

            modelBuilder.Entity<ClassroomTeacher>()
                .HasOne(c => c.classrooms)
                .WithMany(ct => ct.classroomTeachers)
                .HasForeignKey(b => b.ClassroomID);

            modelBuilder.Entity<ClassroomTeacher>()
                .HasOne(t => t.Teachers)
                .WithMany(ct => ct.classroomTeachers)
                .HasForeignKey(t => t.TeacherId);
        }

        public DbSet<Student> students{ get; set; }
        public DbSet<Teacher> teachers{ get; set; }
        public DbSet<Subject> subjects{ get; set; }
        public DbSet<Classroom> classrooms{ get; set; }
        public DbSet<AllocateClassroom> allocateClassrooms{ get; set; }
        public DbSet<AllocateSubject> allocateSubjects{ get; set; }
    }
}
