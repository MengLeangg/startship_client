export default function ({ $axios, store, redirect }) {

  // axios error request code 500
  $axios.onError(error => {
    if (error.response && error.response.status === 500) {
      redirect('/signin')
    }
  })

  // axios interceptors response
  $axios.interceptors.response.use(
    response => {
      if (response.status === 200) {
        if (response.request.responseURL && response.request.responseURL.includes('signin')) {
          store.dispatch("users/setUsers", response);
        }
      }
      return response
    }
  )

}
