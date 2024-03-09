using library._01_Domain.Entities;
using library._02_Application.Dto;
using library._02_Application.Services;

namespace library._01_Domain.Interfaces
{
    public interface IBookService
    {
        public Task<Book[]> Search(string value);
        public Task<bool> save(Book book);
        public Task<bool> AddSubject(Subject subject);
        public Task<bool> UpdateSubject(Subject subject);
        public Task<List<Subject>> GetAllSubjects();
        public Task<bool> AddSubjects();

        public Task<string> GenerateCode();
        public Task<bool> SaveSubject(Subject subject);
        public   Task<bool> DeleteSubject(int id);
    }
}
