namespace library._01_Domain.Entities
{
    public class Book
    {
        public int? id { get; set; }
        public string name { get; set; }
        public string author { get; set; }
        public string language { get; set; }
        public int subjectId { get; set; }
        public Subject subject { get; set; }
        public int volumeAmount { get; set; }
        public string code { get; set; }
    }
}
