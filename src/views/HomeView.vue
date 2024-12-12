<script setup>
import Button from '@/components/Button.vue';
import { computed, ref } from 'vue';
import TextInput from '@/components/TextInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import DateInput from '@/components/DateInput.vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/stores/register';
import { addRegistration } from '@/scripts/api'

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

const firstNameError = ref();
const lastNameError = ref();
const birthError = ref();
const emailError = ref();
const genderError = ref();
const sexualityError = ref();

const validateForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  firstNameError.value = firstname.value ? '' : 'Firstname is required';
  lastNameError.value = lastname.value ? '' : 'Lastname is required';
  birthError.value = birth.value ? (calculateAge(birth.value) > 18 ? '' : 'You must be 18+') : 'Date of birth is required';
  emailError.value = email.value ? (emailRegex.test(email.value) ? '' : 'Email must be valid') : 'Email is required';
  genderError.value = gender.value ? (genderOptions.includes(gender.value) ? '' : 'Gender must be valid') : 'Gender is required';
  sexualityError.value = sexuality.value ? (sexualityOptions.includes(sexuality.value) ? '' : 'Gender must be valid') : 'Sexuality is required';

  return !(firstNameError.value || lastNameError.value || birthError.value || emailError.value || genderError.value || sexualityError.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {

    console.log(birth.value)

    const payload = {
      firstname: firstname.value,
      lastname: lastname.value,
      birth: birth.value,
      email: email.value,
      gender: gender.value,
      sexuality: sexuality.value
    }

    addRegistration(payload)
      .then((res) => {
        console.log(res);

        registeredStore.setRegistered(true);
        if (registeredStore.isRegistered) {
          router.push('/success')
        }
      }) .catch((err) => console.log(err))
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
</script>

<template>
  <section>
    <div class="imgContainer">
      <img src="/src/assets/odisee.png">
    </div>
    
    <h1>🎈Pop the balloon - Odisee edition!!!🎈</h1>

    <p>
      Wil jij jouw ware liefde vinden? Doe dan mee aan ons spannende 'Pop the Balloon'-spel! Geïnspireerd door de populaire YouTube-serie, 
      brengen we deze sensatie naar onze school. Durf jij de uitdaging aan? Schrijf je nu in!
    </p>
    
    <form @submit="handleSubmit">
      <TextInput v-model="firstname" name="firstname" placeholder="Firstname" :error="firstNameError" required />
      <TextInput v-model="lastname" name="lastname" placeholder="Lastname" :error="lastNameError" required />
      <DateInput v-model="birth" name="birth" placeholder="Date of birth" :error="birthError" required />
      <TextInput v-model="email" name="email" placeholder="Email" :error="emailError" required />
      <SelectInput v-model="gender" name="gender" placeholder="Gender" :options=genderOptions :error="genderError" required />
      <SelectInput v-model="sexuality" name="sexuality" placeholder="Sexuality" :options=sexualityOptions :error="sexualityError" required />

      <Button text="send" type="submit"></Button>
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
</style>
