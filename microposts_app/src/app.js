import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
function getPosts(e) {
  e.preventDefault();
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}

// Listen for add
ui.postSubmit.addEventListener('click', submitPost);
function submitPost(e) {
  e.preventDefault();
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  const id = ui.idInput.value;

  // Validate input
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all the fields', 'alert alert-danger');
  } else {

    if (id === '') {
      // Create post
      const data = {
        title, 
        body
      };
  
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Update post
      const data = {
        title, 
        body
      };
  
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(error => {
          console.log(error);
        });
    }

    
  }
}

// Listen for delete
ui.posts.addEventListener('click', deletePost);
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;

    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(error => console.log(error));
    }
  }
}

// Listen for edit state
ui.posts.addEventListener('click', enableEdit);
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    ui.fillForm(data);
  }
}

// Listen for cancel 
document.querySelector('.card-form').addEventListener('click', cancelEdit);
function cancelEdit(e) {
  e.preventDefault();

  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');    
  } 
}