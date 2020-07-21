using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Drawing;

namespace JericoWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
   /* private static byte[] ConvertImageToByteArray(string fileName)
      {
         Bitmap bitMap = new Bitmap(fileName);
         ImageFormat bmpFormat = bitMap.RawFormat;
         var imageToConvert = Image.FromFile(fileName);
         using (MemoryStream ms = new MemoryStream())
         {
            imageToConvert.Save(ms, bmpFormat);
            return ms.ToArray();
         }
      } 
    */
}
