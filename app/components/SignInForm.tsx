'use client';
import { useState } from 'react';

export default function SignInForm() {
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const regex = {
    minuscule: /[a-z]/.test(password),
    majuscule: /[A-Z]/.test(password),
    chiffre: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    longueur: password.length >= 8,
  };

  const [errorMessages, setErrorMessages] = useState({
    companyName: '',
    companyType: '',
    location: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
    agree: '',
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading on form submission

    // Reset error messages each time the form is submitted
    const newErrorMessages: typeof errorMessages = {
      companyName: companyName.trim() ? '' : "Veuillez entrer le nom de l'entreprise.",
      companyType: companyType ? '' : "Veuillez choisir un type d’entreprise.",
      location: location ? '' : "Veuillez choisir une région.",
      phone: phone.match(/^\d{10}$/) ? '' : "Numéro de téléphone invalide.",
      email: email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) ? '' : "Adresse mail invalide.",
      password: password.trim() ? '' : "Veuillez entrer un mot de passe.",
      confirm: confirm === password ? '' : "Les mots de passe ne correspondent pas.",
      agree: agree ? '' : "Veuillez accepter nos Conditions",
    };

    setErrorMessages(newErrorMessages);
  };

  return (
    <div className="bg-white w-[560px] rounded-[20px] py-[50px] px-[40px] max-lg:w-[530px] max-sm:w-full max-xs:py-[60px]">
      <div className="text-center mb-8">
        <img src="../kouerlogo.svg" alt="Logo Kouer" className="mx-auto w-[160px] h-[50px]" />
        <h2 className="text-[#4EA04C] text-[20px] mt-2 font-semibold">Commencez l’aventure !</h2>
      </div>

      <form autoComplete="off" className="space-y-[20px]" onSubmit={submitForm}>
        <Input label="Nom de l'entreprise" type="text" value={companyName} autoComplete="off" onChange={(e) => setCompanyName(e.target.value)} errorMessage={errorMessages.companyName} />
        <Select label="Type d’entreprise" placeholder="Sélectionnez un type d’entreprise" value={companyType} autoComplete="off" options={['Type d\'entreprise A', 'Type d\'entreprise B', 'Type d\'entreprise C', 'Type d\'entreprise D']} onChange={(e) => setCompanyType(e.target.value)} errorMessage={errorMessages.companyType} />
        <Select label="Localisation" placeholder="Sélectionnez une région" value={location} autoComplete="off" options={['Région 1', 'Région 2', 'Région 3', 'Région 4']} onChange={(e) => setLocation(e.target.value)} errorMessage={errorMessages.location} />
        <Input label="Numéro de téléphone" type="tel" value={phone} autoComplete="off" onChange={(e) => setPhone(e.target.value)} errorMessage={errorMessages.phone} />
        <Input label="Adresse mail" type="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} errorMessage={errorMessages.email} />

        {/* Mot de passe */}
        <div>
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            isPasswordVisible={showPassword}
            errorMessage={errorMessages.password}
          />
          <ul className="mt-2 text-sm space-y-1">
            {Object.entries(regex).map(([key, valid]) => (
              <li key={key} className={`flex items-center ${valid ? 'text-green-600' : 'text-red-600'}`}>
                <img src={valid ? "../tickvalidicon.svg" : "../crossinvalidicon.svg"} alt="" className="w-4 h-4" />
                <span className="ml-1">
                  {{
                    minuscule: '1 caractère minuscule',
                    majuscule: '1 caractère majuscule',
                    chiffre: '1 chiffre',
                    special: '1 caractère spécial',
                    longueur: 'Minimum 8 caractères',
                  }[key]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Confirmation */}
        <Input
          label="Confirmer le mot de passe"
          type="password"
          value={confirm}
          autoComplete="new-password"
          onChange={(e) => setConfirm(e.target.value)}
          togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          isPasswordVisible={showConfirmPassword}
          errorMessage={errorMessages.confirm}
        />

        {/* CGU */}
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-2">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-[6px]" />
            <span>
              En créant un compte vous acceptez les{' '}
              <a href="#" className="underline">Conditions Générales d’Utilisation</a>,{' '}
              <a href="#" className="underline">Conditions Générales de Vente</a> &{' '}
              <a href="#" className="underline">Politique de confidentialité</a> de Kouer.
            </span>
          </div>
          <div className="min-h-[20px]">
            <ErrorMessage message={errorMessages.agree} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-full font-semibold text-white bg-[#4EA04C] hover:opacity-80 cursor-pointer"
        >
          Je crée mon compte
        </button>

        <p className="text-[16px] text-[#AAAAAA]">
          J’ai déjà un compte. <a href="#" className="text-[#4EA04C] font-medium">Se connecter</a>
        </p>
      </form>
    </div>
  );
}

// Input
function Input({ label, type, value, autoComplete, onChange, togglePasswordVisibility, isPasswordVisible, errorMessage }: {
  label: string;
  type: string;
  value: string;
  autoComplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
  errorMessage?: string;
}) {
  return (
    <div className="relative w-full">
      <Label text={label} />
      <input
        type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        className="w-full mb-[4px] px-[20px] py-[8px] pr-[50px] h-[44px] text-[#505050] text-[16px] font-normal bg-[#F4F4F4] rounded-[60px] focus:outline-none focus:border focus:border-gray-500 hover:bg-[#F0F0F0]"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 translate-y-[-50%] cursor-pointer"
        >
          {isPasswordVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M3 13.5C6.6 5.5 17.4 5.5 21 13.5" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17.5C11.6 17.5 11.2 17.4 10.85 17.27C10.49 17.12 10.15 16.9 9.87 16.62C9.6 16.34 9.38 16.01 9.23 15.65C9.08 15.28 9 14.89 9 14.5C9 14.11 9.08 13.71 9.23 13.35C9.38 12.99 9.6 12.66 9.87 12.38C10.15 12.1 10.49 11.88 10.85 11.73C11.21 11.58 11.6 11.5 12 11.5C12.8 11.5 13.56 11.82 14.12 12.38C14.68 12.94 15 13.7 15 14.5C15 15.3 14.68 16.06 14.12 16.62C13.56 17.18 12.8 17.5 12 17.5Z" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="21" x2="21" y2="3" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M3 13.5C6.6 5.5 17.4 5.5 21 13.5" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17.5C11.6 17.5 11.2 17.4 10.85 17.27C10.49 17.12 10.15 16.9 9.87 16.62C9.6 16.34 9.38 16.01 9.23 15.65C9.08 15.28 9 14.89 9 14.5C9 14.11 9.08 13.71 9.23 13.35C9.38 12.99 9.6 12.66 9.87 12.38C10.15 12.1 10.49 11.88 10.85 11.73C11.21 11.58 11.6 11.5 12 11.5C12.8 11.5 13.56 11.82 14.12 12.38C14.68 12.94 15 13.7 15 14.5C15 15.3 14.68 16.06 14.12 16.62C13.56 17.18 12.8 17.5 12 17.5Z" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}
      <div className="min-h-[20px]">
        <ErrorMessage message={errorMessage} />
      </div>
    </div>
  );
}

// Select
function Select({ label, value, autoComplete, options, placeholder, onChange, errorMessage }: {
  label: string;
  value: string;
  autoComplete: string;
  options: string[];
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
}) {
  return (
    <div className="relative w-full">
      <Label text={label} />
      <select
        className="appearance-none w-full mb-[4px] px-[20px] py-[8px] pr-[50px] h-[44px] text-[#AAAAAA] text-[16px] font-normal bg-[#F4F4F4] rounded-[60px] focus:outline-none focus:border focus:border-gray-500 hover:bg-[#F0F0F0]"
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 translate-y-[-50%] w-[32px] h-[32px] text-gray-400 bg-white rounded-full flex justify-center items-center">
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div className="min-h-[20px]">
        <ErrorMessage message={errorMessage} />
      </div>
    </div>
  );
}

// Label
function Label({ text }: { text: string }) {
  return <label className="font-poppins mb-2 text-[#AAAAAA] text-[16px] px-[15px] mt-[20px]">{text}</label>;
}

// Error message
function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span
      className={`text-left block text-sm px-[15px] ${
        message ? 'text-red-600 min-h-[20px]' : 'text-transparent min-h-[20px]'
      }`}
    >
      {message || ''}
    </span>
  );
}