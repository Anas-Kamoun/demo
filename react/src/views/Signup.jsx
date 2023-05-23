import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signup(){

    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmationRef=useRef();
    const [errors,setErrors]=useState(null)
    const {setUser,setToken} =useStateContext()
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit=(ev)=>{
        ev.preventDefault()
        const payload={
            name :nameRef.current.value,
            email :emailRef.current.value,
            password :passwordRef.current.value,
            password_confirmation :passwordConfirmationRef.current.value,
        }
        console.log(payload)
        axiosClient.post('/signup',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
                console.log(response.data.errors)
            }
        })
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return(
        <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">S'inscrire</h1>
                        {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}

                            </div>}
                            <TextField
            inputRef={nameRef}
            type="text"
            placeholder="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
                            <TextField
            inputRef={emailRef}
            type="email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            inputRef={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            inputRef={passwordConfirmationRef}
            type={showPassword ? "text" : "password"}
            placeholder="Confirmation mot de passe"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          &nbsp;
                        {/* <input ref={nameRef} type="name" placeholder="Full Name"/>
                        <input ref={emailRef} type="email" placeholder="Email Adress"/>
                        <input ref={passwordRef} type="password" placeholder="Password"/>
                        <input ref={passwordConfirmationRef} type="password" placeholder=""/> */}

                        <button className="btn btn-block">S'inscrire</button>
                        <p className="message">
                            Déja inscrit <Link to="/login">Se connecter</Link>
                        </p>
                    </form>
                </div>
            </div>
    )
}