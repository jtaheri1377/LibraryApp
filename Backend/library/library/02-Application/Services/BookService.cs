using library._01_Domain.Entities;
using library._01_Domain.Interfaces;
using library._03_Infrastructure.Repositories;
using library._05_CrosscuttingConcerns.Exceptions;
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
            Subject[] subjects = await _cntxt.subjects
                .Where(x => x.parentId == null && x.name.Contains(value)).ToArrayAsync();
            Book[] books1 = null;
            foreach (var item in subjects)
            {
                books1 = await _cntxt.books
                    .Where(x => x.code.Substring(0, 2) == item.code
                    || x.code.Substring(1, 2) == item.code
                    || x.code.Substring(3, 2) == item.code
                    ).ToArrayAsync();
            }

            Book[] books = await _cntxt.books.Where(x => x.name.Contains(value) || x.language.Contains(value) || x.code.Contains(value) || x.author.Contains(value)).ToArrayAsync();
            return books1.Concat(books).ToArray();
        }

        public async Task<List<Subject>> GetAllSubjects()
        {
            var location10 = await _cntxt.subjects
         .Where(a => a.parentId == null)
         .Include(s => s.children)
         .ThenInclude(c => c.children)
         .ThenInclude(cc => cc.children)
         .ThenInclude(ccc => ccc.children)
         .ThenInclude(cccc => cccc.children)
         .ToListAsync();

            //    //var includePath = "children.children.children.children";
            //    //var location1 = await _cntxt.subjects
            //    //    .Where(a => a.parentId == null)
            //    //    .Include(includePath)
            //    //    .ToListAsync();

            return location10;
        }




        public async Task<bool> AddSubjects()
        {
            //var subject1 = new Subject { name = "Iran" };
            //var subject2 = new Subject { name = "Tehran" };
            //var subject3 = new Subject { name = "Karaj" };
            //var subject4 = new Subject { name = "Isfahan" };

            //subject1.children = new List<Subject> { subject2 };
            //subject2.children = new List<Subject> { subject3 };

            //var newsubject = _cntxt.subjects.Where(x => x.name == "Tehran").First();
            //var subject3 = new Subject { name = "karaj" };
            //newsubject.children.Add(subject3);

            ////_cntxt.subjects.Add(subject3);
            //_cntxt.SaveChanges();
            //return true;


            var newsubject = _cntxt.subjects.Include(x => x.children).First(x => x.name == "خیابان صدر");

            //if (newsubject != null)
            //{
            if (newsubject.children == null)
            {
                newsubject.children = new List<Subject>();
            }

            var subject3 = new Subject { name = "کوچه 13" };
            //newsubject.children.Add(subject3);
            _cntxt.subjects.Add(subject3);

            _cntxt.SaveChanges();
            return true;
            //}

            //return false;

            //var newsubject = _cntxt.subjects.Include(s => s.children).FirstOrDefault(x => x.name == "Iran");

            //if (newsubject != null)
            //{
            //    var subject2 = new Subject { name = "Tehran" parentId = newsubject.id };

            //    if (newsubject.children == null)
            //    {
            //        newsubject.children = new List<Subject>();
            //    }

            //    newsubject.children.Add(subject2);

            //    _cntxt.subjects.Add(subject2);


            //    await _cntxt.SaveChangesAsync();

            //    return true;
            //}

            //return false;

        }

        public async Task<string> GenerateCode()
        {


            //if (maxCodeSubject != null)
            //{
            //    //return (Convert.ToInt32(maxCodeSubject.code) +1).ToString(); // فرضا فیلد SubjectName برای نام موضوع استفاده شده است
            //}
            return "1400";
        }

        public async Task<bool> SaveSubject(Subject subject)
        {
            bool simulateName = await _CheckSimulateName(subject);
            if (!simulateName)
                throw new BookNullException("0x01S01", "خیلی خری");
            bool isEditMode = await _cntxt.subjects.AnyAsync(x => x.id == subject.id);
            if (isEditMode)
            {
                var original = await _cntxt.subjects.FirstAsync(x => x.id == subject.id);

                original.name = subject.name;
                _cntxt.subjects.Update(original);
            }
            else
            {


                if (subject.parentId == null)
                {
                    var maxCodeSubject = await _cntxt.subjects
                                         .Where(x => x.parentId == null)
                                         .OrderByDescending(x => x.code).FirstOrDefaultAsync();
                    var nextCode = (Convert.ToInt16(maxCodeSubject.code) + 1).ToString();
                    if (nextCode.Length < 2)
                        nextCode = "0" + nextCode;
                    subject.code = nextCode;
                    _cntxt.subjects.Add(subject);

                }
                else
                {
                    var parent = await _cntxt.subjects
                                      .Where(x => x.id == subject.parentId)
                                      .Include(x => x.children).FirstAsync();
                    string nextCode = "00";

                    if (parent.children.Count > 0)
                    {
                        var maxCodeSubject = parent.children.OrderByDescending(x => x.code).FirstOrDefault();
                        nextCode = (Convert.ToInt16(maxCodeSubject.code) + 1).ToString();
                        if (nextCode.Length < 2)
                            nextCode = "0" + nextCode;
                    }
                    subject.code = nextCode;
                    _cntxt.subjects.Add(subject);
                }
            }
            await _cntxt.SaveChangesAsync();
            return true;
        }

        private async Task<bool> _CheckSimulateName(Subject subject)
        {
            dynamic SimulateName;
            if (subject.parentId == null)
            {
                SimulateName =
                    await _cntxt.subjects
                    .Where(x => x.parentId == null && x.name == subject.name)
                    .FirstOrDefaultAsync();
            }
            else
            {
                var parent =
                 await _cntxt.subjects
                 .Where(x => x.id == subject.parentId)
                 .Include(x => x.children)
                 .FirstOrDefaultAsync();
                SimulateName = parent.children.FirstOrDefault(x => x.name == subject.name);
            }

            if (SimulateName != null)
            {
                throw new BookNullException("0x01S01", "خیلی خری");
            }
            return true;
        }
        public async Task<bool> DeleteSubject(int id)
        {
            bool isExist = await _cntxt.subjects.AnyAsync(x => x.id == id);
            if (isExist)
            {
                _cntxt.subjects.Remove(_cntxt.subjects.First(x => x.id == id));
                await _cntxt.SaveChangesAsync();
                return true;
            }
            return false;

        }
    }
}
