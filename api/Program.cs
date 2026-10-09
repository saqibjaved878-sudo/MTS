using Microsoft.Data.SqlClient;
using System.Data;
using System.IO;

// Set content root to the directory containing the DLL
var dllDir = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) ?? Directory.GetCurrentDirectory();
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ContentRootPath = dllDir,
    WebRootPath = dllDir
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS (for file:// access or other origins)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(_ => true).AllowAnyHeader().AllowAnyMethod();
    });
});

// Register SqlConnection factory
builder.Services.AddTransient(_ =>
    new SqlConnection(builder.Configuration.GetConnectionString("MtsDb")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve index.html at root
app.UseDefaultFiles(new DefaultFilesOptions
{
    DefaultFileNames = new[] { "mts-system-v10.html", "index.html" }
});
app.UseStaticFiles();

app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
