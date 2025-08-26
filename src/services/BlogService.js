import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Blog } from "@/models/Blog.js";

export class BlogService {
   async getBlogs() {
    const response = await api.get(`api/blogs`);

    console.log(response);
    AppState.blogs.length = 0;

    response.data.forEach(data => {
      AppState.blogs.push(new Blog(data));
    });
   } 

  
  async createBlog(blogData) {
    const newBlog  = new Blog(blogData);
    const response = await api.post('api/blogs', newBlog);
  }

  async deleteBlog(blogId) {
    const response = await api.delete(`api/blogs/${blogId}`);
  }

   setActiveBlog(blog) {
    AppState.activeBlog = blog;
   }
}

export const blogService = new BlogService();