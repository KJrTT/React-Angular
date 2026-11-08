# Документация проекта 

Данная документация описывает гибридное веб-приложение, состоящее из одного backend-сервера на ASP.NET Core Web API и двух независимых frontend-клиентов: React (на Vite с TypeScript) и Angular.

## 1. Подготовка окружения

Перед началом работы необходимо установить Node.js LTS. В Windows это делается через менеджер пакетов winget:
```powershell
winget install -e --id OpenJS.NodeJS.LTS
```
После установки обязательно добавьте полный путь к каталогу Node.js в переменную среды `Path` (Изменение системных параметров среды → Переменные среды → создать/дополнить `Path`). После изменения переменных среды перезапустите терминал. Без этого команды `npm`, `npx` и `ng` не будут распознаваться в PowerShell.

## 2. Создание структуры проектов

Все команды выполняются последовательно в терминале. Сначала создается backend-проект, внутри которого затем размещаются frontend-приложения.

```powershell
dotnet new webapi -n HybridApp.Server
cd HybridApp.Server

# Создание React-клиента (Vite + TypeScript)
npm create vite@latest ClientApp/react -- --template react-ts
cd ClientApp/react
npm install
cd ../../

# Создание Angular-клиента (Routing + CSS)
npx @angular/cli new angular --directory ClientApp/angular --routing --style=css
cd ClientApp/angular
npm install
cd ../../
```


## 3. Структура каталогов

В результате выполнения команд формируется следующая структура:
```text
HybridApp.Server\
├── Program.cs
├── Controllers\
├── wwwroot\            ← сюда копируются сборки SPA при публикации
└── ClientApp\
    ├── react\          ← исходный код React (Vite)
    └── angular\        ← исходный код Angular
```

## 4. Настройка backend (Program.cs)

Файл `Program.cs` требует ручной настройки для корректной раздачи статических файлов и маршрутизации SPA:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Регистрация Cookie-аутентификации
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "SharedAuth";
        options.Cookie.Path = "/"; // Кука доступна для всего приложения
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles(); // Разрешает раздачу файлов из wwwroot

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Маршруты API
app.MapControllers();

// --- ГРАНИЦА REACT ---
app.MapFallbackToFile("/react/{path}", "react/index.html");

// --- ГРАНИЦА ANGULAR ---
app.MapFallbackToFile("/angular/{path}", "angular/index.html");

app.Run();
```
Порядок middleware строго важен: `UseStaticFiles()` вызывается до `UseRouting()`, `UseAuthentication()`/`UseAuthorization()` — после `UseRouting()` и до `MapControllers()`, а `MapFallbackToFile` — после `MapControllers()`.

## 5. Настройка прокси для разработки

В режиме разработки (Development) каждый SPA запускается на своем dev-сервере, а запросы к API перенаправляются (проксируются) на ASP.NET Core.

### Для React (vite.config.ts)
```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://localhost:7127', // Порт из launchSettings.json
      changeOrigin: true,
      secure: false, // Отключает проверку самоподписанного сертификата
    }
  }
},
base: '/',
```

### Для Angular (proxy.conf.json)
Файл `proxy.conf.json` создается вручную в корне `ClientApp/angular`:
```json
{
  "/api": {
    "target": "https://localhost:7127",
    "secure": false,
    "changeOrigin": true
  }
}
```

## 6. Передача cookie на клиентах

Так как используется общая cookie-аутентификация, клиенты должны отправлять её с каждым запросом к API:
*   **React:** `fetch('/api/...', { credentials: 'include' })`
*   **Angular:** `this.http.get('/api/...', { withCredentials: true })`

## 7. Сборка при публикации (.csproj)

Для автоматической сборки обоих SPA при выполнении команды `dotnet publish` в файл `.csproj` добавляются MSBuild-таргеты:

```xml
<Target Name="PublishReact" AfterTargets="ComputeFilesToPublish">
  <Exec WorkingDirectory="ClientApp/react" Command="npm install" />
  <Exec WorkingDirectory="ClientApp/react" Command="npm run build" />
  <ItemGroup>
    <ReactFiles Include="ClientApp/react/dist/" />
  </ItemGroup>
  <Copy SourceFiles="@(ReactFiles)" DestinationFolder="$(PublishDir)wwwroot/react/%(RecursiveDir)" />
</Target>

<Target Name="PublishAngular" AfterTargets="ComputeFilesToPublish">
  <Exec WorkingDirectory="ClientApp/angular" Command="npm install" />
  <Exec WorkingDirectory="ClientApp/angular" Command="ng build --configuration production --base-href /angular/" />
  <ItemGroup>
    <AngularFiles Include="ClientApp/angular/dist/angular/browser/" />
  </ItemGroup>
  <Copy SourceFiles="@(AngularFiles)" DestinationFolder="$(PublishDir)wwwroot/angular/%(RecursiveDir)" />
</Target>
```


## 8. Запуск проекта

### Режим разработки
Требуется открыть три терминала:

| Терминал | Рабочая директория | Команда запуска |
| :--- | :--- | :--- |
| 1 | `HybridApp.Server` | `dotnet run` |
| 2 | `ClientApp\react` | `npm run dev` (порт 5173) |
| 3 | `ClientApp\angular` | `npx ng serve --proxy-config proxy.conf.json` (порт 4200) |
