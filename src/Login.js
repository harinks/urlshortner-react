import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        let loginData = await axios.post("https://urlshortner-node.herokuapp.com/login", values)
        window.localStorage.setItem("my_token", loginData.data.token)
        navigate("/dashboard")
      } catch (error) {
        console.log(error)
      }
    },
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                      <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" name='email' className="form-control" onChange={formik.handleChange}
                              value={formik.values.email} required />
                            <label className="form-label">Email Id</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <div class="pwd">
                            <input type={passwordShown ? "text" : "password"} name='password' className="form-control" onChange={formik.handleChange}
                              value={formik.values.password} required />      
                              <span class="p-viewer">
                                <i onClick={togglePassword} class="fa fa-eye" aria-hidden="true"></i>
                              </span>
                            </div>
                            <label className="form-label" >Password</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-md mb-4">Login</button>
                        </div>
                        <label className='mb-3' style={{ marginLeft: "30px", textAlign: "center", padding: "5px" }}><h6>Dont have an account ? - Click here to Register a new account! </h6></label>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Link to={"/register"}>
                            <button type="button" className="btn btn-primary btn-md">Register</button>
                          </Link>

                        </div>
                      </form>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login