using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace MtsApi.Controllers;

[ApiController]
[Route("api/loginlock")]
public class LoginLockController : ControllerBase
{
    private readonly SqlConnection _db;

    public LoginLockController(SqlConnection db) => _db = db;

    [HttpGet("{key}")]
    public async Task<IActionResult> Get(string key)
    {
        await _db.OpenAsync();
        var cmd = new SqlCommand("SELECT LockValue FROM LoginLock WHERE LockKey = @k", _db);
        cmd.Parameters.AddWithValue("@k", key);
        var result = await cmd.ExecuteScalarAsync();
        await _db.CloseAsync();
        return Ok(result?.ToString() ?? "{}");
    }

    [HttpPut("{key}")]
    public async Task<IActionResult> Put(string key, [FromBody] StorageValue body)
    {
        await _db.OpenAsync();
        var cmd = new SqlCommand(
            @"IF EXISTS (SELECT 1 FROM LoginLock WHERE LockKey = @k)
                UPDATE LoginLock SET LockValue = @v, UpdatedAt = GETDATE() WHERE LockKey = @k
              ELSE
                INSERT INTO LoginLock (LockKey, LockValue, UpdatedAt) VALUES (@k, @v, GETDATE())", _db);
        cmd.Parameters.AddWithValue("@k", key);
        cmd.Parameters.AddWithValue("@v", body.Value);
        await cmd.ExecuteNonQueryAsync();
        await _db.CloseAsync();
        return Ok();
    }
}
