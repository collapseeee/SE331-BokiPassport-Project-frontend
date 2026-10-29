import { useForm, useField, useIsFormValid } from 'vee-validate'

export function useValidation<T extends Record<string, any>>(
  schema: any,
  initialValues: T
) {
  const { errors, handleSubmit, resetForm, setValues } = useForm<T>({
    validationSchema: schema,
    initialValues: initialValues as any
  })

  const isValid = useIsFormValid()

  const field = <K extends keyof T>(name: K) => {
    return useField<T[K]>(String(name))
  }

  return { errors, handleSubmit, resetForm, setValues, field, isValid }
}
