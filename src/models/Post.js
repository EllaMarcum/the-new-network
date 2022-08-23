export class Post {
  constructor(data) {
    this.id = data.id
    this.body = (data.body) ? data.body : ""
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.imgUrl = (data.imgUrl) ? data.imgUrl : ""
    this.likeIds = data.likeIds
    this.likes = data.likes
    this.updatedAt = data.updatedAt
  }

  get PostTime() {
    /*
    get total minutes from time stamp
    if greater than 59
      get total hours from time stamp

      return total minutes/hours
    */
    const date = new Date(this.updatedAt);
    const timePassed = new Date().getTime() - date.getTime();
    const minutes = parseInt((timePassed / 1000) / 60)
    const hours = parseInt(minutes / 60)
    const days = parseInt(hours / 24)

    if (days > 0) {
      return `${days}d`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${minutes}min`
    }
  }
}