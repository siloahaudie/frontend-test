const Request = (url = '', method = "GET", data = {}) => {
    return new Promise(resolve => {
        if (method === "GET") {
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(function(response) {
                	 return response.json();
                })
                .then(function(data) {
                    resolve(data);
              	})
              	.catch(function(error) {
                    console.error(error.name + ': ' +error.message);
                });
        } else {
            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    resolve(data);
                })
                .catch(function(error) {
                    console.error(error.name + ': ' +error.message);
                });
        }
    });
}

export default Request;
