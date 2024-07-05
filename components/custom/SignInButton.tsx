import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <Button onClick={handleSignIn} className="px-6 py-2 text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-red-300 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105">
      Sign In
    </Button>
  );
};

export default SignInButton;