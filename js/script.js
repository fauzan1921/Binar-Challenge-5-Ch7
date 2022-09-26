const login = async () => {
    const usernameLogin = document.getElementById('username_login').value;
    const passwordLogin = document.getElementById('password_login').value;
    const resp = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameLogin,
            password: passwordLogin
        })
    })

    if(resp.status === 200){
        const data = await resp.json()

        localStorage.setItem('token-login', data.token)

        if(data.user.role === 'superadmin'){
            location.href = '/superadmin-page'
        }else{
            location.href = 'player-page'
        }
    }else{
        alert('login failed')
        location.reload()
    }
}

const register = async () => {
    const usernameRegister = document.getElementById('username_register').value;
    const passwordRegister = document.getElementById('password_register').value;
    const role = document.getElementById('role').value;
    const resp = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameRegister,
            password: passwordRegister,
            role: role
        })
    })

    if(resp.status === 201){
        alert('Sign up successful')
        location.reload()
    }else{
        alert('Sign up failed')
        location.reload()
    }
}

const getRoomData = async () => {
    const resp = await fetch('http://localhost:3000/room', {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token-login')
        }
    })
    const data = await resp.json()
    const roomList = document.getElementById("room-list")

    let roomHTML = ""
    data.forEach(element => {
        roomHTML = roomHTML + `<li>Room ${element.name}. Result = ${element.result} </li>`
    });
    console.log(roomHTML);
    roomList.innerHTML = roomHTML
}
getRoomData()

const createRoom = async () => {
    const roomName = document.getElementById('room-input').value
    const resp = await fetch('http://localhost:3000/room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token-login')
        },
        body: JSON.stringify({
            name: roomName
        })
    })

    if(resp.status !== 201){
        alert('failed to create room')
    }else{
        location.reload()
    }
}

//untuk membawa user ke room sesuai dengan room yang sudah di choose, berfungsi namun akhirnya tidak terpakai
const accessRoom = async () => {
    const player = await fetch('http://localhost:3000/room-id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token-login')
    }})
    const data = await player.json()
    if (data.roomId !== null) {
        window.location.href = `/room/${data.roomId}`
    } else {
        alert('You have to choose room first')
    }
} 

const logout = () => {
    localStorage.removeItem('token-login')
    location.href = '/login'
  }
  