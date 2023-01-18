
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

  //check whether user is present with this email id 
  //if present update the corresponding user details
  axios.get('https://crudcrud.com/api/e1d8df644a6f486eb1b851a7b4be7ac2/appointmentData')
    .then((response) => {
      let allUserDetails = response.data;
      var elementFound = false;

      allUserDetails.forEach((element) => {
        //if element is found with corresponding user email, update this element
        if (userDetails.email == element.email) {
          elementFound = true;
          let id = element._id;

          axios.put(`https://crudcrud.com/api/e1d8df644a6f486eb1b851a7b4be7ac2/appointmentData/${id}`, userDetails)
            .then((response) => {
              //modify user details from screen 
              let userList = Array.from(document.getElementById('registeredUsers').childNodes)

              userList.forEach((item) => {
                if (item.id == element.email) {
                  console.log(item.firstChild)
                  item.firstChild.remove()
                  item.prepend(`${userDetails.userName} - ${userDetails.email} - ${userDetails.phoneNumber}`)
                }
              })
              //clear input fields
              document.getElementById('name').value = ''
              document.getElementById('email').value = ""
              document.getElementById('phoneNumber').value = ""


            }).catch((error) => {
              alert("something went wrong")
            })
        }

      })

      console.log(elementFound);

      //if element is not found
      if (elementFound == false) {
        axios.post('https://crudcrud.com/api/e1d8df644a6f486eb1b851a7b4be7ac2/appointmentData', userDetails)
          .then((response) => {
            showUserOnScreen();
          }).catch((error) => {
            alert("something went wrong")
          })
      }
    })

}


//add event listener to DOMContentLoaded
window.addEventListener('DOMContentLoaded', getDataFromCrudCrud)

function getDataFromCrudCrud(e) {
  e.preventDefault();
  axios.get('https://crudcrud.com/api/e1d8df644a6f486eb1b851a7b4be7ac2/appointmentData')
    .then((response) => {
      response.data.forEach(element => {
        let userDetails = {
          "userName": element.userName,
          'email': element.email,
          'phoneNumber': element.phoneNumber
        }

        let userDetailsHTML = `<li id=${userDetails.email} display="flex"> ${userDetails.userName} - ${userDetails.email} - ${userDetails.phoneNumber} <input type='button' value="edit" class="btn btn-outline-success btn-sm mx-1 edit"> <input type='button' value="delete" class="btn btn-outline-danger btn-sm mx-1 delete"></li>`


        //append userDetailsHTML to registered Users 
        document.getElementById("registeredUsers").insertAdjacentHTML("beforeend", userDetailsHTML)

      })

    }).catch((error) => {
      console.log(error)
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
    'phoneNumber': phoneNumber
  }


  let userDetailsHTML = `<li id=${userDetails.email} display="flex"> ${userDetails.userName} - ${userDetails.email} - ${userDetails.phoneNumber} <input type='button' value="edit" class="btn btn-outline-success btn-sm mx-1 edit"> <input type='button' value="delete" class="btn btn-outline-danger btn-sm mx-1 delete"></li>`

  //append userDetailsHTML to registered Users 
  document.getElementById("registeredUsers").insertAdjacentHTML("beforeend", userDetailsHTML)

  document.getElementById('name').value = ''
  document.getElementById('email').value = ""
  document.getElementById('phoneNumber').value = ""

}


//add delete functionality 
registeredUsers.addEventListener('click', deleteUserDetails)

function deleteUserDetails(e) {
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
  axios.get('https://crudcrud.com/api/e1d8df644a6f486eb1b851a7b4be7ac2/appointmentData')
    .then((response) => {
      let allUserDetails = response.data;

      allUserDetails.forEach((element) => {
        //get target user id
        let targetUserId = e.target.parentNode.id;

        if (targetUserId == element.email) {

          let id = element._id;
          console.log(id)

          axios.delete(`https://crudcrud.com/api/e1d8df644a6f486eb1b851a7b4be7ac2/appointmentData/${id}`).then((response) => { console.log(`user with id ${id} is deleted`) }).catch(() => { console.log(error) })
        }
      })

    })
}


registeredUsers.addEventListener('click', editUserDetails)

// adding edit functionality 
function editUserDetails(e) {
  e.preventDefault();

  if (e.target.classList.contains('edit')) {
    //find corresponding user details from crud crud 
    axios.get('https://crudcrud.com/api/e1d8df644a6f486eb1b851a7b4be7ac2/appointmentData')
      .then((response) => {

        let allUserDetails = response.data;

        allUserDetails.forEach((element) => {

          //get target user id
          let targetUserId = e.target.parentNode.id;

          if (targetUserId == element.email) {
            //put corresponding user details to input fields 
            document.getElementById('name').value = element.userName;
            document.getElementById('email').value = element.email;
            document.getElementById('phoneNumber').value = element.phoneNumber;


          }
        })
      })

  }
}


