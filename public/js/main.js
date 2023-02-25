
let form = document.getElementById('form')

let registeredUsers = document.getElementById('registeredUsers')

// function for clearing the input fields 
function clearInputFields() {

  document.getElementById('name').value = ''
  document.getElementById('email').value = ""
  document.getElementById('phoneNumber').value = ""
}

//adding an event listener on form submit
form.addEventListener('submit', saveDetails)

// function for saving user details to database  
async function saveDetails(e) {
  try {
    e.preventDefault();

    console.log('inside saveDetails function')

    //taking the data entered by user
    let userName = document.getElementById('name').value
    let email = document.getElementById('email').value
    let phoneNumber = document.getElementById('phoneNumber').value


    // create object for details entered by user 
    let userDetails = {
      "username": userName,
      'email': email,
      'phoneNumber': phoneNumber
    }

    //verify details entered by user
    const response = await axios.post('http://localhost:3000/verify-user', userDetails)

    console.log(response.data)
    //if response.data is empty arraay then no record find with the email entered

    if (response.data.length != 0) {

      const id = response.data[0].id;
      window.alert('Already an appointment is booked with these details')
      const res = window.confirm('Do you want to edit existing user details?')

      if (res) {

        const response = await axios.post(`http://localhost:3000/update-user/${id}`, userDetails)
       let updatedUserDetails=response.data;
        clearInputFields();

        let registeredUsers = document.getElementById('registeredUsers').children;

        registeredUsers = Array.from(registeredUsers)

        console.log(registeredUsers)
        console.log(updatedUserDetails)

        registeredUsers.forEach((item) => {
          if (item.id == id) {
            console.log(item.firstChild)
            item.firstChild.remove()
            item.prepend(`${updatedUserDetails.username} - ${updatedUserDetails.email} - ${updatedUserDetails.phoneNumber}`)
          }
        })


      }
      else {

        clearInputFields();
      }

    }
    else {
      //sending post request if user details are not found in the database
      const response1 = await axios.post('http://localhost:3000/book-appointment', userDetails)

      window.alert('Appointment booked successfully')
      console.log(response1)
      showUserOnScreen(response1.data);
      clearInputFields();

    }

  } catch {
    (error) => {
      console.log(error)
    }
  }

}


// add event listener to DOMContentLoaded
window.addEventListener('DOMContentLoaded', getDataFromServer)

async function getDataFromServer(e) {

  try {
    e.preventDefault();

    const response = await axios.get('http://localhost:3000/appointments')

    console.log('inside getDataFromServer')

    response.data.forEach(element => {
      let userDetails = {
        "id": element.id,
        "username": element.username,
        'email': element.email,
        'phoneNumber': element.phoneNumber
      }

      let userDetailsHTML =
        ` <li id=${userDetails.id} style="display:flex">
      ${userDetails.username} - ${userDetails.email} - ${userDetails.phoneNumber}
      <button class="btn btn-outline-success btn-sm mx-1 edit" style="width:5%">edit
      </button>
        <button type='submit' class="btn btn-outline-danger btn-sm mx-1 delete" style="width:5%">delete
        </button>
      
    </li>`

      //append userDetailsHTML to registered Users
      document.getElementById("registeredUsers").insertAdjacentHTML("beforeend", userDetailsHTML)

    })

  } catch {
    (error) => {
      console.log(error)

    }
  }

}



function showUserOnScreen(userDetails) {

  let userDetailsHTML =
    ` <li id=${userDetails.id} style="display:flex">
  ${userDetails.username} - ${userDetails.email} - ${userDetails.phoneNumber}
  <button class="btn btn-outline-success btn-sm mx-1 edit" style="width:5%">edit
  </button>
    <button type='submit' class="btn btn-outline-danger btn-sm mx-1 delete" style="width:5%">delete
    </button>
  
</li>`

  //append userDetailsHTML to registered Users
  document.getElementById("registeredUsers").insertAdjacentHTML("beforeend", userDetailsHTML)

  document.getElementById('name').value = ""
  document.getElementById('email').value = ""
  document.getElementById('phoneNumber').value = ""

}


//add delete functionality
registeredUsers.addEventListener('click', deleteUserDetails)

async function deleteUserDetails(e) {
  try {
    if (e.target.classList.contains('delete')) {
      const id = e.target.parentNode.id;

      if (confirm('Do you want to delete')) {

        await axios.get(`http://localhost:3000/delete-appointment/${id}`)

        e.target.parentNode.remove();


      }

    }
  } catch {
    (error) => {
      console.log(error)
    }
  }


}


registeredUsers.addEventListener('click', editUserDetails)

// adding edit functionality
async function editUserDetails(e) {
  try {
    e.preventDefault();

    if (e.target.classList.contains('edit')) {
      const id = e.target.parentNode.id;

      //find corresponding user details from crud crud
      const response = await axios.get(`http://localhost:3000/edit-appointment/${id}`,)

      let userDetails = response.data;

      //put corresponding user details to input fields
      document.getElementById('name').value = userDetails.username;
      document.getElementById('email').value = userDetails.email;
      document.getElementById('phoneNumber').value = userDetails.phoneNumber;

    }
  } catch {
    (error) => {
      console.log(error)

    }
  }

}
