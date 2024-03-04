using Taxpayer.WebApi._03_Application.Exceptions;

namespace library._05_CrosscuttingConcerns.Exceptions
{
    public class UserServiceException
    {
    }

    public class UserNullException : BaseException
    {
        public UserNullException(string code = "0x01S01", string message = "کاربر یافت نشد") : base(code, message)
        {
        }

    }

}
