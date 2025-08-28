export class Blog {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.createdAt = data.createdAt;
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.imgUrl = data.imgUrl;
    this.tags = data.tags;
    this.lastUpdated = new Date();
  }
}