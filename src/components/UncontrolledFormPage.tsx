import { FC, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUncontrolledFormData } from '../store/formDataSlice';
import { fromZodError } from 'zod-validation-error';
import { formSchema } from '../validations/schema';
import { CountryAutocomplete } from './CountryAutocomplete';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { fileToBase64 } from '../utils/fileUtils';
import { FormData } from '../types';
import { ZodError } from 'zod';

type ErrorType = Record<string, string>;

const UncontrolledFormPage: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const [country, setCountry] = useState<string>('');
  const [errors, setErrors] = useState<ErrorType>({});
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const validateForm = async (): Promise<FormData | null> => {
    setErrors({});

    try {
      const pictureFile = pictureRef.current?.files?.[0] || null;
      let pictureBase64: string | null = null;

      if (pictureFile) {
        pictureBase64 = await fileToBase64(pictureFile);
      }

      const formData = {
        name: nameRef.current?.value || '',
        age: parseInt(ageRef.current?.value || '0', 10),
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        confirmPassword: confirmPasswordRef.current?.value || '',
        gender: genderRef.current?.value || '',
        termsAccepted: termsRef.current?.checked || false,
        country: country,
        picture: pictureFile,
      };

      formSchema.parse(formData);

      return {
        ...formData,
        picture: pictureBase64,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        const errorMap: ErrorType = {};
        validationError.details.forEach((detail) => {
          const field = detail.path[0];
          errorMap[field] = detail.message;
        });
        setErrors(errorMap);
      } else {
        console.error('Unexpected error:', error);
      }
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = await validateForm();

      if (validatedData) {
        dispatch(addUncontrolledFormData(validatedData));
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Uncontrolled Form</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Back to Main
        </Link>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Age Field */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            ref={ageRef}
            min="0"
            className={`mt-1 block w-full p-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            onChange={handlePasswordChange}
            className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {passwordValue && <PasswordStrengthMeter password={passwordValue} />}
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            className={`mt-1 block w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            ref={genderRef}
            className={`block w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* Country Field */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <CountryAutocomplete
            id="country"
            value={country}
            onChange={setCountry}
            error={errors.country}
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>

        {/* Picture Upload Field */}
        <div>
          <label
            htmlFor="picture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            accept="image/png, image/jpeg"
            className={`mt-1 block w-full p-2 border ${errors.picture ? 'border-red-500' : 'border-gray-300'} rounded hover:cursor-pointer`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Only .jpg and .png files, max 5MB
          </p>
          {errors.picture && (
            <p className="mt-1 text-sm text-red-600">{errors.picture}</p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              ref={termsRef}
              className={`h-4 w-4 ${errors.termsAccepted ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I accept the Terms and Conditions
            </label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-600">{errors.termsAccepted}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:cursor-pointer select-none
              ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export { UncontrolledFormPage };
