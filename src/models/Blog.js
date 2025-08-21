export class Blog {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.date = new Date(data.createdAt).toLocaleString();
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.imgUrl = data.imgUrl;
  }
}