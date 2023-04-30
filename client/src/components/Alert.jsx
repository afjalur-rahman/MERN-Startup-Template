import Swal from 'sweetalert2'

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  




export const Success = (title)=>{
  Toast.fire({
    icon: 'success',
    title: title,
  })
  }
export const Error = (title)=>{
  Toast.fire({
    icon: 'error',
    title: title,
  })
  }

export const IS =(header,title,fun)=>{
  Swal.fire({
    title: `${header}`,
    text: `${title}`,
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      fun("/all-lead")
    }
  })
}

export const clearAlert = (setError) => {
  setTimeout(() => {
    setError({ status: false, msg: '', type: '' })
  }, 3000);
};