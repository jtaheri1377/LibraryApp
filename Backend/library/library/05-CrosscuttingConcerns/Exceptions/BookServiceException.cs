using Taxpayer.WebApi._03_Application.Exceptions;

namespace library._05_CrosscuttingConcerns.Exceptions
{
    public class BookServiceException
    {
    }

    public class BookNullException : BaseException
    {
        public BookNullException(string code = "0x01S01", string message = "کاربر یافت نشد") : base(code, message)
        {
            
        }

    }

}
