/**
 * EasyHTTP Library
 * Library for making HTTP requests
 * 
 * @version 1.3.0
 * @author Matej Jurík
 * @licence None
 */

class EasyHTTP {
  // Make a HTTP GET request
  async get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Make a HTTP POST request
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const respData = await response.json();

    return respData;
    
  }

  // Make a HTTP PUT request
  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const respData = await response.json();

    return respData;
  }

  // Make a HTTP DELETE request
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
      
    const respData = await "Resource Deleted";
    return respData;
  }
}

export const http = new EasyHTTP();