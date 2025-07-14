import SignInForm from "./components/SignInForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/produits.jpg')] bg-cover bg-center bg-no-repeat overflow-auto">
      <div className="p-4 flex justify-center items-center">
        <SignInForm />
      </div>
    </div>
  );
}
