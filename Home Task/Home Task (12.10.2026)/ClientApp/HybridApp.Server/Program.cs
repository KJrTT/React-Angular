using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "SharedAuth";
        options.Cookie.Path = "/"; // Кука доступна и для /, и для /angular
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles(); // Разрешает раздачу файлов из wwwroot

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// API маршруты (будут использоваться обоими фронтендами)
app.MapControllers();

// --- ГРАНИЦА REACT ---
// Все, что не начинается с /angular и не является API, обрабатывается React-приложением.
// В production: отдает wwwroot/react/index.html (собранный React).
app.MapFallbackToFile("/react/{path}", "react/index.html");

// --- ГРАНИЦА ANGULAR ---
// Все запросы, начинающиеся с /angular, обрабатываются Angular-модулем.
app.MapFallbackToFile("/angular/{path}", "angular/index.html");

app.Run();