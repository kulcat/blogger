import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Blog } from "@/models/Blog.js";

export class BlogService {
   async getBlogs() {
    const response = await api.get(`api/blogs`);

    console.log(response);

    response.data.forEach(data => {
      AppState.blogs.push(new Blog(data));
    });
   } 
}

export const blogService = new BlogService();