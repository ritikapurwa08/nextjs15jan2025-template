import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { IoIosLock, IoIosMail, IoIosPerson } from "react-icons/io";
import { AuthSignUpSchemaType } from "../constants/auth-types";
import { AuthZodForm } from "../constants/auh-zod-form";
import { useRouter } from "next/navigation";
import CustomInput from "@/_page_components/form/custom-input";
import CustomPasswordInput from "@/_page_components/form/custom-password-input";
import SubmitLoader from "@/_page_components/loaders/submit-loader";

const SignUpInputs = () => {
  const { signIn } = useAuthActions();
  const navigate = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUpZodForm } = AuthZodForm();

  const handleSignUp = (values: AuthSignUpSchemaType) => {
    setIsLoading(true);
    setError("");

    signIn("password", {
      email: values.email,
      name: values.name,
      password: values.password,
      flow: "signUp",
    })
      .then(() => {
        navigate.push("/");

        toast.success("sign up Successfull");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Form {...signUpZodForm}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={signUpZodForm.handleSubmit(handleSignUp)}
      >
        <CustomInput
          control={signUpZodForm.control}
          label="Full Name"
          disabled={loading}
          name="name"
          icon={IoIosPerson}
          placeholder="Enter your name here"
        />

        <CustomInput
          control={signUpZodForm.control}
          name="email"
          label="Email"
          disabled={loading}
          icon={IoIosMail}
          placeholder="Enter Your Email"
        />
        <CustomPasswordInput
          control={signUpZodForm.control}
          label="Password"
          name="password"
          disabled={loading}
          placeholder="Enter Your Password"
          icon={IoIosLock}
        />

        <CustomPasswordInput
          control={signUpZodForm.control}
          label="Confirm Password"
          name="confirmPassword"
          disabled={loading}
          icon={IoIosLock}
          placeholder="Confirm Your Password"
        />
        {!!error && (
          <div className="flex  h-8 rounded-lg flex-row bg-red-500/50 items-center justify-center px-4">
            <TriangleAlertIcon className="  size-3.5" />
            <p className="p-3 rounded-lg ">{error}</p>
          </div>
        )}
        <div className="w-full my-4">
          <SubmitLoader
            defaultText="Sign up"
            loadingIcon={LoaderIcon}
            loadingState={loading}
            loadingText="Signing up..."
          />
        </div>
      </form>
    </Form>
  );
};

export default SignUpInputs;
