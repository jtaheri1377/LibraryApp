
using Autofac.Core;
using library._01_Domain.Interfaces;
using library._02_Application.Services;
using library._03_Infrastructure.Extentions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text.Json.Serialization;
using TenderNetCore.Config.Extentions;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthExtention();
builder.Services.AddAuthorization();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerTokenField();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.Configure<JsonOptions>(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;    
});


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
app.UseJwtMiddleware();

app.UseAuthentication();

app.UseCors(a =>
{
    a.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();



app.Run();


//public class ApiExplorerGroupPerVersionConvention : IControllerModelConvention
//{
//    public void Apply(ControllerModel controller)
//    {
//        var controllerNamespace = controller.ControllerType.Namespace;
//        var apiVersion = controllerNamespace?.Split('.').First().ToLower();

//        controller.ApiExplorer.GroupName = apiVersion;
//    }
//}
