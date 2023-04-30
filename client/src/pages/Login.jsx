import React,{useState} from 'react'
import {Col,Form,Row,Card,Alert,Container} from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userAuthAPI';
import {storeToken} from "../services/localStorageServices.js"
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../features/alertSlice';
import { Success, clearAlert,Error } from '../components/Alert';


const Login = () => {

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
          email: data.get('email'),
          password: data.get('password'),
        }
        if (actualData.email && actualData.password) {
          
            try {
                dispatch(showLoading());
                const response = await loginUser(actualData)
                dispatch(hideLoading());
                //console.log(response)
                if (response.data.status==='success') {
                    Success(response.data.message)
                    storeToken(response.data.token)
                    document.getElementById('login_form').reset()
                    navigate('/')
                } else {
                  setError({ status: true, msg:response.data.message, type: 'error' })
                  clearAlert(setError)
                  //console.log(response.data.message)
                }
              } catch (error) {
                //console.log("something went wrong")
                Error("Network Error")
              }
          }
         else {
          setError({ status: true, msg: "All Fields are Required", type: 'error' })
          clearAlert(setError)
        }
      }

  return (
        <Container>
            <Row>
                <Col sm={2} md={3} lg={4} xs={1}></Col>
                <Col as={Card} xs={10} sm={8} md={6} lg={4} className='p-4 mt-5'>
                            <Form id="login_form" noValidate onSubmit={handleSubmit}>
                                <h2 className='text-center'>Login</h2>
                                    <Form.Group as={Col} className='mb-2'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email"  id="email" name="email" />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control  type="password" id="password" name="password"/>
                                    </Form.Group>
                                    {error.status ? <Alert variant='danger'>{error.msg}</Alert> : ''}
                                    <button className='main-btn' type='submit'>Login</button>
                                    <div className="d-flex justify-content-between mt-2 w-100 align-items-center">
                                        <div className="left-divider"></div>
                                        <p className="mb-2 mx-2">OR</p>
                                        <div className="right-divider"></div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Don't have an account</p>
                                        <Link to="/sign-up" className="text-center">Register</Link>
                                    </div>  
                            </Form>
                </Col>
                <Col sm={2} xs={1} md={3} lg={4}></Col>
            </Row>
        </Container>
  )
}

export default Login