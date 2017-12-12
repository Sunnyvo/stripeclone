import React from "react";
import _ from "lodash";

const request = (route, key, method, data) => {

  const dataStr =
    method == "GET"
      ? null
      : _.toPairs(data)
          .map(a => `${a[0]}=${a[1]}`)
          .join("&");
  return fetch(`https://api.stripe.com/v1/${route}`, {
    method: method,
    headers: {
      'Accept': "application/json",
      'Authorization': `Bearer  ${key}`,
      'Content-Type': "application/x-www-form-urlencoded"
    },
    body: dataStr
  }).then(data => data.json());
};

export function withStripe(method, WrappedComponent, publicKey, secretKey) {
  return class extends React.Component {
    postPublic(route, postData) {
      return request(route, publicKey, method , postData);
    }

    postSecret(route, postData) {
      return request(route, secretKey, method , postData);
    }

    render() {
      return (
        <WrappedComponent
          postPublic={this.postPublic}
          postSecret={this.postSecret}
          {...this.props}
        />
      );
    }
  };
}


