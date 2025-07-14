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


  return (
    <div className="bg-white w-[560px] rounded-[20px] py-[50px] px-[40px] max-lg:w-[530px] max-sm:w-full max-xs:py-[60px]">
      {/* Logo and title */}
      <div className="text-center mb-8">
        <img src="../kouerlogo.svg" alt="Logo Kouer" className="mx-auto w-[160px] h-[50px]" />
        <h2 className="text-[#4EA04C] text-[20px] mt-1 font-semibold">Commencez l’aventure !</h2>
      </div>

      {/* Sign in form */}
      <form autoComplete="off" className="space-y-[20px]" onSubmit={(e) => e.preventDefault()}>
        <Input label="Nom de l'entreprise" type="text" value={companyName} autoComplete="organization" onChange={(e) => setCompanyName(e.target.value)} />
        <Select label="Type d’entreprise" placeholder="Sélectionnez un type d’entreprise" value={companyType} autoComplete="off" options={['Type d\'entreprise A', 'Type d\'entreprise B', 'Type d\'entreprise C', 'Type d\'entreprise D']} onChange={(e) => setCompanyType(e.target.value)} />
        <Select label="Localisation" placeholder="Sélectionnez une région" value={location} autoComplete="off" options={['Région 1', 'Région 2', 'Région 3', 'Région 4']} onChange={(e) => setLocation(e.target.value)} />
        <Input label="Numéro de téléphone" type="tel" value={phone} autoComplete="tel" onChange={(e) => setPhone(e.target.value)} />
        <Input label="Adresse mail" type="email" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} />

        {/* Password */}
        <div>
          <Input
          label="Mot de passe"
          type="password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
          isPasswordVisible={showPassword}
        />
          <ul className="mt-2 text-sm space-y-1">
            {Object.entries(regex).map(([key, valid]) => (
              <li key={key} className={`flex items-center ${valid ? 'text-green-600' : 'text-red-600'}`}>
                {valid ? <img src="../tickvalidicon.svg" alt="Valid" className="w-4 h-4" /> : <img src="../crossinvalidicon.svg" alt="Invalid" className="w-4 h-4" />}
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

        {/* Confirm password */}
        <Input
          label="Confirmer le mot de passe"
          type="password"
          value={confirm}
          autoComplete="new-password"
          onChange={(e) => setConfirm(e.target.value)}
          togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          isPasswordVisible={showConfirmPassword}
        />

        {/* GTCU */}
        <div className="flex flex-row items-start justify-start relative gap-2">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-[6px]"/>
          <span>
            En créant un compte vous acceptez les {''}
            <a href="#" className="underline">Conditions Générales d’Utilisation</a> {''}
            et les {''} <a href="#" className="underline">Conditions Générales de Vente</a> {''}
            & {''} <a href="#" className="underline">Politique de confidentialité</a> {''} de Kouer.
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full font-semibold text-white bg-[#4EA04C] hover:opacity-80 cursor-pointer"
        >
          Je crée mon compte
        </button>

        <p className="text-[16px] text-[#AAAAAA]">
          J’ai déjà un compte. {''} <a href="#" className="text-[#4EA04C] font-medium">Se connecter</a>
        </p>
      </form>
    </div>
  );
}

// Reusable components

// Input
function Input({ label, type, value, autoComplete, onChange, togglePasswordVisibility, isPasswordVisible } : { label: string; type: string; value: string; autoComplete: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; togglePasswordVisibility?: () => void; isPasswordVisible?: boolean; }) {


  return (
    <div className='relative w-full'>
      <Label text={label} />
      <input
        type={type === 'password' && isPasswordVisible ? 'text' : 'password'}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        className="w-full mb-[10px] px-[20px] py-[8px] pr-[50px] h-[44px] text-[#505050] text-[16px] font-normal bg-[#F4F4F4] rounded-[60px] focus:outline-none focus:border focus:border-gray-500 hover:bg-[#F0F0F0] font-poppins;"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 -translate-y-[25%] cursor-pointer"
        >
          {isPasswordVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M3 13.5C6.6 5.5 17.4 5.5 21 13.5" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 17.5C11.606 17.5 11.2159 17.4224 10.8519 17.2716C10.488 17.1209 10.1573 16.8999 9.87868 16.6213C9.6001 16.3427 9.37913 16.012 9.22836 15.6481C9.0776 15.2841 9 14.894 9 14.5C9 14.106 9.0776 13.7159 9.22836 13.3519C9.37913 12.988 9.6001 12.6573 9.87868 12.3787C10.1573 12.1001 10.488 11.8791 10.8519 11.7284C11.2159 11.5776 11.606 11.5 12 11.5C12.7956 11.5 13.5587 11.8161 14.1213 12.3787C14.6839 12.9413 15 13.7044 15 14.5C15 15.2956 14.6839 16.0587 14.1213 16.6213C13.5587 17.1839 12.7956 17.5 12 17.5Z" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <line x1="3" y1="21" x2="21" y2="3" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M3 13.5C6.6 5.5 17.4 5.5 21 13.5" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 17.5C11.606 17.5 11.2159 17.4224 10.8519 17.2716C10.488 17.1209 10.1573 16.8999 9.87868 16.6213C9.6001 16.3427 9.37913 16.012 9.22836 15.6481C9.0776 15.2841 9 14.894 9 14.5C9 14.106 9.0776 13.7159 9.22836 13.3519C9.37913 12.988 9.6001 12.6573 9.87868 12.3787C10.1573 12.1001 10.488 11.8791 10.8519 11.7284C11.2159 11.5776 11.606 11.5 12 11.5C12.7956 11.5 13.5587 11.8161 14.1213 12.3787C14.6839 12.9413 15 13.7044 15 14.5C15 15.2956 14.6839 16.0587 14.1213 16.6213C13.5587 17.1839 12.7956 17.5 12 17.5Z" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

// Select
function Select({ label, value, autoComplete, options, placeholder, onChange }: { label: string; value: string; autoComplete: string; options: string[]; placeholder: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <div className='relative w-full'>
      <Label text={label} />
      <select className="appearance-none w-full mb-[10px] px-[20px] py-[8px] pr-[50px] h-[44px] text-[#AAAAAA] text-[16px] font-normal bg-[#F4F4F4] rounded-[60px] focus:outline-none focus:border focus:border-gray-500 hover:bg-[#F0F0F0] font-poppins;" value={value} autoComplete={autoComplete} onChange={onChange}>
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-[30%] w-[32px] h-[32px] text-gray-400 bg-white rounded-full flex justify-center items-center">
        <svg
          className="w-[18px] h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

// Label
function Label({ text }: { text: string }) {
  return <label className="font-poppins mb-2 text-[#AAAAAA] text-[16px] px-[15px] mt-[20px]">{text}</label>;
}