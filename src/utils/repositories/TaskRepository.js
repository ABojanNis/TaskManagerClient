import Repo from "./Repo";

export default class CandidateRepository extends Repo {
  constructor() {
    super("tasks");
  }

  all(page) {
    return super.all(page);
  }

  store(data) {
    return super.store(data);
  }

  markAsCompleted(id) {
    return this.http
      .get(this.resource + "/" + id + "/completed")
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  markAsFailed(id) {
    return this.http
      .get(this.resource + "/" + id + "/failed")
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }
  
  getMostSuccessfullyUsers() {
    return this.http
      .get(this.resource + "/most-successfully")
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }
}
