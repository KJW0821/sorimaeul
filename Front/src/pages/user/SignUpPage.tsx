import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { set, login } from "../../stores/user";
import { checkNickname, signUp } from "../../utils/userAPI";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/signup/SignUpForm";


function SignUpPage() {
 
  return (
    <SignUpForm />
  )
}

export default SignUpPage;