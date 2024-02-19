# Library Management Program

This project was built with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2 , ASP.NET WEB API 6 version and SQL Server.

## Instructions to replicate project

1.) Clone the project in your local system. 
2.) If you are using VS Code for Angular, go to root directory and press npm install in command terminal for the project to fetch all required dependencies and packages.
3.) For the API, go to the appsettings.json file to change the SQL Data Source(Server) name which might be different for your configuration and Initial Catalog is Database name which you can choose as per your wish. 
4.) Remove the existing migration folder from API Project. To initiate migrations, get the following Nuget packages first - 
    i.) EntityFramework Core.
    ii.) EntityFramework Sql Server.
    iii.) EntityFramework Tools

  Then in package manager terminal , start migrations by first command : **add-migration someName** followed by **update-database** command. If everything is Ok, you will get success message.
    
5.) Remember to run the API before you run the UI to avoid 404 errors.
6.) ng serve will run program for Angular and for API, it would be either dotnet run or direct Run button in Visual Studio.

**NOTE** - _Run the BookList SQL file content in SQL Server after migrations are done and tables are created._

## Further help

If you need some help , text me in twitter.
