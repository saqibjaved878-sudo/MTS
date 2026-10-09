using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace MtsApi.Controllers;

[ApiController]
[Route("api/storage")]
public class StorageController : ControllerBase
{
    private readonly SqlConnection _db;

    public StorageController(SqlConnection db) => _db = db;

    [HttpGet("{key}")]
    public async Task<IActionResult> Get(string key, [FromQuery] string? defaultValue)
    {
        await _db.OpenAsync();
        var cmd = new SqlCommand("GetOrCreateStorage", _db)
        {
            CommandType = CommandType.StoredProcedure
        };
        cmd.Parameters.AddWithValue("@Key", key);
        cmd.Parameters.AddWithValue("@DefaultValue", defaultValue ?? "{}");
        var result = await cmd.ExecuteScalarAsync();
        await _db.CloseAsync();
        return Ok(result?.ToString() ?? defaultValue ?? "{}");
    }

    [HttpPut("{key}")]
    public async Task<IActionResult> Put(string key, [FromBody] StorageValue body)
    {
        await _db.OpenAsync();
        var cmd = new SqlCommand("UpsertStorage", _db)
        {
            CommandType = CommandType.StoredProcedure
        };
        cmd.Parameters.AddWithValue("@Key", key);
        cmd.Parameters.AddWithValue("@Value", body.Value);
        await cmd.ExecuteNonQueryAsync();
        await _db.CloseAsync();
        return Ok();
    }
}

public class StorageValue
{
    public string Value { get; set; } = "";
}
