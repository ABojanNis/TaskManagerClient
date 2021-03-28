import $http from "axios";

let API_ENDPOINT = "api/";

export default class Http {
  constructor($auth) {
    if ($auth) {
      this.token = $auth.getToken();
      this._bearer = "Bearer " + (this.token ? this.token : "");
    }
  }

  get(url, params = null) {
    let data = {
      method: "GET",
      headers: {
        Authorization: this._bearer,
        Accept: "application/json"
      }
    };

    if (params) {
      data.params = params;
    }
    return $http
      .get(API_ENDPOINT + url, data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error.response);
      });
  }

  post(url, data) {
    return $http
      .post(API_ENDPOINT + url, data, {
        method: "POST",
        headers: {
          Authorization: this._bearer,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error.response);
      });
  }

  put(url, data) {
    return $http
      .put(API_ENDPOINT + url, data, {
        method: "PUT",
        headers: {
          Authorization: this._bearer,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error.response);
      });
  }

  delete(url) {
    return $http
      .delete(API_ENDPOINT + url, {
        method: "DELETE",
        headers: {
          Authorization: this._bearer,
          Accept: "application/json"
        }
      })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error.response);
      });
  }
}
