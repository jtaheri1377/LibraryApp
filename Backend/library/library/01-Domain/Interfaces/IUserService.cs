using library._01_Domain.Entities;
using library._02_Application.Dto;
using library._02_Application.Services;

namespace library._01_Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserTokenDto> Login(UserLoginDto loginDto);
        Task<User> getCurrent(string username);
        public Task<User[]> GetAllUsers();
        public Task<bool> save(User user);
        public Task<bool> deleteUser(int id);
    }
}
