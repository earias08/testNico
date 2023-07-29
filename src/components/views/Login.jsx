import { Form, Button,Modal,NavItem} from "react-bootstrap";
import { useState } from "react";
import { Person } from "react-bootstrap-icons";
import { login } from "../helpers/queris";
import { useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginshow, loginsetShow] = useState(false);
  const [registershow, registersetShow] = useState(false);

  const loginhandleClose = () => loginsetShow(false);
  const registerhandleClose = () => registersetShow(false);
  const loginhandleShow = () => loginsetShow(true);
  const registerhandleShow = () => registersetShow(true);

  const { register, handleSubmit, formState: { errors}, reset } = useForm();
  const navegacion = useNavigate();

  const onSubmit = (usuario)=>{
    console.log(usuario)
    login(usuario).then((respuesta)=>{
      if(respuesta && respuesta.status === 200){
        sessionStorage.setItem('usuario', JSON.stringify(respuesta.nombreUsuario));
        Swal.fire(
          'Bienvenido',
          `${respuesta.nombreUsuario} iniciaste sesion correctamente`,
          'success'
        );
        setUsuarioLogueado(respuesta);
        //redireccionar
        navegacion('/administrador');
      }else{
        Swal.fire(
          'Error',
          'Email o password incorrecto ',
          'error'
        )
      }
    })
  }
  return (
    <>
    <NavItem onClick={loginhandleShow}>
    <Person></Person> Iniciar Sesión
    </NavItem>

    <Modal show={loginshow} onHide={loginhandleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Iniciar Sesión</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese un email"
            {...register('email', {
              required: 'El email es un dato obligatorio',
              pattern:{
                value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: 'El email debe cumplir con el formato mail@dominio.com'
              }
             })}
          />
             <Form.Text className="text-danger">
               {errors.email?.message}
             </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...register('password', {
              required: 'La contraseña es un dato obligatorio',
              pattern:{
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message: 'Su contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.'
              }
             })}
          />
             <Form.Text className="text-danger">
               {errors.password?.message}
             </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          className="mt-4 d-block m-auto"
          type="submit"
        >
          Iniciar Sesion
        </Button>
      </Form>
    </Modal.Body>
    <Modal.Footer className="justify-content-center mt-4">
      <p>¿Aún no tienes cuenta?</p>
      <Button variant="primary" onClick={registerhandleShow}>
        Regístrarse
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  );
};

export default Login;