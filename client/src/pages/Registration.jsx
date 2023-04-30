import React,{useState} from 'react'
import {Col,Form,Row,Card,Alert,Container} from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userAuthAPI';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../features/alertSlice';
import { clearAlert, Success,Error } from '../components/Alert';
const Registration = () => {

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })

      const navigate = useNavigate()
      const dispatch = useDispatch();


      const handleSubmit= async(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const actualData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            confirm_password: data.get('confirm_password'),
            isAdmin:"false",
          }
          if (actualData.name && actualData.email && actualData.password && actualData.confirm_password) {
            if (actualData.password === actualData.confirm_password) {
              try {
                dispatch(showLoading())
                const res = await registerUser(actualData);
                dispatch(hideLoading())
                //console.log(res)
                if (res.data.status==="success") {
                  Success(res.data.message)
                  navigate("/login");
                }
                if(res.data.status==="failed"){
                    setError({ status: true, msg: res.data.message, type: 'danger' })
                    clearAlert(setError)
                 // Error("Network Error ")
                }
              } catch (error) {
                  //console.log("something went wrong")
                  Error("Network Error")
              }
              
            } else {
              setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'danger' })
              clearAlert(setError)
            }
          } else {
            setError({ status: true, msg: "All Fields are Required", type: 'danger' })
            clearAlert(setError)
          }
      }

      
    


  return (
        <Container>
            <Row>
                <Col sm={2} md={3} lg={4} xs={1}></Col>
                <Col as={Card} xs={10} sm={8} md={6} lg={4} className='p-4 mt-5 card'>
                            <Form id="registration_form" noValidate onSubmit={handleSubmit}>
                                <h2 className='text-center'>Register</h2>
                                    <Form.Group as={Col} className='mb-2'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text"  id="name" name="name"/>
                                    </Form.Group>

                                    <Form.Group as={Col} className='mb-2'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email"  id="email" name="email" />
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control  type="password" id="password" name="password"/>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control  type="password" id="confirm_password" name="confirm_password"/>
                                    </Form.Group>
                                    {error.status ? <Alert variant='danger'>{error.msg}</Alert> : ''}
                                    <button className='main-btn' type='submit' >Sign Up</button>
                                    <div className="d-flex justify-content-between mt-2 w-100 align-items-center">
                                        <div className="left-divider"></div>
                                        <p className="mb-2 mx-2">OR</p>
                                        <div className="right-divider"></div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Already have an account</p>
                                        <Link to="/login" className="text-center">Login</Link>
                                    </div>  
                            </Form>
                </Col>
                <Col sm={2} xs={1} md={3} lg={4}></Col>
            </Row>
        </Container>
  )
}

export default Registration