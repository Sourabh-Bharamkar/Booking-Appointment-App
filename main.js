
let form = document.getElementById('form')

let registeredUsers = document.getElementById('registeredUsers')

//Sending data to CrudCrud on submit
form.addEventListener('submit', storeDetails)


//store user details on CrudCrud  
function storeDetails(e) {

  e.preventDefault();

  //taking the data entered by user
  let userName = document.getElementById('name').value
  let email = document.getElementById('email').value
  let phoneNumber = document.getElementById('phoneNumber').value


  // create object for details entered by user 
  let userDetails = {
    "userName": userName,
    'email': email,
    'phoneNumber': phoneNumber
  }


  axios.post('https://crudcrud.com/api/17b7b3a9597e4d6e9fcff3e6d727b822/appointmentData', userDetails)
    .then((response) => {
      showUserOnScreen();
    }).catch((error) => {
      alert("something went wrong")
    })

}

//add event listener to DOMContentLoaded
window.addEventListener('DOMContentLoaded', getDataFromCrudCrud)

function getDataFromCrudCrud(e) {
  e.preventDefault();
  axios.get('https://crudcrud.com/api/17b7b3a9597e4d6e9fcff3e6d727b822/appointmentData')
    .then((response) => {
      response.data.forEach(element => {
        let userDetails = {
          "userName": element.userName,
          'email': element.email,
          'phoneNumber': element.phoneNumber
        }

        // create li element 
        let li = document.createElement('li')
        li.style.display = 'flex'

        // creating textnode for user details 
        let userDetailsTextnode = document.createTextNode(`${userDetails.userName} - ${userDetails.email} - ${userDetails.phoneNumber} `);
        li.appendChild(userDetailsTextnode);

        //create edit and delete buttons
        let editBtn = editButton();
        let deleteBtn = deleteButton();

        //append these buttons to li
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)

        //append li to registered Users 
        document.getElementById('registeredUsers').append(li)

      });

    }).catch((error) => {
      alert(error)
    })

}

function showUserOnScreen() {
  //taking the data entered by user
  let userName = document.getElementById('name').value
  let email = document.getElementById('email').value
  let phoneNumber = document.getElementById('phoneNumber').value

  // create object for details entered by user 
  let userDetails = {
    "userName": userName,
    'email': email,
    'PhoneNumber': phoneNumber
  }

  // create li element 
  let li = document.createElement('li')
  li.style.display = 'flex'

  // creating textnode for user details 
  let userDetailsTextnode = document.createTextNode(`${userDetails.userName} - ${userDetails.email} - ${userDetails.PhoneNumber}`)
  
  li.appendChild(userDetailsTextnode)

  //create edit and delete buttons
  let editBtn = editButton();
  let deleteBtn = deleteButton();

  //append these buttons to li
  li.appendChild(editBtn)
  li.appendChild(deleteBtn)

  //append li to registered Users 
  document.getElementById('registeredUsers').append(li)

  document.getElementById('name').value = ''
  document.getElementById('email').value = ""
  document.getElementById('phoneNumber').value = ""

}

function editButton() {
  // create edit button 
  let editBtn = document.createElement('input')
  editBtn.setAttribute('type', 'button')
  editBtn.setAttribute('value', 'Edit')
  editBtn.className = 'btn btn-outline-success btn-sm mx-1 edit'
  return editBtn;
}

function deleteButton() {
  // create delete button 
  let deleteBtn = document.createElement('input')
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('value', 'Delete');
  deleteBtn.className = 'btn btn-outline-danger btn-sm delete';
  return deleteBtn;
}

//add delete functionality 
registeredUsers.addEventListener('click', deleteFunction)

function deleteFunction(e) {
  e.preventDefault();

  if (e.target.classList.contains('delete')) {

    if (confirm('Do you want to delete')) {
      //delete user from CrudCrud
      deleteUserFromCrudCrud(e);

      //delte user from screen
      let userList = Array.from(document.getElementById('registeredUsers').childNodes)

      userList.forEach((element) => {
        if (element.firstChild == e.target.parentNode.firstChild) {
          e.target.parentNode.remove();
        }
      })
    }

  }

}

function deleteUserFromCrudCrud(e) {
  axios.get('https://crudcrud.com/api/17b7b3a9597e4d6e9fcff3e6d727b822/appointmentData')
    .then((response) => {
      let allUserDetails = response.data;
      allUserDetails.forEach((element) => {
        //get target user details
        let targetUserDetails = e.target.parentNode.firstChild.textContent;
        
        if (targetUserDetails.includes(element.email)) {

          let id = element._id;
          console.log(id)

          axios.delete(`https://crudcrud.com/api/17b7b3a9597e4d6e9fcff3e6d727b822/appointmentData/${id}`).then((response)=>{ console.log(`user with id ${id} is deleted`)}).catch(()=>{console.log(error)})
        }
      })

    })
}
