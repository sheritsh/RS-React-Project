import { z } from 'zod';

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-ZА-Я].*/, 'Name must start with an uppercase letter'),

    age: z
      .number({
        invalid_type_error: 'Age must be a number',
        required_error: 'Age is required',
      })
      .int()
      .min(1, 'Age must be a positive number'),

    email: z.string().min(1, 'Email is required').email('Invalid email format'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[\W_]/, 'Password must contain at least one special character'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),

    gender: z.string().min(1, 'Gender is required'),

    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),

    country: z.string().min(1, 'Country is required'),

    picture: z
      .any()
      .refine((file) => file !== null, 'Profile picture is required')
      .refine(
        (file) => {
          // Handle both FileList and single File
          const fileToCheck = file instanceof FileList ? file[0] : file;
          return (
            !fileToCheck ||
            ['image/jpeg', 'image/jpg', 'image/png'].includes(fileToCheck.type)
          );
        },
        { message: 'Only .jpg and .png formats are supported' }
      )
      .refine(
        (file) => {
          // Handle both FileList and single File
          const fileToCheck = file instanceof FileList ? file[0] : file;
          return !fileToCheck || fileToCheck.size <= 5 * 1024 * 1024;
        },
        { message: 'File size must be less than 5MB' }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormSchemaType = z.infer<typeof formSchema>;

export { formSchema };
