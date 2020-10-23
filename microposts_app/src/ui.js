class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
    this.postContainer = document.querySelector('.postsContainer');
  }

  showPosts(posts) {
    let output = '';

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}"> 
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}"> 
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.posts.innerHTML = output; 
  }

  showAlert(message, className) {
    this.clearAlert();

    const alert = document.createElement('div');
    alert.className = className;
    alert.appendChild(document.createTextNode(message));

    const container = this.postContainer;
    const posts = this.posts;

    container.insertBefore(alert, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create Back button 
      if (!document.querySelector('.post-cancel')) {
        const button = document.createElement('button');
        button.className = 'post-cancel btn btn-dark btn-block';
        button.appendChild(document.createTextNode('Cancel Edit'));

        // Insert back button into the dom
        const cardForm = document.querySelector('.card-form');
        const formEnd = document.querySelector('.form-end');
        cardForm.insertBefore(button, formEnd);
      }
    } else { 
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = "post-submit btn btn-primary btn-block";
      
      // Remove Back button
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();