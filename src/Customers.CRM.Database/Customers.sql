CREATE TABLE [dbo].[Customers]
(
	[Id] INT IDENTITY (1, 1) NOT NULL, 
    [Name]				VARCHAR (50)        NOT NULL,
    [ContactName]		VARCHAR (50)        NOT NULL,
	[ContactEmail]		NVARCHAR (128)      NOT NULL,
	[ContactPhone]	    VARCHAR (50)        NOT NULL,
	CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED ([Id] ASC),
)
