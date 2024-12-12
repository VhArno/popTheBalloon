<script setup>
import Button from '@/components/Button.vue';
import { computed, ref } from 'vue';
import TextInput from '@/components/TextInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import DateInput from '@/components/DateInput.vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/stores/register';
import { addRegistration } from '@/scripts/api';
import emailjs from 'emailjs-com';

const router = useRouter();
const registeredStore = useRegisterStore();

const genderOptions = ["Male", "Female", "Non-binary", "Other"];
const sexualityOptions = ["Straight", "Gay", "Bi-sexual", "Other"];

const firstname = ref(null);
const lastname = ref(null);
const birth = ref(null);
const email = ref(null);
const gender = ref(null);
const sexuality = ref(null);
const pictures = ref([]);

const firstNameError = ref();
const lastNameError = ref();
const birthError = ref();
const emailError = ref();
const genderError = ref();
const sexualityError = ref();
const pictureError = ref(); 

const validateForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  firstNameError.value = firstname.value ? '' : 'Firstname is required';
  lastNameError.value = lastname.value ? '' : 'Lastname is required';
  birthError.value = birth.value ? (calculateAge(birth.value) > 18 ? '' : 'You must be 18+') : 'Date of birth is required';
  emailError.value = email.value ? (emailRegex.test(email.value) ? '' : 'Email must be valid') : 'Email is required';
  genderError.value = gender.value ? (genderOptions.includes(gender.value) ? '' : 'Gender must be valid') : 'Gender is required';
  sexualityError.value = sexuality.value ? (sexualityOptions.includes(sexuality.value) ? '' : 'Sexuality must be valid') : 'Sexuality is required';
  pictureError.value = pictures.value.length >= 3 && pictures.value.length <= 5 ? '' : 'You must upload between 3 and 5 pictures';

  return !(firstNameError.value || lastNameError.value || birthError.value || emailError.value || genderError.value || sexualityError.value || pictureError.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    const payload = {
      firstname: firstname.value,
      lastname: lastname.value,
      birth: birth.value,
      email: email.value,
      gender: gender.value,
      sexuality: sexuality.value,
      pictures: pictures.value
    };

    const templateParams = {
      to: 'vanhee.arno@gmail.com',
      subject: 'New registration',
      firstname: firstname.value,
      lastname: lastname.value,
      birth: birth.value,
      email: email.value,
      gender: gender.value,
      sexuality: sexuality.value,
      pictures: pictures.value
    };

    emailjs.send('service_iyvwpsr', 'template_p18b1hj', templateParams, 'wZkpXf236fOXb0wtx')
      .then((response) => {
        console.log('Email sent successfully!');
        registeredStore.setRegistered(true);
        if (registeredStore.isRegistered) {
          router.push('/success');
        }
      }, (error) => {
        console.log('Failed to send email: ' + error.text);
    });

    /*addRegistration(payload)
      .then((res) => {
        console.log(res);

        registeredStore.setRegistered(true);
        if (registeredStore.isRegistered) {
          router.push('/success');
        }
      })
      .catch((err) => console.log(err));*/
  }
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
};

// Handle file input change
const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  if (pictures.value.length < 5 && pictures.value.length + files.length <= 5) {
    pictures.value.push(...files);
  }
};

const deletePic = (deletePic) => {
  const tempPictures = [];

  pictures.value.forEach((pic) => {
    if(pic.name !== deletePic) {
      tempPictures.push(pic)
    }
  })

  pictures.value = tempPictures
}
</script>

<template>
  <section>
    <div class="imgContainer">
      <img src="/src/assets/odisee.png" />
    </div>

    <h1>🎈Pop the balloon - Odisee edition!!!🎈</h1>

    <p>
      Wil jij jouw ware liefde vinden? Doe dan mee aan ons spannende 'Pop the Balloon'-spel! Geïnspireerd door de populaire YouTube-serie, 
      brengen we deze sensatie naar onze school. Durf jij de uitdaging aan? Schrijf je nu in!
    </p>
    
    <form @submit="handleSubmit" enctype="multipart/form-data" method="POST">
      <TextInput v-model="firstname" name="firstname" placeholder="Firstname" :error="firstNameError" required />
      <TextInput v-model="lastname" name="lastname" placeholder="Lastname" :error="lastNameError" required />
      <DateInput v-model="birth" name="birth" placeholder="Date of birth" :error="birthError" required />
      <TextInput v-model="email" name="email" placeholder="Email" :error="emailError" required />
      <SelectInput v-model="gender" name="gender" placeholder="Gender" :options="genderOptions" :error="genderError" required />
      <SelectInput v-model="sexuality" name="sexuality" placeholder="Sexuality" :options="sexualityOptions" :error="sexualityError" required />
      
      <!-- File input for uploading pictures -->
      <input type="file" name="picture" multiple @change="handleFileChange" />
      <span v-for="pic in pictures" :key="pic.name">
        {{ pic.name }}
        <button @click="deletePic(pic.name)">delete</button>
      </span>
      <span v-if="pictureError" class="error">{{ pictureError }}</span>

      <Button text="send" type="submit" />
    </form>
  </section>
</template>

<style lang="css" scoped>
section {
  margin-bottom: 2rem;
}

.imgContainer {
  display: flex;
  width: 100%;
}
img {
  width: 40%;
  margin: 0 auto;
}

h1, p {
  text-align: center;
  margin: 1rem 0;
}

form {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin: 0 auto;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
