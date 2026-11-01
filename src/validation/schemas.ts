import * as yup from 'yup'

export const requiredString = (message = 'This field is required') =>
  yup.string().required(message)

// Letters (incl. Thai combining marks), spaces, hyphens; must contain at least one letter.
const personNamePattern = /^(?=.*\p{L})[\p{L}\p{M}\s-]+$/u

export const personName = (label: string, max = 50) =>
  yup.string()
    .trim()
    .required(`${label} is required`)
    .max(max, `${label} must be at most ${max} characters`)
    .matches(personNamePattern, `${label} may only contain letters, spaces, and hyphens`)

export const username = (max = 20) =>
  yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(max, `Username must be at most ${max} characters`)
    .matches(/^\w+$/, 'Username may only contain letters, numbers, and underscores')

export const email = (message = 'Invalid email address') =>
  yup.string().email(message).required('Email is required')

export const password = (
  message =
    'Password must be at least 6 characters, with at least one capital letter, one lowercase letter, and one digit'
) =>
  yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, message).required('Password is required')

export const confirmPassword = (
  passwordRef: string,
  message = 'Passwords must match'
) =>
  yup.string().oneOf([yup.ref(passwordRef)], message).required('Please confirm your password')

export const url = (message = 'Must be a valid URL') =>
  yup.string().url(message).required('URL is required')

export const oneOf = (values: string[], message = 'Invalid selection') =>
  yup.string().oneOf(values, message).required('This field is required')

export const levelDescription = (max = 20) =>
  yup
    .string()
    .trim()
    .required('Level Description is required.')
    .max(max, `Maximum ${max} characters.`)

export const passCriteria = () =>
  yup
    .number()
    .typeError('Level Pass Criteria is required.')
    .required('Level Pass Criteria is required.')
    .min(1, 'Minimum 1%')
    .max(100, 'Maximum 100%')

export const benefitSchema = (max = 128) =>
  yup.object({
    description: yup
      .string()
      .trim()
      .required('Benefit Description is required.')
      .max(max, `Maximum ${max} characters.`),
  })

export const serviceSchema = (max = 128) =>
  yup.object({
    name: yup
      .string()
      .trim()
      .required('Service name is required.')
      .max(max, `Maximum ${max} characters.`),
  })
