export class Blog {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.date = new Date(data.createdAt).toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.imgUrl = data.imgUrl;
  }
}