var opts = new WebApplicationOptions { Args = args, WebRootPath = Directory.GetCurrentDirectory() };
var builder = WebApplication.CreateBuilder(opts);

builder.WebHost.ConfigureKestrel((context, kestrel) =>
{
    var dllDir = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) ?? Directory.GetCurrentDirectory();
    var certPath = Path.Combine(dllDir, "mts-cert.pfx");
    if (File.Exists(certPath))
    {
        kestrel.ListenAnyIP(5001, listen =>
        {
            listen.UseHttps(certPath, "mts@2026");
        });
    }
    kestrel.ListenAnyIP(5000);
});

var app = builder.Build();

app.UseDefaultFiles(new DefaultFilesOptions { DefaultFileNames = new[] { "mts-system-v10.html", "index.html" } });
app.UseStaticFiles();

app.Run();
