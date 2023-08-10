using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Services
{
    public static class ServiceCloudinary
    {
        public static async Task<ImageUploadResult> UploadToCloudinary(IFormFile file, Cloudinary cloudinary)
        {
            var uploadResult = new ImageUploadResult();

            if(file!=null && file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                    };

                    uploadResult = cloudinary.Upload(uploadParams);
                }
            }

            return uploadResult;
        }
    }
}
