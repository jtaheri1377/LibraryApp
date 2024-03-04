using library._01_Domain.Entities;
using library._01_Domain.Interfaces;
using library._02_Application.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace library.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors]
    //[Authorize]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
           _bookService = bookService;
        }
 

        // GET api/<Auth>/5
        [HttpPost("search")]
        public async Task<Book[]> search([FromBody] Search value)
        {
            return await _bookService.Search(value.searchValue);
        }

        

       
        [HttpPost("Save")]
        public async Task<bool> save([FromBody] Book book)
        {
            return await _bookService.save(book);
        }

        // DELETE api/<Auth>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost("addSubject")]
        public async Task<bool> addSubject([FromBody]Subject subject)
        {
            return await _bookService.AddSubject(subject);
        }

        [HttpPut("updateSubject")]
        public async Task<bool> UpdateSubject([FromBody] Subject subject)
        {
            return await _bookService.UpdateSubject(subject);
        }

        [HttpGet("allSubjects")]
        public async Task<List<Subject>> GetAllSubjects()
        {
            return await _bookService.GetAllSubjects();
        }

        [HttpGet("addSubjects")]
        public async Task<bool> addSubjects()
        {
            return await _bookService.AddSubjects();
        }

        [HttpGet("newSubject")]
        public async Task<string> GenerateCode()
        {
            return await _bookService.GenerateCode();
        }

        [HttpGet("SaveSubject")]
        public async Task<bool> SaveSubject([FromBody] Subject subject)
        {
            return await _bookService.SaveSubject(subject);
        }
    }
}
