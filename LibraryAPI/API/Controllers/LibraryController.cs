using API.Data_Access;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LibraryController : ControllerBase
  {
      private readonly IDataAccess library;
      private readonly IConfiguration configuration;
    public LibraryController(IDataAccess library, IConfiguration configuration)
    {
        this.library = library;
        this.configuration = configuration;
    }

    [HttpPost("CreateAccount")]
    public IActionResult CreateAccount(User user)
    {
      if (!library.IsEmailAvailable(user.Email))
      {
        return Ok("Email is not available!");
      }
      user.CreatedOn = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
      user.UserType = UserType.USER;
      library.CreateUser(user);
      return Ok("Account created successfully!");
    }

    [HttpGet("Login")]
    public IActionResult Login(string email, string password)
    {
      if (library.AuthenticateUser(email, password, out User? user))
      {
        if (user != null)
        {
          var jwt = new Jwt(configuration["Jwt:Key"], configuration["Jwt:Duration"]);
          var token = jwt.GenerateToken(user);
          return Ok(token);
        }
      }
      return Ok("Invalid");
    }

    [HttpGet("GetAllBooks")]
    public IActionResult GetAllBooks()
    {
      var books = library.GetAllBooks();
      var booksToSend = books.Select(book => new
      {
        book.Id,
        book.Title,
        book.Category.Category,
        book.Category.SubCategory,
        book.Price,
        Available = !book.Ordered,
        book.Author
      }).ToList();
      return Ok(booksToSend);
    }

    [HttpGet("OrderBook/{userId}/{bookId}")]
    public IActionResult OrderBook(int userId, int bookId)
    {
      var result = library.OrderBook(userId, bookId) ? "success" : "fail";
      return Ok(result);
    }

    [HttpGet("GetOrders/{id}")]
    public IActionResult GetOrders(int id)
    {
      return Ok(library.GetOrdersOfUser(id));
    }

    [HttpGet("GetAllOrders")]
    public IActionResult GetAllOrders()
    {
        return Ok(library.GetAllOrders());
    }

    [HttpGet("ReturnBook/{bookId}/{userId}")]
    public IActionResult ReturnBook(string bookId, string userId)
    {
      var result = library.ReturnBook(int.Parse(userId), int.Parse(bookId));
      return Ok(result == true ? "success" : "not returned");
    }

    [HttpGet("GetAllUsers")]
    public IActionResult GetAllUsers()
    {
      var users = library.GetUsers();
      var result = users.Select(user => new
      {
        user.Id,
        user.FirstName,
        user.LastName,
        user.Email,
        user.Mobile,
        user.Blocked,
        user.Active,
        user.CreatedOn,
        user.UserType,
        user.Fine
      });

      return Ok(result);
    }

    [HttpGet("ChangeBlockStatus/{status}/{id}")]
    public IActionResult ChangeBlockStatus(int status, int id)
    {
      if (status == 1)
      {
        library.BlockUser(id);
      }
      else
      {
        library.UnblockUser(id);
      }
      return Ok("success");
    }

    [HttpGet("ChangeEnableStatus/{status}/{id}")]
    public IActionResult ChangeEnableStatus(int status, int id)
    {
      if (status == 1)
      {
        library.ActivateUser(id);
      }
      else
      {
        library.DeactivateUser(id);
      }
      return Ok("success");
    }

    [HttpPost("InsertBook")]
    public IActionResult InsertBook(Book book)
    {
      book.Title = book.Title.Trim();
      book.Author = book.Author.Trim();
      book.Category.Category = book.Category.Category.ToLower();
      book.Category.SubCategory = book.Category.SubCategory.ToLower();

      library.InsertNewBook(book);
      return Ok("Inserted");
    }

    [HttpDelete("DeleteBook/{id}")]
    public IActionResult DeleteBook(int id)
    {
      var returnResult = library.DeleteBook(id) ? "success" : "fail";
      return Ok(returnResult);
    }

    [HttpPost("InsertCategory")]
    public IActionResult InsertCategory(BookCategory bookCategory)
    {
      bookCategory.Category = bookCategory.Category.ToLower();
      bookCategory.SubCategory = bookCategory.SubCategory.ToLower();
      library.CreateCategory(bookCategory);
      return Ok("Inserted");
    }
  }
}

