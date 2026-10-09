-- MTS Database Setup for SQL Server 2012
CREATE DATABASE MTS_DB;
GO
USE MTS_DB;
GO

-- Main application state (JSON blob per storage key)
CREATE TABLE AppStorage (
    StorageKey VARCHAR(100) NOT NULL PRIMARY KEY,
    StorageValue NVARCHAR(MAX) NOT NULL,
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Users table (normalized)
CREATE TABLE AppUsers (
    Username VARCHAR(50) NOT NULL PRIMARY KEY,
    Password VARCHAR(100) NOT NULL,
    Role VARCHAR(20) NOT NULL DEFAULT 'user',
    Emoji VARCHAR(10) DEFAULT '',
    CanDelete BIT NOT NULL DEFAULT 0,
    CanEdit BIT NOT NULL DEFAULT 1,
    CanEditCustomers BIT NOT NULL DEFAULT 1,
    Pages NVARCHAR(MAX) DEFAULT 'all',
    ProfilePic NVARCHAR(MAX) DEFAULT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Login lock state
CREATE TABLE LoginLock (
    LockKey VARCHAR(50) NOT NULL PRIMARY KEY,
    LockValue NVARCHAR(500) NOT NULL,
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Stored procedure to get or create a storage value
CREATE PROCEDURE GetOrCreateStorage
    @Key VARCHAR(100),
    @DefaultValue NVARCHAR(MAX)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM AppStorage WHERE StorageKey = @Key)
    BEGIN
        INSERT INTO AppStorage (StorageKey, StorageValue, UpdatedAt)
        VALUES (@Key, @DefaultValue, GETDATE());
    END
    SELECT StorageValue FROM AppStorage WHERE StorageKey = @Key;
END;
GO

-- Stored procedure to upsert storage value
CREATE PROCEDURE UpsertStorage
    @Key VARCHAR(100),
    @Value NVARCHAR(MAX)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM AppStorage WHERE StorageKey = @Key)
        UPDATE AppStorage SET StorageValue = @Value, UpdatedAt = GETDATE()
        WHERE StorageKey = @Key;
    ELSE
        INSERT INTO AppStorage (StorageKey, StorageValue, UpdatedAt)
        VALUES (@Key, @Value, GETDATE());
END;
GO
