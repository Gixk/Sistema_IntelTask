using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace IntelTask.API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        // Constructor
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }



        // Invoke method that will be called for each HTTP request
        public async Task Invoke(HttpContext httpContext)
        {
           try             {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "Error no controlado.");

                await HandleExceptionAsync(httpContext, ex);
            }
        }


        // Handle the exception and return a JSON response
        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json"; // Response type JSON
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // 500 Internal Server Error


            // Serialize the error response
            var result = JsonSerializer.Serialize(new
            {
                StatusCode = context.Response.StatusCode, // Htttp status code
                Message = "Ocurrió un error interno. Contacte al administrador.",
                Error = exception.Message + "  pichita"
            });

            return context.Response.WriteAsync(result);
        }   

    }


    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
