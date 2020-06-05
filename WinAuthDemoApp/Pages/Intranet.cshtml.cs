using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;

namespace WinAuthDemoApp.Pages
{
    public class IntranetModel : PageModel
    {
        private readonly IConfiguration _configuration;
        public IntranetModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void OnGet()
        {
            var settings = _configuration.GetSection("Resources").Get<ResourceOptions>();
            ViewData["IntranetUrl"] = settings.Intranet;
        }
    }
}
