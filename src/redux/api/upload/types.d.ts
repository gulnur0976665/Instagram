namespace UPLOAD {
  type postUploadeFileRequest = FormData;
  type postUploadeFileResponse = {
    name: string;
    format: string;
    url: string;
  };
}
