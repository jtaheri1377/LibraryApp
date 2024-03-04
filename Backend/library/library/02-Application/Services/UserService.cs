using library._01_Domain.Entities;
using library._01_Domain.Interfaces;
using library._02_Application.Dto;
using library._03_Infrastructure.Repositories;
using library._05_CrosscuttingConcerns.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace library._02_Application.Services
{
    public class UserService : IUserService
    {
        private readonly LibraryDbContext _cntxt = new LibraryDbContext();

        public async Task<User> getCurrent(string username)
        {
            if (await _cntxt.users.AnyAsync(x => x.username == username))
            {
                return await _cntxt.users.FirstOrDefaultAsync(x => x.username == username);
            }
            else
                throw new UserNullException();
        }

        public async Task<User[]> GetAllUsers()
        {
            User[] users = _cntxt.users.ToArray();
            return users;
        }

        public async Task<UserTokenDto> Login(UserLoginDto loginDto)
        {
            if (await _cntxt.users
                .AnyAsync(x => x.username == loginDto.username && x.password == loginDto.password))
            {
                var _username = _cntxt.users
               .FirstOrDefault(x =>
               x.username == loginDto.username &&
               x.password == loginDto.password
               ).username;

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Hello this is secret key.Hello this is secret key."));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                int ExpiryHours = 10;
                var claims = new[]  {
            new Claim(ClaimTypes.NameIdentifier,_username)
                };

                var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(ExpiryHours),
                signingCredentials: credentials
            );

                var tokenHandler = new JwtSecurityTokenHandler();


                var res = new UserTokenDto
                {
                    ExpireOn = DateTime.Now.AddHours(ExpiryHours),
                    Token = "Bearer " + tokenHandler.WriteToken(token)
                };

                return res;
            }
            else
                throw new UserNullException();
        }

        public async Task<bool> save(User user)
        {
            bool isEditMode = await _cntxt.users.AnyAsync(x => x.id == user.id);
            if (isEditMode)
            {
                _cntxt.users.Update(user);
            }
            else
            {
                _cntxt.users.Add(user);
            }
            _cntxt.SaveChanges();
            return true;
        }

        public async Task<bool> deleteUser(int id)
        {
            bool existUser = await _cntxt.users.AnyAsync(x => x.id == id);
            User user = await _cntxt.users.FirstOrDefaultAsync(x => x.id == id);
            if (existUser)
            {
                _cntxt.users.Remove(user);
                await _cntxt.SaveChangesAsync();
                return true;
            }
            else
            {
                throw new UserNullException();
            }

        }

    }
}
