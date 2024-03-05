namespace library._01_Domain.Entities
{
    public class Subject
    {

        public int id { get; set; }
        public string name { get; set; }
        public int? parentId { get; set; }
        public Subject? parent { get; set; }
        public List<Subject>? children { get; set; }
    }
}
