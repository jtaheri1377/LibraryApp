namespace Taxpayer.WebApi._03_Application.Exceptions
{
    public abstract class BaseException : Exception
    {
        public string Code { get; protected set; }
        //public object Value { get; set; }

        public BaseException(string code, string message="") : base(message)
        {
            this.Code = code;
        }
    }
}
