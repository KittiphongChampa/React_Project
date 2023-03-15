import React from 'react';
import { useForm } from 'react-hook-form';

export default function MyForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const handleInputChange = (e) => {
    //     const value = e.target.value;
    //     console.log(value);
    // };
    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            {/* <input {...register('firstName',)} /> <br />
            <input {...register('lastName', { required: true })} /><br />
            {errors.lastName && <p>Last name is required.</p>} */}
            <input {...register('age', { pattern: /\d+/, required: true })} /><br />
            {errors.age && errors.age.type === "pattern" && (
                <p>Please enter a number for age.</p>
            )}
            {errors.age && errors.age.type === "required" && (
                <p>Age is required.</p>
            )}
            <input type="submit" />
        </form>
    );
}

