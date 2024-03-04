using library._01_Domain.Entities;
using library._01_Domain.Interfaces;
using library._03_Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;

namespace library._02_Application.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDbContext _cntxt = new LibraryDbContext();

        public async Task<bool> AddSubject(Subject subject)
        {
            await _cntxt.subjects.AddAsync(subject);
            _cntxt.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateSubject(Subject subject)
        {
            _cntxt.subjects.Update(subject);
            _cntxt.SaveChanges();
            return true;
        }

        public async Task<bool> save(Book book)
        {
            bool isEditMode = await _cntxt.books.AnyAsync(x => x.id == book.id);
            if (isEditMode)
            {
                _cntxt.books.Update(book);
            }
            else
            {
                _cntxt.books.Add(book);
            }
            _cntxt.SaveChanges();
            return true;
        }

        public async Task<Book[]> Search(string value)
        {
            Book[] books = await _cntxt.books.Where(x => x.name.Contains(value) || x.subject.Contains(value) || x.language.Contains(value) || x.code.Contains(value) || x.author.Contains(value)).ToArrayAsync();
            return books;
        }

        public async Task<List<Subject>> GetAllSubjects()
        {
            //Subject[] subjects = await _cntxt.subjects.Where(x=>x.parentId==null).ToArrayAsync();
            //return subjects;
            //var allSubjects =  _cntxt.subjects.Include(s => s.children).ToList();
            //var allSubjects = await _cntxt.subjects.AsNoTracking().Include(s => s.children).ToListAsync();
            //var allSubjects = await _cntxt.subjects.ToListAsync();

            //return allSubjects;
            //var subjects = _cntxt.subjects.Include(x => x.children).ToList();


            //var topLevelSubjects =_cntxt. subjects.Where(x => x.parentId == null).ToList();
            //return topLevelSubjects;

            var location1 = await _cntxt.subjects.Include(s => s.children)
                                      .ThenInclude(c => c.children).ToListAsync();
            //.FirstOrDefaultAsync(s => s.name == "Iran");

            //var subjects = await _cntxt.subjects.Include(s => s.children).ToListAsync();
            //return subjects;
            return location1;
        }
        public async Task<bool> AddSubjects()
        {
            var subject1 = new Subject { name = "Iran" };
            var subject2 = new Subject { name = "Tehran" };
            var subject3 = new Subject { name = "Karaj" };
            var subject4 = new Subject { name = "Isfahan" };

            subject1.children = new List<Subject> { subject2, subject4 };
            subject2.children = new List<Subject> { subject3 };

            _cntxt.subjects.AddRange(subject1, subject2, subject3, subject4);
            _cntxt.SaveChanges();
            return true;
        }

        public async Task<string> GenerateCode()
        {



            //var maxCodeSubject = await _cntxt.subjects.OrderByDescending(x => x.code).FirstOrDefaultAsync();
            var maxCodeSubject = "";
            if (maxCodeSubject != null)
            {
                //return (Convert.ToInt32(maxCodeSubject.code) +1).ToString(); // فرضا فیلد SubjectName برای نام موضوع استفاده شده است
            }
            return "1400";
        }

        public async Task<bool> SaveSubject(Subject subject)
        {
            bool isEditMode = await _cntxt.subjects.AnyAsync(x => x.id == subject.id);
            if (isEditMode)
            {
                _cntxt.subjects.Update(subject);
            }
            else
            {
                _cntxt.subjects.Add(subject);
            }
            _cntxt.subjects.Add(subject);
            _cntxt.SaveChanges();
            return true;
        }
    }
}
