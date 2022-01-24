import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'

function Dashboard() {
    const [urlList, setUrlList] = useState([])
    useEffect(async () => {
        try {
            let dashboard = await axios.get("https://urlshortner-node.herokuapp.com/dashboard", {
                headers: {
                    Authorization: window.localStorage.getItem("my_token")
                }
            })
            console.log(dashboard.data.totalusers)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        fetchUrls()
    }, [])


    let fetchUrls = async () => {
        try {
            let allUrls = await axios.get("https://urlshortner-node.herokuapp.com/getUrls")
            setUrlList(allUrls.data)
        } catch (error) {
            console.log(error)
        }
    }

    let handleDelete = async (id) => {
        try {
            let result = window.confirm("Are you sure want to delete?")
            if (result) {
                await axios.delete(`https://urlshortner-node.herokuapp.com/url/${id}`)
                fetchUrls();
            }
        } catch (error) {
            console.log(error)
        }
    }


    const formik = useFormik({
        initialValues: {
            url: ''
        },
        onSubmit: async (values) => {
            try {
                axios.post("https://urlshortner-node.herokuapp.com/create-url", values)
            } catch (error) {
                console.log(error)
            }
            fetchUrls();
        },
    });

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-11 mt-3'>
                         <h2>URL Shortner</h2>
                         </div>
                        <div className='col-lg-1 mt-3'>
                        <Link to={"/"}><button className='btn btn-info'>Logout</button></Link>  
                        </div>     
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className='row col-lg-12 text-center mt-5'>
                        <div class="input-group mb-5">
                            <input type="text" class="form-control" name='url' placeholder="Place your url..." onChange={formik.handleChange}
                                value={formik.values.url} required/>
                            <input class="btn btn-primary" type="submit" id="button-addon2" />
                        </div>
                    </div>
                </form>

                {
                    urlList.map((url, index) => {

                        return <div class="d-flex justify-content-center" key={index}>
                            <div className='col-lg-10 mt-2'>
                                <div class="card border-primary mb-4">
                                    <div class="card-header">Short URL</div>
                                    <div class="card-body text-success">
                                        <h5 class="card-title"><a href={url.url} target="_blank">{`http://localhost:3000/${url.shortUrl}`}</a></h5>
                                        <div className='text-dark mt-3 mb-2'>Orginal URL</div>
                                        <p class="card-text">{url.url}</p>
                                        <button onClick={() => handleDelete(url._id)} className='btn btn-danger'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>

        </>
    )
}

export default Dashboard