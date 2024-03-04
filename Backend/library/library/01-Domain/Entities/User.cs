namespace library._01_Domain.Entities
{
    public class User
    {
        public int id { get; set; }
        public string fullname { get; set; }
        public string username { get; set; }
        public string? password { get; set; }
        public int type { get; set; }

    }
}
