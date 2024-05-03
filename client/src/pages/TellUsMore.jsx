import React, { useState } from "react";
import SuperInput from "../components/SuperInput";
import { ImSpinner9 } from "react-icons/im";
import MailSvg from "../assets/mailSvg";
import { FaPhoneAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../config/firebase-config";
import toast, { Toaster } from "react-hot-toast";

const TellUsMore = () => {
  const { currentUser } = useAuth();
  const { state } = useLocation();
  const missingInfos = state;
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  console.log(missingInfos);
  console.log("USER", currentUser);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = ({ lastName, firstName, email, phoneNumber }) => {
    const errors = {};

    if (
      missingInfos.hasOwnProperty("email") &&
      (!email ||
        !email
          .trim()
          .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
    ) {
      errors.email = "Adresse email invalide";
    } else if (errors.hasOwnProperty("email")) {
      delete errors["email"];
    }

    if (missingInfos.hasOwnProperty("phoneNumber")) {
      const phoneNumberRegex = /^[+]?\d{10,}$/;
      if (!phoneNumber || !phoneNumber.trim().match(phoneNumberRegex)) {
        errors.phoneNumber = "Numéro de téléphone invalide";
      } else if (errors.hasOwnProperty("phoneNumber")) {
        delete errors["phoneNumber"];
      }
    }

    if (missingInfos.hasOwnProperty("displayName")) {
      if (
        !lastName ||
        !lastName
          .trim()
          .match(/^(?=(?:.*[a-zA-ZÀ-ÖØ-öø-ÿ]){2})[a-zA-ZÀ-ÖØ-öø-ÿ \-'']+$/)
      ) {
        errors.lastName = "Nom invalide";
      } else if (errors.hasOwnProperty("lastName")) {
        delete errors["lastName"];
      }

      if (
        !firstName ||
        !firstName
          .trim()
          .match(/^(?=(?:.*[a-zA-Z]){2})[a-zA-ZÀ-ÖØ-öø-ÿ \-'']+$/)
      ) {
        errors.firstName = "Prénom invalide";
      } else if (errors.hasOwnProperty("firstName")) {
        delete errors["firstName"];
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    setIsLoading(true);

    const data = {};

    if (missingInfos.hasOwnProperty("displayName")) {
      data.displayName = form.firstName.trim() + " " + form.lastName.trim();
    }
    if (missingInfos.hasOwnProperty("email")) {
      data.email = form.email.trim();
    }
    if (missingInfos.hasOwnProperty("phoneNumber")) {
      data.phoneNumber = form.phoneNumber.trim();
    }

    updateProfile(auth.currentUser, data)
      .then(() => {
        toast.success("Informations ajoutées avec succès!");
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-background flex flex-col w-screen min-h-screen items-center justify-center font-dm-sans text-font-normal">
      <Toaster toastOptions={{ duration: 4000 }} />
      <form
        className="flex flex-col h-fit w-fit p-3 space-y-5 rounded-md shadow-md bg-white border border-line min-w-[400px] "
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold text-font-bold text-center">
          Dites nous plus à votre sujet
        </h1>
        {missingInfos.hasOwnProperty("displayName") && (
          <>
            <SuperInput
              htmlFor="lastName"
              labelText="Nom"
              name="lastName"
              placeholder="Votre nom ici"
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              message={errors.lastName}
              error={Object.keys(errors).length !== 0}
            />
            <SuperInput
              htmlFor="firstName"
              labelText="Prénom"
              name="firstName"
              placeholder="Prénom"
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              message={errors.firstName}
              error={Object.keys(errors).length !== 0}
            />
          </>
        )}
        {missingInfos.hasOwnProperty("email") && (
          <SuperInput
            htmlFor="email"
            labelText="Email"
            name="email"
            placeholder="example@xyz.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            message={errors.email}
            error={Object.keys(errors).length !== 0}
          >
            <MailSvg />
          </SuperInput>
        )}
        {missingInfos.hasOwnProperty("phoneNumber") && (
          <SuperInput
            htmlFor="phoneNumber"
            labelText="Numéro de téléphone"
            name="phoneNumber"
            placeholder="+229XXXXXXXX"
            type="text"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            children={<FaPhoneAlt />}
            message={errors.phoneNumber}
            error={Object.keys(errors).length !== 0}
          />
        )}
        <button
          className={
            isLoading
              ? "bg-primary/50 cursor-not-allowed text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
              : "bg-primary  text-white min-w-72 p-2 rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center"
          }
          onClick={() => {}}
          type="submit"
          disabled={isLoading}
        >
          Valider
          {isLoading && <ImSpinner9 className="ml-2 animate-spin" />}
        </button>
      </form>
    </div>
  );
};

export default TellUsMore;
