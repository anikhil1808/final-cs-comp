
const firebaseConfig = {
    apiKey: "AIzaSyC6vvTUiNim-QVgDfaNDJcY2Pr_Ow8g1h8",
    authDomain: "login-authentication-cscomp01.firebaseapp.com",
    projectId: "login-authentication-cscomp01",
    storageBucket: "login-authentication-cscomp01.appspot.com",
    messagingSenderId: "676291337553",
    appId: "1:676291337553:web:b8e0f41187e4e81ff48770",
    measurementId: "G-95JPWJF0TK"
  };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function signup(){
    email=document.getElementById('email').value;
    password=document.getElementById('password').value
    first_name=document.getElementById('first_name').value;
    last_name=document.getElementById('last_name').value;

    if(validate_email(email) == false || validate_password(password) == false){
        alert('Please check your email and make sure your password is minimum 7 charecters long')
        return
    }
    if(validate_field(first_name)== false || validate_field(last_name) == false){
        alert('Please input Your Name')
        return
    }
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){
        var user = auth.currentUser
        var database_ref = database.ref()
        var user_data = {
            email : email,
            first_name : first_name,
            last_name : last_name,
            last_login : Date.now()
        }
        database_ref.child('usersm/' + user.uid).set(user_data);
        alert('User Created Now you can login in');
        x.style.left='4px';
        y.style.right='-520px';
        a.className += " white-btn";
        b.className = "btn";
        x.style.opacity = 1;
        y.style.opacity = 0;

    })
    .catch(function(error) {
        var error_code = error.code
        var error_message = error.message
        alert(error_message)
    })
}

    function signin () {
        // Get all our input fields
        email_login = document.getElementById('email_login').value
        password_login = document.getElementById('password_login').value
      
        // Validate input fields
        if (validate_email(email) == false || validate_password(password) == false) {
          alert('Please check your email and make sure your password is minimum 7 charecters long')
          return
          // Don't continue running the code
        }
      
        auth.signInWithEmailAndPassword(email_login, password_login)
        .then(function() {
          // Declare user variable
          var user = auth.currentUser
      
          // Add this user to Firebase Database
          var database_ref = database.ref()
      
          // Create User data
          var user_data = {
            last_login : Date.now()
          }
      
          // Push to Firebase Database
          database_ref.child('users/' + user.uid).update(user_data)
      
          // DOne
          alert('User Logged In!!')
        })
        .catch(function(error) {
          // Firebase will use this to alert of its errors
          var error_code = error.code
          var error_message = error.message
      
          alert(error_message)
        })
      }

function validate_email(email){
    expression=/^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email) == true){
        return true
    }else{
        return false
    }

}

function validate_password(password){
    if (password < 6){
        return false
    } else{
        return true
    }
}
function validate_field(field){
    if(field == null){
        return false

    }
    if(field.legth <= 0){
        return false
    }else{
        return true
    }
}