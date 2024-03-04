using Autofac;
using Autofac.Core;

internal class AutofacModule : Module
{
    private string _connectionString;

    public AutofacModule()
    {
        // Default constructor
    }

    public AutofacModule(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void Load(ContainerBuilder builder)
    {
        // Use _connectionString in module configuration
    }
}