'use client'
import { useActionState } from "react";
export default function MealsFormSubmit(){
   const [ pending]= useActionState(); //pending is one of the objects value that we are interested in.


   return <button disabled ={pending}>{pending? 'Submitting...'
    : 'Share meal'
    }</button>
}