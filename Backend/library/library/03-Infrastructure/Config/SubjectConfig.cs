using library._01_Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace library._03_Infrastructure.Config
{


    public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
    {
        public void Configure(EntityTypeBuilder<Subject> builder)
        {
            builder.HasKey(s => s.id);
            builder.Property(s => s.name).IsRequired();

            builder.HasOne(s => s.parent)
                   .WithMany(s => s.children)
                   .HasForeignKey(s => s.parentId)
                   .OnDelete(DeleteBehavior.Restrict); // یا Cascade اگر مایلید همه حذف شوند

            // مانند اعلام کردن یک دیسکریمیناتور برای اینتیتی
            builder.HasDiscriminator<int>("SubjectType")
                   .HasValue<Subject>(0);
            //.HasValue<AnotherTypeOfSubject>(1); // اعلام یک انواع یک انتیتی دیگر

            // این نکته کاراکتریستیک مهمی برای دی تابلی 

            builder.HasOne(s => s.parent)
                   .WithMany(s => s.children)
                   .HasForeignKey(s => s.parentId)
                   .OnDelete(DeleteBehavior.Cascade); // یا اینجا Protective

            builder.Navigation(s => s.parent)
                   .UsePropertyAccessMode(PropertyAccessMode.Property); // یا Field در صورتی که میل به استفاده از فیلدهای public داشته باشید

            builder.HasMany(a => a.Books)
                .WithOne(a => a.subject)
                .HasForeignKey(a => a.subjectId);
        }
    }

}
