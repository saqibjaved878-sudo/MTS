using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace MtsApi.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly SqlConnection _db;

    public UsersController(SqlConnection db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        await _db.OpenAsync();
        var cmd = new SqlCommand("SELECT Username, Password, Role, Emoji, CanDelete, CanEdit, CanEditCustomers, Pages, ProfilePic FROM AppUsers", _db);
        var reader = await cmd.ExecuteReaderAsync();
        var list = new List<object>();
        while (await reader.ReadAsync())
        {
            list.Add(new
            {
                username = reader.GetString(0),
                password = reader.GetString(1),
                role = reader.GetString(2),
                emoji = reader.IsDBNull(3) ? "" : reader.GetString(3),
                canDelete = reader.GetBoolean(4),
                canEdit = reader.GetBoolean(5),
                canEditCustomers = reader.GetBoolean(6),
                pages = reader.IsDBNull(7) ? "all" : reader.GetString(7),
                profilePic = reader.IsDBNull(8) ? null : reader.GetString(8)
            });
        }
        await _db.CloseAsync();
        return Ok(list);
    }

    [HttpPut]
    public async Task<IActionResult> ReplaceAll([FromBody] List<UserRecord> users)
    {
        await _db.OpenAsync();
        var tx = _db.BeginTransaction();

        try
        {
            // Clear existing
            var del = new SqlCommand("DELETE FROM AppUsers", _db, tx);
            await del.ExecuteNonQueryAsync();

            foreach (var u in users)
            {
                var cmd = new SqlCommand(
                    @"INSERT INTO AppUsers (Username, Password, Role, Emoji, CanDelete, CanEdit, CanEditCustomers, Pages, ProfilePic)
                      VALUES (@u, @p, @r, @e, @d, @ed, @ec, @pg, @pic)", _db, tx);
                cmd.Parameters.AddWithValue("@u", u.username);
                cmd.Parameters.AddWithValue("@p", u.password);
                cmd.Parameters.AddWithValue("@r", u.role ?? "user");
                cmd.Parameters.AddWithValue("@e", (object?)u.emoji ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@d", u.canDelete);
                cmd.Parameters.AddWithValue("@ed", u.canEdit);
                cmd.Parameters.AddWithValue("@ec", u.canEditCustomers);
                cmd.Parameters.AddWithValue("@pg", (object?)u.pages ?? "all");
                cmd.Parameters.AddWithValue("@pic", (object?)u.profilePic ?? DBNull.Value);
                await cmd.ExecuteNonQueryAsync();
            }

            await tx.CommitAsync();
        }
        catch
        {
            await tx.RollbackAsync();
            throw;
        }
        finally
        {
            await _db.CloseAsync();
        }

        return Ok();
    }
}

public class UserRecord
{
    public string username { get; set; } = "";
    public string password { get; set; } = "";
    public string? role { get; set; }
    public string? emoji { get; set; }
    public bool canDelete { get; set; }
    public bool canEdit { get; set; } = true;
    public bool canEditCustomers { get; set; } = true;
    public string? pages { get; set; }
    public string? profilePic { get; set; }
}
