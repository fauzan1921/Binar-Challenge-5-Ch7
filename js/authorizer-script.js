//js agar tidak ada yang bisa mengakses laman kecuali sudah login

const validateLogin = () => {
    const data = localStorage.getItem('token-login')
    if(data === null){
      location.href = '/login'
    }
  }
  
validateLogin()