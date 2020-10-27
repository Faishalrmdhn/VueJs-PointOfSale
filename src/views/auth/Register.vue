<template>
  <b-row class="register mx-0">
    <b-col md="6" class="left">
      <b-row align-v="center" class="content-left">
        <b-col>
          <img src="../../assets/icon.png" alt />
          <h3>ELCAPP</h3>
          <p>Online Food Cashier Application</p>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6" class="right">
      <b-row class="content-right" align-v="center">
        <b-col>
          <div class="card text-left">
            <h4>
              <span class="login" @click="loginPage">Sign In </span>| Sign Up
            </h4>
            <b-form
              class="mt-5"
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
            >
              <b-form-group label="Email">
                <input
                  v-focus
                  v-model="form.user_email"
                  type="email"
                  required
                  placeholder="Input your email"
                />
              </b-form-group>
              <b-form-group label="Username">
                <input
                  v-model="form.user_name"
                  type="text"
                  required
                  placeholder="Input your name"
                />
              </b-form-group>
              <b-form-group label="Password">
                <input
                  v-model="form.user_password"
                  type="password"
                  required
                  placeholder="Input your password"
                />
              </b-form-group>
              <br />
              <b-row>
                <b-col sm="4">
                  <b-button pill variant="outline-info" type="submit"
                    >Sign Up</b-button
                  >
                </b-col>
              </b-row>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      form: {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      console.log(this.form)
      if (this.form.user_password.length < 8) {
        alert('Password length must be at least 8 Character')
      } else {
        this.register(this.form)
          .then((result) => {
            console.log(result)
            this.$router.push('/login')
            alert('Signup Successfull!')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    },
    loginPage() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montaga&display=swap');
.register {
  font-family: 'Montaga', 'Numans', sans-serif;
  color: white;
  height: 100vh;
  width: 100%;
  text-align: center;
}

.card {
  background-color: transparent;
  border: transparent;
}
.login {
  color: rgb(117, 115, 115);
}

.login:hover {
  cursor: pointer;
  color: rgb(87, 199, 187);
}

.left {
  height: 100%;
  width: 100%;
  background-color: rgb(87, 199, 187);
}

.right {
  height: 100%;
  width: 100%;
  background-color: rgb(47, 64, 84);
}

.content-left {
  height: 100%;
}

.content-right {
  height: 100%;
}

input {
  width: 80%;
  height: 50px;
  border: 5px solid rgba(169, 169, 169, 0.6);
  color: white;
  border-radius: 10px;
  background: linear-gradient(rgb(87, 199, 187), rgb(87, 199, 187)) center
    bottom 5px / calc(100% - 10px) 2px no-repeat;

  border: 1px solid transparent;
  margin: 5px;
}

h3 {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 700;
}
</style>
