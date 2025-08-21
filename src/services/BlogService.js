import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Blog } from "@/models/Blog.js";

export class BlogService {
   async getBlogs() {
    const response = await api.get(`api/blogs`);

    console.log(response);
    AppState.blogs = [];

    if(AppState.activeCreatorId) {
      const filteredResponse = response.data.filter(data => data.creatorId == AppState.activeCreatorId);
      
      filteredResponse.forEach(data => {
        AppState.blogs.push(new Blog(data));
      });
    }
    else {
      response.data.forEach(data => {
        AppState.blogs.push(new Blog(data));
      });
    }
   } 

   setActiveProfile(id) {
    AppState.activeCreatorId = id;
    console.log(AppState.activeCreatorId)
   }
}

export const blogService = new BlogService();