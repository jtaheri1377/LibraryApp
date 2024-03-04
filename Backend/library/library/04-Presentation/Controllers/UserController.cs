using library._01_Domain.Entities;
using library._01_Domain.Interfaces;
using library._02_Application.Dto;
using library._02_Application.Services;
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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<Auth>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<Auth>/5
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<UserTokenDto> Login([FromBody] UserLoginDto loginDto)
        {
            return await _userService.Login(loginDto);
        }

        // POST api/<Auth>
        [HttpGet("GetCurrent")]
        public async Task<User> getCurrent()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _userService.getCurrent(username);
        }

        [HttpGet("allUsers")]
        public async Task<User[]> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpPost("Save")]
        public async Task<bool> save([FromBody] User user)
        {
            return await _userService.save(user);
        }
        
        [HttpDelete("delete/{id}")]
        public async Task<bool> DeleteUser(int id)
        {
            return await _userService.deleteUser(id);
        }
    }
}
