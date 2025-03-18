import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormSchemaType } from '../validations/schema';
import { addHookFormData } from '../store/formDataSlice';
import CountryAutocomplete from './CountryAutocomplete';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { fileToBase64 } from '../utils/fileUtils';
import { FormData } from '../types';

const ReactHookFormPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const password = watch('password', '');

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true);

    try {
      let pictureBase64: string | null = null;
      if (data.picture && data.picture[0]) {
        pictureBase64 = await fileToBase64(data.picture[0]);
      }

      const formData: FormData = {
        ...data,
        picture: pictureBase64,
      };

      dispatch(addHookFormData(formData));
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryChange = (country: string) => {
    setValue('country', country);
    trigger('country');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">React Hook Form</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Back to Main
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="hookName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="hookName"
            type="text"
            {...register('name')}
            className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Age Field */}
        <div>
          <label
            htmlFor="hookAge"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            id="hookAge"
            type="number"
            min="0"
            {...register('age', { valueAsNumber: true })}
            className={`mt-1 block w-full p-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="hookEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="hookEmail"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="hookPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="hookPassword"
            type="password"
            {...register('password')}
            className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {password && <PasswordStrengthMeter password={password} />}
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="hookConfirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="hookConfirmPassword"
            type="password"
            {...register('confirmPassword')}
            className={`mt-1 block w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="hookGender"
            {...register('gender')}
            className={`block w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        {/* Country Field */}
        <div>
          <label
            htmlFor="hookCountry"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <CountryAutocomplete
            id="hookCountry"
            value={watch('country') || ''}
            onChange={handleCountryChange}
            error={errors.country?.message}
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Picture Upload Field */}
        <div>
          <label
            htmlFor="hookPicture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            id="hookPicture"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            {...register('picture')}
            className={`mt-1 block w-full p-2 border ${errors.picture ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Only .jpg and .png files, max 5MB
          </p>
          {errors.picture && (
            <p className="mt-1 text-sm text-red-600">
              {errors.picture.message as string}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="hookTerms"
              type="checkbox"
              {...register('termsAccepted')}
              className={`h-4 w-4 ${errors.termsAccepted ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="hookTerms" className="font-medium text-gray-700">
              I accept the Terms and Conditions
            </label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-600">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white select-none
              ${!isValid || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:cursor-pointer'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReactHookFormPage;
